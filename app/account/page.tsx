import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
	const session = await auth();
	if (!session) redirect('/login');

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
								<Link href="/account/orders">
									Ver todas
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
