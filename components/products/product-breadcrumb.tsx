'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface ProductBreadcrumbProps {
	category: string;
	categorySlug: string;
	productName: string;
}

export function ProductBreadcrumb({
	category,
	categorySlug,
	productName,
}: ProductBreadcrumbProps) {
	return (
		<nav className="flex items-center space-x-2 text-sm text-muted-foreground">
			<Link
				href="/"
				className="flex items-center transition-colors hover:text-foreground"
			>
				<Home className="w-4 h-4" />
			</Link>

			<ChevronRight className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />

			<Link
				href="/products"
				className="transition-colors hover:text-foreground"
			>
				Productos
			</Link>

			<ChevronRight className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />

			<Link
				href={`/categories/${categorySlug}`}
				className="transition-colors hover:text-foreground"
			>
				{category}
			</Link>

			<ChevronRight className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />

			<span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
				{productName}
			</span>
		</nav>
	);
}
