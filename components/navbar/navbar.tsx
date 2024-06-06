import Link from 'next/link';

import { Suspense } from 'react';

import CategoriesNav from '@/components/navbar/categories-nav';
import Navlink from '@/components/navbar/navlink';
import {
	Navbar as FlowbiteNavbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
	} from 'flowbite-react';
import { ShoppingCart } from 'lucide-react';

const links = [
	{ href: '/', label: 'Inicio' },
	{ href: '/products', label: 'Productos' },
];

export default function Navbar() {
	return (
		<FlowbiteNavbar className="bg-secondary text-txt-950" fluid>
			<NavbarBrand as={Link} href="/">
				<span>RomaTechnology</span>
			</NavbarBrand>
			<div className="flex justify-between gap-5 md:order-2">
				<Link
					href="/cart"
					className="flex items-center rounded-full bg-bg btn text-secondary shrink hover:bg-secondary hover:text-bg"
				>
					<ShoppingCart className="size-6" />
					<span className="sr-only">Mi Carrito</span>
				</Link>
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
