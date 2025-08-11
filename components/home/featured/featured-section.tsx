import { Suspense } from 'react';

import GalleryWrapper from '@/components/home/featured/gallery-wrapper';
import { CarouselSkeleton } from '@/components/skeletons';
import Wrapper from '@/components/wrapper';

export default function FeaturedSection() {
	return (
		<Wrapper className="mx-[6rem] min-h-screen">
			<div className="flex flex-col text-center" id='destacados'>
				<h2 className="mb-3 text-4xl font-semibold uppercase text-accent-600 mx-4 font-accent">
					Productos destacados
				</h2>
				<h4 className="mt-0 mb-6">
					Echale un vistazo a nuestros mejores productos
				</h4>
				<Suspense fallback={<CarouselSkeleton />}>
					<GalleryWrapper />
				</Suspense>
			</div>
		</Wrapper>
	);
}
