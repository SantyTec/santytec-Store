'use client';

import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';

export function Searchbar({ className }: { className?: string }) {
	const router = useRouter();
	const { replace } = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const query = event.currentTarget.query.value.trim();
		if (query) {
			router.push(`/products?name=${query}`);
		} else {
			toast('Por favor, ingresa un término de búsqueda.');
		}
	}

	const handleSearch = useDebouncedCallback(
		(term: string) => {
			const params = new URLSearchParams(searchParams);
			params.set('page', '1');
			if (term) {
				params.set('name', term);
				params.set('category', term);
			} else {
				params.delete('name');
				params.delete('category');
			}
			replace(`/products?${params.toString()}`);
		},
		300,
		{ leading: true, trailing: true }
	);

	return (
		<div
			className={cn('relative flex w-full sm:w-auto shrink-0', className)}
		>
			<form onSubmit={handleSubmit} className="w-full">
				<input
					defaultValue={searchParams.get('name') || ''}
					className="peer block w-full rounded-md py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-bg"
					name="query"
					placeholder="Buscar producto"
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
				/>
				<button type="submit" className="absolute left-3 top-1/2 ">
					<SearchIcon className="text-gray-500 -translate-y-1/2 size-5 peer-focus:text-gray-900" />
				</button>
			</form>
		</div>
	);
}
