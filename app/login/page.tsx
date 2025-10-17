import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { LoginForm } from '@/components/login-form';

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { callbackUrl?: string };
}) {
	const session = await auth();

	if (session) {
		redirect(searchParams.callbackUrl || '/');
	}

	return (
		<div className="container flex lg:min-h-[calc(100vh-4rem)] min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md bg-bg-800 border-0">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
					<CardDescription>
						Ingresa a tu cuenta de Santy Tec para acceder a tus pedidos y
						beneficios
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm searchParams={searchParams} />
					<div className="mt-6 text-center text-sm">
						<p className="text-muted-foreground">
							¿No tienes una cuenta?{' '}
							<Link
								href="/register"
								className="font-medium text-primary hover:underline"
							>
								Créala aquí
							</Link>
						</p>
					</div>
					<div className="mt-4 rounded-lg bg-muted p-4">
						<p className="text-xs text-muted-foreground text-center">
							💡 <strong>Nota:</strong> La cuenta es opcional. Puedes comprar
							como invitado, pero crear una cuenta te permite ver tu historial y
							guardar tu carrito.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
