import { EmptyCart } from '@/components/cart/cart-buttons';
import CartList from '@/components/cart/cart-list';
import Wrapper from '@/components/wrapper';

export default function CartPage() {
	return (
		<section className="lg:px-14 px-7 py-7">
			<Wrapper>
				<main>
					<h1 className="text-4xl font-semibold text-center uppercase font-accent text-accent">
						Mi carrito
					</h1>
					<EmptyCart className="my-6 md:mt-0" />
					<div className="grid grid-cols-1 md:grid-cols-[1fr_450px] gap-x-6 gap-y-8">
						<CartList />
						<div className="rounded-md bg-bg-700 w-full h-[400px]"></div>
					</div>
				</main>
			</Wrapper>
		</section>
	);
}
