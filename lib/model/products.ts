import { prisma } from '@/lib/client';

export async function getAllProducts() {
	try {
		const products = await prisma.product.findMany({
			include: { images: true, category: true },
			orderBy: { name: 'asc' },
			where: { isArchived: false },
		});

		return { data: products, error: null };
	} catch (error) {
		console.error('Error al obtener los productos.', error);
		return { data: null, error: 'Error al obtener los productos.' };
	}
}

const ITEMS_PER_PAGE = 12;

interface FilterOptions {
	currentPage: number;
	name?: string;
	categories?: string[];
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
}

export async function getFilteredProducts({
	currentPage,
	name,
	categories,
	minPrice,
	maxPrice,
	inStock,
}: FilterOptions) {
	const skip = (currentPage - 1) * ITEMS_PER_PAGE;

	try {
		const whereConditions: any = {
			AND: [{ isArchived: false }],
		};

		// Filtro por nombre
		if (name && name.trim() !== '') {
			whereConditions.AND.push({
				name: { contains: name, mode: 'insensitive' },
			});
		}

		// Filtro por categorías (múltiples)
		if (categories && categories.length > 0) {
			whereConditions.AND.push({
				OR: categories.map((categoryId) => ({
					categoryId: categoryId,
				})),
			});
		}

		// Filtro por rango de precio
		if (minPrice !== undefined || maxPrice !== undefined) {
			const priceCondition: any = {};

			if (minPrice !== undefined) {
				priceCondition.gte = minPrice;
			}

			if (maxPrice !== undefined) {
				priceCondition.lte = maxPrice;
			}

			whereConditions.AND.push({
				price: priceCondition,
			});
		}

		// Filtro por stock
		if (inStock === true) {
			whereConditions.AND.push({
				stock: { gt: 0 },
			});
		}

		const products = await prisma.product.findMany({
			include: {
				images: true,
				category: true,
			},
			orderBy: { name: 'asc' },
			where: whereConditions,
			take: ITEMS_PER_PAGE,
			skip,
		});

		return { data: products, error: null };
	} catch (error) {
		const message = 'Error al obtener los productos.';
		console.error(message, error);

		return { data: null, error: message };
	}
}

export async function getFilteredProductsCount({
	name,
	categories,
	minPrice,
	maxPrice,
	inStock,
}: Omit<FilterOptions, 'currentPage'>) {
	try {
		const whereConditions: any = {
			AND: [{ isArchived: false }],
		};

		if (name && name.trim() !== '') {
			whereConditions.AND.push({
				name: { contains: name, mode: 'insensitive' },
			});
		}

		if (categories && categories.length > 0) {
			whereConditions.AND.push({
				OR: categories.map((categoryId) => ({
					categoryId: categoryId,
				})),
			});
		}

		if (minPrice !== undefined || maxPrice !== undefined) {
			const priceCondition: any = {};

			if (minPrice !== undefined) {
				priceCondition.gte = minPrice;
			}

			if (maxPrice !== undefined) {
				priceCondition.lte = maxPrice;
			}

			whereConditions.AND.push({
				price: priceCondition,
			});
		}

		if (inStock === true) {
			whereConditions.AND.push({
				stock: { gt: 0 },
			});
		}

		const count = await prisma.product.count({
			where: whereConditions,
		});

		return { data: count, error: null };
	} catch (error) {
		const message = 'Error al contar los productos.';
		console.error(message, error);

		return { data: null, error: message };
	}
}

export async function fetchProductsCount() {
	try {
		const count = await prisma.product.count();

		return { data: count, error: null };
	} catch (error) {
		console.error(error, 'Error en la base de datos.');

		return {
			data: null,
			error: 'Error al obtener el número de páginas de los productos.',
		};
	}
}

export async function getProduct(slug: string) {
	try {
		const product = await prisma.product.findUnique({
			where: { slug },
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

export async function getProductsByCategory(slug: string) {
	try {
		const products = await prisma.product.findMany({
			where: { slug, isArchived: false },
			orderBy: { isFeatured: 'desc' },
			include: { images: true, category: true },
		});

		return products;
	} catch (error) {
		console.error('Error al obtener los productos en base a su categoría.');

		return;
	}
}

export async function fetchFeaturedProducts() {
	try {
		const products = await prisma.product.findMany({
			where: { isFeatured: true, isArchived: false },
			include: { images: true, category: true },
		});

		return { data: products, error: null };
	} catch (error) {
		const message = 'Error al obtener los productos destacados.';
		console.error(message, error);

		return { data: null, error: message };
	}
}
