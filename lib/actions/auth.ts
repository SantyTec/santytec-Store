'use server';

import { signOut } from '@/auth';
import { signIn } from '@/auth';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/client';
import { AuthError } from 'next-auth';
import {
	LoginFormState,
	LoginSchema,
	RegisterFormState,
	RegisterSchema,
} from '@/lib/schemas/auth';
import { autoAssociateOrdersOnRegistration } from '@/lib/model/order';
import { revalidatePath } from 'next/cache';

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
		const emailLower = email.toLowerCase();

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: emailLower }, ...(phone ? [{ phone }] : [])],
			},
		});

		if (existingUser) {
			if (existingUser.email === emailLower) {
				return {
					message: 'Este email ya está registrado. ¿Querés iniciar sesión?',
					success: false,
				};
			}
			if (existingUser.phone === phone) {
				return {
					message: 'Este teléfono ya está registrado.',
					success: false,
				};
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email: emailLower,
				password: hashedPassword,
				phone: phone || null,
				role: 'USER',
			},
		});

		const association = await autoAssociateOrdersOnRegistration(
			user.id,
			user.email!
		);

		if (!association.success) {
			return {
				success: true,
				message: 'Se registro el usuario pero no se pudieron conectar ordenes',
			};
		}

		await signIn('credentials', {
			email: emailLower,
			password,
			redirect: false
		});
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
