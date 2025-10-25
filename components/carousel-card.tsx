import { CartPreview } from '@/components/cart/cart-preview';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FullProduct } from '@/lib/types';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	product: FullProduct;
	index: number;
	isVisible: boolean;
}

export default function CarouselCard({ product, index, isVisible }: Props) {
	const firstImage = product.images[0];
	const outOfStock = product.stock === 0;

	return (
		<Card
			className={`overflow-hidden bg-card group border-border/50 h-full cursor-pointer hover:border-secondary/50 transition-all duration-300 ${
				isVisible ? 'animate-in fade-in slide-in-from-bottom-4' : 'opacity-0'
			}`}
			style={{
				animationDelay: `${index * 100}ms`,
				animationFillMode: 'forwards',
			}}
		>
			<Link href={`/products/${product.id}`} className="block">
				<CardContent className="p-3 pt-0 overflow-hidden">
					<div className="relative aspect-square overflow-hidden bg-muted/30">
						<Image
							src={firstImage?.url || '/logo.webp'}
							alt={product.name}
							className="object-cover transition-transform duration-500 group-hover:scale-110"
							fill
						/>
						{outOfStock && (
							<Badge className="absolute bg-secondary top-3 right-3 gap-1 animate-gentle-pulse">
								Bajo stock
							</Badge>
						)}
						<div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</div>
				</CardContent>

				<div className="p-4 space-y-3">
					<p className="text-xs text-secondary font-medium uppercase tracking-wider">
						{product.category.name}
					</p>
					<h3 className="text-lg font-semibold text-foreground line-clamp-2 leading-tight">
						{product.name}
					</h3>
					<p className="text-2xl font-bold text-tertiary">${product.price}</p>
					<div className="pt-2">
						<span className="inline-flex items-center text-sm font-medium text-accent group-hover:gap-2 transition-all">
							Ver detalles
							<ChevronRight className="h-4 w-4 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
						</span>
					</div>
				</div>
			</Link>
			<CartPreview item={product} outOfStock={outOfStock} className='ml-4' />
		</Card>
	);
}
