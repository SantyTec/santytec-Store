import { Category, Image } from '@prisma/client';

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

export type CartProduct = FullProduct & {
	quantity: number;
	originalSubtotal?: number;
	discountAmount?: number;
	finalSubtotal?: number;
	appliedDiscounts?: Discount[];
};

export interface OptimizedProduct extends FullProduct {
	optimizedImageUrl: string
}

export type ProductsByCategory = {
	category: string;
	products: OptimizedProduct[]
};
