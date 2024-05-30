import Link from 'next/link';

import BgAnimation from '@/components/home/hero/bg-animation';
import MouseAnimation from '@/components/home/hero/mouse-animation';

export default function HeroSection() {
	return (
		<section className="absolute flex flex-col items-center justify-center w-full h-screen text-center group">
			<BgAnimation />
			<MouseAnimation />
			<p className="text-xl text-accent-800">
				Encontrá los mejores productos en...
			</p>
			<h1 className="mb-12 font-bold text-7xl md:text-9xl text-accent">
				Roma <br /> Technology
			</h1>
			<Link
				href="/products"
				className="z-10 btn bg-accent text-bg hover:bg-accent/80"
			>
				Comprar ahora
			</Link>
		</section>
	);
}
