import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Onest } from 'next/font/google';

import './globals.css';
import { CartStoreProvider } from '@/providers/cart-store-provider';
import GReCaptchaProvider from '@/providers/g-recaptcha-provider';
import ToastProvider from '@/providers/toast-provider';

import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer';

const onest = Onest({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-onest',
});

export const metadata: Metadata = {
	title: 'Santy Tec - Accesorios de Tecnología y Electrónica',
	description:
		'Santy Tec - Tienda online de accesorios de tecnología y electrónica. Encuentra auriculares manos libres, cables USB, cargadores, iluminación para fiestas, adaptadores, artículos para camping, electrodomésticos, juegos y entretenimiento, parlantes Bluetooth, memorias SD, y mucho más.',
	keywords:
		'Santy Tec, accesorios tecnología, accesorios electrónicos, auriculares, cables USB, cargadores, iluminación, adaptadores, camping, electrodomésticos, juegos, parlantes Bluetooth, memorias SD, pilas, baterías',
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
						<Navbar />
						<ToastProvider />
						{children}
						<Footer />
					</CartStoreProvider>
				</GReCaptchaProvider>
			</body>
		</html>
	);
}
