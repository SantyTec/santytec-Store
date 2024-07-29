import { MegaMenu, MegaMenuDropdown } from 'flowbite-react';

import { getRootCategories } from '@/lib/controller/categories';

import Navlink from '@/components/navbar/navlink';

export default async function CategoriesNav() {
	const { data: categories } = await getRootCategories();

	return (
		<MegaMenu className="md:!p-0 m-0 md:!px-0 bg-secondary text-txt-600">
			<MegaMenuDropdown
				toggle={
					<span className="hover:!underline-offset-2 !decoration-2 hover:!text-txt-950 !text-sm !font-medium !text-txt-600">
						Categorías
					</span>
				}
				className="p-4 bg-secondary"
			>
				<ul className="grid grid-cols-3 gap-3 text-center">
					{categories.map((category) => (
						<Navlink
							key={category.id}
							route={{
								href: `/categories/${category.id}`,
								label: category.name,
							}}
						/>
					))}
				</ul>
			</MegaMenuDropdown>
		</MegaMenu>
	);
}
