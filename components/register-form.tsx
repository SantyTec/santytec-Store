'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { loginWithGoogleAction, registerAction } from '@/lib/actions/auth';
import { RegisterFormState } from '@/lib/schemas/auth';
import { cn, getPasswordStrength } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className="w-full bg-accent text-bg hover:bg-accent/80"
			disabled={pending}
		>
			{pending ? 'Creando cuenta...' : 'Crear Cuenta'}
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
				{pending ? 'Conectando...' : 'Registrarme con Google'}
			</span>
		</Button>
	);
}

export function RegisterForm({ callbackUrl }: { callbackUrl?: string }) {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [state, formAction] = useActionState(onSubmit, {
		message: '',
		success: false,
	});

	const passwordStrength = getPasswordStrength(password);

	async function onSubmit(prevState: RegisterFormState, formData: FormData) {
		const res = await registerAction(prevState, formData);

		if (!res.success) {
			toast.error(res.message, { duration: 2500 });
			return res as RegisterFormState;
		}

		toast.success(res.message, { duration: 3500 });
		router.push('/login');
		return res as RegisterFormState;
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
					<span className="px-2 bg-card text-muted-foreground">
						O con email
					</span>
				</div>
			</div>

			<form action={formAction} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Nombre Completo</Label>
					<Input
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						required
						placeholder="Juan Pérez"
						className={
							state.errors && state.errors?.name ? 'border-destructive' : ''
						}
					/>
					{state && state.errors && state.errors?.name && (
						<p className="text-xs text-destructive">
							{state && state.errors && state.errors.name[0]}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="tu@email.com"
						className={
							state && state.errors && state.errors?.email
								? 'border-destructive'
								: ''
						}
					/>
					{state && state.errors && state.errors?.email && (
						<p className="text-xs text-destructive">{state.errors.email[0]}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone">
						Teléfono <span className="text-muted-foreground">(opcional)</span>
					</Label>
					<Input
						id="phone"
						name="phone"
						type="tel"
						autoComplete="tel"
						placeholder="+54 9 11 1234-5678"
						className={state.errors?.phone ? 'border-destructive' : ''}
					/>
					{state.errors?.phone && (
						<p className="text-xs text-destructive">{state.errors.phone[0]}</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="password">Contraseña</Label>
					<div className="relative">
						<Input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							autoComplete="new-password"
							required
							placeholder="Mínimo 8 caracteres"
							className={state.errors?.password ? 'border-destructive' : ''}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							{showPassword ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{password && (
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Progress
									value={passwordStrength.score}
									className={'flex-1 mr-2 h-2'}
								/>
								<Badge
									className={cn('text-xs font-medium', passwordStrength.color)}
								>
									{passwordStrength.label}
								</Badge>
							</div>
						</div>
					)}
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
