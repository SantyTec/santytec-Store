'use server';

import { sendNotifications } from '@/lib/controller/emails';
import { generateOrderSummary } from '@/lib/controller/order';
import { clearCartFromDB } from '@/lib/controller/cart';
import { createOrder } from '@/lib/model/order';
import { CheckoutFormState, checkoutSchema } from '@/lib/schemas/checkout';
import { CartProduct } from '@/lib/types';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { handleGetUser } from '@/lib/controller/user';
import { prisma } from '@/lib/client';

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

	const session = await auth();

	let orderData = {
		name,
		email,
		phone,
		userId: null as string | null,
	};

	if (session?.user.id) {
		const { data } = await handleGetUser(session.user.id);

		orderData = {
			name,
			email: data?.email || email,
			phone: data?.phone || phone,
			userId: session.user.id,
		};

		if (!data?.phone && phone) {
			await prisma.user.update({
				where: { id: session.user.id },
				data: { phone },
			});
		}
	}

	const products = items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
	}));

	const {
		message,
		success: orderSuccess,
		orderId,
	} = await createOrder(
		orderData.name,
		orderData.email,
		orderData.phone,
		orderData.userId,
		products
	);
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
