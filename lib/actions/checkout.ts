'use server';

import { sendNotifications } from '@/lib/controller/emails';
import { generateOrderSummary } from '@/lib/controller/order';
import { clearCartFromDB } from '@/lib/controller/cart';
import { createOrder } from '@/lib/model/order';
import { CheckoutFormState, checkoutSchema } from '@/lib/schemas/checkout';
import { CartProduct } from '@/lib/types';
import { redirect } from 'next/navigation';

export async function checkoutAction(
	prevState: CheckoutFormState,
	formData: FormData,
	items: CartProduct[]
): Promise<CheckoutFormState> {
	const data = Object.fromEntries(formData);

	if (items.length === 0) redirect('/cart');

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

	const orderSummary = await generateOrderSummary(items);

	const { success: notifySuccess, message: notifyMessage } =
		await sendNotifications(orderId, name, phone, email, orderSummary);
	if (!notifySuccess) {
		return {
			message: notifyMessage || 'Error en las notificaciones.',
			success: false,
		};
	}

	await clearCartFromDB();

	return { message: 'Su orden fue creada éxitosamente', success: true };
}
