import crypto from 'crypto';
import { prisma } from '@/lib/client';

export async function createEmailChangeToken(email: string, newEmail: string) {
    await prisma.passwordResetToken.deleteMany({
        where: { email, purpose: 'EMAIL_CHANGE' }
    });

    const token = crypto.randomUUID() + crypto.randomBytes(16).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
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

export async function findTokenByHashedToken(hashedToken: string, purpose: string) {
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