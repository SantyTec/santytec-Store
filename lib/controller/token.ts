import * as tokenModel from '@/lib/data/token';
import crypto from 'crypto';

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
