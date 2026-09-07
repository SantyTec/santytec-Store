import { handleGetFormattedUserOrders } from '@/lib/controller/order';
import { Category, Image } from '@prisma/client';

export type VerificationState = 'loading' | 'success' | 'error' | 'invalid';

export interface TokenVerificationProps {
	token?: string;
}

export type DataResponse = {
	success: boolean;
	message: string;
	data?: unknown;
};

export type FullProduct = {
  id: string;
	name: string;
	description: string | null;
	price: string;
	stock: number;
	isArchived: boolean;
	images: Image[];
	category: Category;
	categoryId: string;
};

export type Discount = {
	id: string;
	name: string;
	type: 'PERCENTAGE' | 'FIXED';
	value: number;
};

export type CartProduct = {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	originalSubtotal?: number;
	discountAmount?: number;
	finalSubtotal?: number;
	appliedDiscounts?: Discount[];
};

export interface OptimizedProduct extends FullProduct {
	optimizedImageUrl: string;
}

export type ProductsByCategory = {
	category: string;
	products: OptimizedProduct[];
};

export type SessionUser = {
	id: string;
	name?: string | null;
	email?: string | null;
	phone?: string | null;
} | null;

export type LoadedCartProduct = {
	id: string;
	name: string;
	price: string;
	quantity: number;
	image: string;
};

type HandleGetFormattedUserOrdersReturn = Awaited<
	ReturnType<typeof handleGetFormattedUserOrders>
  >;

export type FormattedOrder = HandleGetFormattedUserOrdersReturn['data'][number];
