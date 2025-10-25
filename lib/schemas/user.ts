import { z } from 'zod';

import { RegisterSchema } from '@/lib/schemas/auth';

export const PasswordSchema = z.string().min(1, {
	message: 'La contraseña es obligatoria',
});

export const NewEmailSchema = z.string().email({
	message: 'El email debe ser válido',
});

export const UpdatePhoneSchema = z
	.string()
	.regex(/^\+?[\d\s-]+$/, {
		message: 'El teléfono solo puede contener números, espacios y guiones',
	})
	.optional();

export const RequestEmailChangeSchema = z
	.object({
		newEmail: NewEmailSchema,
		currentPassword: PasswordSchema.optional(),
	})
	.refine(
		(data) => {
			return true;
		},
		{
			message:
				'Se requiere la contraseña actual para usuarios con credenciales',
			path: ['currentPassword'],
		}
	);

export const UpdatePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
		newPassword: z
			.string()
			.min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
			.regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
			.regex(/[a-z]/, 'Debe contener al menos una minúscula')
			.regex(/[0-9]/, 'Debe contener al menos un número')
			.regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
		confirmNewPassword: z
			.string()
			.min(1, 'Debes confirmar la nueva contraseña'),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmNewPassword'],
	});

export const ProfileSchema = RegisterSchema;

export type ProfileSchemaValues = z.infer<typeof ProfileSchema>;
export type RequestEmailChange = z.infer<typeof RequestEmailChangeSchema>;
export type UpdatePasswordValues = z.infer<typeof UpdatePasswordSchema>;

export type ProfileFormState = {
	message: string;
	success: boolean;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
	};
};

export type UpdatePasswordFormState = {
	message: string;
	success: boolean;
	errors?: {
		currentPassword?: string[];
		newPassword?: string[];
		confirmNewPassword?: string[];
	};
};

export const InvitationSchema = z
	.object({
		name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
		password: PasswordSchema,
		confirmPassword: PasswordSchema,
		token: z.string().min(1),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		error: 'Las contraseñas no coinciden',
	});

export type InvitationFormState = {
	success: boolean;
	message: string;
	errors?: {
		name?: string[];
		password?: string[];
		confirmPassword?: string[];
		token?: string[];
	};
};
