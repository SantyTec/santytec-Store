import { unstable_noStore as noStore } from 'next/cache';

import { prisma } from '@/lib/client';

const ITEMS_PER_PAGE = 12;

export async function getFilteredProducts(
	currentPage: number,
	name: string,
	category?: string
) {
	noStore();

	const skip = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const products = await prisma.product.findMany({
			include: { images: true, category: true },
			orderBy: { name: 'asc' },
			where: {
				AND: [
					{ OR: [{ name: { contains: name, mode: 'insensitive' } }] },
					{
						OR: [
							{
								category: { name: { contains: category, mode: 'insensitive' } },
							},
						],
					},
					{ isArchived: false },
				],
			},
			take: ITEMS_PER_PAGE,
			skip,
		});

		return products;
	} catch (error) {
		const message = 'Error al obtener los productos.';
		console.log(message, error);

		return;
	}
}

export async function getProductsPages() {
	noStore();

	try {
		const count = await prisma.product.count();
		const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

		return totalPages;
	} catch (error) {
		console.log(error, 'Error en la base de datos.');
	}
}
