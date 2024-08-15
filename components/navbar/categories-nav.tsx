import { getRootCategories } from '@/lib/controller/categories';

import MegaMenuClient from '@/components/navbar/mega-menu-client';

export default async function CategoriesNav() {
	const { data: categories } = await getRootCategories();

	return <MegaMenuClient categories={categories} />;
}
