import Link from 'next/link';

import { AngryIcon } from 'lucide-react';

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<AngryIcon className="w-10 dark:text-gray-300" />
			<h2 className="text-xl font-semibold">404 Not Found</h2>
			<p>No se pudo encontrar la categoría que buscaba.</p>
			<Link
				href="/products"
				className="btn bg-bg-950 text-bg-100 hover:bg-bg-950/90 dark:bg-bg-50 dark:text-bg-900 dark:hover:bg-bg-50/70"
			>
				Ver productos
			</Link>
		</main>
	);
}
