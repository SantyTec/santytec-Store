import { z } from 'zod';

export const checkoutSchema = z.object({
	name: z
		.string({
			required_error: 'Por favor, ingresa tu nombre.',
		})
		.min(4, 'El nombre debe tener al menos 4 carácteres')
		.max(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
		.regex(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, {
			message: 'El nombre solo puede contener letras y espacios.',
		}),
	email: z
		.string()
		.min(1, 'Por favor, ingresa tu correo electrónico.')
		.email({
			message: 'El correo electrónico no es válido.',
		})
		.trim(),
	phone: z
		.string({ required_error: 'Por favor, ingresa tu teléfono.' })
		.min(10, {
			message: 'El teléfono debe tener al menos 10 carácteres.',
		}),
});
