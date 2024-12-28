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

export type CartProduct = FullProduct & {
	quantity: number
}