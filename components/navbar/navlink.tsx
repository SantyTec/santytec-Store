'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { NavbarLink } from 'flowbite-react';

export default function Navlink({
	route,
	className,
}: {
	route: {
		href: string;
		label: string;
	};
	className?: string;
}) {
	const pathname = usePathname();
	const isActive = route.href === pathname;

	return (
		<NavbarLink
			as={Link}
			href={route.href}
			className={cn(
				'text-sm text-txt-600 font-medium transition-colors !bg-secondary hover:!bg-secondary capitalize hover:!underline underline-offset-2 decoration-2 hover:!text-txt-950 block',
				isActive && 'text-accent-900 underline',
				className
			)}
		>
			{route.label}
		</NavbarLink>
	);
}
