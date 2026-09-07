import Image from 'next/image';
import Link from 'next/link';

import { FullProduct } from '@/lib/types';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { CartPreview } from '@/components/cart/cart-preview';
import { Button } from '@/components/ui/button';

interface Props {
	product: FullProduct & { slug: string };
}

export default function ProductCard({ product }: Props) {
	const firstImage = product.images[0];
	const outOfStock = product.stock === 0;

	return (
		<Card className="relative overflow-hidden transition-all duration-300 group hover:shadow-2xl hover:-translate-y-2 hover:shadow-accent/10">
			<Link href={`/products/${product.slug}`}>
				<CardHeader className="flex items-center justify-center overflow-hidden aspect-square bg-muted/50">
					<Image
						src={firstImage.url || '/placeholder.svg'}
						alt={product.name}
						width={300}
						height={300}
						className="object-contain p-8 transition-transform duration-300 group-hover:scale-110"
					/>
				</CardHeader>
				<CardContent className="p-4 space-y-3">
					<h3 className="text-base font-semibold transition-colors line-clamp-2 group-hover:text-accent">
						{product.name}
					</h3>
					{product.stock < 5 && (
						<div className="flex items-center gap-2 text-sm">
							<div
								className={`h-2 w-2 rounded-full ${
									product.stock < 5
										? 'bg-primary animate-gentle-pulse'
										: 'bg-tertiary'
								}`}
							/>
							<span
								className={product.stock < 5 ? 'text-primary' : 'text-tertiary'}
							>
								{product.stock} disponibles
							</span>
						</div>
					)}
					<p className="text-2xl font-bold text-primary">${product.price}</p>

					<Button
						variant="outline"
						className="w-full transition-all duration-300 bg-transparent border-primary text-primary hover:bg-primary hover:text-bg"
					>
						Ver detalles
					</Button>
				</CardContent>
			</Link>
			<CardFooter className="px-4">
				<CartPreview
					item={product}
					outOfStock={outOfStock}
					className="w-full"
				/>
			</CardFooter>
		</Card>
	);
}
