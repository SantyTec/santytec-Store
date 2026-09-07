import ResetPassword from '@/components/auth/reset-password';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface Props {
	searchParams: Promise<{
		token?: string;
	}>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
	const params = await searchParams;
	const token = params.token;

	return (
		<div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Reestablecer Contraseña
					</CardTitle>
					<CardDescription>
						Ingresa tu nueva contraseña a continuación.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ResetPassword token={token} />
				</CardContent>
			</Card>
		</div>
	);
}
