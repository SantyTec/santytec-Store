'use server';

import { resetPasswordSchema } from '@/lib/schemas/reset';
import { prisma } from '@/lib/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function resetPassword(formData: FormData) {
  'use server';

  const data = Object.fromEntries(formData) as Record<string, string>;
  const parsed = resetPasswordSchema.safeParse(data);
  if (!parsed.success) {
    console.log('resetPassword: datos inválidos');
    return;
  }

  const { token, password } = parsed.data;

  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const record = await prisma.passwordResetToken.findUnique({ where: { token: hashed } });

  if (!record) {
    console.log('resetPassword: token inválido o ya utilizado');
    return;
  }

  if (record.expires < new Date()) {
    // token expired - remove it
    await prisma.passwordResetToken.deleteMany({ where: { token: hashed } }).catch(() => {});
    console.log('resetPassword: token expirado');
    return;
  }

  // Find user by email
  const user = await prisma.user.findUnique({ where: { email: record.email } });
  if (!user) {
    // remove token to avoid reuse
    await prisma.passwordResetToken.deleteMany({ where: { token: hashed } }).catch(() => {});
    console.log('resetPassword: cuenta asociada no encontrada');
    return;
  }

  const newHashed = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { id: user.id }, data: { password: newHashed } });

  // Invalidate token
  await prisma.passwordResetToken.deleteMany({ where: { token: hashed } }).catch(() => {});

  console.log('resetPassword: contraseña actualizada con éxito para', user.email);
  return;
}
