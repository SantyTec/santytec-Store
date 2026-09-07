'use server';

import { auth } from '@/auth';
import {
	handleVerifyEmail,
	handleUpdatePhone,
	handleRequestEmailChange,
	handleVerifyEmailChange,
	handleUpdatePassword,
} from '@/lib/controller/user';
import {
	UpdatePhoneSchema,
	RequestEmailChangeSchema,
	UpdatePasswordSchema,
} from '@/lib/schemas/user';
import z from 'zod';

export async function verifyEmailAction(token: string) {
	const result = await handleVerifyEmail(token);
	return result;
}

export async function updatePhoneAction(formData: FormData) {
	const session = await auth();
	if (!session?.user?.id) {
		return { success: false, message: 'No autorizado' };
	}

	const phone = formData.get('phone') as string;
	const currentPassword = formData.get('currentPassword') as string;

	// Validar datos con Zod
	const result = UpdatePhoneSchema.safeParse(phone || '');
	if (!result.success) {
		return {
			success: false,
			message: 'Datos inválidos',
			errors: result.error.flatten().fieldErrors,
		};
	}

	return handleUpdatePhone(session.user.id, {
		phone: result.data || '',
		currentPassword,
	});
}

export async function requestEmailChangeAction(formData: FormData) {
	const session = await auth();
	if (!session?.user?.id) {
		return { success: false, message: 'No autorizado' };
	}

	const data = {
		newEmail: formData.get('newEmail'),
		currentPassword: formData.get('currentPassword'),
	};

	// Validar datos con Zod
	const result = RequestEmailChangeSchema.safeParse(data);
	if (!result.success) {
		return {
			success: false,
			message: 'Datos inválidos',
			errors: result.error.flatten().fieldErrors,
		};
	}

	return handleRequestEmailChange(session.user.id, result.data);
}

export async function verifyEmailChangeAction(token: string) {
	if (!token) {
		return {
			success: false,
			message: 'Token no proporcionado',
		};
	}

	return handleVerifyEmailChange(token);
}

export async function updatePasswordAction(prevState: any, formData: FormData) {
	try {
		const session = await auth();
		if (!session?.user.id) return { success: false, message: 'No autorizado' };

		const data = Object.fromEntries(formData);

		const validatedFields = UpdatePasswordSchema.safeParse(data);

		if (!validatedFields.success)
			return {
				success: false,
				message: 'Error en los campos del formulario',
				errors: z.flattenError(validatedFields.error).fieldErrors,
			};

		const { currentPassword, newPassword } = validatedFields.data;

		const result = await handleUpdatePassword(session.user.id, {
			currentPassword,
			newPassword,
		});

		return result;
	} catch (error) {
		console.error('Error en updatePasswordAction:', error);
		return {
			success: false,
			message: 'Error inesperado. Por favor, inténtalo de nuevo.',
		};
	}
}
