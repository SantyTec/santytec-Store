import VerifyInvitation from '@/components/auth/verify-invitation';

interface Props {
	searchParams: Promise<{
		token?: string;
	}>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
	const params = await searchParams;
	const token = params.token;

	return <VerifyInvitation token={token} />;
}
