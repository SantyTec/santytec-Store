import { prisma } from '@/lib/client';

export async function getImagesByProductId(productId: string) {
	try {
		const images = await prisma.image.findMany({
			where: {
				productId,
			},
		});

		return images;
	} catch (error) {
		console.error('Error al obtener las imágenes del producto:', error);

		return;
	}
}
