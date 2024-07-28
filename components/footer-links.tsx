import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from "react";

export function FooterHeader({
	title,
	className,
}: {
	title: string;
		className?: string;
}) {
	return (
		<h4
			className={cn('text-base text-bg-900 font-semibold uppercase', className)}
		>
			{title}
		</h4>
	);
}

export function FooterLink({
	href,
	title,
	className,
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
	href: string;
	title: string;
	className?: string;
}) {
	return (
		<Link
			className={cn(
				'font-medium w-fit text-bg-600 text-sm hover:underline',
				className
			)}
			href={href}
			{...props}
		>
			{title}
		</Link>
	);
}
