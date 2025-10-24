'use client';

import { Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useState } from 'react';

import { FullProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/providers/cart-store-provider';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddToCart({
	item,
	showQuantityInput = false,
	className,
	text,
	onAddToCart,
}: {
	item: FullProduct;
	showQuantityInput?: boolean;
	className?: string;
	text?: string;
	onAddToCart?: () => void;
}) {
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCartStore((state) => state);

	const outOfStock = item.stock === 0;

	function onAdd(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();

		addItem({
			...item,
			quantity,
			image: item.images[0]?.url || '',
			price: Number(item.price),
		});

		onAddToCart?.();
	}

	function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
		setQuantity(event.target.valueAsNumber);
	}

	return (
		<div className="flex flex-col w-full gap-y-4">
			{showQuantityInput && (
				<div className="flex items-center justify-between">
					<label htmlFor="quantity" className="font-semibold">
						Cantidad
					</label>
					<Input
						className="block p-2.5 w-36 border-none text-txt-300 text-center rounded-md bg-primary-50/10"
						defaultValue={1}
						min={1}
						name="quantity"
						onChange={handleInput}
						type="number"
					/>
				</div>
			)}
			<Button
				onClick={onAdd}
				className={cn(
					'inline-flex text-xl text-black rounded-md bg-linear-to-br from-accent-300 to-accent-500 gap-x-3 hover:to-accent-300 hover:shadow-[0px_22px_43px_-25px] hover:shadow-accent-800',
					outOfStock && 'cursor-not-allowed bg-accent-700',
					className
				)}
			>
				<ShoppingCart className="size-6" />
				{text ?? 'Añadir al carrito'}
			</Button>
		</div>
	);
}

export function DeleteFromCart({
	id,
	className,
}: {
	id: string;
	className?: string;
}) {
	const { removeItem } = useCartStore((state) => state);

	function onDelete(event: React.MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();

		removeItem(id);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-8 text-muted-foreground hover:bg-red-900 hover:text-destructive-foreground"
			onClick={onDelete}
		>
			<X className="size-4" />
		</Button>
	);
}

export function EmptyCart({ className }: { className?: string }) {
	const { removeAll, items } = useCartStore((state) => state);

	return items.length > 0 ? (
		<Button
			onClick={removeAll}
			variant="outline"
			className={cn(
				'inline-flex text-lg rounded-md gap-x-3 hover:bg-bg-300',
				className
			)}
			size="sm"
		>
			<Trash2 className="size-4" />
			Vaciar carrito
		</Button>
	) : null;
}

export function InputHandler({
	id,
	className,
}: {
	id: string;
	className?: string;
}) {
	const { setItemQuantity, items } = useCartStore((state) => state);
	const currentQuantity = items.find((item) => item.id === id)?.quantity || 0;

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				className="size-10 rounded-full bg-transparent"
				onClick={() => setItemQuantity(id, currentQuantity - 1)}
				disabled={currentQuantity <= 1}
			>
				<Minus className="size-4" />
			</Button>
			<div className="w-12 text-center">
				<span className="text-lg font-semibold animate-in fade-in duration-200">
					{currentQuantity}
				</span>
			</div>
			<Button
				variant="outline"
				size="icon"
				className="size-10 rounded-full bg-transparent"
				onClick={() => setItemQuantity(id, currentQuantity + 1)}
			>
				<Plus className="size-4" />
			</Button>
		</>
	);
}
