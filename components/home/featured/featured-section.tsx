import { Suspense } from 'react';

import GalleryWrapper from '@/components/home/featured/gallery-wrapper';
import { CarouselSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function FeaturedSection() {
	return (
		<section className="py-20 overflow-hidden relative">
			<div className="absolute inset-0 bg-linear-to-b from-blue-950/20 via-purple-950/20 to-bg pointer-events-none" />
			<div className="container relative z-10">
				{/* Header */}
				<div className="flex items-center justify-between mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-accent">
						Innovación Seleccionada
					</h2>
				</div>
				<Suspense fallback={<CarouselSkeleton />}>
					<GalleryWrapper />
				</Suspense>
				<div className="flex justify-center mt-12">
					<Button
						variant="outline"
						size="lg"
						asChild
						className="border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-300 group bg-transparent"
					>
						<Link href="/products">
							Ver Todo el Catálogo
							<ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
