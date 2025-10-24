'use client';

import { CartStore, createCartStore, initCartStore } from '@/stores/cart-store';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

export const CartStoreContext = createContext<StoreApi<CartStore> | null>(null);

export interface CartStoreProviderProps {
	children: ReactNode;
}

export const CartStoreProvider = ({ children }: CartStoreProviderProps) => {
	const storeRef = useRef<StoreApi<CartStore> | null>(null);
	if (!storeRef.current) {
		storeRef.current = createCartStore(initCartStore());
	}

	return (
		<CartStoreContext.Provider value={storeRef.current}>
			{children}
		</CartStoreContext.Provider>
	);
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
	const cartStoreContext = useContext(CartStoreContext);

	if (!cartStoreContext) {
		throw new Error(
			`useCartStore debe ser usado dentro de un CartStoreProvider.`
		);
	}

	return useStore(cartStoreContext, selector);
};
