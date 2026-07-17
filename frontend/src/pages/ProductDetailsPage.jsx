import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useThemeStore } from "../stores/useThemeStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import PeopleAlsoBought from "../components/PeopleAlsoBought";

import {
	ShoppingCart,
	Heart,
	Minus,
	Plus,
} from "lucide-react";

const ProductDetailsPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		selectedProduct,
		fetchSingleProduct,
		loading,
	} = useProductStore();

	const { addToCart } = useCartStore();
	const { darkMode } = useThemeStore();

	const { user } = useUserStore();

	const {
		wishlist,
		getWishlist,
		toggleWishlist,
	} = useWishlistStore();
	useEffect(() => {
		if (user) {
			getWishlist();
		}
	}, [user]);

	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedScent, setSelectedScent] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [customText, setCustomText] = useState("");

	useEffect(() => {
		fetchSingleProduct(id);
	}, [id, fetchSingleProduct]);

	// useEffect(() => {
	// 	if (!selectedProduct) return;

	// 	setSelectedColor(selectedProduct.colors?.[0] || "");
	// 	setSelectedSize(selectedProduct.sizes?.[0] || "");
	// 	setSelectedScent(selectedProduct.scents?.[0] || "");
	// }, [selectedProduct]);
	useEffect(() => {
		if (!selectedProduct) return;

		setSelectedColor("");
		setSelectedSize("");
		setSelectedScent("");
	}, [selectedProduct]);

	if (loading) {
		return (
			<div
				className="min-h-screen flex items-center justify-center"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "",
				}}
			>
				<h1
					className={`text-3xl font-bold ${darkMode
						? "text-white"
						: "text-purple-700"
						}`}
				>
					Loading Product...
				</h1>
			</div>
		);
	}

	if (!selectedProduct) {
		return (
			<div
				className="min-h-screen flex items-center justify-center"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "",
				}}
			>
				<h1
					className={`text-3xl font-bold ${darkMode
						? "text-white"
						: "text-purple-700"
						}`}
				>
					Product not found
				</h1>
			</div>
		);
	}

	const isWishlisted = wishlist.some(
		(item) => item.product?._id === selectedProduct?._id
	);

	return (
		<>

			<div
				className="min-h-screen px-2 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all duration-300"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "",
				}}
			>
				<div
					className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 rounded-3xl shadow-xl p-3 sm:p-8 transition-all duration-300 ${darkMode
						? "border border-fuchsia-700"
						: "border border-purple-100"
						}`}
					style={{
						background: darkMode
							? "linear-gradient(135deg,#18111f,#3b0b39)"
							: "#ffffff",
					}}
				>

					<div className="relative overflow-hidden rounded-3xl">
						<img
							src={selectedProduct.image}
							alt={selectedProduct.name}
							className="product-image w-full h-[320px] sm:h-[450px] lg:h-[580px] object-cover rounded-3xl transition duration-500 hover:scale-105"
						/>

						<div
							className="absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-md"
							style={{
								background: darkMode
									? "rgba(12,9,15,0.75)"
									: "rgba(255,255,255,0.85)",
								border: darkMode
									? "1px solid #d946ef"
									: "1px solid #e9d5ff",
							}}
						>
							<div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow">
								<Heart
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();

										if (!user) {
											return toast.error("Please login first.");
										}

										toggleWishlist(selectedProduct._id);
									}}
									className={`h-5 w-5 cursor-pointer transition-all duration-300 ${isWishlisted
										? "fill-red-500 text-red-500"
										: "text-purple-600"
										}`}
								/>
							</div>
						</div>
					</div>

					<div className="product-info flex flex-col justify-center">

						<p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-pink-500 font-semibold mb-1">
							{selectedProduct.category}
						</p>

						<h1
							className={`product-title text-2xl sm:text-3xl lg:text-4xl font-bold capitalize leading-tight mb-2 ${darkMode ? "text-white" : "text-black"
								}`}
						>
							{selectedProduct.name}
						</h1>

						{/* <p className=" product-price text-2xl sm:text-4xl font-bold text-pink-500 mb-3">
							₹{selectedProduct.price}
						</p> */}

						<div className="mt-1 flex flex-wrap items-center gap-2">

							{selectedProduct.discount > 0 ? (
								<>
									<p
										className={`text-sm sm:text-lg line-through ${darkMode ? "text-gray-400" : "text-gray-500"
											}`}
									>
										₹{selectedProduct.originalPrice}
									</p>

									<p className="text-xl sm:text-3xl font-bold text-pink-500">
										₹{selectedProduct.finalPrice}
									</p>

									<span className="rounded-full bg-green-100 px-2 py-1 text-xs sm:text-sm font-bold text-green-700">
										{selectedProduct.discount}% OFF
									</span>
								</>
							) : (
								<p className="text-xl sm:text-3xl font-bold text-pink-500">
									₹{selectedProduct.price}
								</p>
							)}

						</div>

						<p
							className={` product-description text-sm sm:text-base leading-7 mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"
								}`}
						>
							{selectedProduct.description}
						</p>
						<div className="product-grid grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-8 mb-4">

							{selectedProduct.highlights?.length > 0 && (
								<div
									className={`product-box rounded-2xl p-2 border ${darkMode
										? "border-fuchsia-700 bg-black/20"
										: "border-purple-200 bg-purple-50"
										}`}
								>
									<h2
										className={`product-box-title text-sm sm:text-2xl font-bold  ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										Product Highlights
									</h2>

									<div className="product-actions space-y-1">
										{selectedProduct.highlights.map((item, index) => (
											<p
												key={index}
												className={`product-box-text text-sm sm:text-base leading-5 ${darkMode
													? "text-gray-300"
													: "text-gray-700"
													}`}
											>
												• {item}
											</p>
										))}
									</div>
								</div>
							)}

							{selectedProduct.details?.length > 0 && (
								<div
									className={`product-box rounded-2xl p-2 border ${darkMode
										? "border-fuchsia-700 bg-black/20"
										: "border-purple-200 bg-pink-50"
										}`}
								>
									<h2
										className={`product-box-title text-sm sm:text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										Additional Details
									</h2>

									<div className="product-actions space-y-1">
										{selectedProduct.details.map((detail, index) => (
											<p
												key={index}
												className={`product-box-text text-sm sm:text-base leading-5 ${darkMode
													? "text-gray-300"
													: "text-gray-700"
													}`}
											>
												• {detail}
											</p>
										))}
									</div>
								</div>
							)}

						</div>

						<div className=" product-actions space-y-5 mb-10 lg:mb-8">


							{/* COLOR OPTIONS */}
							{selectedProduct.colors?.length > 0 && (
								<div>
									<h2
										className={`text-sm sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										Select Color
									</h2>

									<div className="flex flex-wrap gap-2">
										{selectedProduct.colors.map((color, index) => (
											<button
												key={index}
												onClick={() => setSelectedColor(color)}
												className={`px-3 py-2 rounded-xl font-medium border transition-all duration-300 ${selectedColor === color
													? "!bg-pink-500 !text-white !border-pink-500"
													: "!bg-purple-600 !text-white !border-purple-600"
													}`}
											>
												{color}
											</button>
										))}
									</div>
								</div>
							)}


							{/* SIZE OPTIONS */}
							{selectedProduct.sizes?.length > 0 && (
								<div>
									<h2
										className={`text-sm sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										Select Size
									</h2>

									<div className="flex flex-wrap gap-2">
										{selectedProduct.sizes.map((size, index) => (
											<button
												key={index}
												onClick={() => setSelectedSize(size)}
												className={`px-3 py-2 rounded-xl font-medium border transition-all duration-300 ${selectedSize === size
													? "!bg-pink-500 !text-white !border-pink-500"
													: "!bg-purple-600 !text-white !border-purple-600"
													}`}
											>
												{size}
											</button>
										))}
									</div>
								</div>
							)}


							{/* SCENT OPTIONS */}
							{selectedProduct.scents?.length > 0 && (
								<div>
									<h2
										className={`text-sm sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										Select Scent
									</h2>

									<div className="flex flex-wrap gap-2">
										{selectedProduct.scents.map((scent, index) => (
											<button
												key={index}
												onClick={() => setSelectedScent(scent)}
												className={`px-3 py-2 rounded-xl font-medium border transition-all duration-300 ${selectedScent === scent
													? "!bg-pink-500 !text-white !border-pink-500"
													: "!bg-purple-600 !text-white !border-purple-600"
													}`}
											>
												{scent}
											</button>
										))}
									</div>
								</div>
							)}

							<div>
								<h2
									className={`product-actions text-sm sm:text-sm font-bold mb-2 ${darkMode ? "text-white" : "text-purple-700"
										}`}
								>
									Quantity
								</h2>

								<div className="flex items-center gap-2">

									<button
										onClick={() =>
											setQuantity((prev) => Math.max(1, prev - 1))
										}
										className={`p-2 rounded-full transition ${darkMode
											? "border border-fuchsia-700 bg-[#18111f] hover:bg-fuchsia-600"
											: "border border-purple-300 hover:bg-purple-100"
											}`}
									>
										<Minus
											className={`w-4 h-4 ${darkMode ? "text-white" : "text-purple-700"
												}`}
										/>
									</button>

									<p
										className={`text-sm font-bold ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										{quantity}
									</p>



									<button
										onClick={() =>
											setQuantity((prev) =>
												Math.min(
													selectedProduct.stock || 1,
													prev + 1
												)
											)
										}
										className={`p-2 rounded-full transition ${darkMode
											? "border border-fuchsia-700 bg-[#18111f] hover:bg-fuchsia-600"
											: "border border-purple-300 hover:bg-purple-100"
											}`}
									>
										<Plus
											className={`w-4 h-4 ${darkMode ? "text-white" : "text-purple-700"
												}`}
										/>
									</button>

								</div>
							</div>

							{selectedProduct.isCustomizable && (
								<div>
									<h2
										className={`text-sm sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-purple-700"
											}`}
									>
										Custom Name / Text
									</h2>

									<input
										type="text"
										value={customText}
										onChange={(e) => setCustomText(e.target.value)}
										maxLength={selectedProduct.maxCustomTextLength}
										placeholder="Enter custom text"
										className={`w-full rounded-xl px-3 py-2 text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
											? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
											: "bg-white border-2 border-purple-300 text-purple-700 shadow-sm"
											}`}
									/>

									<p
										className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"
											}`}
									>
										Max {selectedProduct.maxCustomTextLength} characters
									</p>
								</div>
							)}

							<div
								className="product-buttons fixed bottom-0 left-0 right-0 z-50 lg:static grid grid-cols-2 gap-3 p-3 lg:p-0 bg-white/95 dark:bg-[#18111f]/95 backdrop-blur-md border-t border-purple-200 lg:border-0"
								style={{
									background: darkMode
										? "linear-gradient(135deg, #10070d, #440840)"
										: "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
								}}
							>

								<button
									disabled={selectedProduct.stock <= 0}
									onClick={() => {
										if (selectedProduct.stock <= 0) return;

										addToCart({
											...selectedProduct,
											selectedColor,
											selectedSize,
											selectedScent,
											quantity,
											customText,
										});


									}}
									className="product-cart-btn rounded-xl px-2 py-1 font-semibold transition-all duration-300"
									style={{
										background: darkMode
											? "linear-gradient(135deg,#0c090f,#660c5e)"
											: "#9333ea",
										color: "#fff",
										border: darkMode
											? "1px solid #c646b3"
											: "2px solid #9333ea",
									}}
									onMouseEnter={(e) => {
										if (selectedProduct.stock <= 0) return;

										if (darkMode) {
											e.currentTarget.style.background = "#e100ff";
											e.currentTarget.style.color = "#000000";
										} else {
											e.currentTarget.style.background = "#b281e7";
											e.currentTarget.style.color = "#6b21a8";
										}
									}}
									onMouseLeave={(e) => {
										if (selectedProduct.stock <= 0) return;

										if (darkMode) {
											e.currentTarget.style.background =
												"linear-gradient(135deg,#0c090f,#660c5e)";
											e.currentTarget.style.color = "#ffffff";
										} else {
											e.currentTarget.style.background = "#6b21a8";
											e.currentTarget.style.color = "#ffffff";
										}
									}}
								>
									<ShoppingCart className="inline mr-2 w-5 h-4" />
									Add To Cart
								</button>

								<button
									disabled={selectedProduct.stock <= 0}
									onClick={() => {
										if (selectedProduct.stock <= 0) return;

										addToCart({
											...selectedProduct,
											selectedColor,
											selectedSize,
											selectedScent,
											quantity,
											customText,
										});

										navigate("/checkout");
									}}
									className="product-buy-btn rounded-xl px-3 py-2 font-semibold transition-all duration-300"
									style={{
										background:
											selectedProduct.stock <= 0
												? "#d1d5db"
												: darkMode
													? "linear-gradient(135deg,#0c090f,#660c5e)"
													: "#ffffff",

										color:
											selectedProduct.stock <= 0
												? "#6b7280"
												: darkMode
													? "#ffffff"
													: "#6b21a8",

										border:
											selectedProduct.stock <= 0
												? "1px solid #d1d5db"
												: darkMode
													? "1px solid #c646b3"
													: "2px solid #9333ea",
									}}
									onMouseEnter={(e) => {
										if (selectedProduct.stock <= 0) return;

										if (darkMode) {
											e.currentTarget.style.background = "#e100ff";
											e.currentTarget.style.color = "#000000";
										} else {
											e.currentTarget.style.background = "#f3e8ff";
											e.currentTarget.style.color = "#6b21a8";
										}
									}}
									onMouseLeave={(e) => {
										if (selectedProduct.stock <= 0) return;

										if (darkMode) {
											e.currentTarget.style.background =
												"linear-gradient(135deg,#0c090f,#660c5e)";
											e.currentTarget.style.color = "#ffffff";
										} else {
											e.currentTarget.style.background = "#ffffff";
											e.currentTarget.style.color = "#6b21a8";
										}
									}}
								>
									💜 Buy Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-10">
				<PeopleAlsoBought />
			</div>
		</>
	);
};

export default ProductDetailsPage;