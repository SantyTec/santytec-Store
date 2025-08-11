import Image from 'next/image';
import Link from 'next/link';

import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
	return (
		<section className="min-h-[80dvh] pb-10 mb-4 bg-gradient-to-b from-[#f5f5f5]/20 to-bg">
			<div className="container relative px-4 py-12 md:px-6 md:py-24 lg:py-32">
				<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
					<div className="space-y-6 self-baseline">
						<div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1">
							<div className="flex gap-1">
								{' '}
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-primary text-primary"
										aria-hidden="true"
									/>
								))}
							</div>
							<span className="text-sm font-medium">
								+1000 clientes satisfechos
							</span>
						</div>
						<div className="space-y-4">
							<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"'>
								Tu tecnología,{' '}
								<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
									al mejor precio
								</span>
							</h1>
							<p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
								Descubre nuestra variada colección de accesorios y productos
								tecnológicos. Calidad garantizada y los mejores precios
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Link
                href="#destacados"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 text-base font-medium text-accent-950 shadow transition-colors hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent duration-200"
							>
								Comprar ahora
							</Link>
							<Link
								href="/products"
								className="inline-flex h-12 items-center justify-center rounded-lg border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors duration-200 hover:bg-primary hover:text-accent-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								Ver catálogo
							</Link>
						</div>
						<div className="flex items-center gap-4 pt-4">
							<Badge variant="secondary" className="px-4 py-2">
								Múltiples métodos de pago
							</Badge>
							<Badge variant="secondary" className="px-4 py-2">
								Atención personalizada
							</Badge>
							<Badge variant="secondary" className="px-4 py-2">
								Precios accesibles
							</Badge>
						</div>
					</div>
					<div className="relative mx-auto aspect-square w-full max-w-[500px] lg:ml-auto">
						<div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-accent/60 to-secondary/90 rounded-full blur-3xl"></div>
						<Image
							alt="Persona usando auriculares premium"
							src="/hero.webp"
							className="relative z-10 animate-float rounded-2xl object-cover"
							width={600}
							height={600}
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
