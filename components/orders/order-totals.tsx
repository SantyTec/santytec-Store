import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Props {
	subtotal: number;
	discount?: {
		code: string;
		percentage: number;
		amount: number;
	};
	total: number;
}

export function OrderTotals({ subtotal, discount, total }: Props) {
	return (
		<>
			{discount && (
				<Card className="border-accent bg-accent/10">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Badge className="bg-accent text-accent-foreground">
									{discount.code}
								</Badge>
								<div>
									<p className="font-semibold">Descuento Aplicado</p>
									<p className="text-sm text-muted-foreground">
										{discount.percentage}% de descuento en tu orden
									</p>
								</div>
							</div>
							<p className="text-2xl font-bold text-accent">
								-${discount.amount.toFixed(2)}
							</p>
						</div>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardContent className="pt-6">
					<div className="space-y-3">
						<div className="flex justify-between text-sm">
							<span className="text-muted-foreground">Subtotal</span>
							<span className="font-medium">${subtotal.toFixed(2)}</span>
						</div>
						{discount && (
							<div className="flex justify-between text-sm">
								<span className="text-muted-foreground">
									Descuento ({discount.code})
								</span>
								<span className="font-medium text-accent">
									-${discount.amount.toFixed(2)}
								</span>
							</div>
						)}
						<Separator />
						<div className="flex justify-between">
							<span className="text-lg font-semibold">Total</span>
							<span className="text-2xl font-bold text-primary">
								${total.toFixed(2)}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
