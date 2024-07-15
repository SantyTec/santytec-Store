import { getFormattedProducts, getTotalPages } from '@/lib/controller/products';

import NoResults from '@/components/no-results';
import Pagination from '@/components/pagination';
import ProductCard from '@/components/product-card';

interface Props {
	page: number;
	name: string;
	category?: string;
}

export default async function Catalog({ page, name, category }: Props) {
	const products = await getFormattedProducts(page, name, category);
	const pages = await getTotalPages(12);

	return (
		<>
			<main className="px-4 pb-10 sm:px-6 lg:px-8">
				{products.length === 0 && <NoResults />}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					{products.map((item) => (
						<ProductCard key={item.id} product={item} />
					))}
				</div>
			</main>
			<div className="flex justify-center w-full mt-5">
				<Pagination totalPages={pages} />
			</div>
		</>
	);
}
