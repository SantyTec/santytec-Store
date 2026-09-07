import ReactPDF from '@react-pdf/renderer';

import { optimizeImage, streamToBuffer } from '@/lib/pdf/utils';
import { FullProduct, ProductsByCategory, } from '@/lib/types';

import { CatalogDocument } from '@/components/pdf';
import { groupBy } from 'typedash';

async function prepareProducts(products: FullProduct[]): Promise<ProductsByCategory[]> {
	const productsWithImages = await Promise.all(
		products.map(async (product) => ({
			...product,
			optimizedImageUrl: await optimizeImage(product.images[0].url),
		}))
	);

	const groupedProducts = groupBy(
		productsWithImages,
		(product) => product.category.name
	);

	return Object.entries(groupedProducts).map(([categoryName, products]) => {
		if (!products) throw new Error();
		return { category: categoryName, products };
	});
}

export async function generateCatalogPDF(products: FullProduct[]) {
	try {
		const optimizedCoverUrl = await optimizeImage(
			'/santytec-catalogo.png',
			true
		);

		const preparedProducts = await prepareProducts(products);

		const stream = await ReactPDF.renderToStream(
			<CatalogDocument
				products={preparedProducts}
				optimizedCoverUrl={optimizedCoverUrl}
			/>
		);

		return await streamToBuffer(stream);
	} catch (error) {
		console.error('Error generating PDF:', error);
		throw error;
	}
}
