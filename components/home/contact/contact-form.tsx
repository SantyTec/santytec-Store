'use client';

import { useEffect, useState, useActionState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';

import { ContactFormState, sendContactMail } from '@/lib/controller/contact';
import { validateCaptcha } from '@/lib/controller/recaptcha';

import FormError from '@/components/form-error';
import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactForm() {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [state, dispatch] = useActionState(onSubmit, {
		message: '',
		success: false,
		errors: {},
	});
	const [captchaValid, setCaptchaValid] = useState(false);

	useEffect(() => {
		async function validateRecaptcha() {
			if (!executeRecaptcha) {
				console.log('El servicio de ReCaptcha aún no está disponible.');
				return;
			}

			const gRecaptchaToken = await executeRecaptcha('contactForm');
			const response = await validateCaptcha(gRecaptchaToken);
			if (!response.success) return;

			setCaptchaValid(true);
		}
		validateRecaptcha();
	});

	async function onSubmit(prevState: ContactFormState, formData: FormData) {
		const form = document.getElementById('contact-form');
		const isForm = form instanceof HTMLFormElement;
		if (!isForm || form === null)
			return { message: 'Error de la web', success: false };

		const response = await sendContactMail(prevState, formData);

		if (!response.success) {
			toast.error(response.message);
			return response;
		}

		form.reset();
		toast.success(response.message);
		return response;
	}

	return (
		<form
			action={dispatch}
			id="contact-form"
			className="grid grid-cols-2 gap-x-4"
		>
			<div className="flex flex-col mb-4 gap-y-1 col-span-2">
				<Label htmlFor="name">Nombre</Label>
				<Input type="text" name="name" aria-describedby="name-error" />
				<FormError id="name-error" field={state.errors?.name} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1 col-span-2 md:col-span-1">
				<Label htmlFor="email">Email</Label>
				<Input type="email" name="email" aria-describedby="email-error" />
				<FormError id="email-error" field={state.errors?.email} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1 col-span-2 md:col-span-1">
				<Label htmlFor="phone">Teléfono</Label>
				<Input type="text" name="phone" aria-describedby="phone-error" />
				<FormError id="phone-error" field={state.errors?.phone} />
			</div>

			<div className="flex flex-col mb-4 gap-y-1 col-span-2">
				<Label htmlFor="phone">Mensaje</Label>
				<Textarea name="message" aria-describedby="message-error" />
				<FormError id="message-error" field={state.errors?.message} />
			</div>

			<SubmitButton
				disabled={!captchaValid}
				title="Enviar Correo"
				className="w-full col-span-2 disabled:cursor-not-allowed disabled:bg-bg-800"
			/>
		</form>
	);
}
