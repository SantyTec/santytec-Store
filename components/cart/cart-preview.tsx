'use client';

import { AddToCart } from '@/components/cart/cart-buttons';
import { buttonVariants } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { FullProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Props {
	outOfStock?: boolean;
	item: FullProduct;
	className?: string;
}

export function CartPreview({ item, outOfStock, className }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				className={cn(
					buttonVariants({ variant: 'default', size: 'sm' }),
					'inline-flex text-sm rounded-md gap-2 transition-all duration-300',
					'bg-accent text-gray-900 font-semibold hover:bg-accent/90',
					'hover:shadow-[0px_0px_20px_0px_rgba(253,245,28,0.4)] hover:scale-[0.98]',
					className,
					outOfStock &&
						'cursor-not-allowed bg-gray-700 text-primary border border-primary hover:scale-100 hover:shadow-none'
				)}
				disabled={outOfStock}
			>
				<ShoppingCart className="size-5" />
				{outOfStock ? 'Sin Stock' : 'Añadir'}
			</DialogTrigger>

			<DialogContent className="bg-bg border border-secondary/20 rounded-lg shadow-2xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-secondary">
						Añadir al carrito
					</DialogTitle>
					<div className="text-sm text-secondary mt-2 flex items-center justify-between">
						<span className="font-medium">{item.name}</span>
						<span className="text-tertiary font-bold text-lg">
							${item.price}
						</span>
					</div>
				</DialogHeader>

				{/* Separador sutil */}
				<div className="w-full h-px bg-secondary/10 my-2" />

				<DialogFooter className="sm:justify-start">
					<AddToCart
						item={item}
						showQuantityInput
						onAddToCart={() => setOpen(false)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
