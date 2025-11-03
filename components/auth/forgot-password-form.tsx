'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordAction } from '@/lib/actions/auth';
import { ResendVerificationEmailFormState } from '@/lib/schemas/auth';
import { useActionState } from 'react';
import { toast } from 'sonner';

export function ForgotPasswordForm() {
	const [formState, formAction] = useActionState(onSubmit, {
		success: false,
		message: '',
	});

	async function onSubmit(
		prevState: ResendVerificationEmailFormState,
		formData: FormData
	) {
		const response = await forgotPasswordAction(prevState, formData);

		if (!response.success) {
			toast.error(response.message, { duration: 2500 });
			return response as ResendVerificationEmailFormState;
		}

		toast.success(response.message, { duration: 2500 });
		return response as ResendVerificationEmailFormState;
	}

	return (
		<form action={formAction} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="ejemplo@mail.com"
				/>
				{formState.errors?.email && (
					<p className="text-sm text-red-600">{formState.errors.email}</p>
				)}
			</div>
			<Button
				className="w-full bg-accent text-bg cursor-pointer hover:bg-accent/80"
				type="submit"
			>
				Enviar link de Recuperación
			</Button>
		</form>
	);
}
