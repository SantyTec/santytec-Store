import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { handleGetUserOrders } from '@/lib/controller/order';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
	const session = await auth();
	if (!session) redirect('/login');

	const userId = session.user.id;
	const { data: orders } = await handleGetUserOrders(userId);

	return (
        <div className="container px-4 py-8 md:px-6">
            <div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Mi Cuenta</h1>
					<p className="text-muted-foreground mt-2">
						Bienvenido de vuelta, {session.user.name}
					</p>
				</div>

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
								<Link href="/account/orders" legacyBehavior>
									Ver todas
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</CardHeader>
					{orders &&
						orders.length > 0 &&
						orders.map((order) => (
							<span>{order.originalSubtotal.toNumber()}</span>
						))}
				</Card>
			</div>
        </div>
    );
}
