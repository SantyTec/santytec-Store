import { z } from 'zod';

export const checkoutSchema = z.object({
	name: z
		.string('El nombre es requerido.')
		.min(4, 'El nombre debe tener al menos 4 carácteres')
		.max(50, { message: 'El nombre no puede tener más de 50 caracteres.' }),
	email: z.email('El correo electrónico no es válido.').trim(),
	phone: z
		.string('El teléfono es requerido.')
		.trim()
		.min(10, {
			message: 'El teléfono debe tener al menos 10 carácteres.',
		})
		.regex(/^\+?[0-9 ]+$/, {
			message:
				'El teléfono solo puede contener números, espacios y un + inicial.',
		}),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type CheckoutFormState = {
	message: string;
	success: boolean;
	orderId?: number;
	errors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
	};
};
