import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useThemeStore } from "../stores/useThemeStore";
const categories = [
	"bracelets",
	"necklaces",
	"bodychains",
	"scrunchies",
	"phonecharms",
	"candles",
	"photocards",
	"actionfigures",
	"chocolatebouquets",
	"gifthampers",
	"specialboxes",
	"scoops",
];

const CreateProductForm = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		highlights: "",
		details: "",
		colors: "",
		sizes: "",
		scents: "",
		stock: 1,
		isCustomizable: false,
		maxCustomTextLength: 7,
	});

	const { createProduct, loading } = useProductStore();
	const { darkMode } = useThemeStore();

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
				colors: "",
				sizes: "",
				scents: "",
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
			className={`backdrop-blur-md shadow-2xl rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 max-w-xl mx-auto transition-all duration-300 ${darkMode
				? "border border-fuchsia-700"
				: "border border-purple-200"
				}`}
			style={{
				background: darkMode
					? "linear-gradient(135deg,#18111f,#3b0b39)"
					: "rgba(255,255,255,.8)",
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h1 className={`logo-font text-4xl sm:text-5xl lg:text-6xl text-center mb-2 ${darkMode ? "text-pink-400" : "text-purple-700"
				}`}>
				Lovlit
			</h1>

			<h2 className={`text-xl sm:text-2xl font-semibold mb-4 text-center ${darkMode ? "text-white" : "text-purple-700"
				}`}>
				Create New Product
			</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>

				<div>
					<label
						htmlFor='name'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
						required
					/>
				</div>


				<div>
					<label
						htmlFor='description'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
						required
					/>
				</div>

				

				

				{/*<div>
					 <label
						htmlFor='optionType'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
					>
						<option value=''>No Options</option>
						<option value='Color'>Color</option>
						<option value='Scent'>Scent</option>
						<option value='Size'>Size</option>
					</select>
				</div> */}



				<div>
					<label
						htmlFor="colors"
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
					>
						Color Options
					</label>

					<textarea
						id="colors"
						value={newProduct.colors}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								colors: e.target.value,
							})
						}
						rows="3"
						placeholder={"Pink\nPurple\nBlack"}
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
								? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>

					<p className="text-sm text-gray-500 mt-2">
						Optional — write one color per line
					</p>
				</div>

				<div>
					<label
						htmlFor="sizes"
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
					>
						Size Options
					</label>

					<textarea
						id="sizes"
						value={newProduct.sizes}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								sizes: e.target.value,
							})
						}
						rows="3"
						placeholder={"Small\nMedium\nLarge"}
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
								? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>

					<p className="text-sm text-gray-500 mt-2">
						Optional — write one size per line
					</p>
				</div>

				<div>
					<label
						htmlFor="scents"
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
					>
						Scent Options
					</label>

					<textarea
						id="scents"
						value={newProduct.scents}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								scents: e.target.value,
							})
						}
						rows="3"
						placeholder={"Rose\nVanilla\nLavender"}
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
								? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>

					<p className="text-sm text-gray-500 mt-2">
						Optional - write one scent per line
					</p>
				</div>



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
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
					>
						Enable Custom Name / Text
					</label>
				</div>

				<div>
					<label
						htmlFor='stock'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>
				</div>

				{newProduct.isCustomizable && (
					<div>
						<label
							htmlFor='maxText'
							className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
								}`}
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
							className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
								? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-2 border-purple-300 text-black"
								}`}
						/>
					</div>
				)}

				<div>
					<label
						htmlFor='highlights'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>
				</div>

				<div>
					<label
						htmlFor='details'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>
				</div>






				<div>
					<label
						htmlFor='price'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
						required
					/>
				</div>


				<div>
					<label
						htmlFor='category'
						className={`block text-sm font-medium mb-2 ${darkMode ? "text-white" : "text-gray-700"
							}`}
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
						className={`mt-1 block w-full rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
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
						htmlFor="image"
						className={`cursor-pointer inline-flex items-center py-3 px-4 rounded-xl shadow-sm text-sm font-medium transition-all duration-300 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white hover:bg-fuchsia-700"
							: "bg-purple-100 border border-purple-200 text-purple-700 hover:bg-purple-200"
							}`}
					>
						<Upload className="h-5 w-5 mr-2" />
						Upload Image
					</label>

					{newProduct.image && (
						<span
							className={`ml-3 text-sm ${darkMode ? "text-gray-300" : "text-gray-500"
								}`}
						>
							✅ Image uploaded
						</span>
					)}
				</div>


				<button
					type="submit"
					disabled={loading}
					className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 disabled:opacity-50"
					style={{
						background: darkMode
							? "linear-gradient(135deg,#0c090f,#660c5e)"
							: "#9333ea",
						color: "#fff",
						border: darkMode
							? "1px solid #f209e2"
							: "1px solid #9333ea",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.background = "#e100ff";
						e.currentTarget.style.color = "#000";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.background = darkMode
							? "linear-gradient(135deg,#0c090f,#660c5e)"
							: "#9333ea";
						e.currentTarget.style.color = "#fff";
					}}
				>
					{loading ? (
						<>
							<Loader className="mr-2 h-5 w-5 animate-spin" />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className="mr-2 h-5 w-5" />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;




