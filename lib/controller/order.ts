import { findManyByUserId } from '@/lib/model/order';
import { CartProduct } from '@/lib/types';

export async function handleGetUserOrders(userId: string) {
	try {
		const { message, success, data } = await findManyByUserId(userId);

		if (!success) return { message, success, data: [] };

		return { message, success, data };
	} catch (error) {
		console.error('[GET_USER_ORDERS_CONTROLLER_ERROR]', error);

		return {
			message: 'Error al obtener las órdenes del usuario',
			success: false,
			data: [],
		};
	}
}

export async function generateOrderSummary(items: CartProduct[]) {
	const originalTotal = items.reduce((total, item) => {
		const itemPrice = Number(item.price);
		return total + itemPrice * item.quantity;
	}, 0);

	const discountTotal = items.reduce((total, item) => {
		return total + (item.discountAmount || 0);
	}, 0);

	const finalTotal = originalTotal - discountTotal;

	return `<table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid hsl(0, 0%, 30%);">
            <th style="text-align: left; padding: 0.5rem; color: hsl(0, 0%, 80%);">Producto</th>
            <th style="text-align: center; padding: 0.5rem; color: hsl(0, 0%, 80%);">Cantidad</th>
            <th style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">Precio</th>
            <th style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">Subtotal</th>
            ${
							discountTotal > 0
								? '<th style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">Descuento</th>'
								: ''
						}
            ${
							discountTotal > 0
								? '<th style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">Total Final</th>'
								: ''
						}
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
              ${
								discountTotal > 0
									? `<td style="text-align: right; padding: 0.5rem; color: hsl(10, 95%, 70%);">-$${(
											item.discountAmount || 0
									  ).toFixed()}</td>`
									: ''
							}
              ${
								discountTotal > 0
									? `<td style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%);">$${(
											Number(item.price) * item.quantity -
											(item.discountAmount || 0)
									  ).toFixed()}</td>`
									: ''
							}
            </tr>
            ${
							item.appliedDiscounts?.length
								? item.appliedDiscounts
										.map(
											(discount) => `
              <tr>
                <td colspan="${
									discountTotal > 0 ? '6' : '4'
								}" style="text-align: right; padding: 0.25rem 0.5rem; color: hsl(10, 95%, 70%); font-style: italic;">
                  ${discount.name} ${
												discount.type === 'PERCENTAGE'
													? `(${discount.value}%)`
													: `($${discount.value})`
											}
                </td>
              </tr>
            `
										)
										.join('')
								: ''
						}
          `
						)
						.join('')}
          <tr>
            <td colspan="${
							discountTotal > 0 ? '3' : '3'
						}" style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%); font-weight: bold;">Subtotal:</td>
            <td style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%); font-weight: bold;">$${originalTotal.toFixed()}</td>
            ${
							discountTotal > 0
								? `
            <td style="text-align: right; padding: 0.5rem; color: hsl(10, 95%, 70%); font-weight: bold;">-$${discountTotal.toFixed()}</td>
            <td style="text-align: right; padding: 0.5rem; color: hsl(0, 0%, 80%); font-weight: bold;">$${finalTotal.toFixed()}</td>
            `
								: ''
						}
          </tr>
          <tr>
            <td colspan="${
							discountTotal > 0 ? '5' : '3'
						}" style="text-align: right; padding: 0.5rem; color: hsl(10, 95%, 70%); font-weight: bold;">Total Final:</td>
            <td style="text-align: right; padding: 0.5rem; color: hsl(10, 95%, 70%); font-weight: bold;">$${finalTotal.toFixed()}</td>
          </tr>
        </tbody>
      </table>`;
}
