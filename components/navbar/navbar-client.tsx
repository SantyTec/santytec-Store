'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@prisma/client';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import CartButton from '@/components/cart-button';
import {
  NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Menu } from 'lucide-react';
import Search from '@/components/navbar/search';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function NavbarClient({ categories }: { categories: Category[] }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex items-center space-x-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg">
						<div className="size-16 relative overflow-hidden">
							<Image
								className="object-contain aspect-square"
								alt="Logo Santy Tec"
								src="/isotype.svg"
								fill
							/>
						</div>
					</div>
					<span className="text-xl font-bold text-accent">Santy Tec</span>
				</Link>

				<NavigationMenu className="hidden md:flex">
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/products" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Productos
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
									{categories.map((category) => (
										<ListItem
											key={category.name}
											title={category.name}
											href={`/categories/${category.id}`}
										></ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>

				<div className="hidden flex-1 max-w-sm mx-6 lg:flex">
					<Search className="relative w-full" />
				</div>

				<div className="flex items-center space-x-2">
					<CartButton />

					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Abrir menú</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-80">
							<div className="flex flex-col space-y-4 mt-6">
								<Search className="relative w-full" />

								<nav className="flex flex-col space-y-3">
									<div className="space-y-2">
										<span className="text-sm font-medium text-muted-foreground">
											Categorías
										</span>
										{categories.map((category) => (
											<Link
												key={category.name}
												href={`/categories/${category.id}`}
												className="block pl-4 text-sm transition-colors hover:text-primary"
												onClick={() => setIsOpen(false)}
											>
												{category.name}
											</Link>
										))}
									</div>
								</nav>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}

const ListItem = ({
	className,
	title,
	href,
	...props
}: {
	className?: string;
	title: string;
	href: string;
}) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					href={href}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-100 focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
				</Link>
			</NavigationMenuLink>
		</li>
	);
};
