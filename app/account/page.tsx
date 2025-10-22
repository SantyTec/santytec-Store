import { auth } from '@/auth';
import { AccountTabs } from '@/components/account/account-tabs';
import { getStatusBadge } from '@/components/badges';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { handleGetUserOrders } from '@/lib/controller/order';
import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
	const session = await auth();
	if (!session) redirect('/login');

	const userId = session.user.id;
	const { data: orders } = await handleGetUserOrders(userId);

	const activeStatuses = ['CONFIRMED', 'PREPPARING', 'SHIPPED'];

	const activeOrders = orders
		? orders.filter((order) => activeStatuses.includes(order.status))
		: [];

	const recentOrders = orders ? orders.slice(0, 5) : [];

	return (
		<div className="container px-4 py-8 md:px-6">
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Mi Cuenta</h1>
					<p className="text-muted-foreground mt-2">
						Bienvenido de vuelta, {session.user.name || 'Usuario'}
					</p>
				</div>
				<AccountTabs />
				<Card>
					<CardHeader>
						<CardTitle>Pedidos Activos</CardTitle>
						<CardDescription>
							Órdenes que están siendo procesadas o en camino
						</CardDescription>
					</CardHeader>
					<CardContent>
						{activeOrders.length === 0 ? (
							<div className="text-center py-6 text-muted-foreground">
								<Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
								<p>No tienes pedidos activos en este momento</p>
							</div>
						) : (
							<div className="space-y-3">
								{activeOrders.map((order) => (
									<div
										key={order.id}
										className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
									>
										<div className="flex items-center gap-4">
											<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
												<Package className="h-6 w-6 text-primary" />
											</div>
											<div>
												<p className="font-semibold">{order.id}</p>
											</div>
										</div>
										<div className="flex items-center gap-4">
											{getStatusBadge(order.status)}
											<Button variant="ghost" size="sm" asChild>
												<Link href={`/account/orders/${order.id}`}>
													Ver detalles
												</Link>
											</Button>
										</div>
									</div>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>Órdenes Recientes</CardTitle>
								<CardDescription>
									Tus últimas compras en Santy Tec
								</CardDescription>
							</div>
							<Button variant="outline" asChild>
								<Link href="/account/orders">
									Ver todas
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentOrders.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
								>
									<div className="flex items-center gap-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
											<Package className="h-6 w-6 text-primary" />
										</div>
										<div>
											<p className="font-semibold">{order.id}</p>
											<p className="text-sm text-muted-foreground">
												{order.createdAt.toLocaleDateString()} •{' '}
												{order.orderItems.length}{' '}
												{order.orderItems.length === 1
													? 'producto'
													: 'productos'}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-right">
											<p className="font-semibold">
												${order.finalSubtotal.toFixed(2)}
											</p>
											{getStatusBadge(order.status)}
										</div>
										<Button variant="ghost" size="sm" asChild>
											<Link href={`/account/orders/${order.id}`}>
												Ver detalles
											</Link>
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
