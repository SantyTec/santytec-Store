'use server';

import { contactSchema } from '@/lib/schemas/contact';
import { sendContactEmail } from './emails';

export type ContactFormState = {
	message: string;
	success: boolean;
	errors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
	};
};

export async function sendContactMail(
	prevState: ContactFormState,
	formData: FormData
) {
	const data = Object.fromEntries(formData);

	const validatedFields = contactSchema.safeParse(data);

	if (!validatedFields.success) {
		return {
			message: 'Error en los campos del formulario.',
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { name, email, phone, message } = validatedFields.data;

	const response = await sendContactEmail(name, email, phone, message);

	if (!response.success) {
		return {
			message: response.message,
			success: false,
		};
	}

	return {
		message: response.message,
		success: true,
	};
}
