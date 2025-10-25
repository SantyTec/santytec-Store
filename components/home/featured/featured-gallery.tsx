'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { FullProduct } from '@/lib/types';

import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import CarouselCard from '@/components/carousel-card';

export default function FeaturedGallery({
	products,
}: {
	products: FullProduct[];
}) {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		const container = scrollContainerRef.current;
		if (container) {
			observer.observe(container);
		}

		return () => {
			if (container) {
				observer.unobserve(container);
			}
		};
	}, []);

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
              loop: false,
              dragFree: true,
              containScroll: 'keepSnaps'
						}}
						setApi={setApi}
            className="w-full"
            plugins={[
              WheelGesturesPlugin()
            ]}
						ref={scrollContainerRef}
					>
						<CarouselContent className="-ml-6">
							{products.map((product, index) => (
								<CarouselItem key={product.id} className="pl-6 basis-[280px]">
									<CarouselCard
										isVisible={isVisible}
										index={index}
										product={product}
									/>
								</CarouselItem>
							))}
            </CarouselContent>
            
						<div className="hidden md:block absolute -top-8 right-14">
							<CarouselPrevious className="border-accent/50 hover:border-accent hover:bg-accent/10 transition-all -left-12" />
							<CarouselNext className="border-accent/50 hover:border-accent hover:bg-accent/10 transition-all -right-12" />
						</div>
					</Carousel>
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
