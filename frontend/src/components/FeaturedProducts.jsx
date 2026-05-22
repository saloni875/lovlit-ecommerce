import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

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

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className='py-10'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-5xl sm:text-6xl font-bold text-black mb-4'>
					Best sellers
				</h2>

				<p className='text-center text-gray-700 text-lg mb-12'>
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
							{featuredProducts?.map((product) => (
								<div
									key={product._id}
									className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3'
								>
									<div className='bg-white rounded-3xl shadow-lg overflow-hidden border border-purple-200 hover:shadow-2xl transition-all duration-300 h-full group'>
										<div className='relative overflow-hidden'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105'
											/>

											<div className='absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow'>
												<Heart className='w-5 h-5 text-purple-600' />
											</div>
										</div>

										<div className='p-5'>
											<h3 className='text-xl font-bold text-purple-700 mb-2 capitalize'>
												{product.name}
											</h3>

											<p className='text-lg font-semibold text-pink-500 mb-5'>
												₹{product.price}
											</p>

											<button
												onClick={() => addToCart(product)}
												className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-5 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
							isStartDisabled
								? "bg-gray-300 cursor-not-allowed"
								: "bg-purple-600 hover:bg-purple-700 text-white"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-5 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ${
							isEndDisabled
								? "bg-gray-300 cursor-not-allowed"
								: "bg-purple-600 hover:bg-purple-700 text-white"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;