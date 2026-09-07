import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const CLOUDINARY_UPLOAD_MARKER = '/upload/';

// Cloudinary can resize/re-encode on the fly via URL transforms, so remote
// product images are handed to it directly instead of being downloaded and
// re-processed with sharp here. That avoids fetching full-size images (slow,
// and prone to ETIMEDOUT under the concurrency of a full catalog) and lets
// react-pdf fetch an already-small, CDN-cached image itself.
function getCloudinaryThumbnailUrl(
	url: string,
	{ width, height }: { width: number; height: number }
): string {
	const markerIndex = url.indexOf(CLOUDINARY_UPLOAD_MARKER);

	if (!url.includes('res.cloudinary.com') || markerIndex === -1) {
		return url;
	}

	const insertAt = markerIndex + CLOUDINARY_UPLOAD_MARKER.length;
	const transformation = `c_fit,f_jpg,h_${height},q_70,w_${width}/`;

	return `${url.slice(0, insertAt)}${transformation}${url.slice(insertAt)}`;
}

export async function optimizeImage(
	imageSource: string,
	isLocalFile: boolean = false
): Promise<string> {
	if (!isLocalFile) {
		return getCloudinaryThumbnailUrl(imageSource, { width: 300, height: 300 });
	}

	try {
		const publicDir = path.join(process.cwd(), 'public');
		const imagePath = path.join(publicDir, imageSource);
		const buffer = await fs.readFile(imagePath);

		const optimizedBuffer = await sharp(buffer)
			.resize(720, 1018, { fit: 'fill' })
			.jpeg({ quality: 100 })
			.toBuffer();

		return `data:image/jpeg;base64,${optimizedBuffer.toString('base64')}`;
	} catch (error) {
		console.error('Error optimizing local image:', error);
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
