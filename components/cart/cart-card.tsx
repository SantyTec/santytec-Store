import Image from 'next/image';

import { CartProduct } from '@/lib/types';

import { DeleteFromCart, InputHandler } from '@/components/cart/cart-buttons';

export default function CartCard({ product }: { product: CartProduct }) {
	return (
		<article className="w-full grid grid-cols-8 grid-rows-2 md:flex md:flex-nowrap flex-wrap items-center gap-6 rounded-md border border-primary pb-[15px] pe-[30px]">
			<div className="overflow-hidden relative row-span-2 rounded-md aspect-square col-span-3 md:w-[150px]">
				<Image
					src={product.images[0].url}
					fill
					className="object-contain h-full"
					alt={`Imagen de ${product.name}`}
					title={product.name}
				/>
			</div>
			<p className="md:w-[20%] col-span-4 text-balance">{product.name}</p>
			<DeleteFromCart
				className="ms-auto md:order-1 col-span-1 "
				id={product.id}
			/>
			<p className="font-semibold col-span-2">${product.price} c/u</p>
			<InputHandler
				className="col-span-3 lg:w-[100px] text-center text-xl"
				id={product.id}
				initialQuantity={product.quantity}
			/>
			<p className="font-semibold col-span-2 col-start-6 text-center text-xl md:w-[15%]">
				${Number(product.price) * product.quantity}
			</p>
		</article>
	);
}
