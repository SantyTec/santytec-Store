import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { OrderHeader } from '@/components/orders/order-header';
import { CustomerInfo } from '@/components/orders/customer-info';
import { LineItemsTable } from '@/components/orders/line-items-table';
import { OrderTotals } from '@/components/orders/order-totals';
import { handleGetOrder } from '@/lib/controller/order';
import { OrderTimeline } from '@/components/orders/order-timeline';

export default async function OrderPage({
	params,
}: {
	params: { id: string };
}) {
	const { data: order, success } = await handleGetOrder(params.id);

	if (!success || !order) {
		notFound();
	}

	return (
		<div className="container px-4 py-8 md:px-6">
			<div className="space-y-6">
				<OrderHeader orderId={order.id} date={order.date} />

				<OrderTimeline status={order.status} />

				<div className="grid gap-6 md:grid-cols-2">
					<CustomerInfo customer={order.customer} />
				</div>

				<LineItemsTable items={order.items} />

				<OrderTotals
					subtotal={order.originalSubtotal}
					total={order.finalSubtotal}
					discount={
						order.discounts.length > 0
							? {
									code: order.discounts[0].name,
									percentage:
										order.discounts[0].type === 'PERCENTAGE'
											? order.discounts[0].value
											: (order.discountAmount / order.originalSubtotal) * 100,
									amount: order.discountAmount,
							  }
							: undefined
					}
				/>
			</div>
		</div>
	);
}
