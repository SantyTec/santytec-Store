import Link from 'next/link';

import BgAnimation from '@/components/home/hero/bg-animation';
import MouseAnimation from '@/components/home/hero/mouse-animation';

export default function HeroSection() {
	return (
		<section className="flex flex-col items-center justify-center h-screen text-center group">
			<BgAnimation />
			<MouseAnimation />
			<p className="text-xl text-accent-800">
				Encontrá los mejores productos en...
			</p>
			<h1 className="mb-12 text-8xl lg:text-9xl text-accent font-bold">
				Roma <br /> Technology
			</h1>
			<Link
				href="/products"
				className="btn bg-accent text-bg hover:bg-accent/80 z-10"
			>
				Comprar ahora
			</Link>
		</section>
	);
}
