'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

interface Props {
	href: string;
	children: React.ReactNode;
	className?: string;
}

export default function Redirecter({ href, children, className }: Props) {
	const router = useRouter();

	function redirect() {
		router.push(href);
	}

	return (
		<div className={cn('w-full h-full', className)} onClick={redirect}>
			{children}
		</div>
	);
}
