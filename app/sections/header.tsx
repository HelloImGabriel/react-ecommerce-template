'use client'

import Link from "next/link";
import 'material-icons/iconfont/outlined.css';
import { useCart } from "../components/cart-provider";
import { useState } from "react";
import CartLayout from "../components/cart-layout";

export default function Header() {

	const {cart} = useCart()
	const [openMenu, setOpenMenu] = useState<boolean>(false)

	const CartIcon = () => {
		return ( 
			<button onClick={() => setOpenMenu(!openMenu)} className="relative flex">
				{cart.items.length > 0 && (
					<div className="absolute w-4 h-4 -top-2 -right-2 text-center rounded-full bg-red-600 text-white text-[10px]">
						{cart.items.length}
					</div>
				)}
				<div className="material-icons-outlined" style={{fontSize: '32px'}}>shopping_cart</div>
			</button>
		)
	}

	return (
		<div className="relative">
			<div className="relative z-50 flex w-full h-20 global-padding justify-between items-center bg-white shadow-md">
				<span className="flex font-semibold">Logo</span>
				<div className="flex justify-end items-center gap-10">
					<Link className="flex" href={"/"}>Home</Link>
					<Link className="flex" href={"#"}>Products</Link>
					<CartIcon/>
				</div>
			</div>
			{openMenu && (
				<CartLayout handlerState={setOpenMenu}/>
			)}
		</div>
	)
}