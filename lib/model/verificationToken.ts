import { prisma } from '@/lib/client';
import crypto from 'crypto';

export async function createVerificationToken(email: string) {
	try {
		await prisma.verificationToken.deleteMany({ where: { email } });

		const token = crypto.randomBytes(32).toString('hex');
		const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

		const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

		await prisma.verificationToken.create({
			data: {
				email,
				token: hashedToken,
				expires,
			},
		});

		return { data: token, success: true, message: 'Token creado' };
	} catch (error) {
		console.error('[CREATE_TOKEN_MODEL_ERROR]:', error);

		return {
			success: false,
			data: null,
			message: 'Error en la creación del token',
		};
	}
}

export async function findFirstByToken(token: string) {
	return prisma.verificationToken.findFirst({
		where: { token },
	});
}

export async function deleteById(id: string) {
	return await prisma.verificationToken.delete({
		where: { id },
	});
}
