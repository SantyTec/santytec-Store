import { NextResponse } from 'next/server';

import { getProductsForPDF } from '@/lib/controller/products';
import { generateCatalogPDF } from '@/lib/pdf/generator';

export async function GET() {
	try {
		const { products, error } = await getProductsForPDF();

		if (error || !products) throw new Error(error);

		const buffer = await generateCatalogPDF(products);

		return new NextResponse(buffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename=santytec-catalogo.pdf',
			},
		});
	} catch (error) {
		console.error('Error completo:', { error });
		return NextResponse.json(
			{ error: 'Error generando el catálogo PDF' },
			{ status: 500 }
		);
	}
}
