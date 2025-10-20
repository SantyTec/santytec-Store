import { Metadata } from 'next';
import { Suspense } from 'react';

import CategoryHeading from '@/components/categories/category-heading';
import ProductsGrid from '@/components/products-grid';
import { ProductCardSkeleton, TitleSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';
import { getCategoryName } from '@/lib/model/categories';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const id = params.id;

	const { data: categoryName, error } = await getCategoryName(id);
	if (error) {
		throw new Error(error);
	}

	return {
		title: `${categoryName} | Santy Tec`,
		description: `Descubre nuestra selección de ${categoryName} en Santy Tec. Encuentra los mejores productos de esta categoría.`,
	};
}

export default async function CategoryPage(props: Props) {
	const params = await props.params;
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
