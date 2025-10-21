'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { syncCartToDb } from '@/lib/controller/cart';
import { CartProduct } from '@/lib/types';
import { useCartStore } from '@/providers/cart-store-provider';

import CartCard from '@/components/cart/cart-card';
import { Button } from '@/components/ui/button';

interface Props {
	isLoggedIn: boolean;
	initialItems?: CartProduct[] | null;
}

export default function CartList({ isLoggedIn, initialItems }: Props) {
	const { items, hydrateFromDB } = useCartStore((state) => state);
	const [isMerging, setIsMerging] = useState(true);

	useEffect(() => {
		async function mergeCart() {
			const localItems = items;
			const dbItems = initialItems || [];

			if (isLoggedIn) {
				if (localItems.length > 0 && dbItems.length > 0) {
					const merged = mergeCartItems(localItems, dbItems);
					hydrateFromDB(merged);
					await syncCartToDb(merged);
				} else if (localItems.length > 0 && dbItems.length === 0) {
					await syncCartToDb(localItems);
				} else if (localItems.length === 0 && dbItems.length > 0) {
					hydrateFromDB(dbItems);
				}
			}

			setIsMerging(false);
		}

		mergeCart();
	}, [isLoggedIn]);

	if (isMerging) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
			</div>
		);
	}

	if (items.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
				<ShoppingBag className="size-24 text-muted-foreground/40 mb-6" />
				<h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
				<p className="text-muted-foreground mb-8 max-w-md">
					Tu próxima compra comienza aquí
				</p>
				<Button asChild size="lg">
					<Link href="/products">Explorar Productos</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{!items || items.length === 0 ? (
				<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
					<ShoppingBag className="size-24 text-muted-foreground/40 mb-6" />
					<h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
					<p className="text-muted-foreground mb-8 max-w-md">
						Tu próxima compra comienza aquí
					</p>
					<Button
						asChild
						size="lg"
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<Link href="/products">Explorar Productos</Link>
					</Button>
				</div>
			) : (
				items.map((product) => <CartCard key={product.id} product={product} />)
			)}
		</div>
	);
}

function mergeCartItems(
	localItems: CartProduct[],
	dbItems: CartProduct[]
): CartProduct[] {
	const itemsMap = new Map<string, CartProduct>();

	dbItems.forEach((item) => {
		itemsMap.set(item.id, item);
	});

	localItems.forEach((localItem) => {
		const existing = itemsMap.get(localItem.id);

		if (existing) {
			itemsMap.set(localItem.id, {
				...existing,
				quantity: Math.max(existing.quantity, localItem.quantity),
			});
		} else {
			itemsMap.set(localItem.id, localItem);
		}
	});

	return Array.from(itemsMap.values());
}
