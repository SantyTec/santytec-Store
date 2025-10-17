'use client';

import { loginAction, loginWithGoogleAction } from '@/lib/actions/auth';
import { LoginFormState } from '@/lib/schemas/auth';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
			disabled={pending}
		>
			{pending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
		</Button>
	);
}

function GoogleButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			variant="outline"
			className="w-full flex items-center justify-center gap-3 bg-transparent"
			disabled={pending}
		>
			<svg className="w-5 h-5" viewBox="0 0 24 24">
				<path
					fill="#4285F4"
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				/>
				<path
					fill="#34A853"
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				/>
				<path
					fill="#FBBC05"
					d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				/>
				<path
					fill="#EA4335"
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				/>
			</svg>
			<span className="font-medium">
				{pending ? 'Conectando...' : 'Continuar con Google'}
			</span>
		</Button>
	);
}

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction] = useFormState(onSubmit, {
		message: '',
		success: false,
	});

	async function onSubmit(prevState: LoginFormState, formData: FormData) {
		const res = await loginAction(prevState, formData);

		if (!res.success) {
			toast.error(res.message);
			return res;
		}

		toast.success(res.message);
		router.push('/');
		return res;
	}

	return (
		<div className="space-y-6">
			<form action={loginWithGoogleAction}>
				<GoogleButton />
			</form>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-border" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-2 bg-bg-800 text-muted-foreground">
						O con email
					</span>
				</div>
			</div>

			<form action={formAction} className="space-y-4">
				{state.success && (
					<div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
						<p className="text-sm text-green-600 dark:text-green-400">
							¡Bienvenido de vuelta! Redirigiendo...
						</p>
					</div>
				)}

				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="tu@email.com"
						className={state.errors?.email ? 'border-destructive' : ''}
					/>
					{state.errors?.email && (
						<p className="text-xs text-destructive">{state.errors.email[0]}</p>
					)}
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="password">Contraseña</Label>
						<Link
							href="/auth/forgot-password"
							className="text-xs text-primary hover:underline"
						>
							¿Olvidaste tu contraseña?
						</Link>
					</div>
					<div className="relative">
						<Input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							autoComplete="current-password"
							placeholder="••••••••"
							className={state.errors?.password ? 'border-destructive' : ''}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-foreground z-20"
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{state.errors?.password && (
						<p className="text-xs text-destructive">
							{state.errors.password[0]}
						</p>
					)}
				</div>
				<SubmitButton />
			</form>
		</div>
	);
}
