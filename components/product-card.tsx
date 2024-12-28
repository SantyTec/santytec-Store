import Image from 'next/image';
import Link from 'next/link';

import { FullProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { CartPreview } from "@/components/cart/cart-preview";

interface Props {
	product: FullProduct;
}

export default function ProductCard({ product }: Props) {
	const firstImage = product.images[0];
	const outOfStock = product.stock === 0;

	return (
		<Card className="h-full border-2 cursor-pointer border-bg-800 hover:shadow-sm hover:shadow-accent">
			<CardHeader className="h-full max-h-24">
				<p className="font-semibold text-primary-100">{product.name}</p>
			</CardHeader>
			<CardContent>
				<div className="relative w-full rounded-md aspect-square bg-bg-800">
					<Image
						src={firstImage?.url || '/logo.webp'}
						className="object-contain aspect-square"
						alt={product.name}
						fill
					/>
					{outOfStock && (
						<span className="absolute top-0 bottom-0 left-0 right-0 w-full py-3 m-auto font-semibold text-center uppercase h-fit bg-bg text-primary-50">
							Stock no disponible
						</span>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-y-3">
				<p className="text-xl font-bold text-accent">${product.price}</p>
				<div className="flex flex-wrap md:flex-nowrap w-full sm:w-auto mb-6 pointer-events-auto gap-3">
					<CartPreview item={product} outOfStock={outOfStock} />
					<Link
						href={`/products/${product.id}`}
						className={cn('btn border border-bg-800 bg-bg hover:bg-accent-900')}
					>
						Más info
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
