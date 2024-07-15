import { Suspense } from 'react';

import Catalog from '@/components/products/catalog';
import { ProductCardSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';

interface Props {
	searchParams: {
		page?: string;
		name?: string;
		category?: string;
	};
}

export default function ProductsPage({ searchParams }: Props) {
	const page = searchParams?.page || 1;
	const name = searchParams?.name || '';
	const category = searchParams?.category;

	return (
		<section className="pb-10">
			<Wrapper>
				<h2 className="my-6 text-4xl font-semibold text-center uppercase font-accent text-accent-600">
					Catálogo completo
				</h2>
				<Suspense
					fallback={
						<div className="px-4 pb-10 sm:px-6 lg:px-8 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</div>
					}
				>
					<Catalog page={+page} name={name} category={category} />
				</Suspense>
			</Wrapper>
		</section>
	);
}
