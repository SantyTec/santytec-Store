import { FullProduct } from '@/lib/types';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import Redirecter from './redirecter';

interface Props {
	product: FullProduct;
}

export default function ProductCard({ product }: Props) {
	const firstImage = product.images[0];

	return (
		<Redirecter href={`/products/${product.id}`}>
			<Card className="border-bg-800 border-2 hover:shadow-sm hover:shadow-accent cursor-pointer max-h-[400px] h-full">
				<CardHeader className="h-full max-h-20">
					<p className="font-semibold text-primary-100">{product.name}</p>
				</CardHeader>
				<CardContent>
					<div className="relative aspect-square w-full bg-bg-800 rounded-md">
						<Image
							src={firstImage.url}
							className="object-contain rounded-md aspect-square"
							alt={product.name}
							fill
						/>
					</div>
				</CardContent>
				<CardFooter className="flex items-center justify-between">
					<p className="text-accent font-bold text-xl">${product.price}</p>
					<Link
						href={`/products/${product.id}`}
						className="btn bg-accent text-bg hover:bg-accent/70"
					>
						Comprar
					</Link>
				</CardFooter>
			</Card>
		</Redirecter>
	);
}
