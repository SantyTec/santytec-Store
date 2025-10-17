import z from 'zod';

export const LoginSchema = z.object({
	email: z.string().email('Email inválido'),
	password: z.string().min(1, 'La contraseña es requerida'),
});

export const RegisterSchema = z.object({
	name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
	email: z.string().email('Email inválido'),
	password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
	phone: z.string().optional(),
});

export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;

export type LoginFormState = {
	success: boolean;
	errors?: {
		email?: string[];
		password?: string[];
	};
	message: string;
};

export type RegisterFormState = {
	success: boolean;
	message: string;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		phone?: string[];
	};
};
