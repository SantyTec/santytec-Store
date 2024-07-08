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

export async function getProduct(id: string) {
	noStore();

	try {
		const product = await prisma.product.findUnique({
			where: { id },
			include: { images: true, category: true },
		});

		return product;
	} catch (error) {
		const message = 'Error al obtener el producto.';
		console.error(message, error);

		return;
	}
}

export async function getRecommendedProducts(categoryId: string) {
	noStore();

	try {
		const products = await prisma.product.findMany({
			where: { categoryId, isArchived: false },
			take: 12,
			orderBy: { isFeatured: 'desc' },
			include: { images: true, category: true },
		});

		return products;
	} catch (error) {
		console.error('Error al obtener los productos');

		return;
	}
}

export async function getProductsByCategory(categoryId: string) {
	noStore();

	try {
		const products = await prisma.product.findMany({
			where: { categoryId, isArchived: false }, 
			orderBy: { isFeatured: 'desc' },
			include: { images: true, category: true },
		});

		return products
	} catch (error) {
		console.error('Error al obtener los productos en base a su categoría.');

		return;
	}
}
