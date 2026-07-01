import toast from "react-hot-toast";
import { ShoppingCart, Heart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/useThemeStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const navigate = useNavigate();
	const { darkMode } = useThemeStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", {
				id: "login",
			});
			return;
		}

		addToCart(product);
	};

	const handleBuyNow = () => {
		if (!user) {
			toast.error("Please login first 💜");
			return;
		}

		addToCart(product);

		navigate("/checkout");
	};

	return (
		<div
			className='flex w-full relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300'
			style={{
				background: darkMode
					? "linear-gradient(135deg, #10070d, #440840)"
					: "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
				border: darkMode
					? "1px solid #f209e2"
					: "1px solid #a254bd",
			}}
		>

			<Link to={`/product/${product._id}`} className='relative mx-3 mt-3 flex h-72 overflow-hidden rounded-2xl'>
				<div className='relative mx-3 mt-3 flex h-72 overflow-hidden rounded-2xl'>
					{product.stock <= 0 && (
						<div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
							SOLD OUT
						</div>
					)}
					<img
						className='object-cover w-full transition-transform duration-500 hover:scale-105'
						src={product.image}
						alt='product image'
					/>

					<div className='absolute inset-0 bg-black/10' />

					<div className='absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md'>
						<Heart className='w-5 h-5 text-purple-600' />
					</div>
				</div>
			</Link>
			<div className='mt-4 px-5 pb-5 flex flex-col flex-grow'>

				<h5
					className={`text-xl sm:text-2xl font-bold capitalize mb-2 ${darkMode ? "text-white" : "text-purple-700"
						}`}
				>
					{product.name}
				</h5>


				<p
					className={`text-sm mb-4 line-clamp-2 ${darkMode ? "text-gray-300" : "text-gray-600"
						}`}
				>
					{product.description}
				</p>

				<div className='mt-auto mb-5 flex items-center justify-between'>
					<p>
						<span className='text-3xl font-bold text-pink-500'>
							₹{product.price}
						</span>
					</p>
				</div>

				<div className='flex flex-col gap-3'>
					<button
						onClick={handleAddToCart}
						disabled={product.stock <= 0}
						className="w-full py-3 rounded-xl font-semibold transition-all duration-300"
						style={{
							background:
								product.stock <= 0
									? "#9ca3af"
									: darkMode
										? "linear-gradient(135deg,#10070d,#440840)"
										: "linear-gradient(to right,rgb(147 51 234),rgb(192 38 211))",

							color: "#ffffff",

							border:
								product.stock <= 0
									? "1px solid #9ca3af"
									: darkMode
										? "1px solid #f209e2"
										: "1px solid #9333ea",
						}}
						onMouseEnter={(e) => {
							if (product.stock <= 0) return;

							e.currentTarget.style.background = "#ec0fff";
							e.currentTarget.style.color = "#000";
						}}
						onMouseLeave={(e) => {
							if (product.stock <= 0) return;

							e.currentTarget.style.background = darkMode
								? "linear-gradient(135deg,#10070d,#440840)"
								: "linear-gradient(to right,rgb(147 51 234),rgb(192 38 211))";

							e.currentTarget.style.color = "#ffffff";
						}}
					>
						{product.stock <= 0 ? "Sold Out" : "Add To Cart"}
					</button>

					<button
						onClick={handleBuyNow}
						className="flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300"
						style={{
							background: darkMode
								? "linear-gradient(135deg,#10070d,#440840)"
								: "linear-gradient(to right,rgb(233 213 255),white,rgb(251 207 232))",

							border: darkMode
								? "1px solid #f209e2"
								: "1px solid #a254bd",

							color: darkMode ? "#ffffff" : "#6b21a8",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.background = "#ec0fff";
							e.currentTarget.style.color = "#000";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.background = darkMode
								? "linear-gradient(135deg,#10070d,#440840)"
								: "linear-gradient(to right,rgb(233 213 255),white,rgb(251 207 232))";

							e.currentTarget.style.color = darkMode ? "#ffffff" : "#6b21a8";
						}}
					>
						💜 Buy Now
					</button>
				</div>
			</div>
		</div >
	);
};

export default ProductCard;