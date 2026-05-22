import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Gift, Sparkles, Ticket } from "lucide-react";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");

	const {
		coupon,
		isCouponApplied,
		applyCoupon,
		getMyCoupon,
		removeCoupon,
	} = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;

		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
		<motion.div
			className='space-y-5 rounded-3xl border border-purple-200 bg-white p-6 shadow-2xl'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			
			<div className='text-center'>
				<div className='flex justify-center mb-4'>
					<div className='bg-purple-100 p-4 rounded-full shadow-md'>
						<Gift className='w-8 h-8 text-purple-600' />
					</div>
				</div>

				<h2 className='text-3xl font-bold text-purple-700'>
					Gift & Coupon Card
				</h2>

				<p className='text-gray-500 mt-2'>
					Apply your special Lovlit voucher 💜
				</p>
			</div>

			
			<div className='space-y-4'>
				<div>
					<label
						htmlFor='voucher'
						className='mb-3 flex items-center gap-2 text-sm font-semibold text-purple-700'
					>
						<Ticket className='w-4 h-4' />
						Do you have a voucher or gift card?
					</label>

					<input
						type='text'
						id='voucher'
						className='block w-full rounded-2xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-700 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none transition-all duration-300'
						placeholder='Enter your coupon code'
						value={userInputCode}
						onChange={(e) =>
							setUserInputCode(e.target.value)
						}
						required
					/>
				</div>

				
				<motion.button
					type='button'
					className='flex w-full items-center justify-center rounded-2xl bg-purple-600 px-5 py-4 text-base font-semibold text-white hover:bg-purple-700 shadow-lg transition-all duration-300'
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={handleApplyCoupon}
				>
					<Sparkles className='mr-2 w-5 h-5' />
					Apply Coupon
				</motion.button>
			</div>

			
			{isCouponApplied && coupon && (
				<div className='mt-5 rounded-2xl border border-green-200 bg-green-50 p-5'>
					<h3 className='text-lg font-bold text-green-700'>
						Applied Coupon 🎉
					</h3>

					<p className='mt-2 text-sm text-green-600'>
						{coupon.code} — {coupon.discountPercentage}% OFF
					</p>

					<motion.button
						type='button'
						className='mt-4 flex w-full items-center justify-center rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-all duration-300'
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.97 }}
						onClick={handleRemoveCoupon}
					>
						Remove Coupon
					</motion.button>
				</div>
			)}

			
			{coupon && (
				<div className='mt-5 rounded-2xl border border-purple-200 bg-purple-50 p-5'>
					<h3 className='text-lg font-bold text-purple-700'>
						Your Available Coupon 💜
					</h3>

					<p className='mt-2 text-sm text-gray-600'>
						{coupon.code} — {coupon.discountPercentage}% OFF
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default GiftCouponCard;