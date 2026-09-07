import type { ImageLoaderProps } from 'next/image';

const CLOUDINARY_UPLOAD_MARKER = '/upload/';

// Cloudinary already resizes/re-encodes images on the fly via URL params, so
// this loader asks Cloudinary for the exact size/quality next/image needs
// instead of letting Vercel's own Image Optimization pipeline re-process the
// same image (which is what was driving up Vercel's image-optimization
// usage). Anything that isn't a Cloudinary upload URL — local assets, OAuth
// avatar URLs, etc. — is returned unchanged and served as-is.
export default function cloudinaryLoader({
	src,
	width,
	quality,
}: ImageLoaderProps) {
	const markerIndex = src.indexOf(CLOUDINARY_UPLOAD_MARKER);

	if (!src.includes('res.cloudinary.com') || markerIndex === -1) {
		// Not a Cloudinary asset (local /public file, OAuth avatar, etc.) —
		// nothing to transform. The URL still needs to vary with `width`,
		// otherwise Next.js warns that this loader ignores its width
		// argument; the param is inert for local files and harmless for
		// third-party hosts that don't recognize it.
		const separator = src.includes('?') ? '&' : '?';
		return `${src}${separator}w=${width}`;
	}

	const insertAt = markerIndex + CLOUDINARY_UPLOAD_MARKER.length;
	const transformation = `f_auto,q_${quality ?? 'auto'},w_${width}/`;

	return `${src.slice(0, insertAt)}${transformation}${src.slice(insertAt)}`;
}
