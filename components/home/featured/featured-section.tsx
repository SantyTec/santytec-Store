import { Suspense } from 'react';

import GalleryWrapper from '@/components/home/featured/gallery-wrapper';
import { CarouselSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function FeaturedSection() {
	return (
		<section className="relative py-20 overflow-hidden" id='destacados'>
			<div className="absolute inset-0 pointer-events-none bg-linear-to-b from-blue-950/20 via-purple-950/20 to-bg" />
			<div className="container relative z-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<h2 className="text-4xl font-bold md:text-5xl text-accent font-accent">
						Innovación Seleccionada
					</h2>
				</div>
				<Suspense fallback={<CarouselSkeleton />}>
					<GalleryWrapper />
				</Suspense>
				<div className="flex justify-center mt-20 md:mt-12">
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
				</div>
			</div>
		</section>
	);
}
