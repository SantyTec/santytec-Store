import { AddToCart } from '@/components/cart/cart-buttons';
import { buttonVariants } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog';
import { FullProduct } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

interface Props {
	outOfStock?: boolean;
	item: FullProduct;
}

export function CartPreview({ item, outOfStock }: Props) {
	return (
		<Dialog>
			<DialogTrigger
				className={cn(
					buttonVariants({ variant: 'default' }),
					'inline-flex text-base text-black rounded-md bg-gradient-to-br from-accent-300 to-accent-500 gap-x-3 hover:to-accent-300 hover:shadow-[0px_22px_43px_-25px] hover:shadow-accent-800',
					outOfStock && 'cursor-not-allowed bg-accent-700'
				)}
			>
				<ShoppingCart className="size-6" />
				Añadir
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{item.name} - ${item.price}
				</DialogHeader>
				<DialogFooter>
					<AddToCart item={item} showQuantityInput />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
