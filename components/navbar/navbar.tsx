import { getRootCategories } from '@/lib/controller/categories';

import { NavbarClient } from '@/components/navbar/navbar-client';

export default async function Navbar() {
    const { data: categories } = await getRootCategories();
  
	return (
		<NavbarClient categories={categories} />
	);
}
