import { auth } from '@/auth';
import OrdersList from '@/components/account/orders-list';
import { handleGetFormattedUserOrders } from '@/lib/controller/order';
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
	const session = await auth();
	if (!session) redirect('/login');

	const { data } = await handleGetFormattedUserOrders(session.user.id);

	const orders = data || [];

	return (
		<section className="space-y-6 px-4 py-8 md:px-6 lg:py-12">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Mis Órdenes</h1>
				<p className="text-muted-foreground mt-2">
					Historial completo de tus compras
				</p>
			</div>
			<OrdersList orders={orders} />
		</section>
	);
}
