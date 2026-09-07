/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: 'custom',
		loaderFile: './lib/cloudinary-image-loader.ts',
	},
};

export default nextConfig;
