'use client'

import Link from "next/link"
import CartItemComponent from "./cart-item"
import { useCart } from "./cart-provider"
import { Dispatch, SetStateAction } from "react"
import ClickAwayListener from "@mui/material/ClickAwayListener"

export default function CartLayout({handlerState}:{handlerState:Dispatch<SetStateAction<boolean>>}) {

	const {cart} = useCart()

	const CartList = () => {
		return (
			<div className="flex flex-col w-full h-full justify-between">
				<div className="flex flex-col gap-2 p-4 overflow-y-auto">
					{cart.items.map((item, n) => {
						return (
							<CartItemComponent key={n} item={item}/>
						)
					})}
				</div>
				<Link onClick={() => handlerState(false)} className="flex px-6 py-2 m-4 justify-center rounded-md text-sm bg-blue-600 text-white" href={"/cart"}>Continue</Link>
			</div>
		)
	}

	const Empty = () => {
		return (
			<div className="flex w-full h-full justify-center items-center">
				<div className="flex">{"The cart it's empty"}</div>
			</div>
		)
	}

	return (
		<div className="absolute flex w-full h-screen top-0 left-0 pt-20 justify-end bg-black/40">
			<ClickAwayListener onClickAway={() => handlerState(false)}>
				<div className="flex flex-col w-96 h-full bg-white">
					{cart.items.length > 0 ? <CartList/> : <Empty/>}
				</div>
			</ClickAwayListener>
		</div>
	)
}