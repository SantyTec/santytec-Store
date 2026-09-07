import { z } from 'zod';

export const checkoutSchema = z.object({
	name: z
		.string('El nombre es requerido.')
		.min(4, 'El nombre debe tener al menos 4 carácteres')
		.max(50, { message: 'El nombre no puede tener más de 50 caracteres.' }),
	email: z.email('El correo electrónico no es válido.').trim(),
	phone: z.string('El teléfono es requerido.').min(10, {
		message: 'El teléfono debe tener al menos 10 carácteres.',
	}),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type CheckoutFormState = {
	message: string;
	success: boolean;
	errors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
	};
};
