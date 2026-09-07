import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ForgotPasswordPage() {
	return (
		<div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<Button
						variant="ghost"
						size="sm"
						className="hover:bg-bg-200 hover:text-bg w-fit -ml-2"
						asChild
					>
						<Link href="/auth/login">
							{' '}
							<ArrowLeft className="mr-2 size-4" />
							Volver al Login
						</Link>
					</Button>
					<CardTitle className="text-2xl font-bold">
						¿Olvidaste tu contraseña?
					</CardTitle>
					<CardDescription>
						No te preocupes, te enviaremos un link para recuperarla
					</CardDescription>
				</CardHeader>
        <CardContent>
          <ForgotPasswordForm />
					<div className="mt-6 rounded-lg bg-muted p-4">
						<p className="text-xs text-muted-foreground">
							<strong>¿Cómo funciona?</strong>
							<br />
							Te enviaremos un correo con un enlace seguro para restablecer tu
							contraseña. El enlace expirará en 1 hora por seguridad.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
