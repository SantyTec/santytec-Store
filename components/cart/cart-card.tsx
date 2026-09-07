import Image from 'next/image';

import { CartProduct } from '@/lib/types';

import { DeleteFromCart, InputHandler } from '@/components/cart/cart-buttons';
import { Card } from '@/components/ui/card';

export default function CartCard({ product }: { product: CartProduct }) {
	return (
		<Card className="p-4 transition-shadow bg-bg-800 border-0 hover:shadow-md shadow-bg-700">
			<div className="flex gap-4">
				<div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
					<Image
						src={product.image || '/placeholder.svg'}
						alt={product.name}
						width={128}
						height={128}
						className="object-cover w-full h-full"
					/>
				</div>

				<div className="flex-1 flex flex-col justify-between min-w-0">
					<div className="flex justify-between gap-2">
						<div className="flex-1 min-w-0">
							<h3 className="font-semibold text-base md:text-lg truncate">
								{product.name}
							</h3>
							<p className="text-muted-foreground mt-1">${product.price} c/u</p>
						</div>
						<DeleteFromCart id={product.id} />
					</div>

					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center gap-2">
							<InputHandler
								className="col-span-3 lg:w-[100px] text-center text-xl"
								id={product.id}
							/>
						</div>

						<div className="text-right">
							<p className="text-sm text-muted-foreground">Subtotal</p>
							<p className="text-xl font-bold text-primary">
								${(product.price * product.quantity).toFixed(2)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
