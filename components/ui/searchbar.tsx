'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

export function Searchbar({
	className,
	isCatalog,
}: {
	className?: string;
	isCatalog?: boolean;
}) {
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const currentSearch = searchParams.get('name') || '';
		setSearchValue(currentSearch);
	}, [searchParams]);

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set('page', '1');

		if (term.trim()) {
			params.set('name', term.trim());
		} else {
			params.delete('name');
		}

		const newUrl = isCatalog
			? `?${params.toString()}`
			: `/products?${params.toString()}`;

		router.push(newUrl, { scroll: false });
	}, 500);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSearch.flush();
	};

	const handleChange = (value: string) => {
		setSearchValue(value);
		handleSearch(value);
	};

	const handleClear = () => {
		setSearchValue('');
		handleSearch('');
		inputRef.current?.focus();
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault();
				inputRef.current?.focus();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className={cn('relative flex w-full sm:w-auto shrink-0', className)}>
			<form onSubmit={handleSubmit} className="w-full h-full relative">
				<div className="relative">
					<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
						<SearchIcon
							className={cn(
								'size-5 transition-colors',
								isSearchFocused ? 'text-accent' : 'text-muted-foreground'
							)}
						/>
					</div>

					<input
						ref={inputRef}
						type="search"
						value={searchValue}
						className={cn(
							'peer block w-full rounded-md py-2.5 h-full pl-10 pr-10 text-sm placeholder:text-muted-foreground bg-bg transition-all',
							isCatalog && isSearchFocused
								? 'ring-2 ring-accent shadow-md'
								: 'ring-1 ring-input hover:ring-accent/50',
							'focus:outline-none focus:ring-2 focus:ring-accent'
						)}
						placeholder="Buscar productos..."
						onFocus={() => setIsSearchFocused(true)}
						onBlur={() => setIsSearchFocused(false)}
						onChange={(e) => handleChange(e.target.value)}
						aria-label="Buscar productos"
						autoComplete="off"
					/>

					{searchValue && (
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
							onClick={handleClear}
							aria-label="Limpiar búsqueda"
						>
							<X className="h-4 w-4" />
						</Button>
					)}

					{!isSearchFocused && !searchValue && (
						<div className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
							<kbd className="px-2 py-0.5 text-xs font-semibold text-muted-foreground bg-muted rounded border border-border">
								⌘K
							</kbd>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
