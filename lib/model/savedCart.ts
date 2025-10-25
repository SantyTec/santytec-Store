import { prisma } from '@/lib/client';

export const findSavedCartByUserId = async (userId: string) => {
	try {
		const savedCart = await prisma.savedCart.findUnique({
			where: { userId },
		});

		return { success: true, data: savedCart, message: 'Carrito encontrado' };
	} catch (error) {
		console.error('[FIND_SAVED_CART_MODEL_ERROR]', error);

		return {
			message: 'Error al buscar el carrito guardado',
			success: false,
		};
	}
};

export const upsertSavedCart = async (
	userId: string,
	items: { productId: string; quantity: number }[]
) => {
	try {
		const savedCart = await prisma.savedCart.upsert({
			where: { userId },
			create: { userId, items },
			update: { items },
		});

		return {
			message: 'Carrito guardado exitosamente',
			success: true,
		};
	} catch (error: any) {
		console.error('[UPSERT_SAVED_CART_MODEL_ERROR]', error);

		return {
			message: error.message || 'Error al guardar el carrito',
			success: false,
		};
	}
};
