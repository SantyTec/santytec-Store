import { prisma } from '@/lib/client';

export async function createOrder(
	name: string,
	email: string,
	phone: string,
	userId: string | null,
	products: {
		id: string;
		quantity: number;
		appliedDiscounts?: { id: string }[];
	}[]
) {
	try {
		const operation = await prisma.$transaction(async (prisma) => {
			let orderOriginalSubtotal = 0;
			let orderDiscountAmount = 0;

			const order = await prisma.order.create({
				data: {
					userId,
					name,
					phone,
					email,
					originalSubtotal: 0,
					discountAmount: 0,
					finalSubtotal: 0,
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

				const itemOriginalSubtotal =
					product.price.toNumber() * orderProduct.quantity;
				orderOriginalSubtotal += itemOriginalSubtotal;

				let itemDiscountAmount = 0;
				if (orderProduct.appliedDiscounts?.length) {
					const discounts = await prisma.discount.findMany({
						where: {
							id: {
								in: orderProduct.appliedDiscounts.map((d) => d.id),
							},
						},
					});

					itemDiscountAmount = discounts.reduce((total, discount) => {
						if (discount.type === 'FIXED') {
							return total + discount.value.toNumber();
						} else {
							return (
								total + (itemOriginalSubtotal * discount.value.toNumber()) / 100
							);
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
						discounts: orderProduct.appliedDiscounts
							? {
									connect: orderProduct.appliedDiscounts,
							  }
							: undefined,
					},
				});
			}

			// Actualizar los totales de la orden
			await prisma.order.update({
				where: { id: order.id },
				data: {
					originalSubtotal: orderOriginalSubtotal,
					discountAmount: orderDiscountAmount,
					finalSubtotal: orderOriginalSubtotal - orderDiscountAmount,
				},
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

export async function findById(id: number) {
	try {
		const order = await prisma.order.findUnique({
			where: { id },
			include: {
				orderItems: {
					include: {
						product: {
							include: {
								images: true,
							},
						},
						discounts: true,
					},
				},
				discounts: true,
				user: true,
			},
		});

		if (!order) {
			return {
				success: false,
				data: null,
				message: 'Orden no encontrada',
			};
		}

		return {
			success: true,
			data: order,
			message: 'Orden encontrada con éxito',
		};
	} catch (error) {
		console.error('[FIND_ORDER_BY_ID_MODEL_ERROR]', error);
		return {
			success: false,
			data: null,
			message: 'Error al buscar la orden',
		};
	}
}

export async function findManyByUserId(userId: string) {
	try {
		const orders = await prisma.order.findMany({
			where: {
				userId,
			},
			include: {
				orderItems: {
					include: {
						product: {
							include: {
								images: true,
							},
						},
						discounts: true,
					},
				},
				discounts: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return {
			success: true,
			data: orders,
			message:
				orders.length > 0
					? 'Órdenes encontradas con éxito'
					: 'No hay órdenes registradas para este usuario',
		};
	} catch (error) {
		console.error('[FIND_ORDERS_BY_USER_ID_MODEL_ERROR]', error);

		return {
			success: false,
			data: null,
			message: 'Error al buscar las órdenes del usuario',
		};
	}
}
