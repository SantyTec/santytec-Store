import HeroSection from '@/components/home/hero/hero';
import FeaturedSection from '@/components/home/featured/featured-section';
import ContactSection from '@/components/home/contact/contact-section';

export default function Home() {
	return (
		<main className="relative pb-24 lg:pb-0">
			<div className="min-h-screen pb-10 mb-10">
				<HeroSection />
			</div>
			<FeaturedSection />
			<section className="mt-12 lg:mt-6">
				<ContactSection />
			</section>
		</main>
	);
}
