'use server';

import { sendNotifications } from '@/lib/controller/emails';
import { checkoutSchema } from '@/lib/schemas/checkout';
import { createOrder } from '@/lib/model/orders';
import { CartProduct } from '@/lib/types';

export type CheckoutFormState = {
	message: string;
	success: boolean;
	errors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
	};
};

export async function processOrder(
	prevState: CheckoutFormState,
	formData: FormData,
	items: CartProduct[]
): Promise<CheckoutFormState> {
	const data = Object.fromEntries(formData);

	const validatedFields = checkoutSchema.safeParse(data);

	if (!validatedFields.success) {
		return {
			message: 'Error en los campos del formulario',
			success: false,
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { name, email, phone } = validatedFields.data;

	const products = items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
	}));

	const {
		message,
		success: orderSuccess,
		orderId,
	} = await createOrder(name, email, phone, products);
	if (!orderSuccess || !orderId) return { message, success: false };

	const { success: notifySuccess, message: notifyMessage } =
		await sendNotifications(orderId, name, phone, email);
	if (!notifySuccess) {
		return {
			message: notifyMessage || 'Error en las notificaciones.',
			success: false,
		};
	}

	return { message: 'Su orden fue creada éxitosamente', success: true };
}
