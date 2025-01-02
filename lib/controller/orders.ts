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

	const orderSummary = await generateOrderSummary(items);

	const { success: notifySuccess, message: notifyMessage } =
		await sendNotifications(orderId, name, phone, email, orderSummary);
	if (!notifySuccess) {
		return {
			message: notifyMessage || 'Error en las notificaciones.',
			success: false,
		};
	}

	return { message: 'Su orden fue creada éxitosamente', success: true };
}

async function generateOrderSummary(items: CartProduct[]) {
	const totalPrice = items.reduce((total, item) => {
		const itemPrice = Number(item.price);
		return total + itemPrice * item.quantity;
	}, 0);

	return `<table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid hsl(0, 0%, 30%);">
            <th style="text-align: left; padding: 0.5rem; color: hsl(0, 0%, 80%);">Producto</th>
            <th style="text-align: center; padding: 0.5rem; color: hsl(0, 0%, 80%);">Cantidad</th>
            <th style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">Precio</th>
            <th style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items
						.map(
							(item) => `
            <tr style="border-bottom: 1px solid hsl(0, 0%, 20%);">
              <td style="padding: 0.5rem; color: hsl(0, 0%, 80%);">${
								item.name
							}</td>
              <td style="text-align: center; padding: 0.5rem; color: hsl(0, 0%, 80%);">${
								item.quantity
							}</td>
              <td style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">$${
								item.price
							}</td>
              <td style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">$${(
								Number(item.price) * item.quantity
							).toFixed()}</td>
            </tr>
          `
						)
						.join('')}
          <tr>
            <td colspan="3" style="text-align: right; padding: 0.5rem; color: hsl(10, 95%, 70%); font-weight: bold;">Total:</td>
            <td style="text-align: right; padding: 0.5rem; color: hsl(10, 95%, 70%); font-weight: bold;">$${totalPrice.toFixed()}</td>
          </tr>
        </tbody>
      </table>`;
}
