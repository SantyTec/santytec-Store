import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { prisma } from '@/lib/client';

import Gallery from '@/components/products/gallery';
import Info from '@/components/products/info';
import RecommendedProducts from '@/components/products/recommended-products';
import { ProductCardSkeleton, ProductSkeleton } from '@/components/skeletons';

interface Props {
	params: { id: string };
}

export default async function ProductPage({ params }: Props) {
	const product = await prisma.product.findFirst({
		where: { id: params.id },
		select: { categoryId: true },
	});
	if (!product) notFound();

	return (
		<section className="lg:px-14 px-7 py-7">
			<main className="flex flex-col lg:flex-row gap-x-14">
				<div className="lg:w-[65%] w-full lg:h-[calc(100dvh_-_8rem)]">
					<Suspense
						fallback={
							<div className="lg:h-[calc(100dvh_-_10rem)] aspect-square mx-auto bg-bg-800 rounded-md shimmer overflow-hidden relative"></div>
						}
					>
						<Gallery id={params.id} />
					</Suspense>
				</div>
				<div>
					<Suspense fallback={<ProductSkeleton />}>
						<Info id={params.id} />
					</Suspense>
				</div>
			</main>
			<hr className="" />
			<div className="space-y-4 text-center">
				<h2 className="my-6 text-4xl font-semibold uppercase font-accent">
					Productos recomendados
				</h2>
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
					<RecommendedProducts categoryId={product.categoryId} />
				</Suspense>
			</div>
		</section>
	);
}
