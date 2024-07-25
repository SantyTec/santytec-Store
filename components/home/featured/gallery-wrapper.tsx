import { getFeaturedProducts } from '@/lib/controller/products';

import FeaturedGallery from '@/components/home/featured/featured-gallery';

export default async function GalleryWrapper() {
	const products = await getFeaturedProducts();

	return <FeaturedGallery products={products} />;
}
