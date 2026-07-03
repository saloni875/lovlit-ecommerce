import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Gift, Sparkles, Ticket } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { darkMode } = useThemeStore();
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
			className={`space-y-5 rounded-3xl p-6 shadow-2xl transition-all duration-300 ${darkMode
				? "border border-fuchsia-700"
				: "border border-purple-200"
				}`}
			style={{
				background: darkMode
					? "linear-gradient(135deg,#18111f,#3b0b39)"
					: "#ffffff",
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>

			<div className='text-center'>
				<div className='flex justify-center mb-4'>
					<div
						className={`p-4 rounded-full shadow-md ${darkMode ? "bg-[#18111f]" : "bg-purple-100"
							}`}
					>
						<Gift
							className={`w-8 h-8 ${darkMode ? "text-pink-400" : "text-purple-600"
								}`}
						/>
					</div>
				</div>

				<h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-purple-700"
					}`}>
					Gift & Coupon Card
				</h2>

				<p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-500"
					}`}>
					Apply your special Lovlit voucher 💜
				</p>
			</div>


			<div className='space-y-4'>
				<div>
					<label
						htmlFor='voucher'
						className={`mb-3 flex items-center gap-2 text-sm font-semibold ${darkMode ? "text-white" : "text-purple-700"
							}`}
					>
						<Ticket className='w-4 h-4' />
						Do you have a voucher or gift card?
					</label>

					<input
						type='text'
						id='voucher'
						className='block w-full rounded-2xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-700 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 outline-none transition-all duration-300'
						style={{
							background: darkMode
								? "linear-gradient(135deg,#0c090f,#660c5e)"
								: "#9333ea",
							color: "#ffffff",
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
					style={{
						background: darkMode
							? "linear-gradient(135deg,#0c090f,#660c5e)"
							: "#9333ea",
						color: "#ffffff",
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
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={handleApplyCoupon}
				>
					<Sparkles className='mr-2 w-5 h-5' />
					Apply Coupon
				</motion.button>
			</div>


			{isCouponApplied && coupon && (
				<div className={`mt-5 rounded-2xl p-5 border ${darkMode
					? "bg-[#1b2d1b] border-green-600"
					: "bg-green-50 border-green-200"
					}`}>
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
				<div className={`mt-5 rounded-2xl p-5 border ${darkMode
					? "bg-[#18111f] border-fuchsia-700"
					: "bg-purple-50 border-purple-200"
					}`}>
					<h3 className={`mt-5 rounded-2xl p-5 border ${darkMode
						? "bg-[#18111f] border-fuchsia-700"
						: "bg-purple-50 border-purple-200"
						}`}>
						Your Available Coupon 💜
					</h3>

					<p className={`mt-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"
						}`}>
						{coupon.code} — {coupon.discountPercentage}% OFF
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default GiftCouponCard;