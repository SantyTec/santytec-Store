'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useActionState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';

import { CheckoutFormState, processOrder } from '@/lib/controller/orders';
import { validateCaptcha } from '@/lib/controller/recaptcha';
import { CartProduct } from '@/lib/types';

import FormError from '@/components/form-error';
import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';

export default function CheckoutForm({
	items,
	clearCart,
}: {
	items: CartProduct[];
	clearCart: () => void;
}) {
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
		const { success, message, errors } = await processOrder(
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

		router.push('/success');
		clearCart();

		return { message, success };
	}

	return (
		<form action={dispatch}>
			<div className="flex flex-col mb-4 gap-y-1">
				<label htmlFor="name">Nombre</label>
				<Input type="text" name="name" aria-describedby="name-error" />
				<FormError id="name-error" field={state.errors?.name} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1">
				<label htmlFor="email">Email</label>
				<Input type="email" name="email" aria-describedby="email-error" />
				<FormError id="email-error" field={state.errors?.email} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1">
				<label htmlFor="phone">Teléfono</label>
				<Input type="text" name="phone" aria-describedby="phone-error" />
				<FormError id="phone-error" field={state.errors?.phone} />
			</div>

			<SubmitButton
				disabled={!captchaValid}
				title="Confirmar"
				className="w-full mt-6 disabled:cursor-not-allowed disabled:bg-bg-800"
			/>
		</form>
	);
}
