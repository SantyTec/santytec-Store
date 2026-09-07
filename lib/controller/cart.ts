'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/client';
import { findSavedCartByUserId, upsertSavedCart } from '@/lib/model/savedCart';
import { CartProduct } from '@/lib/types';

export const syncCartToDb = async (items: CartProduct[]) => {
	const session = await auth();

	if (!session?.user?.id) return;

	const dbItems = items.map((item) => ({
		productId: item.id,
		quantity: item.quantity,
	}));

	const { success, message } = await upsertSavedCart(session.user.id, dbItems);

	return { success, message };
};

export async function loadCartFromDB() {
	const session = await auth();

	if (!session?.user.id) return null;

	const { data: savedCart } = await findSavedCartByUserId(session.user.id);

	if (!savedCart) return null;

	const items = savedCart.items as Array<{
		productId: string;
		quantity: number;
	}>;

	const products = await prisma.product.findMany({
		where: {
			id: { in: items.map((i) => i.productId) },
		},
		include: {
			images: { take: 1 },
		},
	});

	if (products.length === 0) return [];

	const cartProducts = items
		.map((item) => {
			const product = products.find((p) => p.id === item.productId);
			if (!product) return null;

			return {
				id: product.id,
				name: product.name,
				price: product.price.toNumber(),
				quantity: item.quantity,
				image: product.images[0]?.url || '',
			};
		})
		.filter(Boolean) as CartProduct[];

	return cartProducts;
}

export async function clearCartFromDB() {
	const session = await auth();

	if (!session?.user.id) return;

	await prisma.savedCart
		.delete({
			where: { userId: session.user.id },
		})
		.catch(() => {});
}
