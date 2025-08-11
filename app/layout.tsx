import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Onest } from 'next/font/google';

import './globals.css';
import { CartStoreProvider } from '@/providers/cart-store-provider';
import GReCaptchaProvider from '@/providers/g-recaptcha-provider';
import ToastProvider from '@/providers/toast-provider';

import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer';
import { Suspense } from 'react';
import { NavbarSkeleton } from '@/components/skeletons';

if (!process.env.FRONTEND_STORE_URL) {
	throw new Error('FRONTEND_STORE_URL is not defined');
}

const onest = Onest({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-onest',
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.FRONTEND_STORE_URL),
	title: 'Santy Tec - Accesorios de Tecnología y Electrónica',
	description:
		'Santy Tec - Tienda online de accesorios de tecnología y electrónica. Encuentra auriculares manos libres, cables USB, cargadores, iluminación para fiestas, adaptadores, artículos para camping, electrodomésticos, juegos y entretenimiento, parlantes Bluetooth, memorias SD, y mucho más.',
	keywords:
		'Santy Tec, accesorios tecnología, accesorios electrónicos, auriculares, cables USB, cargadores, iluminación, adaptadores, camping, electrodomésticos, juegos, parlantes Bluetooth, memorias SD, pilas, baterías, santy tec plottier, santy tec argentina, electronica plottier, electronica argentina, accesorios online, santy tec plottier online',
	openGraph: {
		title: 'Santy Tec - Accesorios de Tecnología y Electrónica',
		description:
			'Santy Tec - Tienda online de accesorios de tecnología y electrónica. Encuentra auriculares manos libres, cables USB, cargadores, iluminación para fiestas, adaptadores, artículos para camping, electrodomésticos, juegos y entretenimiento, parlantes Bluetooth, memorias SD, y mucho más.',
		images: [
			{
				url: '/opengraph-image.png',
				width: 512,
				height: 512,
				alt: 'Santy Tec - Accesorios de Tecnología y Electrónica',
			},
		],
	},
	alternates: {
		canonical: '/',
	},
	icons: [
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '192x192',
			url: '/android-chrome-192x192.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '512x512',
			url: '/android-chrome-512x512.png',
		},
	],
	manifest: '/manifest.json',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body className={`${GeistSans.variable} ${onest.variable}`}>
				<GReCaptchaProvider>
					<CartStoreProvider>
						<Suspense fallback={<NavbarSkeleton />}>
							<Navbar />
						</Suspense>
						<ToastProvider />
						{children}
						<Footer />
					</CartStoreProvider>
				</GReCaptchaProvider>
				<Analytics />
			</body>
		</html>
	);
}
