import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";

const EditProductModal = ({
	product,
	onClose,
}) => {
	const { updateProduct } = useProductStore();

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

			<div className="bg-white rounded-3xl p-6 w-full max-w-xl">

				<h2 className="text-2xl font-bold text-purple-700 mb-6">
					Edit Product
				</h2>

				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>

					<div>
						<label className="block mb-2 font-medium">
							Product Name
						</label>

						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full border rounded-xl p-3"
						/>
					</div>

					<div>
						<label className="block mb-2 font-medium">
							Price
						</label>

						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleChange}
							className="w-full border rounded-xl p-3"
						/>
					</div>

					<div>
						<label className="block mb-2 font-medium">
							Category
						</label>

						<input
							type="text"
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="w-full border rounded-xl p-3"
						/>
					</div>

					<div>
						<label className="block mb-2 font-medium">
							Stock
						</label>

						<input
							type="number"
							name="stock"
							value={formData.stock}
							onChange={handleChange}
							className="w-full border rounded-xl p-3"
						/>
					</div>

					<div>
						<label className="block mb-2 font-medium">
							Description
						</label>

						<textarea
							name="description"
							rows="5"
							value={formData.description}
							onChange={handleChange}
							className="w-full border rounded-xl p-3"
						/>
					</div>

					<div className="flex gap-3 justify-end">

						<button
							type="button"
							onClick={onClose}
							className="px-5 py-3 rounded-xl border"
						>
							Cancel
						</button>

						<button
							type="submit"
							className="px-5 py-3 rounded-xl bg-purple-600 text-white"
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