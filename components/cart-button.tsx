'use client';

import Link from 'next/link';

import { useCartStore } from '@/providers/cart-store-provider';

import { ShoppingCart } from 'lucide-react';

export default function CartButton() {
	const { items } = useCartStore((state) => state);

	return (
		<Link
			href="/cart"
			className="flex items-center rounded-full bg-bg btn text-secondary shrink hover:bg-secondary hover:text-bg outline"
		>
			<ShoppingCart className="size-6" />
			<span className="sr-only">Ítems en el Carrito</span>
			<span className="font-semibold ml-3">{items.length}</span>
		</Link>
	);
}
