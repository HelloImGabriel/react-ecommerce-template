'use client'

import { formatPrice } from "@/lib/utils"
import CartItem from "../components/cart-item"
import { useCart } from "../components/cart-provider"

export default function CartPage() {

	const cart = useCart()

	return (
		<div className="flex w-full h-[680px] py-10 px-40 bg-neutral-100">
			{cart.items.length > 0 ? 
				<div className="flex w-full h-full gap-20">
					<div className="flex flex-col flex-grow h-full justify-between gap-4">
						<div className="flex flex-col uppercase text-[12px] font-semibold">
							<Line color={"bg-black"}/>
							<div className="flex w-full justify-between px-4 py-2">
								<span className="flex">Product</span>
								<span className="flex">Total</span>
							</div>
							<Line color={"bg-black/10"}/>
						</div>
						<div className="flex flex-col w-full h-full gap-4 overflow-y-auto px-4 nested-content">
							{cart.items.map((item, n) => {
								return (
									<div key={n} className="flex flex-col w-full gap-4">
										<CartItem item={item}/>
										<Line color={"bg-neutral-200"}/>
									</div>
								)
							})}
						</div>
						<div className="flex flex-col uppercase">
							<Line color={"bg-neutral-400"}/>
							<div className="flex w-full font-semibold p-4 justify-between">
								<span className="flex">Subtotal</span>
								<span className="flex">{formatPrice(cart.getTotalCost())}</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col w-1/3 h-full gap-10">
						<div className="flex flex-col w-full h-full gap-8">
							<div className="flex flex-col w-full gap-2">
								<div className="w-full h-[1px] bg-black"></div>
								<span className="flex text-[12px] font-semibold uppercase">Totales del carrito</span>
								<div className="w-full h-[1px] bg-black/10"></div>
							</div>
							<div className="flex flex-col w-full p-4 gap-4">
								<div className="flex justify-between px-4">
									<span className="flex">Subtotal</span>
									<span className="flex">{formatPrice(cart.getTotalCost())}</span>
								</div>
								<div className="flex justify-between px-4">
									<span className="flex">Deliver</span>
									<span className="flex">Free</span>
								</div>
							</div>
							<Line color={"bg-black"}/>
							<div className="flex flex-col justify-center px-4">
								<div className="flex justify-between px-4 font-semibold">
									<span className="flex">Total</span>
									<span className="flex">{formatPrice(cart.getTotalCost())}</span>
								</div>
							</div>
						</div>
						<button
						className="flex bg-primary text-white rounded-full justify-center py-2">
							Finalizar compra
						</button>
					</div>
				</div>
				:
				<span className="flex">{"The cart it's empty"}</span>
			}
		</div>
	)
}

const Line = (props: {color: string}) => {
	return (
		<div className={`flex w-full h-[1px] ${props.color}`}></div>
	)
}