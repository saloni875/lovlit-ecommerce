import { motion } from "framer-motion";
import { Trash, Star, Pencil } from "lucide-react";
import { useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import EditProductModal from "./EditProductModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useThemeStore } from "../stores/useThemeStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, updateProduct, products } = useProductStore();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [productToDelete, setProductToDelete] = useState(null);
	const { darkMode } = useThemeStore();

	return (
		<motion.div
			className={`bg-white shadow-2xl rounded-3xl overflow-hidden max-w-[1500px] mx-auto border border-purple-20${darkMode
				? "bg-[#18111f] border-purple-700"
				: "bg-white border-purple-200"
				}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			{/* MOBILE */}
			<div className='grid grid-cols-2 md:grid-cols-3 gap-4 p-4 lg:hidden'>
				{products?.map((product) => (
					<div
						key={product._id}
						className={`rounded-2xl p-3 shadow border ${darkMode
								? "bg-[#18111f] border-purple-700"
								: "bg-white border-purple-100"
							}`}
					>
						<img
							src={product.images?.[0] || product.image}
							alt={product.name}
							className='w-full aspect-square object-cover rounded-xl'
						/>

						<h3 className={`text-lg font-semibold capitalize min-h-[45px] lime-clamp-2 ${darkMode ? "text-white" : "text-purple-700"
							}`}>
							{product.name}
						</h3>

						<p className='text-pink-500 font-bold text-sm'>
							₹{product.price}
						</p>

						<p className={`text-sm font-semibold  ${darkMode ? "text-white" : "text-purple-700"
							}`}>
							{product.category}
						</p>
						<p
							className={`text-xs font-semibold mt-1 ${product.stock > 0
								? "text-green-600"
								: "text-red-500"
								}`}
						>
							Stock: {product.stock}
						</p>

						<div className='flex justify-between mt-2'>
							<button
								onClick={() => toggleFeaturedProduct(product._id)}
								className={`p-2 rounded-full transition-all ${product.isFeatured
									? "bg-yellow-400 text-white"
									: "bg-purple-100 text-purple-700"
									}`}
							>
								<Star className='h-4 w-4' />
							</button>

							<button
								onClick={() => setSelectedProduct(product)}
								className='p-2 rounded-full bg-blue-100 text-blue-600'
							>
								<Pencil className='h-4 w-4' />
							</button>

							<button
								onClick={() => setProductToDelete(product)}
								className='p-2 rounded-full bg-red-100 text-red-500'
							>
								<Trash className='h-4 w-4' />
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Desktop View */}

			<div className="hidden lg:block overflow-x-auto">
				<table className='min-w-[1200px] w-full'>
					<thead className='bg-gradient-to-r from-purple-600 to-pink-500'>
						<tr>
							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider'
							>
								Product
							</th>

							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider'
							>
								Price
							</th>

							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider'
							>
								Category
							</th>

							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider'
							>
								Stock
							</th>

							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider'
							>
								Featured
							</th>

							<th
								scope='col'
								className='px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider'
							>
								Actions
							</th>
						</tr>
					</thead>

					<tbody
						className={`divide-y ${darkMode
							? "divide-purple-800 bg-[#18111f]"
							: "divide-purple-100 bg-white"
							}`}
					>
						{products?.map((product) => (
							<tr
								key={product._id}
								className={`transition-colors duration-300 ${darkMode
									? "hover:bg-[#2b1d35]"
									: "hover:bg-purple-50"
									}`}
							>
								<td className='px-6 py-5 whitespace-nowrap'>
									<div className='flex items-center'>
										<div className='flex-shrink-0 h-14 w-14'>
											<img
												className='h-14 w-14 rounded-2xl object-cover border border-purple-200 shadow'
												src={product.images?.[0] || product.image}
												alt={product.name}
											/>
										</div>

										<div className='ml-4'>
											<div className={`text-lg font-semibold capitalize ${darkMode ? "text-white" : "text-purple-700"
												}`}>
												{product.name}
											</div>
										</div>
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className='text-lg font-bold text-pink-500'>
										₹{product.price}
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div className={`text-sm font-medium capitalize ${darkMode ? "text-gray-300" : "text-gray-700"
										}`}>
										{product.category}
									</div>
								</td>

								<td className='px-6 py-4 whitespace-nowrap'>
									<div
										className={`font-bold text-xl ${product.stock > 0
											? "text-green-700"
											: "text-red-500"
											}`}
									>
										{product.stock}
									</div>
								</td>


								<td className='px-6 py-4 whitespace-nowrap'>
									<button
										onClick={() => toggleFeaturedProduct(product._id)}
										className={`p-2 rounded-full shadow-md transition-all duration-300 ${product.isFeatured
											? "bg-yellow-400 text-white hover:bg-yellow-500"
											: "bg-purple-200 text-purple-700 hover:bg-purple-300"
											}`}
									>
										<Star className='h-5 w-5' />
									</button>
								</td>

								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium min-w-[140px]'>
									<button
										onClick={() => setSelectedProduct(product)}
										className='bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-all duration-300 mr-2'
									>
										<Pencil className='h-5 w-5' />
									</button>
									<button
										onClick={() => setProductToDelete(product)}
										className='bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-full transition-all duration-300'
									>
										<Trash className='h-5 w-5' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>


			{selectedProduct && (
				<EditProductModal
					product={selectedProduct}
					onClose={() => setSelectedProduct(null)}
				/>
			)}

			{productToDelete && (
				<DeleteConfirmationModal
					isOpen={true}
					title="Delete Product"
					message={productToDelete.name}
					onClose={() => setProductToDelete(null)}
					onConfirm={() => {
						deleteProduct(productToDelete._id);
						setProductToDelete(null);
					}}
				/>
			)}


		</motion.div>
	);
};

export default ProductsList;