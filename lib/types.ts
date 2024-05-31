import { Category, Image, Prisma } from '@prisma/client';
import { getProductsByName } from "./data/products";

export type DataResponse = {
	success: boolean;
	message: string;
	data?: unknown;
};

export type FullProduct = {
	id: string;
	name: string;
	description: string | null;
	price: number;
	stock: number;
	isArchived: boolean;
	images: Image[];
	category: Category;
	categoryId: string;
};
