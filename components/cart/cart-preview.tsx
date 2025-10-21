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
}

export function CartPreview({ item, outOfStock }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				className={cn(
					buttonVariants({ variant: 'default' }),
					'inline-flex text-base text-black rounded-md bg-linear-to-br from-accent-300 to-accent-500 gap-x-3 hover:to-accent-300 hover:shadow-[0px_22px_43px_-25px] hover:shadow-accent-800',
					outOfStock && 'cursor-not-allowed bg-accent-700'
				)}
			>
				<ShoppingCart className="size-6" />
				Añadir
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Añadir al carrito</DialogTitle>
					<div className="text-sm text-muted-foreground mt-2">
						{item.name} - ${item.price}
					</div>
				</DialogHeader>
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
