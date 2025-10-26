'use client';

import Link from 'next/link';

import { FullProduct } from '@/lib/types';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import CarouselCard from '@/components/carousel-card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FeaturedGallery({
	products,
}: {
	products: FullProduct[];
}) {
	return (
		<div>
			{products.length > 0 ? (
				<>
					<Carousel className="w-full" opts={{ duration: 20 }}>
						<CarouselContent className="-ml-6">
							{products.map((product, index) => (
								<CarouselItem key={product.id} className="pl-6 basis-[280px]">
									<CarouselCard index={index} product={product} />
								</CarouselItem>
							))}
						</CarouselContent>

						<div className="absolute -bottom-8 right-1/2 md:-top-8 md:right-14">
							<CarouselPrevious className="transition-all border-accent/50 hover:border-accent hover:bg-accent/10 -left-12" />
							<CarouselNext className="transition-all border-accent/50 hover:border-accent hover:bg-accent/10 -right-12" />
						</div>
					</Carousel>
				</>
			) : (
				<>
					<h2>Ingresa más tarde para conocer nuestro productos destacados.</h2>
					<p>Ahora te invitamos a ver el catálogo completo.</p>
					<Button
						variant="outline"
						size="lg"
						asChild
						className="transition-all duration-300 bg-transparent border-accent text-accent hover:bg-accent hover:text-bg group"
					>
						<Link href="/products">
							Ver Todo el Catálogo
							<ChevronRight className="w-5 h-5 ml-2 transition-transform transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</>
			)}
		</div>
	);
}
