import { XCircle, ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-purple-200'
			>
				<div className='p-8'>
					
					<div className='text-center mb-6'>
						<h1 className='logo-font text-5xl text-purple-700 mb-2'>
							Lovlit
						</h1>

						<p className='text-gray-500'>
							BTS Inspired Aesthetic Collection
						</p>
					</div>

					
					<div className='flex justify-center'>
						<div className='bg-red-100 p-5 rounded-full'>
							<XCircle className='text-red-500 w-16 h-16' />
						</div>
					</div>

					
					<h1 className='text-3xl font-bold text-center text-red-500 mt-6 mb-3'>
						Purchase Cancelled
					</h1>

					<p className='text-gray-600 text-center mb-6 leading-relaxed'>
						Your order has been cancelled successfully.
						No payment was charged from your account.
					</p>

					
					<div className='bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-6'>
						<p className='text-sm text-gray-600 text-center leading-relaxed'>
							If you faced any issue during checkout,
							feel free to contact Lovlit support anytime 💜
						</p>
					</div>

					
					<div className='space-y-4'>
						<Link
							to={"/"}
							className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-2xl transition duration-300 flex items-center justify-center shadow-md'
						>
							<ArrowLeft className='mr-2' size={18} />
							Return to Shop
						</Link>

						<Link
							to={"/cart"}
							className='w-full bg-white border border-purple-300 hover:bg-purple-50 text-purple-700 font-semibold py-3 px-4 rounded-2xl transition duration-300 flex items-center justify-center'
						>
							<Heart className='mr-2' size={18} />
							Back to Cart
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default PurchaseCancelPage;