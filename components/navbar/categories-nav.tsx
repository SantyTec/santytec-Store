import { Category } from '@prisma/client';

import Navlink from '@/components/navlink';
import { MegaMenu, MegaMenuDropdown } from 'flowbite-react';

export default function CategoriesNav({
	categories,
}: {
	categories: Category[];
}) {
	return (
		<MegaMenu className="md:!p-0 m-0 md:!px-0 bg-secondary text-txt-600">
			<MegaMenuDropdown toggle={<span className="hover:!underline-offset-2 !decoration-2 hover:!text-txt-950 !text-sm !font-medium !text-txt-600">Categorías</span>} className="p-4 bg-secondary">
				<ul className="grid grid-cols-3">
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
