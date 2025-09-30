import { prisma } from '@/lib/client';

export async function createOrder(
	name: string,
	email: string,
	phone: string,
	products: { id: string; quantity: number; appliedDiscounts?: { id: string }[] }[]
) {
	try {
		const operation = await prisma.$transaction(async (prisma) => {
			let orderOriginalSubtotal = 0;
			let orderDiscountAmount = 0;

			const order = await prisma.order.create({
				data: { 
					name, 
					phone, 
					email,
					originalSubtotal: 0,
					discountAmount: 0,
					finalSubtotal: 0
				},
			});

			for (const orderProduct of products) {
				const product = await prisma.product.findUnique({
					where: { id: orderProduct.id },
				});

				if (!product)
					throw new Error(`Producto con id ${orderProduct.id} no encontrado.`);

				if (product.stock < orderProduct.quantity)
					throw new Error(
						`No hay suficiente stock para el producto ${product.name}. Pruebe con una cantidad menor`
					);

				const itemOriginalSubtotal = product.price.toNumber() * orderProduct.quantity;
				orderOriginalSubtotal += itemOriginalSubtotal;

				let itemDiscountAmount = 0;
				if (orderProduct.appliedDiscounts?.length) {
					const discounts = await prisma.discount.findMany({
						where: {
							id: {
								in: orderProduct.appliedDiscounts.map(d => d.id)
							}
						}
					});

					itemDiscountAmount = discounts.reduce((total, discount) => {
						if (discount.type === 'FIXED') {
							return total + discount.value.toNumber();
						} else {
							return total + (itemOriginalSubtotal * discount.value.toNumber() / 100);
						}
					}, 0);

					orderDiscountAmount += itemDiscountAmount;
				}

				await prisma.orderItem.create({
					data: {
						productId: product.id,
						quantity: orderProduct.quantity,
						orderId: order.id,
						priceAtOrder: product.price,
						productNameAtOrder: product.name,
						originalSubtotal: itemOriginalSubtotal,
						discountAmount: itemDiscountAmount,
						finalSubtotal: itemOriginalSubtotal - itemDiscountAmount,
						discounts: orderProduct.appliedDiscounts ? {
							connect: orderProduct.appliedDiscounts
						} : undefined
					},
				});
			}

			// Actualizar los totales de la orden
			await prisma.order.update({
				where: { id: order.id },
				data: {
					originalSubtotal: orderOriginalSubtotal,
					discountAmount: orderDiscountAmount,
					finalSubtotal: orderOriginalSubtotal - orderDiscountAmount
				}
			});

			return {
				message: 'Pedido procesado en la base de datos',
				success: true,
				orderId: order.id,
			};
		});

		return {
			message: operation.message,
			success: operation.success,
			orderId: operation.orderId,
		};
	} catch (error: any) {
		console.error(error);

		return {
			message: error.message || 'Error al procesar el pedido',
			success: false,
		};
	}
}
