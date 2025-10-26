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
		<header className="sticky top-0 z-50 w-full border-b bg-bg/95 backdrop-blur-xl supports-backdrop-filter:bg-bg/90 md:supports-backdrop-filter:bg-bg/70">
			<div className="container flex items-center justify-between h-16 px-4 md:px-6">
				<Link href="/" className="flex items-center space-x-2">
					<div className="flex items-center justify-center w-8 h-8 rounded-lg">
						<div className="relative overflow-hidden size-16">
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
							<NavigationMenuLink
								asChild
								className={navigationMenuTriggerStyle()}
							>
								<Link href="/products">Productos</Link>
							</NavigationMenuLink>
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

				<div className="flex-1 hidden max-w-sm mx-6 lg:flex">
					<Searchbar className="relative w-full" />
				</div>

				<div className="flex items-center space-x-2">
					{isAuthenticated ? (
						session.user && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										className="relative w-10 h-10 rounded-full"
									>
										<Avatar className="w-10 h-10">
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
											<p className="text-sm font-medium">{session.user.name}</p>
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
											<Package className="w-4 h-4 mr-2" />
											Mis Órdenes
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild className="cursor-pointer">
										<SignOut className="text-red-600 bg-transparent hover:bg-red-800 hover:text-red-100" />
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
								className="hidden md:inline-flex hover:bg-tertiary hover:text-bg"
							>
								<Link href="/login">Iniciar Sesión</Link>
							</Button>
							<Button
								size="sm"
								asChild
								className="hidden md:inline-flex bg-accent text-bg hover:bg-accent/80"
							>
								<Link href="/register">Registrarse</Link>
							</Button>
						</>
					)}

					<CartButton />

					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden">
								<Menu className="w-5 h-5" />
								<span className="sr-only">Abrir menú</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="overflow-scroll w-80">
							<div className="flex flex-col mt-6 space-y-4">
								<Searchbar className="relative w-full" />

								{!isAuthenticated && (
									<div className="flex flex-col gap-2 pb-4 border-b">
										<Button
											variant="ghost"
											className="hover:bg-tertiary hover:text-bg"
											asChild
										>
											<Link href="/login" onClick={() => setIsOpen(false)}>
												Iniciar Sesión
											</Link>
										</Button>
										<Button
											asChild
											className=" bg-accent text-bg hover:bg-accent/80"
										>
											<Link href="/register" onClick={() => setIsOpen(false)}>
												Registrarse
											</Link>
										</Button>
									</div>
								)}

								<nav className="flex flex-col space-y-3">
									<Link
										href="/products"
										className="text-sm font-medium transition-colors hover:text-accent"
										onClick={() => setIsOpen(false)}
									>
										Productos
                  </Link>
                  
									<Accordion type="single" collapsible>
										<AccordionItem value="categories">
											<AccordionTrigger> Categorías </AccordionTrigger>
											<AccordionContent className="space-y-3">
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

									{isAuthenticated && (
										<>
											<div className="border-t pt-3 space-y-2">
												<Link
													href="/account"
													className="text-sm font-medium transition-colors hover:text-accent flex items-center"
													onClick={() => setIsOpen(false)}
												>
													<User className="mr-2 h-4 w-4" />
													Mi Cuenta
												</Link>
												<Link
													href="/account/orders"
													className="text-sm font-medium transition-colors hover:text-accent flex items-center"
													onClick={() => setIsOpen(false)}
												>
													<Package className="mr-2 h-4 w-4" />
													Mis Órdenes
												</Link>
												<SignOut className="text-red-600 bg-transparent hover:bg-red-800 hover:text-red-100" />
											</div>
										</>
									)}
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
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-900 focus:bg-accent focus:text-accent-foreground',
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
