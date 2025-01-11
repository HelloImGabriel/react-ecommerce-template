import { Product } from "@prisma/client"
import { removeItemAtIndex } from "./utils"

export interface CartItem {
	product: Product
	amount: number
	isInCart: boolean
}

export interface Cart {
	items: CartItem[]
}

export class CartClass {
	constructor(cart: Cart) {
		this.cart = cart
	}

	public cart: Cart

	public hasItem(item: CartItem) {
		for (const i of this.cart.items) {
			if (i.product.id === item.product.id) {
				return true
			} else {
				return false
			}
		}
	}

	public getItemIndex(item: CartItem) {
		for (const i of this.cart.items) {
			if (i.product.id === item.product.id) {
				return this.cart.items.indexOf(i)
			}
		}
	}

	public getItemAmount(item: CartItem) {
		const index = this.getItemIndex(item)
		if (index !== -1) {return 0}
		return this.cart.items[index].amount
	}

	public addItem(item: CartItem) {
		this.cart.items.push(item)
	}

	public removeItem(item: CartItem) {
		const index = this.getItemIndex(item)
		if (index !== undefined) {
			const items = removeItemAtIndex(this.cart.items, index)
			this.cart.items = items
		}
	}

	public changeAmount(item: CartItem, amount: number) {
		const index = this.getItemIndex(item)
		if(index === undefined) {
			return
		}
		if (index === -1) {
			return
		}
		this.cart.items[index].amount = amount
	}
}