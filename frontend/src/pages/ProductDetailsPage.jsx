import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useEffect, useState } from "react";
import {
	ShoppingCart,
	Heart,
	Minus,
	Plus,
} from "lucide-react";

const ProductDetailsPage = () => {
	const { id } = useParams();

	const {
		selectedProduct,
		fetchSingleProduct,
		loading,
	} = useProductStore();

	const { addToCart } = useCartStore();

	const [selectedOption, setSelectedOption] = useState("");

	const [quantity, setQuantity] = useState(1);
	const [customText, setCustomText] = useState("");

	useEffect(() => {
		fetchSingleProduct(id);
	}, [id, fetchSingleProduct]);

	useEffect(() => {
		if (
			selectedProduct &&
			selectedProduct.optionValue?.length > 0
		) {
			setSelectedOption(selectedProduct.optionValues[0]);
		}
	}, [selectedProduct]);

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<h1 className='text-3xl font-bold text-purple-700'>
					Loading Product...
				</h1>
			</div>
		);
	}

	if (!selectedProduct) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<h1 className='text-3xl font-bold text-purple-700'>
					Product not found
				</h1>
			</div>
		);
	}

	return (
		<div className='min-h-screen px-6 py-16'>
			<div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl p-8 border border-purple-100'>

				<div className='relative overflow-hidden rounded-3xl'>
					<img
						src={selectedProduct.image}
						alt={selectedProduct.name}
						className='w-full h-[500px] object-cover rounded-3xl hover:scale-105 transition duration-500'
					/>

					<div className='absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-lg'>
						<Heart className='text-purple-600 w-6 h-6' />
					</div>
				</div>

				<div className='flex flex-col justify-center'>
					<p className='text-sm uppercase tracking-widest text-purple-500 mb-3'>
						{selectedProduct.category}
					</p>

					<h2 className='text-3xl font-bold text-black/70 mb-6 capitalize'>
						{selectedProduct.name}
					</h2>

					<p className='text-4xl font-bold text-pink-500 mb-6'>
						₹{selectedProduct.price}
					</p>

					<p className='text-gray-600 leading-relaxed text-lg mb-8'>
						{selectedProduct.description}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-10'>

						{selectedProduct.highlights?.length > 0 && (
							<div>
								<h2 className='text-2xl font-bold text-black/70 mb-4'>
									Product Highlights
								</h2>

								<div className='space-y-2'>
									{selectedProduct.highlights.map(
										(item, index) => (
											<p
												key={index}
												className='text-gray-700 text-lg'
											>
												{item}
											</p>
										)
									)}
								</div>
							</div>
						)}

						{selectedProduct.details?.length > 0 && (
							<div>
								<h2 className='text-2xl font-bold text-black/70 mb-4'>
									Additional Details
								</h2>

								<div className='space-y-2'>
									{selectedProduct.details.map(
										(detail, index) => (
											<p
												key={index}
												className='text-gray-700 text-lg'
											>
												{detail}
											</p>
										)
									)}
								</div>
							</div>
						)}
					</div>

					<div className='space-y-8 mb-10'>


						{selectedProduct.optionValues?.length > 0 && (
							<div>
								<h2 className='text-xl font-bold text-black/70 mb-4'>
									Choose {selectedProduct.optionType}
								</h2>

								<div className='flex flex-wrap gap-3'>
									{selectedProduct.optionValues.map(
										(option, index) => (
											<button
												key={index}
												onClick={() =>
													setSelectedOption(option)
												}
												className={`px-5 py-2 rounded-2xl border transition duration-300 font-medium
						${selectedOption === option
														? "bg-purple-600 text-white border-purple-600"
														: "bg-white text-purple-700 border-purple-300 hover:bg-purple-50"
													}`}
											>
												{option}
											</button>
										)
									)}
								</div>
							</div>
						)}

						<div>
							<h2 className='text-xl font-bold text-black/70 mb-4'>
								Quantity
							</h2>

							<div className='flex items-center gap-4'>
								<button
									onClick={() =>
										setQuantity((prev) =>
											Math.max(1, prev - 1)
										)
									}
									className='p-3 rounded-full border border-purple-300 hover:bg-purple-50'
								>
									<Minus className='w-4 h-4 text-purple-700' />
								</button>

								<p className='text-2xl font-bold text-purple-700'>
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
									className='p-3 rounded-full border border-purple-300 hover:bg-purple-50'
								>
									<Plus className='w-4 h-4 text-purple-700' />
								</button>
							</div>
						</div>

						<div>
							{selectedProduct.stock > 0 ? (
								<p className='text-green-600 font-semibold text-lg'>
									In Stock / available
								</p>
							) : (
								<p className='text-red-500 font-semibold text-lg'>
									Out of Stock
								</p>
							)}
						</div>

						{selectedProduct.isCustomizable && (
							<div>
								<h2 className='text-xl font-bold text-black/70 mb-4'>
									Custom Name / Text
								</h2>

								<input
									type='text'
									value={customText}
									onChange={(e) =>
										setCustomText(e.target.value)
									}
									maxLength={
										selectedProduct.maxCustomTextLength
									}
									placeholder='Enter custom text'
									className='w-full rounded-2xl border border-purple-200 px-5 py-4 text-lg text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
								/>

								<p className='text-sm text-gray-500 mt-2'>
									Max{" "}
									{
										selectedProduct.maxCustomTextLength
									}{" "}
									characters
								</p>
							</div>
						)}
					</div>

					<div className='flex flex-col sm:flex-row gap-4'>
						<button
							onClick={() =>
								addToCart({
									...selectedProduct,
									selectedOption,
									quantity,
									customText,
								})
							}
							className='flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-4 text-white font-semibold hover:bg-purple-700 transition duration-300'
						>
							<ShoppingCart className='mr-2' />
							Add to Cart
						</button>

						<button className='rounded-2xl border border-purple-600 px-6 py-4 text-purple-700 font-semibold hover:bg-purple-50 transition duration-300'>
							💜 Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailsPage;