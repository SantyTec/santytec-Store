'use client';

import { useCartStore } from '@/providers/cart-store-provider';

import CartCard from '@/components/cart/cart-card';

export default function CartList() {
	const { items } = useCartStore((state) => state);

	return (
		<section className="w-full">
			{items.map((item) => (
				<CartCard product={item} key={item.id} />
			))}
		</section>
	);
}
