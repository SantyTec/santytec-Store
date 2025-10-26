import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { prisma } from '@/lib/client';

import Gallery from '@/components/products/gallery';
import Info from '@/components/products/info';
import { ProductSkeleton } from '@/components/skeletons';
import { getProduct } from '@/lib/model/products';
import { ProductBreadcrumb } from '@/components/products/product-breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { RelatedProductsWrapper } from '@/components/products/related-products-wrapper';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const products = await prisma.product.findMany({
		where: { isArchived: false },
		select: { slug: true },
	});

	return products.map((product) => ({
		slug: product.slug,
	}));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
	const params = await props.params;
	const slug = params.slug;

	const product = await getProduct(slug);

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
			url: `https://www.santytec.com.ar/products/${slug}`,
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
		where: { slug: params.slug },
		select: {
			id: true,
			categoryId: true,
			name: true,
			category: { select: { name: true } },
		},
	});
	if (!product) notFound();

	return (
		<section className="min-h-screen lg:px-14 px-7 py-7 bg-bg">
			<div className="container px-4 py-4 md:px-6">
				<ProductBreadcrumb
					category={product.category.name}
					categorySlug={product.categoryId}
					productName={product.name}
				/>
			</div>
			<main className="container px-4 pb-16 md:px-6">
				<div className="grid gap-8 lg:grid-cols-[60%_40%] lg:gap-12">
					<div>
						<Suspense
							fallback={
								<div className="lg:h-[calc(100dvh-10rem)] aspect-square mx-auto bg-bg-800 rounded-md shimmer overflow-hidden relative"></div>
							}
						>
							<Gallery id={product.id} />
						</Suspense>
					</div>
					<div className="lg:sticky lg:top-24 lg:h-fit">
						<Suspense fallback={<ProductSkeleton />}>
							<Info slug={params.slug} />
						</Suspense>
					</div>
				</div>
			</main>
			<div className="mt-16">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-3xl font-bold">Te podría interesar</h2>
					</div>
					<Suspense fallback={<Skeleton className="w-full h-96" />}>
						<RelatedProductsWrapper
							categoryId={product.categoryId}
							productId={product.id}
						/>
					</Suspense>
				</div>
			</div>
		</section>
	);
}
