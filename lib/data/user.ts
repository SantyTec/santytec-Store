import { prisma } from '@/lib/client';
import crypto from 'crypto';

export async function getUserByEmail(email: string) {
	return prisma.user.findUnique({ where: { email } });
}



export async function updateUser(
	userId: string,
	data: Partial<{ name: string; email: string; phone: string }>
) {
	return prisma.user.update({ where: { id: userId }, data });
}

export async function updatePasswordHash(
	userId: string,
	hashedPassword: string
) {
	return prisma.user.update({
		where: { id: userId },
		data: { password: hashedPassword },
	});
}

export async function verifyCurrentPassword(
	userId: string,
	plainPassword: string
) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { password: true },
	});
	if (!user || !user.password) return false;
	const bcrypt = await import('bcryptjs');
	return await bcrypt.compare(plainPassword, user.password);
}



export async function createVerificatiasdonToken(
	email: string,
	purpose: 'VERIFY',
	newEmail?: string
) {
	await prisma.passwordResetToken
		.deleteMany({ where: { email, purpose } })
		.catch(() => {});

	const token = crypto.randomUUID() + crypto.randomBytes(16).toString('hex');
	const hashed = crypto.createHash('sha256').update(token).digest('hex');
	const expires = new Date(Date.now() + 60 * 60 * 1000);

	await prisma.passwordResetToken.create({
		data: { email, token: hashed, expires, purpose, newEmail },
	});

	return { token, hashed, expires };
}

export async function findTokenRecordByHashed(hashedToken: string) {
	return prisma.passwordResetToken.findUnique({
		where: { token: hashedToken },
	});
}

export async function invalidateTokenByHashed(hashedToken: string) {
	return prisma.passwordResetToken.deleteMany({
		where: { token: hashedToken },
	});
}
