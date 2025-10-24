'use client';

import Link from 'next/link';

import { useCartStore } from '@/providers/cart-store-provider';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CartButton() {
	const { items } = useCartStore((state) => state);

	return (
		<Button asChild className="relative" size="icon" variant="ghost">
			<Link href="/cart">
				<ShoppingCart className="size-5" />
				{items.length > 0 && (
					<Badge
						variant="secondary"
						className="absolute -right-1 -top-1 size-5 rounded-full p-0 text-xs flex items-center justify-center"
					>
						{items.length}
					</Badge>
				)}
				<span className="sr-only">Carrito de Compras</span>
			</Link>
		</Button>
	);
}
