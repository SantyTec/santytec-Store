import { auth } from '@/auth';
import { CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

import { loadCartFromDB } from '@/lib/controller/cart';

import CartList from '@/components/cart/cart-list';
import { DesktopSummary, MobileSummary } from '@/components/cart/summaries';

export const metadata: Metadata = {
	title: 'Carrito de Compras - Santy Tec',
	description:
		'Revisa los productos en tu carrito de compras en Santy Tec. Completa tu pedido y disfruta de nuestros accesorios de tecnología y electrónica.',
};

export default async function CartPage() {
	const session = await auth();
	const isLoggedIn = !!session?.user;

	const cartItems = await loadCartFromDB();

	return (
		<main className="relative min-h-screen flex flex-col bg-background">
			<div className="flex-1 container px-4 py-8 md:px-6 lg:py-12">
				<div className="grid gap-8 lg:grid-cols-[1fr_380px]">
					<div className="space-y-6">
						<div className="flex flex-col items-start justify-between">
							<h1 className="text-3xl font-bold tracking-tight">
								Carrito de Compras
							</h1>
							{isLoggedIn && (
								<div className="flex items-center gap-2 text-sm text-green-600 transition-opacity duration-300">
									<CheckCircle2 className="h-4 w-4" />
									<span>Carrito guardado</span>
								</div>
							)}
						</div>

						<CartList isLoggedIn={isLoggedIn} initialItems={cartItems} />
					</div>
					<DesktopSummary />
				</div>
			</div>
			<MobileSummary />
		</main>
	);
}
