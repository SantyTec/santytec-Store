'use client';

import { Card } from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/providers/cart-store-provider';
import { ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DesktopDetail() {
	const { items: cartItems } = useCartStore((state) => state);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<div className="hidden lg:block">
			<Card className="sticky top-24 p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">Resumen</h2>
					<Link
						href="/cart"
						className="text-sm text-primary hover:underline flex items-center gap-1"
					>
						<ChevronLeft className="h-4 w-4" />
						Editar carrito
					</Link>
				</div>

				<div className="space-y-3 mb-4">
					{cartItems.map((item) => (
						<div key={item.id} className="flex justify-between text-sm">
							<span className="text-muted-foreground truncate pr-2">
								{item.name} × {item.quantity}
							</span>
							<span className="font-medium whitespace-nowrap">
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					))}
				</div>

				<Separator className="my-4" />

				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Subtotal</span>
						<span className="font-medium">${subtotal.toFixed(2)}</span>
					</div>
					{/* {discount > 0 && (
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Descuento</span>
							<span className="font-medium text-green-600">
								-${discount.toFixed(2)}
							</span>
						</div>
					)} */}
				</div>

				<Separator className="my-4" />

				<div className="flex justify-between items-center">
					<span className="font-semibold text-lg">Total</span>
					<span className="text-2xl font-bold text-primary">
						${subtotal.toFixed(2)}
					</span>
				</div>
			</Card>
		</div>
	);
}

export function MobileDetail() {
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const { items: cartItems } = useCartStore((state) => state);

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	return (
		<div className="lg:hidden">
			<Collapsible open={isDetailOpen} onOpenChange={setIsDetailOpen}>
				<Card className="p-4">
					<CollapsibleTrigger className="flex items-center justify-between w-full">
						<div className="flex items-center gap-2">
							<span className="font-semibold">Resumen del pedido</span>
							{isDetailOpen ? (
								<ChevronUp className="h-4 w-4" />
							) : (
								<ChevronDown className="h-4 w-4" />
							)}
						</div>
						<span className="text-xl font-bold text-primary">
							${subtotal.toFixed(2)}
						</span>
					</CollapsibleTrigger>

					<CollapsibleContent className="mt-4">
						<div className="space-y-3 mb-4">
							{cartItems.map((item) => (
								<div key={item.id} className="flex justify-between text-sm">
									<span className="text-muted-foreground truncate pr-2">
										{item.name} × {item.quantity}
									</span>
									<span className="font-medium whitespace-nowrap">
										${(item.price * item.quantity).toFixed(2)}
									</span>
								</div>
							))}
						</div>

						<Separator className="my-4" />

						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">Subtotal</span>
								<span className="font-medium">${subtotal.toFixed(2)}</span>
							</div>
							{/* {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Descuento</span>
                        <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                      </div>
                    )} */}
							{/* <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-medium text-green-600">Gratis</span>
                    </div> */}
						</div>

						<Link
							href="/cart"
							className="text-sm text-primary hover:underline flex items-center gap-1 mt-4"
						>
							<ChevronLeft className="h-4 w-4" />
							Editar carrito
						</Link>
					</CollapsibleContent>
				</Card>
			</Collapsible>
		</div>
	);
}
