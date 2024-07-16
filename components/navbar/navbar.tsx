import Link from 'next/link';

import { Suspense } from 'react';

import CartButton from '@/components/cart-button';
import CategoriesNav from '@/components/navbar/categories-nav';
import Navlink from '@/components/navbar/navlink';
import {
	Navbar as FlowbiteNavbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
} from 'flowbite-react';
import Search from '@/components/navbar/search';

const links = [
	{ href: '/', label: 'Inicio' },
	{ href: '/products', label: 'Productos' },
];

export default function Navbar() {
	return (
		<FlowbiteNavbar className="relative bg-secondary text-txt-950" fluid>
			<NavbarBrand
				as={Link}
				href="/"
				className="font-bold font-accent hover:text-accent-800"
			>
				<span>Santy Tec</span>
			</NavbarBrand>
			<div className="flex justify-between gap-5 md:order-2">
				<Suspense>
					<Search />
				</Suspense>
				<CartButton />
				<NavbarToggle />
			</div>
			<NavbarCollapse>
				<ul className="items-center md:flex gap-7">
					{links.map((link) => (
						<Navlink route={link} key={link.href} />
					))}
					<Suspense
						fallback={
							<span className="text-sm font-medium text-txt-600">
								Categorías
							</span>
						}
					>
						<CategoriesNav />
					</Suspense>
				</ul>
			</NavbarCollapse>
		</FlowbiteNavbar>
	);
}
