import { RelatedProducts } from '@/components/products/related-products';
import { prisma } from '@/lib/client';

interface Props {
	categoryId: string;
	productId: string;
}

export async function RelatedProductsWrapper({ categoryId, productId }: Props) {
	const products = await prisma.product.findMany({
		where: { categoryId, isArchived: false },
		select: {
			id: true,
			slug: true,
			name: true,
			price: true,
			images: { select: { url: true }, take: 1 },
		},
	});

	const formattedProducts = products.map((product) => ({
		...product,
		price: product.price.toNumber(),
		image: product.images[0].url,
	}));

	const filteredProducts = formattedProducts.filter(
		(product) => product.id != productId
	);

	return <RelatedProducts products={filteredProducts} />;
}
