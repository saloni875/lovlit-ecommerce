import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { useThemeStore } from "../stores/useThemeStore";
import { useUserStore } from "../stores/useUserStore";
import { useWishlistStore } from "../stores/useWishlistStore";
import toast from "react-hot-toast";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const { darkMode } = useThemeStore();

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};


		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const {
		wishlist,
		toggleWishlist,
		getWishlist,
	} = useWishlistStore();


	// 

	useEffect(() => {
		if (featuredProducts.length <= itemsPerPage) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => {
				if (prev >= featuredProducts.length - itemsPerPage) {
					return 0;
				}
				return prev + itemsPerPage;
			});
		}, 3500);

		return () => clearInterval(interval);

	}, [featuredProducts.length, itemsPerPage]);

	const nextSlide = () => {
		setCurrentIndex((prev) => {
			if (prev >= featuredProducts.length - itemsPerPage) {
				return 0;
			}
			return prev + itemsPerPage;
		});
	};
	const { user } = useUserStore();
	const prevSlide = () => {
		setCurrentIndex((prev) => {
			if (prev === 0) {
				return featuredProducts.length - itemsPerPage;
			}
			return prev - itemsPerPage;
		});
	};

	useEffect(() => {
		if (user) {
			getWishlist();
		}
	}, [user]);




	return (
		<div className='py-3 sm:py-10'>
			<div className='container mx-auto px-2'>
				<h2 className='text-center text-3xl sm:text-6xl font-bold text-pink-500 mb-2'>
					Best sellers
				</h2>

				<p
					className='text-center mb-4 text-sm sm:text-lg'
					style={{
						color: darkMode ? "#d8cde0" : "#2c3b53",
					}}
				>
					Handmade inspired collections picked specially for you!
				</p>

				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{
								transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
							}}
						>
							{featuredProducts?.map((product) => {

								const isWishlisted = wishlist.some(
									(item) => item.product?._id === product._id
								);

								return (
									<div
										key={product._id}
										className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
									>
										<Link
											to={`/product/${product._id}`}
											className='rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full group'
											style={{
												background: darkMode ? "#2b182c" : "#b03b83",

											}}
										>
											<div className='relative overflow-hidden'>
												<img
													src={product.image}
													alt={product.name}
													className='w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105'
												/>

												<div className="absolute top-2 right-2 rounded-full bg-white p-1 shadow">
													<Heart
														onClick={(e) => {
															e.preventDefault();
															e.stopPropagation();

															if (!user) {
																return toast.error("Please login first.");
															}

															toggleWishlist(product._id);
														}}
														className={`h-5 w-5 cursor-pointer transition-all duration-300 ${isWishlisted
															? "fill-red-500 text-red-500"
															: "text-purple-600"
															}`}
													/>
												</div>
											</div>

											<div className='p-3'>
												<h3
													className='text-xl font-bold mb-2 capitalize'
													style={{
														color: darkMode ? "#f3e8ff" : "#7617c4",
													}}
												>
													{product.name}
												</h3>

												{/* <p className='text-lg font-semibold text-pink-500 mb-3'>
													₹{product.price}
												</p> */}

												<div className="mt-1 mb-2 flex flex-wrap items-center gap-2">

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

															<span className="rounded-full bg-green-100 px-2 py-1  text-xs sm:text-sm font-bold text-green-700">
																{product.discount}% OFF
															</span>
														</>
													) : (
														<p className="text-xl sm:text-3xl font-bold text-pink-500">
															₹{product.price}
														</p>
													)}

												</div>

												<button
													onClick={(e) => {
														e.preventDefault();
														addToCart(product);
													}}
													className='w-full font-semibold py-2 px-2 bg-purple-600 hover:bg-pink-400 text-white  rounded-xl transition-all duration-300 flex items-center justify-center '
													style={{
														background: darkMode
															? "linear-gradient(135deg, #0d0a11, #660c5e)"
															: "",
														color: darkMode ? "#ffffff" : "",
														border: darkMode ? "1px solid #c646b3" : "1px solid #e9d5ff",
													}}
													onMouseEnter={(e) => {
														if (darkMode) {
															e.currentTarget.style.background = "#e100ff";
															e.currentTarget.style.color = "#000000";
														}
													}}
													onMouseLeave={(e) => {
														if (darkMode) {
															e.currentTarget.style.background =
																"linear-gradient(135deg, #0c090f, #660c5e)";
															e.currentTarget.style.color = "#ffffff";
														}
													}}
												>
													<ShoppingCart className='w-5 h-5 mr-2' />
													Add to Cart
												</button>
											</div>
										</Link>
									</div>


								);
							})}

						</div>

					</div>


					<button
						onClick={prevSlide}
						className="hidden md:block absolute top-1/2 -left-5 -translate-y-1/2 p-2 z-30 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"

					>
						<ChevronLeft className='w-3 h-3' />
					</button>

					<button
						onClick={nextSlide}
						className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 p-2 z-30 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"

					>
						<ChevronRight className='w-3 h-3' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;