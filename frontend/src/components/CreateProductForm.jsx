import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
	"bracelets",
	"necklaces",
	"rings",
	"photocards",
	"candles",
	"keychains",
	"btswear",
];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		highlight: "",
		details: "",
		optionType: "",
		optionValues: "",
		stock: 1,
		isCustomizable: false,
		maxCustomTextLength: 7,
	});

	const { createProduct, loading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createProduct(newProduct);

			setNewProduct({
				name: "",
				description: "",
				price: "",
				category: "",
				image: "",
				highlights: "",
				details: "",
				optionType: "",
				optionValues: "",
				stock: 1,
				isCustomizable: false,
				maxCustomTextLength: 7,

			});
		} catch {
			console.log("error creating a product");
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({
					...newProduct,
					image: reader.result,
				});
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<motion.div
			className='bg-white/80 backdrop-blur-md border border-purple-200 shadow-2xl rounded-3xl p-4 sm:p-6 lg:p-8  mb-6 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h1 className='logo-font text-4xl sm:text-5xl lg:text-6xl text-center text-purple-700 mb-2'>
				Lovlit
			</h1>

			<h2 className='text-xl sm:text-2xl font-semibold mb-4 text-purple-700 text-center'>
				Create New Product
			</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>

				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'
					>
						Product Name
					</label>

					<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								name: e.target.value,
							})
						}
						className='mt-1 block w-full bg-white border border-purple-200 rounded-xl shadow-sm py-3 px-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						required
					/>
				</div>


				<div>
					<label
						htmlFor='description'
						className='block text-sm font-medium text-gray-700'
					>
						Description
					</label>

					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								description: e.target.value,
							})
						}
						rows='3'
						className='mt-1 block w-full bg-white border border-purple-200 rounded-xl shadow-sm py-3 px-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						required
					/>
				</div>

				<div>
					<label
						htmlFor='optionType'
						className='block text-sm font-medium text-black/80 mb-2'
					>
						Product Option Type
					</label>

					<select
						id='optionType'
						value={newProduct.optionType}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								optionType: e.target.value,
							})
						}
						className='mt-1 block w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 shadow-sm focus:border-purple-500 focus:ring-purple-500'
					>
						<option value=''>No Options</option>
						<option value='Color'>Color</option>
						<option value='Scent'>Scent</option>
						<option value='Size'>Size</option>
					</select>
				</div>

				{newProduct.optionType && (
					<div>
						<label
							htmlFor='optionValues'
							className='block text-sm font-medium text-black/80 mb-2'
						>
							{newProduct.optionType} Options
						</label>

						<textarea
							id='optionValues'
							value={newProduct.optionValues}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									optionValues: e.target.value,
								})
							}
							rows='4'
							placeholder='Write each option on a new line'
							className='mt-1 block w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 shadow-sm focus:border-purple-500 focus:ring-purple-500'
						/>

						<p className='text-sm text-gray-500 mt-2'>
							Write one option per line
						</p>
					</div>
				)}

				<div className='flex items-center gap-3'>
					<input
						type='checkbox'
						id='customizable'
						checked={newProduct.isCustomizable}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								isCustomizable: e.target.checked,
							})
						}
						className='w-5 h-5 accent-purple-600'
					/>

					<label
						htmlFor='customizable'
						className='text-sm font-medium text-black/80'
					>
						Enable Custom Name / Text
					</label>
				</div>

				<div>
					<label
						htmlFor='stock'
						className='block text-sm font-medium text-black/80 mb-2'
					>
						Product Stock
					</label>

					<input
						type='number'
						id='stock'
						value={newProduct.stock}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								stock: e.target.value,
							})
						}
						className='mt-1 block w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 shadow-sm focus:border-purple-500 focus:ring-purple-500'
					/>
				</div>

				{newProduct.isCustomizable && (
					<div>
						<label
							htmlFor='maxText'
							className='block text-sm font-medium text-black/80 mb-2'
						>
							Max Custom Text Length
						</label>

						<input
							type='number'
							id='maxText'
							value={newProduct.maxCustomTextLength}
							onChange={(e) =>
								setNewProduct({
									...newProduct,
									maxCustomTextLength: e.target.value,
								})
							}
							className='mt-1 block w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 shadow-sm focus:border-purple-500 focus:ring-purple-500'
						/>
					</div>
				)}

				<div>
					<label
						htmlFor='highlights'
						className='block text-sm font-medium text-black/80 mb-2'
					>
						Product Highlights
					</label>

					<textarea
						id='highlights'
						name='highlights'
						value={newProduct.highlights}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								highlights: e.target.value,
							})
						}
						rows='4'
						placeholder='Write each highlight on a new line'
						className='mt-1 block w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 shadow-sm focus:border-purple-500 focus:ring-purple-500'
					/>
				</div>

				<div>
					<label
						htmlFor='details'
						className='block text-sm font-medium text-black/80 mb-2'
					>
						Additional Details
					</label>

					<textarea
						id='details'
						name='details'
						value={newProduct.details}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								details: e.target.value,
							})
						}
						rows='5'
						placeholder='Material: Stainless Steel'
						className='mt-1 block w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-purple-700 shadow-sm focus:border-purple-500 focus:ring-purple-500'
					/>
				</div>






				<div>
					<label
						htmlFor='price'
						className='block text-sm font-medium text-gray-700'
					>
						Price
					</label>

					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								price: e.target.value,
							})
						}
						step='0.01'
						className='mt-1 block w-full bg-white border border-purple-200 rounded-xl shadow-sm py-3 px-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						required
					/>
				</div>


				<div>
					<label
						htmlFor='category'
						className='block text-sm font-medium text-gray-700'
					>
						Category
					</label>

					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								category: e.target.value,
							})
						}
						className='mt-1 block w-full bg-white border border-purple-200 rounded-xl shadow-sm py-3 px-3 text-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
						required
					>
						<option value=''>Select a category</option>

						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>





				<div className='mt-1 flex items-center'>
					<input
						type='file'
						id='image'
						className='sr-only'
						accept='image/*'
						onChange={handleImageChange}
					/>

					<label
						htmlFor='image'
						className='cursor-pointer bg-purple-100 py-3 px-4 border border-purple-200 rounded-xl shadow-sm text-sm font-medium text-purple-700 hover:bg-purple-200 transition'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Upload Image
					</label>

					{newProduct.image && (
						<span className='ml-3 text-sm text-gray-500'>
							Image uploaded
						</span>
					)}
				</div>


				<button
					type='submit'
					className='w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader
								className='mr-2 h-5 w-5 animate-spin'
								aria-hidden='true'
							/>
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;




