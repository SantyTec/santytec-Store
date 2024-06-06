import Image from 'next/image';
import Link from 'next/link';

import { FullProduct } from '@/lib/types';
import { cn } from '@/lib/utils';

import Redirecter from '@/components/redirecter';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';

interface Props {
	product: FullProduct;
}

export default function ProductCard({ product }: Props) {
	const firstImage = product.images[0];
	const outOfStock = product.stock === 0;

	return (
		<Redirecter
			href={`/products/${product.id}`}
			className={cn(outOfStock && 'pointer-events-none cursor-not-allowed')}
		>
			<Card className="border-bg-800 border-2 hover:shadow-sm hover:shadow-accent cursor-pointer max-h-[400px] h-full">
				<CardHeader className="h-full max-h-24">
					<p className="font-semibold text-primary-100">{product.name}</p>
				</CardHeader>
				<CardContent>
					<div className="relative w-full rounded-md aspect-square bg-bg-800">
						<Image
							src={firstImage.url}
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
				<CardFooter className="flex items-center justify-between">
					<p className="text-xl font-bold text-accent">${product.price}</p>
					<Link
						href={`/products/${product.id}`}
						className={cn(
							'btn bg-accent text-bg hover:bg-accent/70',
							outOfStock && 'cursor-not-allowed bg-accent-700'
						)}
					>
						Comprar
					</Link>
				</CardFooter>
			</Card>
		</Redirecter>
	);
}
