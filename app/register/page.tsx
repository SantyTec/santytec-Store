import Link from 'next/link';

import { RegisterForm } from '@/components/register-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default async function RegisterPage(props: {
	searchParams: Promise<{ callbackUrl?: string }>;
}) {
	const searchParams = await props.searchParams;
	return (
		<div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
					<CardDescription>
						Únete a Santy Tec y disfruta de beneficios exclusivos
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="mb-6 space-y-2 rounded-lg bg-secondary/20 p-4">
						<h3 className="font-semibold text-sm">
							Beneficios de crear una cuenta:
						</h3>
						<ul className="space-y-1 text-xs text-muted-foreground">
							<li>✓ Historial completo de tus pedidos</li>
							<li>✓ Guardar tu carrito</li>
							{/* <li>✓ Guardar productos favoritos</li> */}
							<li>✓ Seguimiento de envíos en tiempo real</li>
							{/* <li>✓ Ofertas y descuentos exclusivos</li> */}
						</ul>
					</div>
					<RegisterForm callbackUrl={searchParams.callbackUrl} />
					<div className="mt-6 text-center text-sm">
						<p className="text-muted-foreground">
							¿Ya tienes cuenta?{' '}
							<Link
								href="/login"
								className="font-medium text-primary hover:underline"
							>
								Inicia sesión
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
