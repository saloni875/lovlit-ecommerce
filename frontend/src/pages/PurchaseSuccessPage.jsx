import {
	ArrowRight,
	CheckCircle,
	HandHeart,
	Heart,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});

				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(
			window.location.search
		).get("session_id");

		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL means no order was processed. Please try again.");
		}
	}, [clearCart]);

	if (isProcessing)
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
				<p className='text-2xl font-semibold text-purple-700'>
					Processing your order...
				</p>
			</div>
		);

	if (error)
		return (
			<div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
				<p className='text-xl font-semibold text-red-500'>
					Error: {error}
				</p>
			</div>
		);

	return (
		<div className='min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
			
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.08}
				style={{ zIndex: 99 }}
				numberOfPieces={500}
				recycle={false}
			/>

			
			<div className='max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-purple-200'>
				<div className='p-8'>
					
					<div className='text-center mb-6'>
						<h1 className='logo-font text-5xl text-purple-700 mb-2'>
							Lovlit
						</h1>

						<p className='text-gray-500'>
							BTS Inspired Collection 💜
						</p>
					</div>

					
					<div className='flex justify-center'>
						<div className='bg-green-100 p-5 rounded-full'>
							<CheckCircle className='text-green-500 w-16 h-16' />
						</div>
					</div>

					
					<h1 className='text-3xl font-bold text-center text-purple-700 mt-6 mb-3'>
						Purchase Successful!
					</h1>

					<p className='text-gray-600 text-center mb-2 leading-relaxed'>
						Thank you for your order 💜
						We&apos;re preparing your aesthetic collection now.
					</p>

					<p className='text-pink-500 text-center text-sm mb-6 font-medium'>
						Check your email for order details and updates.
					</p>

					
					<div className='bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-6 space-y-3'>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-500'>
								Order number
							</span>

							<span className='text-sm font-bold text-purple-700'>
								#12345
							</span>
						</div>

						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-500'>
								Estimated delivery
							</span>

							<span className='text-sm font-bold text-purple-700'>
								3-5 business days
							</span>
						</div>
					</div>

					
					<div className='space-y-4'>
						<button
							className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-2xl transition duration-300 flex items-center justify-center shadow-md'
						>
							<HandHeart
								className='mr-2'
								size={18}
							/>

							Thank you for trusting Lovlit!
						</button>

						<Link
							to={"/"}
							className='w-full bg-white border border-purple-300 hover:bg-purple-50 text-purple-700 font-semibold py-3 px-4 rounded-2xl transition duration-300 flex items-center justify-center'
						>
							<Heart
								className='mr-2'
								size={18}
							/>

							Continue Shopping

							<ArrowRight
								className='ml-2'
								size={18}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;