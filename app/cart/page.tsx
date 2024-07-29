import { Metadata } from 'next';

import { EmptyCart } from '@/components/cart/cart-buttons';
import CartList from '@/components/cart/cart-list';
import Wrapper from '@/components/wrapper';

export const metadata: Metadata = {
	title: 'Carrito de Compras - Santy Tec',
	description:
		'Revisa los productos en tu carrito de compras en Santy Tec. Completa tu pedido y disfruta de nuestros accesorios de tecnología y electrónica.',
};

export default function CartPage() {
	return (
		<section className="lg:px-14 px-7 py-7">
			<Wrapper>
				<main>
					<h1 className="text-4xl font-semibold text-center uppercase font-accent text-accent-600 mb-6">
						Mi carrito
					</h1>
					<EmptyCart className="mb-6 md:mt-0" />
					<CartList />
				</main>
			</Wrapper>
		</section>
	);
}
