'use server';

import { requestResetSchema } from '@/lib/schemas/reset';
import { prisma } from '@/lib/client';
import crypto from 'crypto';

export async function requestPasswordReset(formData: FormData) {
  'use server';

  const data = Object.fromEntries(formData) as Record<string, string>;
  const parsed = requestResetSchema.safeParse(data);
  if (!parsed.success) {
    console.log('requestPasswordReset: email inválido');
    return;
  }

  const { email } = parsed.data;

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });

  // Don't reveal whether user exists for security. Still create token only if user exists.
  if (!user) {
    console.log('Solicitud de recuperación recibida para', email);
    return;
  }

  // Remove previous tokens for this email
  await prisma.passwordResetToken.deleteMany({ where: { email } }).catch(() => {});

  // Generate token and store hashed version
  const token = crypto.randomUUID() + crypto.randomBytes(16).toString('hex');
  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      email,
      token: hashed,
      expires,
    },
  });

  // Simulate sending email by printing link to console
  console.log('Enlace de recuperación:', `/auth/reset-password?token=${token}`);

  return;
}
