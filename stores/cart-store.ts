import toast from 'react-hot-toast';
import { shared } from 'use-broadcast-ts';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/lib/types';

export type CartState = {
	items: CartProduct[];
};

export type CartActions = {
	addItem: (item: CartProduct) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
	setItemQuantity: (id: string, quantity: number) => void;
};

export type CartStore = CartState & CartActions;

export const initCartStore = (): CartState => {
	return { items: [] };
};

export const defaultInitState: CartState = {
	items: [],
};

export const createCartStore = (initState: CartState = defaultInitState) => {
	return createStore<CartStore>()(
		shared(
			persist(
				(set, get) => ({
					...initState,

					addItem: (product) => {
						const currentItems = get().items;
						const existingItem = currentItems.find(
							(item) => item.id === product.id
						);

						if (existingItem)
							return toast.error('El producto ya existe en el carrito', {
								duration: 500,
							});

						set((state) => ({
							items: [...state.items, product],
						}));

						toast.success('Producto agregado al carrito', {
							duration: 500,
						});
					},

					removeItem: (id) => {
						set((state) => ({
							items: [...state.items.filter((item) => item.id !== id)],
						}));

						toast.success('Producto removido del carrito', {
							duration: 500,
						});
					},

					removeAll: () => set(() => ({ items: [] })),

					setItemQuantity: (id, quantity) => {
						if (quantity <= 0)
							return toast.error('La cantidad debe ser mayor a cero.', {
								duration: 500,
							});

						const currentItems = get().items;
						const existingItem = currentItems.find((item) => item.id === id);

						if (!existingItem)
							return toast.error('El producto no existe en el carrito', {
								duration: 500,
							});

						set((state) => ({
							items: state.items.map((item) =>
								item.id === id ? { ...item, quantity } : item
							),
						}));
						return;
					},
				}),

				{ name: 'cart-store' }
			)
		)
	);
};
