import { unstable_noStore as noStore } from 'next/cache';

import { prisma } from '@/lib/client';
import { DataResponse } from '@/lib/types';

export async function getRootCategories(): Promise<DataResponse> {
	noStore();

	try {
		const categories = await prisma.category.findMany({
			where: { parentCategoryId: null },
		});

		return {
			data: categories,
			message: 'Categorías padre obtenidas correctamente',
			success: true,
		};
	} catch (error) {
		const message = 'Error al obtener categorías raíz:';
		console.error(message, error);

		return { message, success: false };
	}
}
