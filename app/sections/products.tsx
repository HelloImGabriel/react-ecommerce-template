'use client'

import { Product } from "@prisma/client"
import { useEffect, useState } from "react"
import { useCart } from "../components/cart-provider"
import { CartItem } from "../cart/page"

export default function Products() {

	const {cart, setCart} = useCart()

	const [products, setProducts] = useState<Product[]>()

	const ProductCard = ({product}:{product:Product}) => {

		const cartItem: CartItem = {product: product, amount: 1}

		return (
			<div className="flex flex-col w-60 h-fit p-6 gap-4 bg-white shadow-md">
				<span className="flex font-semibold">{product.name}</span>
				<span className="flex text-sm">{product.category}</span>
				<span className="flex text-sm">{product.description}</span>
				<div className="flex justify-between">
					<span className="flex font-semibold">{`$${product.price}`}</span>
					<button onClick={() => setCart({items: [...cart.items, cartItem]})} className="flex text-blue-500">+ Add to cart</button>
				</div>
			</div>
		)
	}

	useEffect(() => {
		const fetchProducts = async () => {
			const products: Product[] = await fetch('/api/products').then(res => res.json())
			if (products) {
				if (products.length > 0) {
					setProducts(products)
				}
			}
		}
		fetchProducts()
	}, [])

	return (
		<div className="flex w-full gap-10 py-10 justify-center">
			{products && (
				products.map((product, n) => {
					return (
						<ProductCard key={n} product={product}/>
					)
				})
			)}
		</div>
	)
}