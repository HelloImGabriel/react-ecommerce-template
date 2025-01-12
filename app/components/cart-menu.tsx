import { useCart } from "./cart-provider"
import { formatPrice } from "@/lib/utils"
import { motion } from "motion/react"
import { Dispatch, SetStateAction } from "react"
import CartItem from "./cart-item"
import ClickAwayListener from "@mui/material/ClickAwayListener"

export default function CartMenu({setOpenMenu}:{setOpenMenu:Dispatch<SetStateAction<boolean>>}) {
	return (
			<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			transition={{duration: 0.2}}
			className="absolute top-0 left-0 flex w-full h-screen justify-end bg-black/40 overflow-hidden">
				<ClickAwayListener onClickAway={() => setOpenMenu(false)}>
					<motion.div
					initial={{opacity: 0, x: 100}}
					animate={{opacity: 1, x: 0}}
					exit={{opacity: 0, x: 100}}
					transition={{bounce: 0}}
					className="flex w-80 h-full p-4 gap-10 bg-white">
						<CartItems/>
					</motion.div>
				</ClickAwayListener>
			</motion.div>
	)
}

const CartItems = () => {

	const cart = useCart()

	return (
		<div className="flex flex-col w-full h-full">
			{cart.items.length > 0 ?
				(
					<div className="flex flex-col w-full h-full gap-10">
						<div className="flex flex-col w-full h-full px-4 gap-10 overflow-y-auto">
							{cart.items.map((item, n) => {
								return <CartItem key={n} item={item}/>
							})}
						</div>
						<div className="flex flex-col gap-3">
							<div className="flex p-4 justify-between">
								<span className="flex">Total</span>
								<span className="flex">{formatPrice(cart.getTotalCost())}</span>
							</div>
							<button className="flex w-full py-2 justify-center rounded-md bg-blue-600 text-white">Continue</button>
						</div>
					</div>
				)
			:
				<span className="flex w-full h-full justify-center items-center">{"The cart it's empty"}</span>
			}
		</div>
	)
}