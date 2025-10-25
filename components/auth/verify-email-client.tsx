'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { verifyEmailAction } from '@/lib/actions/user';
import { TokenVerificationProps, VerificationState } from '@/lib/types';

export function VerifyEmailClient({ token }: TokenVerificationProps) {
	const router = useRouter();
	const [state, setState] = useState<VerificationState>('loading');
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		const verifyEmail = async () => {
			if (!token) {
				setState('invalid');
				setErrorMessage('No se proporcionó un token de verificación');
				return;
			}

			try {
				const result = await verifyEmailAction(token);

				if (result.success) {
					setState('success');
					setTimeout(() => {
						router.push('/login');
					}, 3000);
				} else {
					setState('error');
					setErrorMessage('Error al verificar el email');
				}
			} catch (error) {
				setState('error');
				setErrorMessage('Error inesperado al verificar el email');
				console.error('Verification error:', error);
			}
		};

		verifyEmail();
	}, [token, router]);

	return (
		<div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						{state === 'loading' && (
							<div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
								<Loader2 className="h-8 w-8 text-primary animate-spin" />
							</div>
						)}
						{state === 'success' && (
							<div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center animate-in zoom-in duration-300">
								<CheckCircle2 className="h-8 w-8 text-green-500" />
							</div>
						)}
						{(state === 'error' || state === 'invalid') && (
							<div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center animate-in zoom-in duration-300">
								<XCircle className="h-8 w-8 text-red-500" />
							</div>
						)}
					</div>

					<CardTitle className="text-2xl font-bold">
						{state === 'loading' && 'Verificando tu email...'}
						{state === 'success' && '¡Email Verificado!'}
						{(state === 'error' || state === 'invalid') &&
							'Error de Verificación'}
					</CardTitle>

					<CardDescription>
						{state === 'loading' &&
							'Por favor espera mientras verificamos tu dirección de email'}
						{state === 'success' && 'Tu email ha sido verificado exitosamente'}
						{(state === 'error' || state === 'invalid') && errorMessage}
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{state === 'loading' && (
						<div className="space-y-3">
							<div className="h-2 bg-muted rounded-full overflow-hidden">
								<div
									className="h-full bg-primary animate-pulse"
									style={{ width: '60%' }}
								/>
							</div>
							<p className="text-xs text-center text-muted-foreground">
								Esto tomará solo un momento...
							</p>
						</div>
					)}

					{state === 'success' && (
						<div className="space-y-4">
							<div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
								<p className="text-sm text-center">
									Tu cuenta ha sido activada. Serás redirigido automáticamente a
									la página de inicio de sesión en 3 segundos.
								</p>
							</div>
							<Button
								asChild
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
							>
								<Link href="/auth/login">
									Ir a Iniciar Sesión
									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</div>
					)}

					{(state === 'error' || state === 'invalid') && (
						<div className="space-y-4">
							<div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
								<h3 className="font-semibold text-sm mb-2">
									¿Qué puedes hacer?
								</h3>
								<ul className="text-xs space-y-1 text-muted-foreground">
									<li>• Verifica que el link no esté incompleto</li>
									<li>• El link puede haber expirado (válido por 24 horas)</li>
									<li>• Solicita un nuevo email de verificación</li>
								</ul>
							</div>

							<div className="flex flex-col gap-2">
								<Button asChild variant="outline">
									<Link href="/auth/register">Volver a Registro</Link>
								</Button>
								<Button asChild variant="outline">
									<Link href="/auth/resend-verification">
										Reenviar Email de Verificación
									</Link>
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
