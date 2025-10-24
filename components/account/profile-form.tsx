'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { ProfileFormState } from '@/lib/schemas/user';
import Link from 'next/link';

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className="bg-accent text-bg hover:bg-accent/90 cursor-pointer"
			disabled={pending}
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 size-4 animate-spin" />
					Guardando...
				</>
			) : (
				'Guardar Cambios'
			)}
		</Button>
	);
}

interface Props {
	values: {
		name: string;
		email: string;
		phone?: string | null;
	};
}

export function ProfileForm({ values }: Props) {
	const [formState, formAction] = useActionState(onSubmit, {
		message: '',
		success: false,
	});

	async function onSubmit(prevState: ProfileFormState, formData: FormData) {
		console.log('Profile update:', Object.fromEntries(formData));

		return { message: '', success: false } as ProfileFormState;
	}

	return (
		<form action={formAction} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Nombre Completo</Label>
				<Input
					id="name"
					name="name"
					type="text"
					defaultValue={values.name}
					className={
						formState.errors && formState.errors?.name
							? 'border-destructive'
							: ''
					}
				/>
				{formState.errors &&
					formState.errors?.name &&
					formState.errors.name.map((error) => (
						<p className="text-xs text-destructive">{error}</p>
					))}
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					defaultValue={values.email}
					className={
						formState.errors && formState.errors?.email
							? 'border-destructive'
							: ''
					}
				/>
				{formState.errors &&
					formState.errors?.email &&
					formState.errors.email.map((error) => (
						<p className="text-xs text-destructive">{error}</p>
					))}
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone">Teléfono</Label>
				<Input id="phone" type="tel" defaultValue={values.phone || ''} />
			</div>

			<div className="flex gap-3">
				<SubmitButton />
				<Button
					type="button"
					className="bg-bg-800 border-bg-600"
					variant="outline"
					asChild
				>
					<Link href="/account">Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
