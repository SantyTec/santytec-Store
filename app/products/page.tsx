import { notFound } from 'next/navigation';

import { getFilteredProducts, getProductsPages } from '@/lib/model/products';
import { FullProduct } from '@/lib/types';

import NoResults from '@/components/no-results';
import Pagination from '@/components/pagination';
import ProductCard from '@/components/product-card';
import Wrapper from '@/components/wrapper';

interface Props {
	searchParams: {
		page?: string;
		name?: string;
		category?: string;
	};
}

export default async function ProductsPage({
	searchParams,
}: Props) {
	const page = searchParams?.page || 1;
	const name = searchParams?.name || '';
	const category = searchParams?.category;

	const products = await getFilteredProducts(+page, name, category);
	const pagesCount = await getProductsPages();

	if (!products || !pagesCount) notFound();

	const formattedProducts: FullProduct[] = products.map((item: any) => ({
		...item,
		price: item.price.toNumber(),
	}));

	return (
		<section className="pb-10">
			<Wrapper>
				<h2 className="my-6 text-4xl font-semibold text-center uppercase font-accent text-accent-600">
					Catálogo completo
				</h2>
				<main className="px-4 pb-10 sm:px-6 lg:px-8">
					{products.length === 0 && <NoResults />}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
						{formattedProducts.map((item) => (
							<ProductCard key={item.id} product={item} />
						))}
					</div>
				</main>
				<div className="flex justify-center w-full mt-5">
					<Pagination totalPages={pagesCount} />
				</div>
			</Wrapper>
		</section>
	);
}
