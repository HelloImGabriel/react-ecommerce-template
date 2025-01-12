'use client'

import { Product } from "@prisma/client";
import { useCart } from "./cart-provider";
import { formatPrice } from "@/lib/utils";

export default function ProductCard(props: { product: Product; }) {
	
	const product = props.product;
    const cart = useCart();
	if (!cart) {return null}
    const productQuantity = cart.getProductQuantity(product);

	return (
		<div className="flex flex-col w-60 h-60 p-6 justify-between bg-white shadow-md">
			<div className="flex flex-col gap-2">
				<span className="flex text-xl">{product.name}</span>
				<span className="flex text-sm text-neutral-400">{product.category}</span>
				<p className="flex text-sm">{product.description}</p>
				<span className="flex text-2xl font-semibold">{formatPrice(product.price)}</span>
			</div>
			{productQuantity ?
				<div className="flex w-full justify-between">
					<ProductButtons product={product}/>
				</div>
			:
				<button onClick={() => cart.addOneToCart(product)} className="flex text-blue-500">+ Add to cart</button>
			}
		</div>
	)
}

export const ProductButtons = ({product}:{product:Product}) => {

	const cart = useCart()
	const productQuantity = cart.getProductQuantity(product);

	return (
		<div className="flex w-full">
			<div className="flex w-full items-center">
				<QuantityButton label={"-"} onClick={() => cart.removeOneFromCart(product)}/>
				<div className="flex w-10 justify-center">{productQuantity}</div>
				<QuantityButton label={"+"} onClick={() => cart.addOneToCart(product)}/>
			</div>
			<div className="flex items-center text-neutral-200 hover:text-neutral-400">
				<button onClick={() => cart.deleteFromCart(product.id)} className="flex material-icons-outlined">delete</button>
			</div>
		</div>
	)
}

const QuantityButton = ({label,onClick}:{label:string,onClick:CallableFunction}) => {
	return (
		<button onClick={() => onClick()} className="flex w-8 h-8 rounded-md justify-center items-center border border-neutral-200 hover:bg-neutral-200">
			<span className="flex">{label}</span>
		</button>
	)
}