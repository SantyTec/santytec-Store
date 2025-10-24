'use server';

import { auth } from '@/auth';
import { handleVerifyEmail } from '@/lib/controller/user';
import { ProfileFormState } from '@/lib/schemas/user';

export async function verifyEmailAction(token: string) {
	const result = await handleVerifyEmail(token);
	return result;
}

export async function updateUser(
	prevState: ProfileFormState,
	formData: FormData
) {
	const session = await auth();
  if (!session) return { success: false, message: 'No está autorizado' };
  
  const user = await handleGet
}
