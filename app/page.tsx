import HeroSection from '@/components/home/hero/hero';
import FeaturedSection from '@/components/home/featured/featured-section';

export default function Home() {
	return (
		<main className="relative">
			<div className="min-h-screen pb-10 mb-10">
				<HeroSection />
			</div>
			<FeaturedSection />
		</main>
	);
}
