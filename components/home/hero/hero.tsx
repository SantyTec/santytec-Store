import Image from 'next/image';
import Link from 'next/link';

import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function HeroSection() {
	return (
		<section className="min-h-[80dvh] pb-10 mb-4 bg-linear-to-b from-[#f5f5f5]/20 to-bg">
			<div className="container relative px-4 py-12 md:px-6 md:py-24 lg:py-32">
				<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
					<div className="space-y-6 self-baseline">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
							<div className="flex gap-1">
								{' '}
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="w-4 h-4 fill-accent text-accent"
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
								<span className="text-transparent bg-linear-to-r from-accent via-tertiary to-primary bg-clip-text">
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
								className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-colors duration-200 rounded-lg shadow-sm bg-accent text-accent-950 hover:bg-accent/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
							>
								Comprar ahora
							</Link>
							<Link
								href="/products"
								className="inline-flex items-center justify-center h-12 px-8 text-base font-medium transition-colors duration-200 border rounded-lg shadow-xs border-input bg-background hover:bg-tertiary hover:text-accent-950 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
							>
								Ver catálogo
							</Link>
						</div>
						<div className="flex flex-wrap items-center gap-4 pt-4">
							<Badge variant="secondary" className="px-4 py-2 pointer-events-none bg-bg-700 md:bg-bg-800 text-secondary">
								Múltiples métodos de pago
							</Badge>
							<Badge variant="secondary" className="px-4 py-2 pointer-events-none bg-bg-700 md:bg-bg-800 text-secondary">
								Atención personalizada
							</Badge>
							<Badge variant="secondary" className="px-4 py-2 pointer-events-none bg-bg-700 md:bg-bg-800 text-secondary">
								Precios accesibles
							</Badge>
						</div>
					</div>
					<div className="relative mx-auto aspect-square w-full max-w-[500px] lg:ml-auto">
						<div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary/80 via-accent/60 to-secondary/90 blur-3xl"></div>
						<Image
							alt="Persona usando auriculares premium"
							src="/hero.webp"
							className="relative z-10 object-cover animate-float rounded-2xl"
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
