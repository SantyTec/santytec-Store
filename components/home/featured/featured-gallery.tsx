'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { FullProduct } from '@/lib/types';

import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import CarouselCard from '@/components/carousel-card';
import { start } from 'repl';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FeaturedGallery({
	products,
}: {
	products: FullProduct[];
}) {
	const [api, setApi] = useState<CarouselApi>();
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsDesktop(window.innerWidth >= 768);
		};

		checkScreenSize();

		window.addEventListener('resize', checkScreenSize);

		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	const carouselOptions = isDesktop
		? {
				align: 'start' as const,
				loop: false,
				dragFree: true,
				watchDrag: true,
		  }
		: {
				align: 'start' as const,
				loop: false,
				dragFree: false,
				watchDrag: true,
				duration: 20,
		  };

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1, rootMargin: '50px' }
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

	return (
		<div>
			{products.length > 0 ? (
				<>
					<Carousel
						opts={carouselOptions}
						setApi={setApi}
						className="w-full"
						plugins={[WheelGesturesPlugin()]}
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
