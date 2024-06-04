import NextImage from 'next/image';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { getImagesByProductId } from '@/lib/data/images';
import { notFound } from 'next/navigation';

interface Props {
	id: string;
}

export default async function Gallery({ id }: Props) {
	const images = await getImagesByProductId(id);

	if (!images) notFound();

	return (
		<Carousel
			className="lg:h-[calc(100dvh_-_10rem)] aspect-square mx-auto"
			opts={{ loop: true }}
		>
			<CarouselContent>
				{images.map((image) => (
					<CarouselItem key={image.id}>
						<div className="relative bg-bg-800 lg:h-full aspect-square rounded-md">
							<NextImage
								src={image.url}
								alt="Imagen de producto"
								fill
								className="object-contain"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{images.length > 1 && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
		</Carousel>
	);
}
