'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { resetPasswordAction } from '@/lib/actions/auth';
import { InvitationFormState } from '@/lib/schemas/user';
import { TokenVerificationProps } from '@/lib/types';
import { cn, getPasswordStrength } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className="w-full bg-accent text-bg hover:bg-accent/80"
			disabled={pending}
		>
			{pending ? '...' : 'Confirmar Cambios'}
		</Button>
	);
}

export default function ResetPassword({ token }: TokenVerificationProps) {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [formState, formAction] = useActionState(onSubmit, {
		message: '',
		success: false,
		data: {},
	});

	const passwordStrength = getPasswordStrength(password);

	async function onSubmit(prevState: InvitationFormState, formData: FormData) {
		formData.append('token', token as string);
		const response = await resetPasswordAction(prevState, formData);

		if (!response.success) {
			toast.error(response.message);
			return response as InvitationFormState;
		}

		toast.success(response.message);
		router.push('/login');
		return response as InvitationFormState;
	}

	return (
		<form action={formAction} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="password">Contraseña</Label>
				<div className="relative">
					<Input
						id="password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Mínimo 8 caracteres"
						defaultValue={formState.data?.password || ''}
						className={formState.errors?.password ? 'border-destructive' : ''}
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
								className={cn('flex-1 mr-2 h-2', passwordStrength.color)}
							/>
							<Badge
								className={cn('text-xs font-medium', passwordStrength.color)}
							>
								{passwordStrength.label}
							</Badge>
						</div>
					</div>
				)}
				{formState.errors?.password && (
					<p className="text-xs text-destructive">
						{formState.errors.password[0]}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
				<div className="relative">
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type={showConfirmPassword ? 'text' : 'password'}
						placeholder="Mínimo 8 caracteres"
						className={
							formState.errors?.confirmPassword ? 'border-destructive' : ''
						}
					/>
					<button
						type="button"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						{showConfirmPassword ? (
							<EyeOff className="h-4 w-4" />
						) : (
							<Eye className="h-4 w-4" />
						)}
					</button>
				</div>
				{formState.errors?.confirmPassword && (
					<p className="text-xs text-destructive">
						{formState.errors.confirmPassword[0]}
					</p>
				)}
			</div>

			<SubmitButton />
		</form>
	);
}
