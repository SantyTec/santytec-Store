'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resendVerificationEmail } from '@/lib/actions/auth';
import { ResendVerificationEmailFormState } from '@/lib/schemas/auth';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { toast } from 'sonner';

export function ResendTokenForm() {
	const router = useRouter();
	const [state, formAction] = useActionState(onSubmit, {
		message: '',
		errors: {},
		success: false,
	});

	async function onSubmit(
		prevState: ResendVerificationEmailFormState,
		formData: FormData
	) {
		const res = await resendVerificationEmail(prevState, formData);
		if (!res.success) {
			toast.error(res.message, { duration: 1500 });
			return res as ResendVerificationEmailFormState;
		}

		toast.success(res.message);
		router.push('/');
		return res as ResendVerificationEmailFormState;
	}

	return (
		<Card className='bg-bg'>
			<CardContent className='pt-6'>
				<form action={formAction} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="tu@email.com"
							className={
								state.errors && state.errors.email ? 'border-destructive' : ''
							}
						/>
						{state.errors?.email && (
							<p className="text-xs text-destructive">
								{state.errors.email[0]}
							</p>
						)}
					</div>
					<Button type="submit" variant="outline">
						Reenviar Código
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
