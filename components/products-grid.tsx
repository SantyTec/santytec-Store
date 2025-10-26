import { notFound } from 'next/navigation';

import {
	getProductsByCategory,
	getRecommendedProducts,
} from '@/lib/model/products';

import NoResults from '@/components/no-results';
import ProductCard from '@/components/product-card';
import { RelatedProducts } from '@/components/products/related-products';

interface Props {
	categoryId: string;
}

export default async function ProductsGrid({ categoryId }: Props) {
	const products = await getProductsByCategory(categoryId);

	if (!products || typeof products === 'undefined') notFound();

	return (
		<>
			{products.length === 0 && <NoResults />}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{products.map((product) => {
					const formattedProduct = {
						...product,
						price: product.price.toFixed(),
					};

					return <ProductCard key={product.id} product={formattedProduct} />;
				})}
			</div>
		</>
	);
}
