import crypto from 'crypto';
import { prisma } from '@/lib/client';
import { hashToken } from '@/lib/controller/token';

export async function createEmailChangeToken(email: string, newEmail: string) {
	await prisma.passwordResetToken.deleteMany({
		where: { email, purpose: 'EMAIL_CHANGE' },
	});

	const token = crypto.randomUUID() + crypto.randomBytes(16).toString('hex');
	const hashedToken = hashToken(token);
	const expires = new Date(Date.now() + 60 * 60 * 1000);

	await prisma.passwordResetToken.create({
		data: {
			email,
			token: hashedToken,
			expires,
			purpose: 'EMAIL_CHANGE',
			newEmail,
		},
	});

	return token;
}

export async function createForgotPasswordToken(
	email: string,
	token: string,
	expires: Date
) {
	await prisma.passwordResetToken.create({
		data: {
			email,
			token,
			expires,
			purpose: 'FORGOT',
		},
	});
}

export async function findTokenByHashedToken(
	hashedToken: string,
	purpose: string
) {
	return prisma.passwordResetToken.findFirst({
		where: {
			token: hashedToken,
			purpose,
			expires: { gt: new Date() },
		},
	});
}

export async function deleteToken(id: string) {
	return prisma.passwordResetToken.delete({
		where: { id },
	});
}

export async function deleteByToken(token: string) {
	return prisma.passwordResetToken.delete({
		where: { token },
	});
}

export async function deleteAllByPurposeAndEmail(
	purpose: string,
	email: string
) {
	return prisma.passwordResetToken.deleteMany({
		where: { purpose, email },
	});
}
