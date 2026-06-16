import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, Heart, MessageCircle } from "lucide-react";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;

	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handleWhatsAppOrder = () => {
		const orderItems = cart
			.map((item, index) => {
				let details = "";

				if (item.selectedOption) {
					details += `\n${item.optionType}: ${item.selectedOption}`;
				}

				if (item.customText) {
					details += `\nCustom Name: ${item.customText}`;
				}

				details += `\nPrice: ₹${item.price}`;
				details += `\nQty: ${item.quantity}`;
				details += `\nItem Total: ₹${item.price * item.quantity}`;

				return ` ${index + 1}. ${item.name}${details}`;
			})
			.join("\n\n");

		const message = `Hello - LOVLIT, i would like to place an order with the following details:

${orderItems}

━━━━━━━━━━

Total price: ₹${formattedTotal}

Please share:
• Payment QR / UPI ID
• Delivery Charges
• Estimated Dispatch Date

Thank you `;

		window.open(
			`https://wa.me/918874407976?text=${encodeURIComponent(message)}`,
			"_blank"
		);
	};

	return (
		<motion.div
			className='space-y-5 rounded-3xl border border-purple-200 bg-white p-6 shadow-2xl'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>

			<div className='text-center'>
				<h2 className='text-3xl font-bold text-purple-700'>
					Order Summary
				</h2>

				<p className='text-gray-500 mt-2'>
					Review your aesthetic collection 💜
				</p>
			</div>


			<div className='space-y-4 bg-purple-50 rounded-2xl p-5 border border-purple-100'>

				<dl className='flex items-center justify-between gap-4'>
					<dt className='text-base font-medium text-gray-600'>
						Original Price
					</dt>

					<dd className='text-lg font-semibold text-purple-700'>
						₹{formattedSubtotal}
					</dd>
				</dl>


				{savings > 0 && (
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-medium text-gray-600'>
							Savings
						</dt>

						<dd className='text-lg font-semibold text-pink-500'>
							-₹{formattedSavings}
						</dd>
					</dl>
				)}


				{coupon && isCouponApplied && (
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-medium text-gray-600'>
							Coupon ({coupon.code})
						</dt>

						<dd className='text-lg font-semibold text-green-500'>
							-{coupon.discountPercentage}%
						</dd>
					</dl>
				)}


				<dl className='flex items-center justify-between gap-4 border-t border-purple-200 pt-4'>
					<dt className='text-xl font-bold text-purple-700'>
						Total
					</dt>

					<dd className='text-2xl font-bold text-pink-500'>
						₹{formattedTotal}
					</dd>
				</dl>
			</div>

			{/* 
			<motion.button
				className='flex w-full items-center justify-center rounded-2xl bg-purple-600 px-5 py-4 text-base font-semibold text-white hover:bg-purple-700 shadow-lg transition-all duration-300'
				whileHover={{ scale: 1.03 }}
				whileTap={{ scale: 0.97 }}
				onClick={handleWhatsAppOrder}
			>
				<MessageCircle className='mr-2' size={20} />
				Order on WhatsApp
			</motion.button> */}

			<Link
				to='/checkout'
				className='flex w-full items-center justify-center rounded-2xl bg-purple-600 px-5 py-4 text-base font-semibold text-white hover:bg-purple-700 shadow-lg transition-all duration-300'
			>
				{/* <MessageCircle className='mr-2' size={20} /> */}
				Proceed to Checkout
	   		</Link>

			<div className='text-center text-gray-400 font-medium'>
				or
			</div>


			<Link
				to='/'
				className='flex items-center justify-center gap-2 rounded-2xl border border-purple-300 bg-white px-5 py-4 text-base font-semibold text-purple-700 hover:bg-purple-50 transition-all duration-300'
			>
				<Heart size={18} />
				Continue Shopping
				<MoveRight size={18} />
			</Link>
		</motion.div>
	);
};

export default OrderSummary;