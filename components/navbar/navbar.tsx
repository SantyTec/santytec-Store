import { getRootCategories } from '@/lib/controller/categories';

import { NavbarClient } from '@/components/navbar/navbar-client';
import { auth } from '@/auth';

export default async function Navbar() {
	const session = await auth();
	const { data: categories } = await getRootCategories();

	return <NavbarClient categories={categories} session={session} />;
}
