'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AccountTabs() {
	const pathname = usePathname();

	return (
		<Tabs value={pathname} className="w-full">
			<TabsList className="grid w-full max-w-md grid-cols-2">
				<TabsTrigger value="/account" asChild>
					<Link href="/account">Resumen</Link>
				</TabsTrigger>
				<TabsTrigger value="/account/orders" asChild>
					<Link href="/account/orders">Mis Órdenes</Link>
				</TabsTrigger>
				<TabsTrigger value="/account/profile" asChild>
					<Link href="/account/orders">Mi Perfil</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
