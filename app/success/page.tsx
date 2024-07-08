import Link from 'next/link';

import { CheckCircle2, Home, ShoppingBag } from 'lucide-react';

export default function SuccessPage() {
	return (
		<section className="w-[calc(100%_-_10rem)] mx-auto text-center">
			<header className="mt-8 mb-4 text-accent">
				<CheckCircle2 className="mx-auto size-10" />
				<h3 className="text-3xl font-semibold">¡Orden enviada!</h3>
			</header>
			<main className="mb-4 text-xl text-bg-300">
				<p>
					Gracias por confiar en{' '}
					<span className="text-2xl font-semibold font-accent text-accent">
						Santy Tec
					</span>
					.
				</p>
				<p>
					Tu pedido está siendo procesado. Nos comunicaremos con vos para
					acordar el pago y el envío.
				</p>
			</main>
			<footer className="flex flex-col gap-y-3">
				<Link href="/products" className="transition-shadow duration-300 shadow-[0_7px_12px_var(--accent)] btn gap-x-3 lg:mx-auto bg-accent text-bg hover:shadow-accent-600">
					Seguir comprando <ShoppingBag className="size-6" />
				</Link>
				<Link href="/products" className="transition-colors border lg:mx-auto btn gap-x-3 border-bg-800 bg-bg hover:bg-accent-900">
					Volver a inicio <Home className="size-6" />
				</Link>
			</footer>
		</section>
	);
}
