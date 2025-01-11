'use client'

import TextField from "@mui/material/TextField";
import { useCart } from "./cart-provider";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { CartItem, CartClass } from "@/lib/cart";

export default function CartItemComponent({item}:{item:CartItem}) {

	const {cart, setCart, removeItemFromCart} = useCart()

	const handleAmountChange = (value: string) => {
		cart.changeAmount(item, parseInt(value))
		const newCart = new CartClass(cart.cart)
		setCart(newCart)
	};
	
	const removeItem = () => {
		removeItemFromCart(item)
		item.amount = 1
		item.isInCart = false
	}
	
	return (
		<div className="flex w-full justify-between px-10 pb-10">
			<div className="flex flex-col w-full">
				<div className="flex flex-col gap-4">
					<div className="flex gap-10">
						<div className="flex flex-col gap-2">
							<span className="flex text-primary font-semibold">{item.product.name}</span>
							<span className="flex">{formatPrice(item.product.price)}</span>
						</div>
					</div>
					<div className="flex">
						<ChangePropertyAmount
							value={item.amount}
							text={"Cantidad"}
							handler={handleAmountChange}/>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-between">
				<span className="flex">{formatPrice(item.product.price * item.amount)}</span>
					<button onClick={() => removeItem()} className="flex text-[12px] text-red-400">Remove</button>
			</div>
		</div>
	)
}

export const ChangePropertyAmount = ({text,value,handler}:{text:string,value:number,handler:CallableFunction}) => {
	return (
		<div className="flex flex-col">
			<span className="flex text-[10px]">{text}</span>
			{NumberInputField(value, handler)}
		</div>
	);
};

const NumberInputField = (value: number | "" | (() => number | ""), handler:CallableFunction) => {

	const [currentValue, setCurrentValue] = useState<number | ''>(value);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value === '' ? '' : Number(event.target.value);
		if(newValue === '' || (newValue >= 1 && newValue <= 10)) {
			setCurrentValue(newValue);
		}
    };
	
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const valueToSet = event.target.value === '' ? 1 : currentValue;
		handler(valueToSet)
    };

	return (
		<TextField
		type="number"
		value={currentValue}
		onChange={handleChange}
		onBlur={handleBlur}
		size="small"
		sx={{
			'& .MuiInputBase-input': {
				padding: '0.4rem',
				order: '1'
			},
			'& .MuiInputBase-root': {
				fontSize: '12px'
			}
		}}
		slotProps={{
			inputLabel: {
				shrink: false,
				hidden: true
			},
			htmlInput: {
				min: 1,
				max: 10,
				step: 1
			}
		}}/>
	)
}