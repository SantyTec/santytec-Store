import Link from 'next/link';

import { CheckCircle2, Home, ShoppingBag } from 'lucide-react';

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ order?: string }>;
}) {
	const { order } = await searchParams;
	const orderId = order && /^\d+$/.test(order) ? order : null;

	return (
		<section className="w-[calc(100%-10rem)] mx-auto text-center">
			<header className="mt-8 mb-4 text-accent">
				<CheckCircle2 className="mx-auto size-10" />
				<h3 className="text-3xl font-semibold">¡Recibimos tu pedido!</h3>
				{orderId && (
					<p className="mt-1 text-lg text-bg-300">
						Número de pedido: <span className="font-semibold">#{orderId}</span>
					</p>
				)}
			</header>
			<main className="mb-4 text-xl text-bg-300">
				<p>
					Gracias por confiar en{' '}
					<span className="text-2xl font-semibold font-accent text-accent">
						Santy Tec
					</span>
					.
				</p>
				<h4 className="mt-4 text-2xl font-semibold text-accent">
					Coordinar forma de pago
				</h4>
				<p>
					Nos comunicaremos con vos por teléfono o WhatsApp para coordinar la
					forma de pago y el envío. Todavía no se realizó ningún cobro.
				</p>
			</main>
			<footer className="flex flex-col gap-y-3">
				<Link href="/products" className="transition-shadow duration-300 shadow-[0_7px_12px_var(--accent)] btn gap-x-3 lg:mx-auto bg-accent text-bg hover:shadow-accent-600">
					Seguir comprando <ShoppingBag className="size-6" />
				</Link>
				<Link href="/" className="transition-colors border lg:mx-auto btn gap-x-3 border-bg-800 bg-bg hover:bg-accent-900">
					Volver a inicio <Home className="size-6" />
				</Link>
			</footer>
		</section>
	);
}
