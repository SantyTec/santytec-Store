import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function optimizeImage(
	imageSource: string,
	isLocalFile: boolean = false
): Promise<string> {
	try {
		let buffer: Buffer;

		if (isLocalFile) { 
			const publicDir = path.join(process.cwd(), 'public');
			const imagePath = path.join(publicDir, imageSource);
			buffer = await fs.readFile(imagePath);
		} else {
			const response = await fetch(imageSource);
			const arrayBuffer = await response.arrayBuffer();
			buffer = Buffer.from(arrayBuffer);
		}
		
		const optimizationConfig = isLocalFile
			? {
					width: 720, 
					height: 1018,
					fit: 'fill' as const,
					quality: 100,
			  }
			: {
					width: 300,
					height: 300,
					fit: 'inside' as const,
					quality: 70,
			  };

		const optimizedBuffer = await sharp(buffer)
			.resize(optimizationConfig.width, optimizationConfig.height, {
				fit: optimizationConfig.fit,
			})
			.jpeg({ quality: optimizationConfig.quality })
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
