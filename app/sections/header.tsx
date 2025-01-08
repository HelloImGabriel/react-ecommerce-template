import Link from "next/link";

export default function Header() {
	return (
		<div className="flex w-full h-20 global-padding justify-between items-center bg-white shadow-md">
			<span className="flex font-semibold">Logo</span>
			<div className="flex justify-end gap-10">
				<Link className="flex" href={"/"}>Home</Link>
				<Link className="flex" href={"#"}>Products</Link>
				<Link className="flex" href={"/cart"}>Cart</Link>
			</div>
		</div>
	)
}