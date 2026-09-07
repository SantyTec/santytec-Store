import { auth } from '@/auth';
import { AccountTabs } from '@/components/account/account-tabs';
import { ProfileForm } from '@/components/account/profile-form';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { handleGetUser } from '@/lib/controller/user';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
	const session = await auth();
	if (!session) redirect('/login');

	const { data: user } = await handleGetUser(session.user.id);

	return (
		<div className="container px-4 py-8 md:px-6">
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Mi Cuenta</h1>
					<p className="text-muted-foreground mt-2">
						Administra tu información personal
					</p>
				</div>

				<AccountTabs />

				{/* Profile Information */}
				<Card>
					<CardHeader>
						<CardTitle>Información Personal</CardTitle>
						<CardDescription>Actualiza tus datos de contacto</CardDescription>
					</CardHeader>
					<CardContent>
						<ProfileForm
							values={{
								email: user!.email!,
								name: user!.name!,
								phone: user!.phone,
							}}
						/>
					</CardContent>
				</Card>

				{/* Password Change */}
				<Card>
					<CardHeader>
						<CardTitle>Cambiar Contraseña</CardTitle>
						<CardDescription>
							Actualiza tu contraseña periódicamente para mayor seguridad
						</CardDescription>
					</CardHeader>
					<CardContent>{/* <PasswordForm /> */}</CardContent>
				</Card>

				{/* Danger Zone */}
				<Card className="border-destructive/50">
					<CardHeader>
						<CardTitle className="text-destructive">Zona de Peligro</CardTitle>
						<CardDescription>
							Esta acción es irreversible. Ten cuidado.
						</CardDescription>
					</CardHeader>
					<CardContent>{/* <DeleteAccountSection /> */}</CardContent>
				</Card>
			</div>
		</div>
	);
}
