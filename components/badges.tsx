import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
	const statusConfig = {
		delivered: {
			label: 'Entregado',
			variant: 'default' as const,
			className: 'bg-green-500 hover:bg-green-600',
		},
		in_transit: {
			label: 'En Tránsito',
			variant: 'secondary' as const,
			className:
				'border-transparent bg-secondary text-secondary-950 hover:bg-secondary/80',
		},
		processing: {
			label: 'Procesando',
			variant: 'outline' as const,
			className: 'text-foreground',
		},
		cancelled: {
			label: 'Cancelado',
			variant: 'destructive' as const,
			className: 'border-transparent bg-red-600 text-white hover:bg-red-600/80',
		},
	};

	const config =
		statusConfig[status as keyof typeof statusConfig] ||
		statusConfig.processing;
	return (
		<Badge variant={config.variant} className={config.className}>
			{config.label}
		</Badge>
	);
};
