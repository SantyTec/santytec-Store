import { VerifyEmailClient } from '@/components/auth/verify-email-client';

interface Props {
	searchParams: Promise<{
		token?: string;
	}>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
	const params = await searchParams;
	const token = params.token;

	return <VerifyEmailClient token={token} />;
}
