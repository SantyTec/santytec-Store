import { ShoppingCart } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/data/products';

import { Button } from '@/components/ui/button';


interface Props {
	id: string;
}

export default async function Info({ id }: Props) {
	const product = await getProduct(id);

	if (!product) notFound();

	return (
		<section className="w-full text-xl">
			<h1 className="text-2xl font-bold lg:text-4xl md:text-3xl text-accent">
				{product.name}
			</h1>
			<div className="flex items-end justify-between mt-3.5">
				<p className="text-2xl font-bold text-primary-700">
					${product.price.toNumber()}
				</p>
			</div>
			<hr className="my-4" />
			<div className="flex flex-col gap-y-6">
				<div className="flex flex-col justify-between md:flex-row md:items-center md: gap-x-4">
					<h3 className="font-semibold">Categoría:</h3>
					<p>{product.category.name}</p>
				</div>
			</div>
			<div className="flex items-center mt-4 gap-x-4">
				{+product.stock == 0 ? (
					<p className="font-semibold uppercase">
						Lo sentimos. En este momento no tenemos stock de este producto
					</p>
				) : (
					<div className="flex flex-col w-full gap-y-4">
						<div className="flex items-center justify-between">
							<label htmlFor="quantity" className="font-semibold">
								Cantidad
							</label>
							<input
								type="number"
								name="quantity"
								className="block p-2.5 w-36 border-none text-txt-300 text-center rounded-md bg-primary-50/10"
								min={1}
								defaultValue={1}
							/>
						</div>
						<Button
							className="inline-flex text-xl text-black rounded-md bg-gradient-to-br from-accent-300 to-accent-500 gap-x-3 hover:to-accent-300 hover:shadow-[0px_22px_43px_-25px] hover:shadow-accent-800"
							variant="accent"
						>
							<ShoppingCart size={24} />
							Añadir al carrito
						</Button>
					</div>
				)}
			</div>
			<div className="flex flex-col items-start mt-4">
				<h3 className="font-semibold">Descripción:</h3>
				<p className="text-base font-semibold text-bg-100/70">
					{product.description}
				</p>
			</div>
		</section>
	);
}
