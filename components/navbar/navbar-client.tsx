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
import { Menu, Package, User } from 'lucide-react';
import { Searchbar } from '@/components/ui/searchbar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Session } from 'next-auth';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignOut } from '@/components/auth-buttons';

export function NavbarClient({
	categories,
	session,
}: {
	categories: Category[];
	session: Session | null;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const isAuthenticated = !!session;

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
					<Searchbar className="relative w-full" />
				</div>

				<div className="flex items-center space-x-2">
					{isAuthenticated ? (
						session.user && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative h-10 w-10 rounded-full"
									>
										<Avatar className="h-10 w-10">
											<AvatarImage
												src={session.user.image || '/placeholder.svg'}
												alt={session.user.name!}
											/>
											<AvatarFallback className="bg-primary text-primary-foreground">
												{session.user
													.name!.split(' ')
													.map((n) => n[0])
													.join('')
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-56">
									<div className="flex items-center justify-start gap-2 p-2">
										<div className="flex flex-col space-y-1 leading-none">
											<p className="font-medium text-sm">{session.user.name}</p>
											<p className="w-[200px] truncate text-xs text-muted-foreground">
												{session.user.email}
											</p>
										</div>
									</div>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href="/account" className="cursor-pointer">
											<User className="mr-2 size-4" />
											Mi Cuenta
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem asChild>
										<Link href="/account/orders" className="cursor-pointer">
											<Package className="mr-2 h-4 w-4" />
											Mis Órdenes
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="cursor-pointer">
										<SignOut className="bg-transparent hover:bg-red-800 text-red-600 hover:text-red-100" />
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)
					) : (
						<>
							<Button
								variant="ghost"
								size="sm"
								asChild
								className="hidden md:inline-flex"
							>
								<Link href="/login">Iniciar Sesión</Link>
							</Button>
							<Button
								size="sm"
								asChild
								className="hidden md:inline-flex bg-primary-700 text-txt-50 hover:bg-primary-700/90"
							>
								<Link href="/register">Registrarse</Link>
							</Button>
						</>
					)}

					<CartButton />

					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Abrir menú</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-80 overflow-scroll">
							<div className="flex flex-col space-y-4 mt-6">
								<Searchbar className="relative w-full" />

								{!isAuthenticated && (
									<div className="flex flex-col gap-2 pb-4 border-b">
										<Button variant="ghost" asChild>
											<Link href="/login" onClick={() => setIsOpen(false)}>
												Iniciar Sesión
											</Link>
										</Button>
										<Button
											asChild
											className="bg-primary-700 text-txt-50 hover:bg-primary-700/90"
										>
											<Link href="/register" onClick={() => setIsOpen(false)}>
												Registrarse
											</Link>
										</Button>
									</div>
								)}

								<nav className="flex flex-col space-y-3">
									<Accordion type="single" collapsible>
										<AccordionItem value="categories">
											<AccordionTrigger> Categorías </AccordionTrigger>
											<AccordionContent>
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
											</AccordionContent>
										</AccordionItem>
									</Accordion>
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
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-900 focus:bg-accent focus:text-accent-foreground',
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
