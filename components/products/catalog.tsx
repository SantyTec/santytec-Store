import { getFormattedProducts, getTotalPages } from '@/lib/controller/products';

import NoResults from '@/components/no-results';
import Pagination from '@/components/pagination';
import ProductCard from '@/components/product-card';

interface CatalogProps {
	page: number;
	name?: string;
	categories?: string[];
	minPrice?: number;
	maxPrice?: number;
	inStock?: boolean;
}

export default async function Catalog({
	page,
	name,
	categories,
	minPrice,
	maxPrice,
	inStock,
}: CatalogProps) {
	const products = await getFormattedProducts({
		page,
		name,
		categories,
		minPrice,
		maxPrice,
		inStock,
	});

	const totalPages = await getTotalPages({
		name,
		categories,
		minPrice,
		maxPrice,
		inStock,
  });

	return (
		<>
			{products.length === 0 ? (
				<main>
					<NoResults />
				</main>
			) : (
				<>
					<main>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{products.map((item) => (
								<ProductCard key={item.id} product={item} />
							))}
						</div>
					</main>
					<div className="mt-12 flex justify-center">
						<Pagination totalPages={totalPages} />
					</div>
				</>
			)}
		</>
	);
}
