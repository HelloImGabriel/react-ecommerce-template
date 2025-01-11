'use client'

import Link from "next/link";
import Image from "next/image";
import 'material-icons/iconfont/outlined.css';
import { useCart } from "../components/cart-provider";
import { useEffect, useState } from "react";
import CartLayout from "../components/cart-layout";

export default function Header() {

	const {cart} = useCart()
	const [itemsCount, setItemsCount] = useState(0)
	const [openMenu, setOpenMenu] = useState<boolean>(false)

	useEffect(() => {
		setItemsCount(cart.cart.items.length)
	}, [cart])

	const CartIcon = () => {
		return ( 
			<button onClick={() => setOpenMenu(!openMenu)} className="relative flex">
				{itemsCount > 0 && (
					<div className="absolute w-4 h-4 -top-2 -right-2 text-center rounded-full bg-red-600 text-white text-[10px]">
						{cart.cart.items.length}
					</div>
				)}
				<div className="material-icons-outlined" style={{fontSize: '32px'}}>shopping_cart</div>
			</button>
		)
	}

	return (
		<div className="sticky top-0">
			<div className="relative z-40 flex w-full h-20 global-padding justify-between items-center bg-white shadow-md">
				<Link className="flex font-semibold" href={"/"}>
					<Image src={"/logo.svg"} alt={"Logo"} width={32} height={32}/>
				</Link>
				<div className="flex justify-end items-center gap-10">
					<Link className="flex" href={"/"}>Products</Link>
					<CartIcon/>
				</div>
			</div>
			{openMenu && (
				<CartLayout handlerState={setOpenMenu}/>
			)}
		</div>
	)
}