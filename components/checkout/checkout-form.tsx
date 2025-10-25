'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useActionState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'sonner';

import { checkoutAction } from '@/lib/actions/checkout';
import { validateCaptcha } from '@/lib/controller/recaptcha';
import { CheckoutFormState } from '@/lib/schemas/checkout';
import { CartProduct, SessionUser } from '@/lib/types';

import FormError from '@/components/form-error';
import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Session } from 'next-auth';
import { FieldDescription } from '@/components/ui/field';
import { useCartStore } from '@/providers/cart-store-provider';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Props {
	user?: SessionUser;
}

export default function CheckoutForm({ user }: Props) {
	const { items, removeAll } = useCartStore((state) => state);

	const { executeRecaptcha } = useGoogleReCaptcha();
	const [state, dispatch] = useActionState(onCheckout, {
		message: '',
		success: false,
		errors: {},
	});
	const router = useRouter();
	const [captchaValid, setCaptchaValid] = useState(false);

	useEffect(() => {
		const validateRecaptcha = async () => {
			if (!executeRecaptcha) {
				console.log('El servicio de ReCaptcha aún no está disponible.');
				return;
			}

			const gRecaptchaToken = await executeRecaptcha('checkoutForm');
			const response = await validateCaptcha(gRecaptchaToken);
			if (!response.success) return;

			setCaptchaValid(true);
		};

		validateRecaptcha();
	});

	async function onCheckout(prevState: CheckoutFormState, formData: FormData) {
		if (user?.email && user?.name) {
			formData.append('name', user.name);
			formData.append('email', user.email);
		}

		if (user?.phone) formData.append('phone', user.phone);

		const { success, message, errors } = await checkoutAction(
			prevState,
			formData,
			items
		);

		if (!success) {
			toast.error(message, {
				duration: 2500,
			});

			return { message, success, errors };
		}

		toast.success(message, {
			duration: 2500,
		});

		router.push('/checkout/success');
		removeAll();

		return { message, success };
	}

	return (
		<form action={dispatch}>
			<div className="flex flex-col mb-4 gap-y-1">
				<Label
					htmlFor="name"
					className={cn(state.errors?.name && 'text-red-500')}
				>
					Nombre Completo
				</Label>
				<Input
					type="text"
					name="name"
					placeholder="John Doe"
					aria-describedby="name-error"
					defaultValue={user?.name || ''}
				/>
				<FormError id="name-error" field={state.errors?.name} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1">
				<Label
					htmlFor="email"
					className={cn(state.errors?.name && 'text-red-500')}
				>
					Email
				</Label>
				<Input
					type="email"
					name="email"
					placeholder="correo@ejemplo.com"
					aria-describedby="email-error"
					defaultValue={user?.email || ''}
					disabled={!!user?.email}
				/>
				{!!user?.email && (
					<FieldDescription className="flex items-center gap-1">
						<Info className="size-3" /> Para cambiar tu email, editalo desde{' '}
						<Link
							href="/account/profile"
							className="text-primary hover:underline"
						>
							{' '}
							Mi Perfil
						</Link>
					</FieldDescription>
				)}
				<FormError id="email-error" field={state.errors?.email} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1">
				<label htmlFor="phone">Teléfono</label>
				<Input
					type="text"
					name="phone"
					aria-describedby="phone-error"
					placeholder="+5492944112233"
					defaultValue={user?.phone || ''}
					disabled={!!user?.phone}
				/>
				<FormError id="phone-error" field={state.errors?.phone} />
				{user &&
					(user.phone ? (
						<FieldDescription className="flex items-center gap-1">
							<Info className="size-3" /> Para cambiar tu teléfono, editalo
							desde{' '}
							<Link
								href="/account/profile"
								className="text-primary hover:underline"
							>
								{' '}
								Mi Perfil
							</Link>
						</FieldDescription>
					) : (
						<Alert className="mt-2 bg-secondary-950/20 border-secondary-900">
							<Info className="size-4" />
							<AlertDescription className="text-xs">
								El teléfono que ingreses será guardado en tu perfil
								automáticamente para futuras compras.
							</AlertDescription>
						</Alert>
					))}
			</div>

			<SubmitButton
				disabled={!captchaValid}
				title="Confirmar"
				className="w-full mt-6 disabled:cursor-not-allowed disabled:bg-bg-800"
			/>
			<p className="text-xs text-center text-muted-foreground">
				Al confirmar tu pedido, aceptas nuestros{' '}
				<Link
					href="/terms-and-conditions"
					className="text-secondary-200 hover:underline"
				>
					Términos y Condiciones
				</Link>
			</p>
		</form>
	);
}
