import {
	fetchFeaturedProducts,
	fetchProductsCount,
	getAllProducts,
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
		price: item.price.toFixed(),
	}));

	return formattedProducts;
}
