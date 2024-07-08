'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function GReCaptchaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
	if (!KEY) throw new Error('NEXT_PUBLIC_RECAPTCHA_KEY is not defined');

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={KEY}
			container={{ parameters: { theme: 'dark' } }}
		>
			{children}
		</GoogleReCaptchaProvider>
	);
}
