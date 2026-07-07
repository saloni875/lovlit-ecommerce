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
			className="h-full w-full min-h-[295px] sm:min-h-[430px] rounded-lg overflow-hidden flex flex-col transition-all duration-300"
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
					<div className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
						SOLD OUT
					</div>
				)}

				<img
					src={product.image}
					alt={product.name}
					className="h-24 sm:h-56 lg:h-72 w-full rounded-lg object-cover"
				/>

				<div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow">
					<Heart className="h-3 w-3 text-purple-600" />
				</div>
			</Link>

			<div className="flex flex-1 flex-col px-2 py-2">

				<h3
					className={`min-h-[48px] sm:min-h-[56px] text-base sm:text-lg lg:text-xl font-bold leading-tight line-clamp-2 ${darkMode ? "text-white" : "text-purple-700"
						}`}
				>
					{product.name}
				</h3>

				<p className="mt-1 text-xl sm:text-3xl font-bold text-pink-500">
					₹{product.price}
				</p>

				<p
					className={`mt-1 text-xs sm:text-sm leading-5 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"
						}`}
				>
					{product.description || ""}
				</p>

				<Link
					to={`/product/${product._id}`}
					className="mt-1 text-xs sm:text-sm font-semibold text-purple-500 hover:text-purple-700"
				>
					... See More →
				</Link>

				<div className="mt-auto pt-3">
					<Link
						to={`/product/${product._id}`}
						className="flex items-center justify-center rounded-lg bg-purple-600 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-purple-700"
					>
						See More →
					</Link>
				</div>

			</div>

		</div>
	);
};

export default ProductCard;