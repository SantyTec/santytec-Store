'use client';

import NextImage from 'next/image';
import { Image } from '@prisma/client';
import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel';

export default function GalleryClient({ images }: { images: Image[] }) {
	const [selectedImage, setSelectedImage] = useState(0);
	const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
	const [isZooming, setIsZooming] = useState(false);
	const imageRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!imageRef.current) return;

		const rect = imageRef.current.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setZoomPosition({ x, y });
	};

	return (
		<div className="space-y-4">
			<div
				ref={imageRef}
				className="relative w-full overflow-hidden aspect-square rounded-3xl bg-gradient-to-br from-muted/50 to-muted cursor-crosshair"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
					backgroundSize: '200px 200px',
				}}
				onMouseEnter={() => setIsZooming(true)}
				onMouseLeave={() => setIsZooming(false)}
				onMouseMove={handleMouseMove}
			>
				<NextImage
					src={images[selectedImage]?.url || '/placeholder.svg'}
					alt="Imagen del producto"
					fill
					className="object-contain p-8 transition-transform duration-300"
					style={{
						transform: isZooming ? `scale(1.5)` : 'scale(1)',
						transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
					}}
					priority
				/>

				{isZooming && (
					<div
						className="absolute w-32 h-32 border-2 border-white rounded-full shadow-xl pointer-events-none"
						style={{
							left: `${zoomPosition.x}%`,
							top: `${zoomPosition.y}%`,
							transform: 'translate(-50%, -50%)',
							background:
								'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
						}}
					/>
				)}
			</div>

			<Carousel className="w-full" opts={{ align: 'start', loop: false }}>
				<CarouselContent className="pb-1 -ml-3">
					{images.map((image, index) => (
						<CarouselItem
							key={image.id}
							className="pt-3 pl-6 basis-24 md:basis-28"
						>
							<button
								onClick={() => setSelectedImage(index)}
								className={cn(
									'relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden transition-all duration-300',
									'hover:scale-105 hover:shadow-lg active:scale-95',
									selectedImage === index
										? 'ring-4 ring-accent shadow-xl scale-105'
										: 'ring-2 ring-border opacity-60 hover:opacity-100'
								)}
							>
								<NextImage
									src={image.url}
									alt="Imagen de producto"
									fill
									className="object-contain p-2"
								/>
							</button>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
}
