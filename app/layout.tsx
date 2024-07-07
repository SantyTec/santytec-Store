import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Onest } from 'next/font/google';

import './globals.css';
import { CartStoreProvider } from '@/providers/cart-store-provider';
import GReCaptchaProvider from '@/providers/g-recaptcha-provider';
import ToastProvider from '@/providers/toast-provider';

import Navbar from '@/components/navbar/navbar';

const onest = Onest({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-onest',
});

export const metadata: Metadata = {
	title: 'RomaTechnology',
	description: 'En RomaTechnology encontrarás los mejores productos.',
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
					</CartStoreProvider>
				</GReCaptchaProvider>
			</body>
		</html>
	);
}
