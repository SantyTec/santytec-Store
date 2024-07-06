import { prisma } from '@/lib/client';

export async function createOrder(
	name: string,
	email: string,
	phone: string,
	products: { id: string; quantity: number }[]
) {
	try {
		const operation = await prisma.$transaction(async (prisma) => {
			const order = await prisma.order.create({
				data: { name, phone, email },
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

				await prisma.orderItem.create({
					data: {
						productId: product.id,
						quantity: orderProduct.quantity,
						orderId: order.id,
						priceAtOrder: product.price,
					},
				});
			}

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
