import {
	fetchFeaturedProducts,
	fetchProductsCount,
	getAllProducts,
	getFilteredProducts,
	getFilteredProductsCount,
} from '@/lib/model/products';
import { FullProduct } from '@/lib/types';

interface GetFormattedProductsOptions {
	page: number;
	name?: string;
	categories?: string[];
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
}

const ITEMS_PER_PAGE = 12;

export async function getFormattedProducts({
	page,
	name,
	categories,
	minPrice,
	maxPrice,
	inStock,
}: GetFormattedProductsOptions) {
	const { data: products, error } = await getFilteredProducts({
		currentPage: page,
		name,
		categories,
		minPrice,
		maxPrice,
		inStock,
	});

	if (error) throw new Error(error);
	if (!products) return [];

	const formattedProducts: FullProduct[] = products.map((item) => ({
		...item,
		price: item.price.toFixed(),
	}));

	return formattedProducts;
}

export async function getTotalPages({
	name,
	categories,
	minPrice,
	maxPrice,
	inStock,
}: Omit<GetFormattedProductsOptions, 'page'>) {
	const { data: count, error } = await getFilteredProductsCount({
		name,
		categories,
		minPrice,
		maxPrice,
		inStock,
	});

	if (error) throw new Error(error);
	if (!count) return 0;

	return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function getProductsForPDF() {
	const { data: products, error } = await getAllProducts();

	if (error) return { products: null, error };
	if (!products)
		return { products: null, error: 'No se encontraron productos' };

	const formattedProducts = products.map((item) => ({
		...item,
		price: item.price.toFixed(),
	}));

	return { products: formattedProducts, error: null };
}

export async function getFeaturedProducts() {
	const { data: products, error } = await fetchFeaturedProducts();

	if (error || !products) return [];

	const formattedProducts = products.map((item) => ({
		...item,
		price: item.price.toFixed(),
	}));

	return formattedProducts;
}
