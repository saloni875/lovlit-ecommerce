import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, Heart, MessageCircle } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const { darkMode } = useThemeStore();

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
			transition={{ duration: 0.5 }}
		>

			<div className='text-center'>
				<h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-purple-700"}`}>
					Order Summary
				</h2>

				<p className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
					Review your aesthetic collection 💜
				</p>
			</div>


			<div className={`space-y-4 rounded-2xl p-5 border ${darkMode
				? "bg-[#18111f] border-fuchsia-700"
				: "bg-purple-50 border-purple-100"
				}`}>

				<dl className='flex items-center justify-between gap-4'>
					<dt className={`text-base font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
						Original Price
					</dt>

					<dd className={`text-lg font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
						₹{formattedSubtotal}
					</dd>
				</dl>


				{savings > 0 && (
					<dl className='flex items-center justify-between gap-4'>
						<dt className={`text-base font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
							Savings
						</dt>

						<dd className={`text-lg font-semibold ${darkMode ? "text-pink-500" : "text-pink-500"}`}>
							-₹{formattedSavings}
						</dd>
					</dl>
				)}


				{coupon && isCouponApplied && (
					<dl className='flex items-center justify-between gap-4'>
						<dt className={`text-base font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
							Coupon ({coupon.code})
						</dt>

						<dd className={`text-lg font-semibold ${darkMode ? "text-green-500" : "text-green-500"}`}>
							-{coupon.discountPercentage}%
						</dd>
					</dl>
				)}


				<dl className='flex items-center justify-between gap-4 border-t border-purple-200 pt-4'>
					<dt className={`text-xl font-bold ${darkMode ? "text-white" : "text-purple-700"}`}>
						Total
					</dt>

					<dd className={`text-2xl font-bold ${darkMode ? "text-pink-500" : "text-pink-500"}`}>
						₹{formattedTotal}
					</dd>
				</dl>
			</div>



			<Link
				to='/checkout'
				className="flex w-full items-center justify-center rounded-2xl px-5 py-4 text-base font-semibold shadow-lg transition-all duration-300"
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
			>

				Buy Now 💗
			</Link>

			<div className={`text-center font-medium ${darkMode ? "text-white" : "text-gray-400"}`}>
				or
			</div>


			<Link
				to="/"
				className="flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-300"
				style={{
					background: darkMode
						? "#18111f"
						: "#ffffff",
					color: darkMode
						? "#ffffff"
						: "#6b21a8",
					border: darkMode
						? "1px solid #f209e2"
						: "1px solid #9333ea",
				}}
				onMouseEnter={(e) => {
					if (darkMode) {
						e.currentTarget.style.background = "#e100ff";
						e.currentTarget.style.color = "#000";
					} else {
						e.currentTarget.style.background = "#f3e8ff";
					}
				}}
				onMouseLeave={(e) => {
					if (darkMode) {
						e.currentTarget.style.background = "#18111f";
						e.currentTarget.style.color = "#fff";
					} else {
						e.currentTarget.style.background = "#ffffff";
					}
				}}
			>
				<Heart size={18} />
				Continue Shopping
				<MoveRight size={18} />
			</Link>
		</motion.div>
	);
};

export default OrderSummary;