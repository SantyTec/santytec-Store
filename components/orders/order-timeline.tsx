import { CheckCircle2, Clock, Package, Truck, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';

const steps = [
	{ id: 'PREPARING', label: 'Preparando', icon: Package },
	{ id: 'DELIVERED', label: 'Entregado', icon: CheckCircle2 },
];

const statusIndex: Record<OrderStatus, number> = {
	PREPARING: 0,
	DELIVERED: 1,
};

export function OrderTimeline({ status }: { status: OrderStatus }) {
	const currentIndex = statusIndex[status];

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
