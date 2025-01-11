'use client'

import { Product } from "@prisma/client"
import { CartItem } from "@/lib/cart"
import { useEffect, useState } from "react"
import ProductCard from "../components/product-card"
import CircularProgress from "@mui/material/CircularProgress"
import 'material-icons/iconfont/outlined.css'

export default function Products() {

	const [items, setItems] = useState<CartItem[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		try {
			const fetchItems = async () => {
				const list: CartItem[] = []
				const products: Product[] = await fetch('/api/products').then(res => res.json())
				for (const product of products) {
					list.push({
						product: product,
						amount: 1,
						isInCart: false
					})
				}
				setItems(list)
			}
			fetchItems()
		} finally {
			setIsLoading(false)
		}
	}, [])

	return (
		<div className="flex w-full gap-10 py-10 justify-center">
			{isLoading ? <Loading/> : (
				items && (
					items.map((item, n) => {
						return <ProductCard key={n} item={item}/>
					})
				)	
			)}
		</div>
	)
}

const Loading = () => {
	return (
		<div className="flex w-full h-full justify-center items-center">
			<CircularProgress/>
		</div>
	)
}