'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Cart } from '../cart/page';

interface CartContextType {
	cart: Cart;
	setCart: React.Dispatch<React.SetStateAction<Cart>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	
	const [currentCart, setCurrentCart] = useState<Cart>({items: []})

	useEffect(() => {
		const recoverCart = async () => {
			const savedCartString = localStorage.getItem('cart')
			if (typeof window !== 'undefined' && savedCartString) {
				const savedCart: Cart = JSON.parse(savedCartString)
				if (savedCart.items.length > 0) {
					setCurrentCart(savedCart)
				}
			}
		}
		recoverCart()
	  }, []);
	
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(currentCart))
		//DEBUG: LOG
		console.log(currentCart)
	}, [currentCart])

	return (
		<CartContext.Provider value={{cart: currentCart, setCart: setCurrentCart}}>
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