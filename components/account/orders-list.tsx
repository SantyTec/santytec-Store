'use client';

import { getStatusBadge } from '@/components/badges';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormattedOrder } from '@/lib/types';
import { cn } from '@/lib/utils';
import { OrderStatus } from '@prisma/client';
import { Search, Package, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
	orders: FormattedOrder[];
}

export default function OrdersList({ orders }: Props) {
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const ordersPerPage = 5;

	const filteredOrders = orders.filter((order) => {
		return statusFilter === 'all' || order.status === statusFilter;
	});

	const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
	const startIndex = (currentPage - 1) * ordersPerPage;
	const paginatedOrders = filteredOrders.slice(
		startIndex,
		startIndex + ordersPerPage
	);

	return (
		<>
			<Tabs value={statusFilter} onValueChange={setStatusFilter}>
				<TabsList>
					<TabsTrigger value="all">Todas</TabsTrigger>
					<TabsTrigger value="PENDING">Pendientes</TabsTrigger>
					<TabsTrigger value="CONFIRMED">Confirmadas</TabsTrigger>
					<TabsTrigger value="PREPARING">En Preparación</TabsTrigger>
					<TabsTrigger value="SHIPPED">En Camino</TabsTrigger>
					<TabsTrigger value="DELIVERED">Entregada</TabsTrigger>
					<TabsTrigger value="CANCELLED">Canceladas</TabsTrigger>
				</TabsList>

				{/* Orders List */}
				<div className="space-y-4">
					{paginatedOrders.length === 0 ? (
						<Card>
							<CardContent className="flex flex-col items-center justify-center py-12">
								<Package className="h-12 w-12 text-muted-foreground mb-4" />
								<h3 className="text-lg font-semibold mb-2">
									No se encontraron órdenes
								</h3>
								<p className="text-muted-foreground text-center mb-4">
									No hay órdenes que coincidan con tu búsqueda
								</p>
								<Button asChild variant="accent">
									<Link href="/products">Explorar Productos</Link>
								</Button>
							</CardContent>
						</Card>
					) : (
						<TabsContent value={statusFilter}>
							{paginatedOrders.map((order) => (
								<Card
									key={order.id}
									className="transition-shadow hover:shadow-md"
								>
									<CardHeader>
										<div className="flex items-start justify-between">
											<div className="space-y-1">
												<div className="flex items-center gap-3">
													<CardTitle className="text-lg">{order.id}</CardTitle>
													{getStatusBadge(order.status)}
													<Badge
														variant={order.isPaid ? 'success' : 'destructive'}
													>
														Pago {order.isPaid ? 'realizado' : 'pendiente'}
													</Badge>
												</div>
												<CardDescription>
													Pedido el {order.createdAt} •{' '}
													{order.orderItems.length}{' '}
													{order.orderItems.length === 1
														? 'producto'
														: 'productos'}
												</CardDescription>
											</div>
											<Button variant="ghost" size="sm" asChild>
												<Link href={`/account/orders/${order.id}`}>
													Ver detalles
													<ChevronRight className="ml-1 h-4 w-4" />
												</Link>
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex flex-wrap gap-2">
												{order.orderItems.map((item, index) => (
													<Badge key={index} variant="outline">
														{item.product?.name}
													</Badge>
												))}
											</div>
											<div className="flex items-center justify-between border-t pt-3">
												<div className="space-y-1">
													{order.discountAmount > 0 && (
														<p className="text-sm text-muted-foreground">
															Descuento aplicado:{' '}
															<span className="font-semibold text-accent">
																${order.discountAmount.toFixed(2)}
															</span>
														</p>
													)}
													<p className="text-lg font-bold">
														Total:{' '}
														<span className="text-primary">
															${order.finalSubtotal.toFixed(2)}
														</span>
													</p>
												</div>
												{order.status === OrderStatus.DELIVERED && (
													<Button variant="outline" size="sm">
														Volver a comprar
													</Button>
												)}
											</div>
										</div>
									</CardContent>
								</Card>
							))}

							{/* Pagination */}
							{totalPages > 1 && (
								<div className="flex justify-center pt-4">
									<Pagination>
										<PaginationContent>
											<PaginationItem>
												<PaginationPrevious
													onClick={() =>
														setCurrentPage((p) => Math.max(1, p - 1))
													}
													className={
														currentPage === 1
															? 'pointer-events-none opacity-50'
															: 'cursor-pointer'
													}
												/>
											</PaginationItem>
											{[...Array(totalPages)].map((_, i) => (
												<PaginationItem key={i}>
													<PaginationLink
														onClick={() => setCurrentPage(i + 1)}
														isActive={currentPage === i + 1}
													>
														{i + 1}
													</PaginationLink>
												</PaginationItem>
											))}
											<PaginationItem>
												<PaginationNext
													onClick={() =>
														setCurrentPage((p) => Math.min(totalPages, p + 1))
													}
													className={
														currentPage === totalPages
															? 'pointer-events-none opacity-50'
															: 'cursor-pointer'
													}
												/>
											</PaginationItem>
										</PaginationContent>
									</Pagination>
								</div>
							)}
						</TabsContent>
					)}
				</div>
			</Tabs>
		</>
	);
}
