'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

interface Props {
	products: Array<{
		id: string;
		name: string;
		price: number;
		image: string;
	}>;
}

export function RelatedProducts({ products }: Props) {
	return (
		<div className="space-y-6">
			<Carousel
				opts={{
					align: 'start',
					loop: false,
				}}
				className="w-full"
			>
				<CarouselContent className="py-2 -ml-4">
					{products.map((product) => (
						<CarouselItem key={product.id} className="pl-4 basis-64">
							<Link href={`/products/${product.id}`} className="block group">
								<Card className="min-h-[360px] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
									<div className="relative aspect-square bg-muted">
										<Image
											src={product.image || '/placeholder.svg'}
											alt={product.name}
											fill
											className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<div className="p-4 space-y-2">
										<h3 className="font-semibold transition-colors line-clamp-2 group-hover:text-accent">
											{product.name}
										</h3>
										<p className="text-xl font-bold text-accent">
											${product.price.toFixed(2)}
										</p>
									</div>
								</Card>
							</Link>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="absolute hidden md:block right-12 -top-7">
					<CarouselPrevious className="rounded-full hover:bg-tertiary hover:text-bg" />
					<CarouselNext className="rounded-full hover:bg-tertiary hover:text-bg" />
				</div>
			</Carousel>
		</div>
	);
}
