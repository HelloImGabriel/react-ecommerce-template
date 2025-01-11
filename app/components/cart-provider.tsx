'use client'

import { Cart, CartClass, CartItem } from '@/lib/cart';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
	cart: CartClass;
	setCart: React.Dispatch<React.SetStateAction<CartClass>>;
	removeItemFromCart: (item: CartItem) => void; // Nueva función global;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	
	const [currentCart, setCurrentCart] = useState<CartClass>(new CartClass({items: []}))

	const removeItemFromCart = (item: CartItem) => {
		currentCart.removeItem(item);
		const newCart = new CartClass(currentCart.cart);
		setCurrentCart(newCart);
	};


	useEffect(() => {
		const recoverCart = async () => {
			const savedCartString = localStorage.getItem('cart')
			if (typeof window !== 'undefined' && savedCartString) {
				const savedCart: Cart = JSON.parse(savedCartString)
				if (savedCart.items.length > 0) {
					const newCart = new CartClass(savedCart)
					setCurrentCart(newCart)
				}
			}
		}
		recoverCart()
	  }, []);
	
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(currentCart.cart))
	}, [currentCart])

	return (
		<CartContext.Provider value={{cart: currentCart, setCart: setCurrentCart, removeItemFromCart}}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be inside a CartProvider');
    }
    return context;
};