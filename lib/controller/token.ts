import * as tokenModel from '@/lib/data/token';
import { updatePasswordHash } from '@/lib/data/user';
import { Emailer } from '@/lib/emails/nodemailer';
import { findUserByEmailOrPhone } from '@/lib/model/user';
import bcrypt from 'bcryptjs';
import crypto, { hash, randomBytes } from 'crypto';
import { email } from 'zod';

export function hashToken(token: string): string {
	return crypto.createHash('sha256').update(token).digest('hex');
}

export async function verifyInvitationToken(token: string) {
	const hashedToken = hashToken(token);

	const invitation = await tokenModel.findTokenByHashedToken(
		hashedToken,
		'INVITATION'
	);

	if (!invitation) {
		return { valid: false, error: 'Token inválido' };
	}

	if (invitation.expires < new Date()) {
		return { valid: false, error: 'Esta invitación ha expirado' };
	}

	return {
		valid: true,
		invitation: {
			email: invitation.email,
			phone: invitation.newEmail,
		},
	};
}

export async function deleteInvitationToken(token: string) {
	const hashedToken = hashToken(token);

	try {
		await tokenModel.deleteByToken(token);

		return { success: true, message: 'Eliminado con exito' };
	} catch (error) {
		console.error('[DELETE_TOKEN_BY_TOKEN_ERROR]', error);

		return { success: false, message: 'Error al eliminar el token' };
	}
}

export async function handleResetPassword(token: string, password: string) {
  try {
    const hashedToken = hashToken(token);

		const verifiedToken = await tokenModel.findTokenByHashedToken(
			hashedToken,
			'FORGOT'
		);

		if (!verifiedToken) {
			return { success: false, message: 'Token inválido' };
		}

		if (verifiedToken.expires < new Date()) {
			return { success: false, message: 'Este token ha expirado' };
		}

		const user = await findUserByEmailOrPhone(verifiedToken.email);

		if (!user) {
			return { success: false, message: 'Usuario no encontrado' };
		}

		const hashed = await bcrypt.hash(password, 10);

		await updatePasswordHash(user.id, hashed);

		await tokenModel.deleteAllByPurposeAndEmail('FORGOT', verifiedToken.email);

		return { success: true, message: 'Contraseña restablecida con éxito' };
	} catch (error) {
		console.error('[HANDLE_RESET_PASSWORD_ERROR]', error);
		return { success: false, message: 'Error al restablecer la contraseña' };
	}
}

export async function handleForgotPassword(email: string) {
	try {
		const emailer = new Emailer();

		const user = await findUserByEmailOrPhone(email);

		if (!user) return { success: false, message: 'Usuario no encontrado' };

		const token = randomBytes(32).toString('hex');
		const hashedToken = hashToken(token);
		const expires = new Date(Date.now() + 60 * 60 * 1000);

		await tokenModel.deleteAllByPurposeAndEmail('FORGOT', email);

		await tokenModel.createForgotPasswordToken(email, hashedToken, expires);

		await emailer.sendForgotPasswordEmail(user.name || email, email, token);

		return { success: true, message: 'Token creado con exito' };
	} catch (error) {
		console.error('[CREATE_FORGOT_PASSWORD_TOKEN_ERROR]', error);

		return { success: false, message: 'Error al crear el token' };
	}
}
