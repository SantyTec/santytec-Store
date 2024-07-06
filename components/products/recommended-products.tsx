import { notFound } from 'next/navigation';

import { getRecommendedProducts } from '@/lib/model/products';

import NoResults from '@/components/no-results';
import ProductCard from '@/components/product-card';

interface Props {
	categoryId: string;
}

export default async function RecommendedProducts({ categoryId }: Props) {
	const products = await getRecommendedProducts(categoryId);

	if (!products) notFound();

	return (
		<>
			{products.length === 0 && <NoResults />}
			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{products.map((product) => {
					const formattedProduct = {
						...product,
						price: product.price.toNumber(),
					};

					return <ProductCard key={product.id} product={formattedProduct} />;
				})}
			</div>
		</>
	);
}
