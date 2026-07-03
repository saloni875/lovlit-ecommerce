

import toast from "react-hot-toast";
import { Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/useThemeStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const { darkMode } = useThemeStore();
	const navigate = useNavigate();

	const handleAddToCart = () => {
		if (!user) {
			return toast.error("Please login to add products to cart");
		}

		addToCart(product);
	};

	const handleBuyNow = () => {
		if (!user) {
			return toast.error("Please login first 💜");
		}

		addToCart(product);
		navigate("/checkout");
	};

	return (
		<div
	className="h-full min-h-[340px] sm:min-h-[460px] rounded-xl overflow-hidden flex flex-col transition-all duration-300"
			style={{
				background: darkMode
					? "linear-gradient(135deg,#10070d,#440840)"
					: "linear-gradient(to right,#e9d5ff,#ffffff,#fbcfe8)",
				border: darkMode
					? "1px solid #f209e2"
					: "1px solid #a254bd",
			}}
		>
			<Link
				to={`/product/${product._id}`}
				className="relative block p-1"
			>
				{product.stock <= 0 && (
					<div className="absolute top-4 left-4 z-10 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
						SOLD OUT
					</div>
				)}

				<img
					src={product.image}
					alt={product.name}
					className="h-28 sm:h-56  lg:h-72 w-full rounded-xl object-cover"
				/>

				<div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow">
					<Heart className="h-3 w-3 text-purple-600" />
				</div>
			</Link>

			<div className="px-2 pb-2">

				<h3
					className={`h-12 text-base sm:text-lg lg:text-xl font-bold line-clamp-1 ${
						darkMode ? "text-white" : "text-purple-700"
					}`}
				>
					{product.name}
				</h3>

				<p
					className={`hidden sm:block mt-1 text-xs sm:text-sm line-clamp-2 ${
						darkMode ? "text-gray-300" : "text-gray-600"
					}`}
				>
					{product.description}
				</p>

				<p className="mt-1 text-lg sm:text-3xl font-bold text-pink-500">
					₹{product.price}
				</p>

				<div className="mt-2 flex flex-col gap-1">

					<button
						onClick={handleAddToCart}
						disabled={product.stock <= 0}
						className="w-full rounded-lg py-1 text-xs font-semibold transition-all"
						style={{
							background:
								product.stock <= 0
									? "#9ca3af"
									: darkMode
									? "linear-gradient(135deg,#10070d,#440840)"
									: "linear-gradient(to right,#9333ea,#c026d3)",

							color: "#fff",

							border:
								product.stock <= 0
									? "1px solid #9ca3af"
									: darkMode
									? "1px solid #f209e2"
									: "1px solid #9333ea",
						}}
					>
						{product.stock <= 0 ? "Sold Out" : "Add To Cart"}
					</button>

					<button
						onClick={handleBuyNow}
						className="w-full rounded-xl py-2 text-sm font-semibold transition-all"
						style={{
							background: darkMode
								? "#18111f"
								: "#ffffff",

							color: darkMode
								? "#ffffff"
								: "#6b21a8",

							border: darkMode
								? "1px solid #f209e2"
								: "1px solid #a254bd",
						}}
					>
						💜 Buy Now
					</button>

				</div>
			</div>
		</div>
	);
};

export default ProductCard;