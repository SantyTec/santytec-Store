import { cn } from '@/lib/utils';
import Link from 'next/link';

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
}: {
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
		>
			{title}
		</Link>
	);
}
