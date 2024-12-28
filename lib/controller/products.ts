import {
	fetchFeaturedProducts,
	fetchProductsCount,
	getFilteredProducts,
} from '@/lib/model/products';
import { FullProduct } from '@/lib/types';

export async function getFormattedProducts(
	page: number,
	name: string,
	category?: string
) {
	const { data: products, error } = await getFilteredProducts(
		page,
		name,
		category
	);

	if (error) throw new Error(error);
	if (!products) return [];

	const formattedProducts: FullProduct[] = products.map((item) => ({
		...item,
		price: item.price.toFixed(),
	}));

	return formattedProducts;
}

export async function getTotalPages(itemsPerPage: number) {
	const { data: pages, error } = await fetchProductsCount();

	if (error || pages === null) throw new Error(error);

	const totalPages = Math.ceil(pages / itemsPerPage);

	return totalPages;
}

export async function getFeaturedProducts() {
	const { data: products, error } = await fetchFeaturedProducts();

	if (error || !products) return [];

	const formattedProducts = products.map((item) => ({
		...item,
		price: item.price.toNumber(),
	}));

	return formattedProducts;
}
