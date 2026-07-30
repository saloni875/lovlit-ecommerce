import toast from "react-hot-toast";
import {
	Heart,
	MoreVertical,
	ChevronsUp,
	ChevronsDown,
	ArrowUp,
	ArrowDown,
} from "lucide-react";

import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import { useThemeStore } from "../stores/useThemeStore";
import { useEffect, useState } from "react";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useProductStore } from "../stores/useProductStore";
const ProductCard = ({ product }) => {
	
	const { user } = useUserStore();
	const { addToCart } = useCartStore();
	const { darkMode } = useThemeStore();
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const {
		wishlist,
		getWishlist,
		toggleWishlist,
		
	} = useWishlistStore();

	const{
		moveProductUp,
		moveProductDown,
		moveProductToTop,
		moveProductToBottom,
	}= useProductStore();

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

	// load the wishlist
	useEffect(() => {
		if (user) {
			getWishlist();
		}
	}, [user]);
	// weather product is added or mot check jere
	const isWishlisted = wishlist.some(
		(item) => item.product?._id === product._id
	);

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
					src={product.images?.[0] || "/placeholder.png"}
					alt={product.name}
					className="h-24 sm:h-56 lg:h-72 w-full rounded-lg object-cover"
				/>

				{product.images?.length > 1 && (
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
						{product.images.map((_, index) => (
							<span
								key={index}
								className={`h-2 w-2 rounded-full ${index === 0
									? "bg-white"
									: "bg-white/40"
									}`}
							/>
						))}
					</div>
				)}

				<div className="absolute top-2 right-2 flex items-center gap-2">

					<Heart
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();

							if (!user) {
								return toast.error("Please login first.");
							}

							toggleWishlist(product._id);
						}}
						className={`h-7 w-7 cursor-pointer transition-all duration-300 ${isWishlisted
							? "fill-red-500 text-red-500"
							: darkMode
								? "text-white"
								: "text-purple-600"
							}`}
					/>

					{user?.role === "admin" && (
						<div className="relative">

							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setShowMenu(!showMenu);
								}}
							>
								<MoreVertical
									className={`h-6 w-6 ${darkMode
										? "text-white"
										: "text-white"
										}`}
								/>
							</button>

							{showMenu && (
								<div
									className={`absolute right-0 mt-2 w-48 rounded-xl shadow-xl z-50 ${darkMode
										? "bg-[#22132d]"
										: "bg-white"
										}`}
								>

									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();

											moveProductToTop(product._id);
											setShowMenu(false);
										}}
										className="flex items-center gap-2 w-full px-4 py-3 hover:bg-purple-100 dark:hover:bg-purple-900"
									>
										<ChevronsUp size={18} />
										Move to Top
									</button>

									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();

											moveProductUp(product._id);
											setShowMenu(false);
										}}
										className="flex items-center gap-2 w-full px-4 py-3 hover:bg-purple-100 dark:hover:bg-purple-900"
									>
										<ArrowUp size={18} />
										Move Up
									</button>

									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();

											moveProductDown(product._id);
											setShowMenu(false);
										}}
										className="flex items-center gap-2 w-full px-4 py-3 hover:bg-purple-100 dark:hover:bg-purple-900"
									>
										<ArrowDown size={18} />
										Move Down
									</button>

									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();

											moveProductToBottom(product._id);
											setShowMenu(false);
										}}
										className="flex items-center gap-2 w-full px-4 py-3 hover:bg-purple-100 dark:hover:bg-purple-900"
									>
										<ChevronsDown size={18} />
										Move to Bottom
									</button>

								</div>
							)}

						</div>
					)}

				</div>
			</Link>

			<div className="flex flex-1 flex-col px-2 py-2">

				<h3
					className={`min-h-[48px] sm:min-h-[56px] text-base sm:text-lg lg:text-xl font-bold leading-tight line-clamp-2 ${darkMode ? "text-white" : "text-purple-700"
						}`}
				>
					{product.name}
				</h3>

				{/* <p className="mt-1 text-xl sm:text-3xl font-bold text-pink-500">
					₹{product.price}
				</p> */}

				<div className="mt-1 flex flex-wrap items-center gap-2">

					{product.discount > 0 ? (
						<>
							<p
								className={`text-sm sm:text-lg line-through ${darkMode ? "text-gray-400" : "text-gray-500"
									}`}
							>
								₹{product.originalPrice}
							</p>

							<p className="text-xl sm:text-3xl font-bold text-pink-500">
								₹{product.finalPrice}
							</p>

							<span className="rounded-full bg-green-100 px-2 py-1 text-xs sm:text-sm font-bold text-green-700">
								{product.discount}% OFF
							</span>
						</>
					) : (
						<p className="text-xl sm:text-3xl font-bold text-pink-500">
							₹{product.price}
						</p>
					)}

				</div>

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