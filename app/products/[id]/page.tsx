import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { prisma } from '@/lib/client';

import ProductsGrid from '@/components/products-grid';
import Gallery from '@/components/products/gallery';
import Info from '@/components/products/info';
import { ProductCardSkeleton, ProductSkeleton } from '@/components/skeletons';
import { getProduct } from '@/lib/model/products';

interface Props {
	params: Promise<{ id: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const id = params.id;

	const product = await getProduct(id);

	return {
		title: `${product?.name ?? 'Producto'} | Santy Tec`,
		description: `Compra ${product?.name ?? 'Producto'} en Santy Tec. ${
			product?.description
		}. Descubre sus características y especificaciones.`,
		openGraph: {
			title: `${product?.name ?? 'Producto'} | Santy Tec`,
			description: `Compra ${product?.name ?? 'Producto'} en Santy Tec. ${
				product?.description
			}. Descubre sus características y especificaciones.`,
			url: `https://www.santytec.com.ar/products/${id}`,
			images: [
				{
					url: product?.images[0]?.url ?? '#',
					width: 600,
					height: 600,
				},
			],
			siteName: 'Santy Tec',
			locale: 'es_ES',
			type: 'website',
		},
	};
}

export default async function ProductPage(props: Props) {
	const params = await props.params;
	const product = await prisma.product.findFirst({
		where: { id: params.id },
		select: { categoryId: true },
	});
	if (!product) notFound();

	return (
		<section className="lg:px-14 px-7 py-7">
			<main className="flex flex-col lg:flex-row gap-x-14">
				<div className="lg:w-[65%] w-[80%] mx-auto lg:h-[calc(100dvh_-_8rem)]">
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
					<ProductsGrid
						categoryId={product.categoryId}
						fetchType="recommended"
					/>
				</Suspense>
			</div>
		</section>
	);
}
