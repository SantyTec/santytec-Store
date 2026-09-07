import { CheckCircle2, Clock, Package, Truck, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';

const steps = [
	{ id: 'PENDING', label: 'Pendiente', icon: Clock },
	{ id: 'CONFIRMED', label: 'Confirmado', icon: CheckCircle2 },
	{ id: 'PREPARING', label: 'Preparando', icon: Package },
	{ id: 'SHIPPED', label: 'Enviado', icon: Truck },
	{ id: 'DELIVERED', label: 'Entregado', icon: CheckCircle2 },
];

const statusIndex: Record<OrderStatus, number> = {
	PENDING: 0,
	CONFIRMED: 1,
	PREPARING: 2,
	SHIPPED: 3,
	DELIVERED: 4,
	CANCELLED: -1,
};

export function OrderTimeline({ status }: { status: OrderStatus }) {
	const currentIndex = statusIndex[status];

	// Si la orden está cancelada, mostrar un estado especial
	if (status === 'CANCELLED') {
		return (
			<div className="flex items-center justify-center p-4 bg-destructive/10 rounded-lg">
				<XCircle className="h-5 w-5 text-destructive mr-2" />
				<p className="text-sm font-medium text-destructive">Orden Cancelada</p>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
				<div
					className="h-full bg-primary transition-all duration-500"
					style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
				/>
			</div>
			<div className="relative flex justify-between">
				{steps.map((step, index) => {
					const Icon = step.icon;
					const isCompleted = index <= currentIndex;
					const isCurrent = index === currentIndex;

					return (
						<div key={step.id} className="flex flex-col items-center">
							<div
								className={cn(
									'flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background transition-colors',
									isCompleted
										? 'border-primary text-primary'
										: 'border-border text-muted-foreground',
									isCurrent && 'ring-4 ring-primary/20'
								)}
							>
								<Icon className="h-5 w-5" />
							</div>
							<p
								className={cn(
									'mt-2 text-xs font-medium',
									isCompleted ? 'text-foreground' : 'text-muted-foreground',
									'hidden sm:block'
								)}
							>
								{step.label}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
