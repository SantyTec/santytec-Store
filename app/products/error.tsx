'use client';

import Link from 'next/link';

import { AngryIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function NotFound({
	error,
}: {
	error: Error & { digest?: string };
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<AngryIcon className="w-10 dark:text-gray-300" />
			<h2 className="text-xl font-semibold">Oops!</h2>
			<p>Lo sentimos algo salió mal.</p>
			<Link
				href="/"
				className="btn bg-bg-950 text-bg-100 hover:bg-bg-950/90 dark:bg-bg-50 dark:text-bg-900 dark:hover:bg-bg-50/70"
			>
				Ir a inicio
			</Link>
		</main>
	);
}
