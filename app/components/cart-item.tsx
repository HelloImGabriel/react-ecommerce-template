'use client'

import TextField from "@mui/material/TextField";
import { useCart } from "./cart-provider";
import { useState } from "react";
import { Cart, CartItem } from "../cart/page";
import { addItemAtIndex, formatPrice, removeItemAtIndex } from "@/lib/utils";

export default function CartItemComponent({item}:{item:CartItem}) {

	const {cart, setCart} = useCart()

	const itemIndex = cart.items.indexOf(item)

	const ChangePropertyAmount = ({text,value,handler}:{text:string,value:number,handler:CallableFunction}) => {
		return (
			<div className="flex flex-col">
				<span className="flex text-[10px]">{text}</span>
				{NumberInputField(value, handler)}
			</div>
		);
	};

	const handleAmountChange = (value: string) => {
		const newItem = cart.items[itemIndex]
		newItem.amount = parseFloat(value)
		let newItems = removeItemAtIndex(cart.items, itemIndex)
		newItems = addItemAtIndex(newItems, itemIndex, newItem)
		const newCart: Cart = {
			items: newItems
		}
		setCart(newCart)
		console.log(newCart)
	};

	const removeItem = () => {
		const items = removeItemAtIndex(cart.items, itemIndex)
		const newCart: Cart = {
			items: items
		}
		setCart(newCart)
	}	
	
	return (
		<div className="flex w-full justify-between px-10 pb-10">
			<div className="flex flex-col w-full">
				<div className="flex flex-col gap-10">
					<div className="flex gap-10">
						<div className="flex flex-col gap-2">
							<span className="flex text-primary font-semibold">{item.product.name}</span>
							<span className="flex">{formatPrice(item.product.price)}</span>
						</div>
						<div className="flex gap-4">
							<ChangePropertyAmount
								value={item.amount}
								text={"Cantidad"}
								handler={handleAmountChange}/>
						</div>
					</div>
					<button onClick={() => removeItem()} className="flex text-[12px] text-red-400">Remove</button>
				</div>
			</div>
			<span className="flex">{formatPrice(item.product.price * item.amount)}</span>
		</div>
	)
}

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