import { Metadata } from 'next';
import { Suspense } from 'react';

import Catalog from '@/components/products/catalog';
import { DownloadCatalogButton } from '@/components/products/download-catalog-button';
import { ProductCardSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';
import { Searchbar } from '@/components/ui/searchbar';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import CategoryFilter from '@/components/products/category-filter';
import { Skeleton } from '@/components/ui/skeleton';
import PriceRangeFilter from '@/components/products/price-range-filter';
import StockFilter from '@/components/products/stock-filter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface Props {
	searchParams: Promise<{
		page?: string;
		name?: string;
		category?: string;
		categories?: string;
		minPrice?: string;
		maxPrice?: string;
		inStock?: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Catálogo de Productos - Santy Tec',
	description:
		'Explora el catálogo completo de productos en Santy Tec. Encuentra una amplia variedad de accesorios de tecnología y electrónica.',
};

export default async function ProductsPage(props: Props) {
	const searchParams = await props.searchParams;
	const page = Number(searchParams.page) || 1;
	const name = searchParams.name || undefined;
	const categories =
		searchParams.categories?.split(',').filter(Boolean) || undefined;
	const minPrice = searchParams.minPrice
		? Number(searchParams.minPrice)
		: undefined;
	const maxPrice = searchParams.maxPrice
		? Number(searchParams.maxPrice)
		: undefined;
	const inStock = searchParams.inStock === 'true' || undefined;

	return (
		<section className="min-h-screen bg-bg">
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-br from-blue-950/50 via-purple-950/30 to-bg" />

				<div className="container relative px-4 py-12 md:py-16">
					<div className="max-w-3xl mx-auto space-y-6 text-center">
						<h1 className="text-4xl font-bold leading-tight text-transparent md:text-5xl lg:text-6xl bg-gradient-to-r from-secondary-300 via-secondary to-secondary-300 bg-clip-text">
							El futuro de la tecnología, hoy en tus manos
						</h1>

						<Searchbar isCatalog className="max-w-2xl mx-auto h-14" />
					</div>
				</div>
			</div>

			<div className="container px-4 py-8">
				<div className="grid gap-8 lg:grid-cols-[280px_1fr]">
					<div className="lg:hidden mb-6 space-y-6">
						<DownloadCatalogButton className="w-full" />
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" className="w-full">
									<SlidersHorizontal className="mr-2 h-4 w-4" />
									Filtros
								</Button>
							</SheetTrigger>
							<SheetContent side="left">
								<div className="space-y-6 mt-6">
									<Suspense fallback={<Skeleton />}>
										<CategoryFilter />
									</Suspense>
									<PriceRangeFilter />
								</div>
							</SheetContent>
						</Sheet>
					</div>
					<aside className="hidden lg:block">
						<div className="space-y-6 top-24">
							<DownloadCatalogButton className="w-full" />
							<Card className="p-4 overflow-visible">
								<h3 className="font-semibold text-lg mb-4">Filtros</h3>
								<div className="space-y-6">
									<Suspense fallback={<Skeleton />}>
										<CategoryFilter />
									</Suspense>
									<PriceRangeFilter />
								</div>
							</Card>
						</div>
					</aside>
					<div>
						<Suspense
							fallback={
								<div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
									<ProductCardSkeleton />
									<ProductCardSkeleton />
									<ProductCardSkeleton />
									<ProductCardSkeleton />
								</div>
							}
						>
							<Catalog
								page={page}
								name={name}
								categories={categories}
								minPrice={minPrice}
								maxPrice={maxPrice}
								inStock={inStock}
							/>
						</Suspense>
					</div>
				</div>
			</div>
		</section>
	);
}
