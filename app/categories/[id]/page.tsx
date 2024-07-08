import { Suspense } from 'react';

import CategoryHeading from '@/components/categories/category-heading';
import ProductsGrid from '@/components/products-grid';
import { ProductCardSkeleton, TitleSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';

interface Props {
	params: {
		id: string;
	};
}

export default function CategoryPage({ params }: Props) {
	return (
		<section className="pb-10">
			<Wrapper>
				<Suspense fallback={<TitleSkeleton />}>
					<CategoryHeading id={params.id} />
				</Suspense>
				<main className="px-4 pb-10 sm:px-6 lg:px-8">
					<Suspense
						fallback={
							<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
								<ProductCardSkeleton />
								<ProductCardSkeleton />
								<ProductCardSkeleton />
								<ProductCardSkeleton />
							</div>
						}
					>
						<ProductsGrid categoryId={params.id} fetchType="category" />
					</Suspense>
				</main>
			</Wrapper>
		</section>
	);
}
