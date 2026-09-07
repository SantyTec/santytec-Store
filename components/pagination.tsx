'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

import { generatePagination } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ProductPagination({ totalPages }: { totalPages: number }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;

	if (totalPages <= 1) return null;

	const allPages = generatePagination(currentPage, totalPages);

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					{currentPage <= 1 ? (
						<Button 
							variant="outline" 
							size="icon"
							disabled
							className="h-9 w-9"
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Anterior</span>
						</Button>
					) : (
						<PaginationPrevious 
							href={createPageURL(currentPage - 1)}
							className="h-9"
						/>
					)}
				</PaginationItem>

				{allPages.map((page, index) => {
					if (page === '...') {
						return (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}

					return (
						<PaginationItem key={page}>
							<PaginationLink
								href={createPageURL(page)}
								isActive={currentPage === page}
								className={cn(
									"h-9 w-9",
									currentPage === page && "pointer-events-none"
								)}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					{currentPage >= totalPages ? (
						<Button 
							variant="outline" 
							size="icon"
							disabled
							className="h-9 w-9"
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Siguiente</span>
						</Button>
					) : (
						<PaginationNext 
							href={createPageURL(currentPage + 1)}
							className="h-9"
						/>
					)}
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}