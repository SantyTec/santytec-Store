'use server';

import { signOut } from '@/auth';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/client';
import {
	handleInvitationEmail,
	handleInvitationRegister,
	handleRegister,
} from '@/lib/controller/user';
import {
	LoginFormState,
	LoginSchema,
	RegisterFormState,
	RegisterSchema,
} from '@/lib/schemas/auth';
import {
	deleteInvitationToken,
	verifyInvitationToken,
} from '@/lib/controller/token';
import { findUserByEmailOrPhone } from '@/lib/model/user';
import { InvitationFormState, InvitationSchema } from '@/lib/schemas/user';
import z from 'zod';

export async function loginAction(
	prevState: LoginFormState,
	formData: FormData
): Promise<LoginFormState> {
	const data = Object.fromEntries(formData);

	try {
		const validatedFields = LoginSchema.safeParse(data);

		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				message: 'Datos inválidos. Por favor revisa los campos.',
				success: false,
			};
		}

		const { email, password } = validatedFields.data;

		await signIn('credentials', {
			email: email.toLowerCase(),
			password,
			redirectTo: '/',
		});

		revalidatePath('/');
		return { success: true, message: 'Ha iniciado sesión!' };
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return {
						message: 'Email o contraseña incorrectos.',
						success: false,
					};
				default:
					if (error.message.includes('CuentaNoVerificada')) {
						return {
							success: false,
							message:
								'Tu cuenta aún no ha sido verificada. Por favor, revisa tu correo',
						};
					}
					return {
						message: 'Ocurrió un error al iniciar sesión.',
						success: false,
					};
			}
		}
		throw error;
	}
}

export async function registerAction(
	prevState: RegisterFormState,
	formData: FormData
) {
	try {
		const data = Object.fromEntries(formData);

		const validatedFields = RegisterSchema.safeParse(data);

		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
				message: 'Datos inválidos. Por favor revisa los campos.',
				success: false,
			};
		}

		const { name, email, password, phone } = validatedFields.data;

		const result = await handleRegister(email, password, name, phone);

		if (!result.success) {
			return result;
		}

		return {
			success: true,
			message: '¡Registro exitoso! Revisa tu email para activar tu cuenta.',
		};
	} catch (error) {
		console.error('Error al registrar usuario:', error);
		return {
			message: 'Ocurrió un error al crear tu cuenta. Intentá nuevamente.',
			success: false,
		};
	}
}

export async function loginWithGoogleAction() {
	await signIn('google', { redirectTo: '/' });
}

export async function checkEmailExists(email: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: { email: email.toLowerCase() },
	});
	return !!user;
}

export async function signOutAction() {
	await signOut();
}

export async function registerWithInvitation(
	prevState: InvitationFormState,
	formData: FormData
) {
	const data = Object.fromEntries(formData);

	const validatedFields = InvitationSchema.safeParse(data);

	if (!validatedFields.success)
		return {
			success: false,
			message: 'Error en el formulario',
			errors: z.flattenError(validatedFields.error).fieldErrors,
		};

	const { name, password, token } = validatedFields.data;

	const {
		message: invitationMessage,
		success: invitationSuccess,
		data: invitationData,
	} = await handleInvitationEmail(token);
	if (!invitationSuccess || !invitationData)
		return { success: false, message: invitationMessage };

	const result = await handleInvitationRegister(
		invitationData.email,
		password,
		name
	);

	return result;
}
