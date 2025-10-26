import { Metadata } from 'next';
import { Suspense } from 'react';

import CategoryHeading from '@/components/categories/category-heading';
import ProductsGrid from '@/components/products-grid';
import { ProductCardSkeleton, TitleSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';
import { getCategoryName } from '@/lib/model/categories';
import { prisma } from '@/lib/client';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const categories = await prisma.category.findMany({
		select: { slug: true },
	});

	return categories.map((category) => ({
		slug: category.slug,
	}));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const slug = params.slug;

	const category = await prisma.category.findUnique({
		where: { slug: slug },
		select: { name: true },
	});

	const categoryName = category?.name ?? 'Categoría';
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
					<CategoryHeading slug={params.slug} />
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
						<ProductsGrid slug={params.slug} />
					</Suspense>
				</main>
			</Wrapper>
		</section>
	);
}
