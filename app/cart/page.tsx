'use client'

import { Product } from "@prisma/client"
import React, { ReactNode } from "react"
import { useCart } from "../components/cart-provider"
import CartItem from "../components/cart-item"
import { formatPrice } from "@/lib/utils"

export interface CartItem {
	product: Product
	amount: number
}

export interface Cart {
	items: CartItem[]
}

const extraCharges = [{charge: 'Entrega', price: 40}]

export default function CartPage () {

	const {cart} = useCart()

	const getSubtotal = () => {
		let subtotal = 0
		for (const item of cart.items) {
			subtotal += item.product.price * item.amount
		}
		return subtotal
	}

	const getTotal = () => {
		let total = getSubtotal()
		for (const charge of extraCharges) {
			total += charge.price
		}
		return total
	}

	const EmptyCart = (): ReactNode => {
		return (
			<div className="flex">Su carro esta vacío, vuelva al inicio.</div>
		)
	}

	const Cart = (): ReactNode => {
		return (
			<div className="flex gap-10">
				<div className="flex flex-col w-full">
					<div className="flex flex-col w-full gap-2">
						<div className="w-full h-[1px] bg-black"></div>
						<div className="flex justify-between px-10 uppercase text-[12px] font-semibold">
							<span className="flex">Producto</span>
							<span className="flex">Total</span>
						</div>
						<div className="w-full h-[1px] bg-black/10"></div>
					</div>
					{cart.items.map((item, key) => {
						return (
							<div key={key} className="flex flex-col py-4">
								<CartItem item={item}/>
								<div className="w-full h-[1px] bg-black/10"></div>
							</div>
						)
					})}
				</div>
				<div className="flex flex-col w-1/3 h-80">
					<div className="flex flex-col w-full gap-2">
						<div className="w-full h-[1px] bg-black"></div>
						<span className="flex text-[12px] font-semibold uppercase">Totales del carrito</span>
						<div className="w-full h-[1px] bg-black/10"></div>
					</div>
					<div className="flex flex-col w-full px-4 py-6 justify-around gap-8">
						<div className="flex justify-between px-4">
							<span className="flex">Subtotal</span>
							<span className="flex">{formatPrice(getSubtotal())}</span>
						</div>
						{extraCharges.map((charge, n) => {
							return (
								<div key={n} className="flex justify-between px-4">
									<span className="flex">{charge.charge}</span>
									<span className="flex">{formatPrice(charge.price)}</span>
								</div>
							)
						})}
					</div>
					<div className="w-full h-[1px] bg-black/10"></div>
					<div className="flex flex-col h-1/2 justify-center px-4">
						<div className="flex justify-between px-4 font-semibold">
							<span className="flex">Total</span>
							<span className="flex">{formatPrice(getTotal())}</span>
						</div>
					</div>
					<button
					className="flex border border-red-400 text-red-400 rounded-full justify-center py-2">
						Finalizar compra
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col w-full px-2 md:px-10 xl:px-60 py-20">
			{(cart.items.length > 0) ? <Cart/> : <EmptyCart/>}
		</div>
	)
}