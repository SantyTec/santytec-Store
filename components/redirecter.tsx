'use client';

import { useRouter } from 'next/navigation';

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function Redirecter({ href, children }: Props) {
	const router = useRouter();

	function redirect() {
		router.push(href);
	}

	return (
		<div className="h-full w-full" onClick={redirect}>
			{children}
		</div>
	);
}
