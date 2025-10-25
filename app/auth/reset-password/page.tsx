import React from 'react';
import { resetPassword } from './actions';

interface Props {
	searchParams: Promise<{
		token?: string;
	}>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
	const { token } = (await searchParams) || '';

	return (
		<div className="container px-4 py-8 md:px-6">
			<div className="max-w-md mx-auto">
				<h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>
				{!token ? (
					<p className="text-sm text-muted-foreground">
						Falta el token de restablecimiento en la URL.
					</p>
				) : (
					<form action={resetPassword} className="space-y-4">
						<input type="hidden" name="token" value={token} />

						<div>
							<label htmlFor="password" className="block text-sm font-medium">
								Nueva contraseña
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="mt-1 block w-full"
							/>
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium"
							>
								Confirmar nueva contraseña
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								className="mt-1 block w-full"
							/>
						</div>

						<div>
							<button type="submit" className="btn-primary w-full">
								Actualizar contraseña
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
