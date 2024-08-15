'use client';

import { Category } from '@prisma/client';
import { useState } from 'react';

import { MegaMenu, MegaMenuDropdown } from 'flowbite-react';

import Navlink from '@/components/navbar/navlink';

export default function MegaMenuClient({
	categories,
}: {
	categories: Category[];
}) {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggle() {
		setIsOpen(!isOpen);
	}

	function handleClose() {
		setIsOpen(false);
	}

	return (
		<MegaMenu className="md:!p-0 m-0 md:!px-0 bg-secondary text-txt-600">
			<MegaMenuDropdown
				toggle={
					<span
						onClick={handleToggle}
						className="hover:!underline-offset-2 !decoration-2 hover:!text-txt-950 !text-sm !font-medium !text-txt-600"
					>
						Categorías
					</span>
				}
				className={`p-4 bg-secondary z-20 ${isOpen ? 'block' : 'hidden'}`}
			>
				<ul className="grid grid-cols-3 gap-3 text-center">
					{categories.map((category) => (
						<Navlink
							key={category.id}
							route={{
								href: `/categories/${category.id}`,
								label: category.name,
							}}
							onClick={handleClose}
						/>
					))}
				</ul>
			</MegaMenuDropdown>
		</MegaMenu>
	);
}
