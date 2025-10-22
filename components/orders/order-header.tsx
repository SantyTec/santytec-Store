import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
	orderId: number;
	date: string;
}

export function OrderHeader({ orderId, date }: Props) {
	return (
		<>
			<nav className="flex items-center space-x-2 text-sm text-muted-foreground">
				<Link href="/account/orders" className="hover:text-foreground">
					Mis Órdenes
				</Link>
				<ChevronRight className="h-4 w-4" />
				<span className="text-foreground font-medium">Orden #{orderId}</span>
			</nav>

			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Orden #{orderId}
					</h1>
					<p className="text-muted-foreground mt-2">Realizado el {date}</p>
				</div>
			</div>
		</>
	);
}
