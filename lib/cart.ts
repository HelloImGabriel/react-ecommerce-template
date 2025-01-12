import { Product } from "@prisma/client"

export interface Item {
	product: Product
	quantity: number
}