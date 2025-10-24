import { auth } from '@/auth';
import Link from 'next/link';

import { handleGetUser } from '@/lib/controller/user';

import CheckoutForm from '@/components/checkout/checkout-form';
import { DesktopDetail, MobileDetail } from '@/components/checkout/details';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default async function CartPage() {
	const session = await auth();

	const { data } = await handleGetUser(session?.user?.id || '');

	return (
		<div className="min-h-screen bg-background">
			<section className="container px-4 py-8 md:px-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/cart">Carrito</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Confirmación</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				{!session?.user && (
					<Alert className="mb-6 bg-secondary-950/20 border-secondary-900">
						<div className="flex items-center justify-between">
							<AlertDescription className="flex-1">
								¿Tienes cuenta?{' '}
								<Link
									href="/auth/login?callbackUrl=/checkout"
									className="font-medium text-primary hover:underline"
								>
									Inicia sesión
								</Link>{' '}
								para autocompletar tus datos
							</AlertDescription>
						</div>
					</Alert>
				)}

				<div className="grid gap-8 lg:grid-cols-[1fr_400px]">
					<div>
						<h1 className="text-3xl font-bold tracking-tight mb-2">
							Confirmar Pedido
						</h1>
						<p className="text-muted-foreground mb-6">
							Completa tus datos para finalizar la compra
						</p>
						<CheckoutForm user={data} />
					</div>
					<DesktopDetail />
					<MobileDetail />
				</div>
			</section>
		</div>
	);
}
