import { Item } from "@/lib/cart"
import { formatPrice } from "@/lib/utils"
import { ProductButtons } from "./product-card"

export default function CartItem({item}:{item:Item}) {
	return (
		<div className="flex flex-col h-24 justify-between">
			<div className="flex justify-between">
				<span className="flex">{item.product.name}</span>
				<span className="flex font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
			</div>
			<div className="flex">{formatPrice(item.product.price)}</div>
			<ProductButtons product={item.product}/>
		</div>
	)
}