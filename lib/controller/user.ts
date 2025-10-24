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


// export async function handleUpdateEmail(
// 	userId: string,
// 	form: {
// 		currentPassword: string;
// 		email: string;
// 	}
// ) {
// 	if (!userId) return { success: false, message: 'No autorizado' };

// 	const parsed = updateEmailSchema.safeParse(form);
// 	if (!parsed.success)
// 		return {
// 			success: false,
// 			message: 'Datos inválidos',
// 			errors: parsed.error.flatten().fieldErrors,
// 		};

// 	const { currentPassword, email } = parsed.data;

// 	const { success: found, data: user } = await findUserById(userId);
// 	if (!found || !user)
// 		return { success: false, message: 'Usuario no encontrado' };

// 	// Ensure user has a password
// 	const dbUser = await prisma.user.findUnique({ where: { id: userId } });

// 	if (!dbUser || !dbUser.password) {
// 		return {
// 			success: false,
// 			message:
// 				'Este usuario no tiene contraseña establecida. Inicia sesión con el proveedor correspondiente o restablece contraseña.',
// 		};
// 	}

// 	const match = await bcrypt.compare(currentPassword, dbUser.password);
// 	if (!match)
// 		return { success: false, message: 'Contraseña actual incorrecta' };

// 	// Check uniqueness of email
// 	const exists = await dataUser.getUserByEmail(email);
// 	if (exists && exists.id !== userId)
// 		return { success: false, message: 'El email ya está en uso' };

// 	// Create verification token to confirm new email
// 	const { token } = await dataUser.createVerificationToken(
// 		email,
// 		'CHANGE_EMAIL',
// 		email
// 	);

// 	// Send verification email to the new email address
// 	try {
// 		const emailer = new Emailer();
// 		const subject = 'Confirma tu nuevo email';
// 		const url = `${
// 			process.env.FRONTEND_STORE_URL || ''
// 		}/auth/verify-new-email?token=${token}`;
// 		const text = `Haz clic en el siguiente enlace para confirmar tu nuevo email: ${url}`;
// 		await emailer.sendEmail({
// 			to: email,
// 			from: process.env.GMAIL_USER,
// 			subject,
// 			text,
// 		});
// 	} catch (err) {
// 		console.error('Error sending verification email', err);
// 	}

// 	return {
// 		success: true,
// 		message: 'Se ha enviado un correo de verificación al nuevo email.',
// 	};
// }

// export async function handleUpdatePhone(
// 	userId: string,
// 	form: {
// 		currentPassword: string;
// 		phone: string;
// 	}
// ) {
// 	if (!userId) return { success: false, message: 'No autorizado' };

// 	const parsed = updatePhoneSchema.safeParse(form);
// 	if (!parsed.success)
// 		return {
// 			success: false,
// 			message: 'Datos inválidos',
// 			errors: parsed.error.flatten().fieldErrors,
// 		};

// 	const { currentPassword, phone } = parsed.data;

// 	const dbUser = await prisma.user.findUnique({ where: { id: userId } });
// 	if (!dbUser || !dbUser.password) {
// 		return {
// 			success: false,
// 			message:
// 				'Este usuario no tiene contraseña establecida. Inicia sesión con el proveedor correspondiente o restablece contraseña.',
// 		};
// 	}

// 	const match = await bcrypt.compare(currentPassword, dbUser.password);
// 	if (!match)
// 		return { success: false, message: 'Contraseña actual incorrecta' };

// 	// Check uniqueness of phone
// 	const exists = await prisma.user.findUnique({ where: { phone } });
// 	if (exists && exists.id !== userId)
// 		return { success: false, message: 'El teléfono ya está en uso' };

// 	const updated = await updateUserPhone(userId, phone);
// 	if (!updated.success) return { success: false, message: updated.message };

// 	return { success: true, message: 'Teléfono actualizado', data: updated.data };
// }

// export async function handleUpdatePassword(
// 	userId: string,
// 	form: {
// 		currentPassword: string;
// 		newPassword: string;
// 		confirmPassword: string;
// 	}
// ) {
// 	if (!userId) return { success: false, message: 'No autorizado' };

// 	const parsed = updatePasswordSchema.safeParse(form);
// 	if (!parsed.success)
// 		return {
// 			success: false,
// 			message: 'Datos inválidos',
// 			errors: parsed.error.flatten().fieldErrors,
// 		};

// 	const { currentPassword, newPassword } = parsed.data;

// 	const dbUser = await prisma.user.findUnique({ where: { id: userId } });
// 	if (!dbUser || !dbUser.password) {
// 		return {
// 			success: false,
// 			message:
// 				'Este usuario no tiene contraseña establecida. Inicia sesión con el proveedor correspondiente o restablece contraseña.',
// 		};
// 	}

// 	const match = await bcrypt.compare(currentPassword, dbUser.password);
// 	if (!match)
// 		return { success: false, message: 'Contraseña actual incorrecta' };

// 	const hashed = await bcrypt.hash(newPassword, 10);
// 	const updated = await updateUserPassword(userId, hashed);
// 	if (!updated.success) return { success: false, message: updated.message };

// 	return { success: true, message: 'Contraseña actualizada' };
// }

// export async function handleDeleteAccount(
// 	userId: string,
// 	form: { currentPassword: string }
// ) {
// 	if (!userId) return { success: false, message: 'No autorizado' };

// 	const parsed = updatePasswordSchema.safeParse({
// 		currentPassword: form.currentPassword,
// 		newPassword: 'placeholder',
// 		confirmPassword: 'placeholder',
// 	});
// 	if (!parsed.success) {
// 		// We only needed to validate currentPassword length; return a simpler error
// 		if (!form.currentPassword || form.currentPassword.length < 6) {
// 			return { success: false, message: 'Contraseña actual inválida' };
// 		}
// 	}

// 	const { prisma } = await import('@/lib/client');
// 	const dbUser = await prisma.user.findUnique({ where: { id: userId } });
// 	if (!dbUser || !dbUser.password) {
// 		return {
// 			success: false,
// 			message:
// 				'Este usuario no tiene contraseña establecida. Inicia sesión con el proveedor correspondiente o restablece contraseña.',
// 		};
// 	}

// 	const match = await bcrypt.compare(form.currentPassword, dbUser.password);
// 	if (!match)
// 		return { success: false, message: 'Contraseña actual incorrecta' };

// 	const deleted = await deleteUserById(userId);
// 	if (!deleted.success) return { success: false, message: deleted.message };

// 	return { success: true, message: 'Cuenta eliminada correctamente' };
// }