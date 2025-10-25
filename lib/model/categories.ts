import { prisma } from '@/lib/client';

export async function fetchRootCategories() {
	try {
		const categories = await prisma.category.findMany({
			where: { parentCategoryId: null },
			orderBy: { name: 'asc' },
		});

		return {
			data: categories,
			error: null,
		};
	} catch (error) {
		console.error('Error al obtener categorías raíz:', error);

		return { data: null, error };
	}
}

export async function getCategoryName(id: string) {
	try {
		const category = await prisma.category.findUnique({
			where: { id },
			select: { name: true },
		});

		if (!category) throw new Error('No se encontró la categoría');

		return { error: null, data: category.name };
	} catch (error: any) {
		console.error('No se encontró la categoría.', error.message);

		return { error: 'No se encontró la categoría', data: null };
	}
}
