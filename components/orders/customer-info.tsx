import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
	customer: {
		name: string;
		email: string;
		phone: string;
	};
}

export function CustomerInfo({ customer }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">Información de Contacto</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm">
				<div>
					<p className="text-muted-foreground">Nombre</p>
					<p className="font-medium">{customer.name}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Email</p>
					<p className="font-medium">{customer.email}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Teléfono</p>
					<p className="font-medium">{customer.phone}</p>
				</div>
			</CardContent>
		</Card>
	);
}
