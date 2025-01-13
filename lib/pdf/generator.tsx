import ReactPDF from '@react-pdf/renderer';

import { optimizeImage, streamToBuffer } from '@/lib/pdf/utils';
import { FullProduct } from '@/lib/types';

import { CatalogDocument } from '@/components/pdf';

export async function generateCatalogPDF(products: FullProduct[]) {
	try {
		const optimizedCoverUrl = await optimizeImage(
			'/santytec-catalogo.png',
			true
		);

		const preparedProducts = await Promise.all(
			products.map(async (product) => ({
				...product,
				optimizedImageUrl: product.images[0]?.url
					? await optimizeImage(product.images[0].url)
					: '/placeholder.png',
			}))
		);

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
