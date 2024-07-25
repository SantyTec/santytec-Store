'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FullProduct } from '@/lib/types';

import ProductCard from '@/components/product-card';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';

export default function FeaturedGallery({
	products,
}: {
	products: FullProduct[];
}) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div>
			{products.length > 0 ? (
				<>
					<Carousel
						opts={{
							align: 'start',
						}}
						setApi={setApi}
						className="w-full min-h-screen"
					>
						<CarouselContent>
							{products.map((product) => (
								<CarouselItem
									key={product.id}
									className="basis-full md:basis-1/3 lg:basis-1/4"
								>
									<ProductCard product={product} />
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel>
					<div className="py-2 text-sm text-center text-muted-foreground">
						Página {current} de {count}
					</div>
				</>
			) : (
				<>
					<h2>Ingresa más tarde para conocer nuestro productos destacados.</h2>
					<p>Ahora te invitamos a ver el catálogo completo.</p>
					<Link href="/products" className="btn btn--accent">
						Ver Catálogo
					</Link>
				</>
			)}
		</div>
	);
}
