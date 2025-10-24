import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import {
	findUserById,
	createUser,
	findUserByEmailOrPhone,
	activateUserAndAssociateOrders,
} from '@/lib/model/user';
import * as tokenModel from '@/lib/model/verificationToken';
import { Emailer } from '@/lib/emails/nodemailer';
import { createVerificationToken } from '@/lib/model/verificationToken';
import { getUserByEmail } from '@/lib/data/user';

export const handleGetUser = async (userId: string) => {
	const { success, data, message } = await findUserById(userId);

	if (!success) return { success, message };

	return { success, data, message };
};

export async function handleRegister(
	email: string,
	password: string,
	name: string,
	phone?: string
) {
	const emailLower = email.toLowerCase();

	const existingUser = await findUserByEmailOrPhone(emailLower, phone);

	if (existingUser) {
		if (existingUser.email === emailLower) {
			return {
				message: 'Este email ya está registrado. ¿Querés iniciar sesión?',
				success: false,
			};
		}
		if (existingUser.phone === phone) {
			return {
				message: 'Este teléfono ya está registrado.',
				success: false,
			};
		}
	}

	const hashed = await bcrypt.hash(password, 10);

	const { data: user, success: userSucces } = await createUser({
		name,
		email,
		phone,
		password: hashed,
	});
	if (!userSucces)
		return { success: false, message: 'Lo sentimos ha ocurrido un error' };

	const { data: token, success: tokenSuccess } = await createVerificationToken(
		email
	);

	if (!tokenSuccess)
		return { success: false, message: 'Lo sentimos ha ocurrido un error' };

	try {
		const emailer = new Emailer();
		const subject = 'Confirma tu cuenta';
		const url = `${
			process.env.FRONTEND_STORE_URL || ''
		}/auth/verify-email?token=${token}`;
		const text = `Gracias por registrarte. Confirma tu correo haciendo clic en: ${url}`;
		await emailer.sendEmail({
			to: email,
			from: process.env.GMAIL_USER,
			subject,
			text,
		});
	} catch (err) {
		console.error('Error sending verification email', err);
	}

	return {
		success: true,
		message: 'Usuario creado. Por favor verifica tu correo.',
	};
}

export async function handleVerifyEmail(plainToken: string) {
	const hashedToken = crypto
		.createHash('sha256')
		.update(plainToken)
		.digest('hex');

	const verificationToken = await tokenModel.findFirstByToken(hashedToken);

	if (!verificationToken) {
		return {
			success: false,
			message: 'El enlace de verificación es inválido o ya fue utilizado.',
		};
	}

	const hasExpired = verificationToken.expires < new Date();
	if (hasExpired) {
		await tokenModel.deleteById(verificationToken.id);
		return {
			success: false,
			message:
				'El enlace de verificación ha expirado. Por favor, regístrate de nuevo.',
		};
	}

	const user = await getUserByEmail(verificationToken.email);
	if (!user) {
		return {
			success: false,
			message: 'Usuario no encontrado. Contacta a soporte.',
		};
	}

	await activateUserAndAssociateOrders(user.id, user.email!);

	await tokenModel.deleteById(verificationToken.id);

	return {
		success: true,
		message:
			'¡Tu cuenta ha sido verificada exitosamente! Ya puedes iniciar sesión.',
	};
}
