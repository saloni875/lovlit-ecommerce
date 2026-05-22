import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	return (
		<motion.div
			className='bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl mx-auto border border-purple-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className='min-w-full'>
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

				<tbody className='divide-y divide-purple-100 bg-white'>
					{products?.map((product) => (
						<tr
							key={product._id}
							className='hover:bg-purple-50 transition-colors duration-300'
						>
							<td className='px-6 py-5 whitespace-nowrap'>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-14 w-14'>
										<img
											className='h-14 w-14 rounded-2xl object-cover border border-purple-200 shadow'
											src={product.image}
											alt={product.name}
										/>
									</div>

									<div className='ml-4'>
										<div className='text-lg font-semibold text-purple-700 capitalize'>
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
								<div className='text-sm font-medium text-gray-700 capitalize'>
									{product.category}
								</div>
							</td>

							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-2 rounded-full shadow-md transition-all duration-300 ${
										product.isFeatured
											? "bg-yellow-400 text-white hover:bg-yellow-500"
											: "bg-purple-200 text-purple-700 hover:bg-purple-300"
									}`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>

							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded-full transition-all duration-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default ProductsList;