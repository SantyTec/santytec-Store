import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/model/products';

import {
	AddToCart,
	AddToCartProductPage,
} from '@/components/cart/cart-buttons';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
	slug: string;
}

export default async function Info({ slug }: Props) {
	const product = await getProduct(slug);

	if (!product) notFound();

	const isLowStock = product.stock > 0 && product.stock < 5;
	const isOutOfStock = product.stock === 0;

	return (
		<section className="w-full space-y-6 text-xl">
			<div className="flex items-center gap-2">
				<Package className="size-4 text-muted-foreground" />
				<Badge className="text-sm text-bg">{product.category.name}</Badge>
			</div>
			<h1 className="text-4xl font-bold leading-tight font-accent md:text-5xl lg:text-6xl">
				{product.name}
			</h1>

			<p className="text-6xl font-bold text-transparent md:text-7xl lg:text-8xl bg-linear-to-r from-accent via-primary to-tertiary bg-clip-text animate-pulse">
				${product.price.toNumber()}
			</p>

			<div className="flex items-center gap-2">
				{isOutOfStock && (
					<>
						<div className="bg-red-500 rounded-full size-3" />
						<p className="text-lg font-semibold text-red-500">Sin stock</p>
					</>
				)}{' '}
				{isLowStock && (
					<>
						<div
							className={cn(
								'h-3 w-3 rounded-full',
								isLowStock ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
							)}
						/>
						<span
							className={cn(
								'text-lg font-semibold',
								isLowStock && 'animate-pulse text-yellow-500'
							)}
						>
							{isLowStock && <>{product.stock} disponibles</>}
							{isLowStock && ' - ¡Últimas unidades!'}
						</span>
					</>
				)}
			</div>

			<AddToCartProductPage
				item={{
					...product,
					price: product.price.toFixed(),
				}}
			/>

			<Tabs defaultValue="description" className="w-full pt-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="description">Descripción</TabsTrigger>
				</TabsList>

				<TabsContent value="description" className="pt-6">
					<p
						className="text-lg leading-relaxed text-muted-foreground"
						style={{ lineHeight: 1.7 }}
					>
						{product.description}
					</p>
				</TabsContent>
			</Tabs>
		</section>
	);
}
