import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useThemeStore } from "../stores/useThemeStore";

const categories = [
	"jewelry",
	"phone-charms",
	"army-zone",
	"candles",
	"gifts-bouquets",
	"trinkets-more",
];

const EditProductModal = ({
	product,
	onClose,
}) => {
	const { updateProduct } = useProductStore();
	const { darkMode } = useThemeStore();

	const [formData, setFormData] = useState({
		name: product.name || "",
		price: product.price || "",
		category: product.category || "",
		description: product.description || "",
		stock: product.stock || 0,
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await updateProduct(
			product._id,
			{
				...formData,
				price: Number(formData.price),
				stock: Number(formData.stock),
			}
		);

		onClose();
	};


	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

			<div
				className={`rounded-3xl p-6 w-full max-w-xl border ${darkMode
					? "border-fuchsia-700"
					: "border-purple-200"
					}`}
				style={{
					background: darkMode
						? "linear-gradient(135deg,#18111f,#3b0b39)"
						: "#ffffff",
				}}
			>

				<h2
					className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-purple-700"
						}`}
				>
					Edit Product
				</h2>

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>

					<div>
						<label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
							}`}>
							Product Name
						</label>

						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className={`w-full rounded-xl p-3 border transition-all ${darkMode
								? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-purple-200 text-black"
								}`}
						/>
					</div>

					<div>
						<label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
							}`}>
							Price
						</label>

						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleChange}
							className={`w-full rounded-xl p-3 border transition-all ${darkMode
								? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-purple-200 text-black"
								}`}
						/>
					</div>

					<div>
						<label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
							}`}>
							Category
						</label>

						<select
							name="category"
							value={formData.category}
							onChange={handleChange}
							className={`w-full rounded-xl p-3 border transition-all ${darkMode
								? "bg-[#18111f] border-fuchsia-700 text-white"
								: "bg-white border-purple-200 text-black"
								}`}
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category
										.split("-")
										.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
										.join(" ")}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
							}`}	>
							Stock
						</label>

						<input
							type="number"
							name="stock"
							value={formData.stock}
							onChange={handleChange}
							className={`w-full rounded-xl p-3 border transition-all ${darkMode
								? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-purple-200 text-black"
								}`}
						/>
					</div>

					<div>
						<label className={`block mb-2 font-medium ${darkMode ? "text-gray-200" : "text-gray-700"
							}`}>
							Description
						</label>

						<textarea
							name="description"
							rows="5"
							value={formData.description}
							onChange={handleChange}
							className={`w-full rounded-xl p-3 border transition-all ${darkMode
								? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
								: "bg-white border-purple-200 text-black"
								}`}
						/>
					</div>

					<div className="flex gap-3 justify-end">

						<button
							type="button"
							onClick={onClose}
							className={`px-5 py-3 rounded-xl border transition ${darkMode
								? "border-fuchsia-700 text-white hover:bg-fuchsia-700"
								: "border-purple-300 hover:bg-purple-100"
								}`}
						>
							Cancel
						</button>

						<button
							type="submit"
							className={`px-5 py-3 rounded-xl font-semibold transition ${darkMode
								? "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white"
								: "bg-purple-600 hover:bg-purple-700 text-white"
								}`}
						>
							Save Changes
						</button>

					</div>

				</form>

			</div>

		</div>
	);
};

export default EditProductModal;