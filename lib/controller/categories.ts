import { fetchRootCategories } from '@/lib/model/categories';

export async function getRootCategories() {
	const { data: categories, error } = await fetchRootCategories();

	if (error || !categories) return { data: [], error };

	return { data: categories, error: null };
}
