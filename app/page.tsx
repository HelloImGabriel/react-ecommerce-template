'use client'

import ProductCard from "./components/product-card";
import { useCart } from "./components/cart-provider";

export default function Home() {

  const cart = useCart()

  return (
    <div className="flex flex-col w-full py-20 justify-center items-center gap-10 bg-neutral-100">
      <div className="grid grid-cols-4 gap-10 ">
        {cart.allProducts.map((product, n) => {
          return <ProductCard key={n} product={product}/>
        })}
      </div>
    </div>  
  );
}
