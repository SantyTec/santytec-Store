import sharp from 'sharp';

export async function optimizeImage(imageUrl: string): Promise<string> {
	try {
		const response = await fetch(imageUrl);
		const arrayBuffer = await response.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const optimizedBuffer = await sharp(buffer)
			.resize(300, 300, { fit: 'inside' })
			.jpeg({ quality: 70 })
			.toBuffer();

		return `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;
	} catch (error) {
		console.error('Error optimizing image:', error);
		return '/placeholder.png';
	}
}

export async function streamToBuffer(
	stream: NodeJS.ReadableStream
): Promise<Buffer> {
	try {
		const chunks: Buffer[] = [];

		for await (const chunk of stream) {
			chunks.push(Buffer.from(chunk));
		}

		return Buffer.concat(chunks);
	} catch (error) {
		console.error('Error en streamToBuffer:', error);
		throw error;
	}
}
