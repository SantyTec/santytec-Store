'use client';

import { Frown } from 'lucide-react';
import Link from 'next/link';

import { useCartStore } from '@/providers/cart-store-provider';

import CartCard from '@/components/cart/cart-card';

export default function CartList() {
	const cart = useCartStore((state) => state);
	const isCartEmpty = cart.items.length === 0;

	return (
		<main>
			{isCartEmpty ? (
				<div className="flex h-full text-gray-400 flex-col items-center justify-center gap-2">
					<Frown className="size-10" />
					<p>Oops! Parece que no hay productos en tu carrito</p>
					<Link
						href="/products"
						className="btn bg-accent text-bg hover:bg-accent-600 px-6 py-4 text-2xl"
					>
						Ir a la tienda
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-[1fr_450px] gap-x-6 gap-y-8">
					<section>
						{cart.items.map((item) => (
							<CartCard product={item} key={item.id} />
						))}
					</section>
					{/* TODO: Checkout Form */}
				</div>
			)}
		</main>
	);
}
