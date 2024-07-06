'use server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

if (!RECAPTCHA_SECRET_KEY) {
	throw new Error('RECAPTCHA_SECRET_KEY is not defined');
}

export async function validateCaptcha(token: string) {
	let res;

	try {
		res = await fetch(
			`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			}
		);
	} catch (error) {
		console.error(error);

		return { success: false };
	}

	if (!res.ok) return { success: false };

	const data = await res.json();
	if (!data.success || data.score < 0.5) return { success: false };

	return { success: true };
}
