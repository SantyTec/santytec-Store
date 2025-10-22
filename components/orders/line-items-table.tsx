import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface LineItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
}

interface Props {
	items: LineItem[];
}

export function LineItemsTable({ items }: Props) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Productos</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{items.map((item) => (
						<div key={item.id} className="flex items-center gap-4">
							<div className="h-20 w-20 rounded-lg border bg-muted flex items-center justify-center">
								{item.image ? (
									<img
										src={item.image}
										alt={item.name}
										className="h-full w-full object-cover rounded-lg"
									/>
								) : (
									<Package className="h-8 w-8 text-muted-foreground" />
								)}
							</div>
							<div className="flex-1">
								<p className="font-medium">{item.name}</p>
								<p className="text-sm text-muted-foreground">
									Cantidad: {item.quantity}
								</p>
							</div>
							<div className="text-right">
								<p className="font-semibold">
									${(item.price * item.quantity).toFixed(2)}
								</p>
								<p className="text-sm text-muted-foreground">
									${item.price.toFixed(2)} c/u
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
