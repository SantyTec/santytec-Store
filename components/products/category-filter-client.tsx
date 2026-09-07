'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Category {
	id: string;
	name: string;
}

interface CategoryFilterProps {
	categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const selectedCategories =
		searchParams.get('categories')?.split(',').filter(Boolean) || [];

	const toggleCategory = (categoryId: string) => {
		const params = new URLSearchParams(searchParams.toString());

		let updatedCategories = [...selectedCategories];

		if (updatedCategories.includes(categoryId)) {
			updatedCategories = updatedCategories.filter((id) => id !== categoryId);
		} else {
			updatedCategories.push(categoryId);
		}

		// Resetear a página 1 cuando cambian los filtros
		params.set('page', '1');

		if (updatedCategories.length > 0) {
			params.set('categories', updatedCategories.join(','));
		} else {
			params.delete('categories');
		}

		router.push(`?${params.toString()}`, { scroll: false });
	};

	if (!categories || categories.length === 0) {
		return (
			<div className="text-sm text-muted-foreground">
				No hay categorías disponibles
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<h4 className="text-sm font-medium mb-3">Categorías</h4>
			{categories.map((category) => (
				<div key={category.id} className="flex items-center space-x-2">
					<Checkbox
						id={category.id}
						checked={selectedCategories.includes(category.id)}
						onCheckedChange={() => toggleCategory(category.id)}
					/>
					<Label
						htmlFor={category.id}
						className="text-sm font-normal cursor-pointer hover:text-accent transition-colors"
					>
						{category.name}
					</Label>
				</div>
			))}
		</div>
	);
}
