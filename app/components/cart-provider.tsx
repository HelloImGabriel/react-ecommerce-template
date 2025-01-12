'use client'

import { Item } from "@/lib/cart";
import { Product } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
	items: Item[]
    allProducts: Product[]
	getProductQuantity: (id: Product) => number,
	addOneToCart: (id: Product) => void,
	removeOneFromCart: (id: Product) => void,
	deleteFromCart: (id: number) => void,
	getTotalCost: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}:{children:React.ReactNode}) {

    const [cartProducts, setCartProducts] = useState<Item[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            const products: Product[] = await fetch('/api/products').then(res => res.json())
            if (!products) {return}
            setAllProducts(products)
        }
        fetchProducts()
    }, [])

    function getProductQuantity(product: Product) {
        const quantity = cartProducts.find(item => item.product.id === product.id)?.quantity;
        
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(product: Product) {
        const quantity = getProductQuantity(product);

        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
						product: product,
						quantity: 1
					}
                ]
            )
        } else {
            setCartProducts(
                cartProducts.map(
                    item =>
                    item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            )
        }
    }

    function removeOneFromCart(product: Product) {
        const quantity = getProductQuantity(product);

        if(quantity == 1) {
            deleteFromCart(product.id);
        } else {
            setCartProducts(
                cartProducts.map(
                    item =>
					item.product.id === product.id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
            )
        }
    }

    function deleteFromCart(id: number) {
        setCartProducts(
            cartProducts =>
            cartProducts.filter(item => {
                return item.product.id != id;
            })  
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
			if (cartItem.product !== undefined) {
				totalCost += (cartItem.product.price * cartItem.quantity);
			}
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        allProducts: allProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};


// CODE DOWN HERE

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context