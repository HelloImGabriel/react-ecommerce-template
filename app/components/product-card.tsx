import { formatPrice } from "@/lib/utils";
import { useCart } from "./cart-provider";
import { ChangePropertyAmount } from "./cart-item";
import { CartClass, CartItem } from "@/lib/cart";

export default function ProductCard({item}:{item:CartItem}) {

	const {cart, setCart, removeItemFromCart} = useCart()

	const handleAmountChange = (value: string) => {
		cart.changeAmount(item, parseInt(value))
		const newCart = new CartClass(cart.cart)
		setCart(newCart)
	};

	const addToCart = () => {
		cart.addItem(item)
		const newCart = new CartClass(cart.cart)
		setCart(newCart)
		item.isInCart = true
	}
	
	const removeItem = () => {
		removeItemFromCart(item)
		item.amount = 1
		item.isInCart = false
	}

	return (
		<div className="flex flex-col w-60 h-60 p-6 justify-between bg-white shadow-md">
			<div className="flex flex-col gap-2">
				<span className="flex text-xl">{item.product.name}</span>
				<span className="flex text-sm">{item.product.category}</span>
				<span className="flex text-sm">{item.product.description}</span>
			</div>
			<div className="flex flex-col gap-2">
				<span className="flex text-xl font-semibold">{formatPrice(item.product.price)}</span>
				<div className="flex">
					{item.isInCart ? 
						<div className="flex w-full justify-between items-end">
							<ChangePropertyAmount text={'Cantidad'} value={item.amount} handler={handleAmountChange}/>
							<button onClick={() => removeItem()} className="flex material-icons-outlined text-black/20 hover:text-black/60">delete</button>
						</div>
					:
						<button onClick={() => addToCart()} className="flex text-sm text-blue-500">+ Add to cart</button>				
					}
				</div>
			</div>
		</div>
	)
}