'use client'

import Image from 'next/image'
import 'material-icons/iconfont/outlined.css'
import { useState } from 'react'
import { useCart } from '../components/cart-provider'
import CartMenu from '../components/cart-menu'
import { AnimatePresence } from 'motion/react'

export default function Header() {

	const cart = useCart()
	const [openMenu, setOpenMenu] = useState<boolean>(false)

	return (
		<div className="relative flex w-full h-20 justify-between items-center px-40 bg-white shadow-md">
			<div className="flex">
				<Image src={'logo.svg'} alt={'Logo'} width={34} height={34}/>
			</div>
			<div className="relative flex">
				<button onClick={() => setOpenMenu(!openMenu)} className="flex w-10 h-10 justify-center items-center">
					{cart.items.length > 0 && (
						<div className="absolute flex top-0 right-0 w-4 h-4 rounded-full justify-center items-center bg-red-600 select-none">
							<div className="flex text-center text-[10px] leading-none text-white">{cart.items.length}</div>
						</div>
					)}
					<span className="material-icons-outlined text-[28px] select-none">shopping_cart</span>
				</button>
			</div>
			<AnimatePresence>
				{openMenu && (
						<CartMenu setOpenMenu={setOpenMenu}/>
					)}
			</AnimatePresence>
		</div>
	)
}