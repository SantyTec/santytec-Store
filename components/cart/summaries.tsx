'use client';

import Link from 'next/link';

import { useCartStore } from '@/providers/cart-store-provider';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function DesktopSummary() {
	const { items } = useCartStore((state) => state);

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		totalItems > 0 && (
			<div className="hidden lg:block">
				<Card className="sticky top-24 p-6 bg-bg-800">
					<h2 className="text-lg font-semibold mb-4">Resumen del Pedido</h2>
					<div className="space-y-3">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">
								Subtotal ({totalItems} items)
							</span>
							<span className="font-medium">${total}</span>
						</div>
						{/* <div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Envío</span>
						<span className="font-medium text-green-600">Gratis</span>
					</div> */}
						<Separator />
						<div className="flex justify-between">
							<span className="font-semibold">Total</span>
							<span className="text-2xl font-bold text-primary">${total}</span>
						</div>
					</div>
					<Button
						asChild
						size="lg"
						className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<Link href="/checkout">Proceder al Pago</Link>
					</Button>
					{/* <p className="text-xs text-center text-muted-foreground mt-4">
					Envío gratis en todos los pedidos
				</p> */}
				</Card>
			</div>
		)
	);
}

export function MobileSummary() {
	const { items } = useCartStore((state) => state);

	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		totalItems > 0 && (
			<div className="lg:hidden sticky bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg bg-bg-800">
				<div className="container">
					<div className="flex items-center justify-between mb-3">
						<div>
							<p className="text-sm text-muted-foreground">
								{totalItems} items
							</p>
							<p className="text-xl font-bold text-primary">${total}</p>
						</div>
						<Button
							asChild
							size="lg"
							className="bg-primary text-primary-foreground hover:bg-primary/90"
						>
							<Link href="/checkout">Proceder al Pago</Link>
						</Button>
					</div>
				</div>
			</div>
		)
	);
}
