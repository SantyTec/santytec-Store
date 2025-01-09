import { Metadata } from 'next';
import { Suspense } from 'react';

import Catalog from '@/components/products/catalog';
import { DownloadCatalogButton } from '@/components/products/download-catalog-button';
import { ProductCardSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';

interface Props {
	searchParams: {
		page?: string;
		name?: string;
		category?: string;
	};
}

export const metadata: Metadata = {
	title: 'Catálogo de Productos - Santy Tec',
	description:
		'Explora el catálogo completo de productos en Santy Tec. Encuentra una amplia variedad de accesorios de tecnología y electrónica.',
};

export default function ProductsPage({ searchParams }: Props) {
	const page = searchParams?.page || 1;
	const name = searchParams?.name || '';
	const category = searchParams?.category;

	return (
		<section className="pb-10">
			<Wrapper>
				<div className="flex my-6 items-center">
					<h2 className="text-4xl font-semibold uppercase font-accent text-accent-600">
						Catálogo completo
					</h2>
					<DownloadCatalogButton className="ms-auto" />
				</div>
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
