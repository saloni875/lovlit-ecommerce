import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { useThemeStore } from "../stores/useThemeStore";
import { Helmet } from "react-helmet-async";

const CheckoutPage = () => {
	const { cart, total } = useCartStore();
	const { user } = useUserStore();
	const { darkMode } = useThemeStore();

	const [customerInfo, setCustomerInfo] = useState({
		name: "",
		phone: "",
		address: "",
		doorNo: "",
		city: "",
		state: "",
		pincode: "",
		instagram: "",
	});

	const [shippingMethod, setShippingMethod] = useState("standard shipping");
	const [shippingCharge, setShippingCharge] = useState(45); // Default shipping charges for standard shipping
	const grandTotal = total + shippingCharge;

	const handleChange = (e) => {
		setCustomerInfo({
			...customerInfo,
			[e.target.name]: e.target.value,
		});
	};

	const handleWhatsAppOrder = () => {

		if (cart.length === 0) {
			alert("Your cart is empty");
			return;
		}

		if (
			!customerInfo.name ||
			!customerInfo.phone ||
			!customerInfo.address ||
			!customerInfo.doorNo ||
			!customerInfo.city ||
			!customerInfo.state ||
			!customerInfo.pincode
		) {
			alert("Please fill all required fields");
			return;
		}

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

				return `${index + 1}. ${item.name}${details}`;
			})
			.join("\n\n");

		const message = `Hello - LOVLIT, I would like to place an order with the following details:

Name: ${customerInfo.name}

Phone: ${customerInfo.phone}

Address:
${customerInfo.address}
${customerInfo.doorNo}
${customerInfo.city}
${customerInfo.state}
${customerInfo.pincode}


---

${orderItems}

---

Products Total: ₹${total}

Shipping Method: ${shippingMethod}

Shipping Charge: ₹${shippingCharge}

Grand Total: ₹${grandTotal}

---

Thank you , kindly share your payment details.`;

		window.open(
			`https://wa.me/918583094531?text=${encodeURIComponent(message)}`,
			"_blank"
		);
	};

	return (
		<>


			<Helmet>
				<title>Checkout | Lovlit</title>

				<meta
					name="description"
					content="Complete your secure checkout and place your order at Lovlit."
				/>
			</Helmet>
			<div
				className="min-h-screen py-6 sm:py-10 px-3 sm:px-4 transition-all duration-300"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "#f8f5ff",
				}}
			>
				<div
					className={`max-w-3xl mx-auto rounded-3xl shadow-xl border p-5 sm:p-8 ${darkMode
						? "border-fuchsia-700"
						: "border-purple-200"
						}`}
					style={{
						background: darkMode
							? "linear-gradient(135deg,#18111f,#3b0b39)"
							: "#ffffff",
					}}
				>

					<h1
						className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${darkMode ? "text-white" : "text-purple-700"
							}`}
					>
						Checkout
					</h1>

					<div className="space-y-5">

						<div>
							<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
								Full Name *
							</label>

							<input
								type="text"
								name="name"
								placeholder="Enter your full name"
								value={customerInfo.name}
								onChange={handleChange}
								className={`w-full rounded-xl p-4 border transition-all ${darkMode
									? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
									: "bg-white border-purple-200 text-black"
									}`}
							/>
						</div>

						<div>
							<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
								Phone Number *
							</label>

							<input
								type="text"
								name="phone"
								placeholder="Enter your phone number"
								value={customerInfo.phone}
								onChange={handleChange}
								className={`w-full rounded-xl p-4 border transition-all ${darkMode
									? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
									: "bg-white border-purple-200 text-black"
									}`}
							/>
						</div>

						<div>
							<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
								Address Line 1 *
							</label>

							<textarea
								name="address"
								placeholder="House Number, Street, Area"
								value={customerInfo.address}
								onChange={handleChange}
								rows="4"
								className={`w-full rounded-xl p-4 border transition-all ${darkMode
									? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
									: "bg-white border-purple-200 text-black"
									}`}
							/>
						</div>

						<div>
							<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
								House Number/ Flat No/ Building Name *
							</label>

							<textarea
								name="doorNo"
								placeholder="House number, flat number, or building name"
								value={customerInfo.doorNo}
								onChange={handleChange}
								rows="4"
								className={`w-full rounded-xl p-4 border transition-all ${darkMode
									? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
									: "bg-white border-purple-200 text-black"
									}`}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

							<div>
								<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
									City *
								</label>

								<input
									type="text"
									name="city"
									value={customerInfo.city}
									onChange={handleChange}
									className={`w-full rounded-xl p-4 border transition-all ${darkMode
										? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
										: "bg-white border-purple-200 text-black"
										}`}
								/>
							</div>

							<div>
								<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
									State *
								</label>

								<input
									type="text"
									name="state"
									value={customerInfo.state}
									onChange={handleChange}
									className={`w-full rounded-xl p-4 border transition-all ${darkMode
										? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
										: "bg-white border-purple-200 text-black"
										}`}
								/>
							</div>

							<div>
								<label className={`block mb-2 font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
									Pincode *
								</label>

								<input
									type="text"
									name="pincode"
									value={customerInfo.pincode}
									onChange={handleChange}
									className={`w-full rounded-xl p-4 border transition-all ${darkMode
										? "bg-[#18111f] border-fuchsia-700 text-white placeholder:text-gray-400"
										: "bg-white border-purple-200 text-black"
										}`}
								/>
							</div>

						</div>



						<div className="space-y-4">

							<h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-purple-700"}`}>
								Choose Delivery Method
							</h3>

							<label className={`flex items-start gap-3 border ${darkMode ? "border-fuchsia-700" : "border-purple-200"} rounded-xl p-4 cursor-pointer`}>
								<input
									type="radio"
									name="shipping"
									checked={shippingMethod === "Standard Shipping"}
									onChange={() => {
										setShippingMethod("Standard Shipping");
										setShippingCharge(59);
									}}
								/>

								<div>
									<p className="font-medium">
										Standard Shipping — ₹59
									</p>

									<p className="text-sm text-gray-500">
										Delivery in 9 - 10 business days
									</p>
								</div>
							</label>

							<label className={`flex items-start gap-3 border ${darkMode ? "border-fuchsia-700" : "border-purple-200"} rounded-xl p-4 cursor-pointer`}	>
								<input
									type="radio"
									name="shipping"
									checked={shippingMethod === "Speed Post"}
									onChange={() => {
										setShippingMethod("Speed Post");
										setShippingCharge(89);
									}}
								/>

								<div>
									<p className="font-medium">
										Speed Post — ₹89
									</p>

									<p className="text-sm text-gray-500">
										Delivery in 6 - 7 business days
									</p>
								</div>
							</label>

						</div>


						<div className={`rounded-xl p-4 border ${darkMode
							? "bg-[#18111f] border-fuchsia-700 text-white"
							: "bg-purple-50 border-purple-200"
							}`}>
							<p>Products Total: ₹{total}</p>

							<p>Shipping: ₹{shippingCharge}</p>

							<p className={`font-bold text-lg ${darkMode ? "text-white" : "text-purple-700"}`}>
								Grand Total: ₹{grandTotal}
							</p>
						</div>

						<div className={`rounded-2xl p-5 text-sm space-y-2 border ${darkMode
							? "bg-[#18111f] border-fuchsia-700 text-gray-200"
							: "bg-purple-50 border-purple-200 text-gray-700"
							}`}>
							<p>📦 <b>Standard Shipping:</b> ₹59</p>

							<p>⚡ <b>Speed Post:</b> ₹89</p>

							<p>🧵 <b>Every Lovlit product is <i>handmade</i>  with care.</b></p>

							<p>🚚 <b>Pan India Delivery 🇮🇳
								Your order will usually arrive within 3 - 10 business days, depending on your location.</b></p>

							<p> <b>Please record an unboxing video for any damage, return, or refund claim.</b></p>
						</div>
						<button
							onClick={handleWhatsAppOrder}
							className={`w-full py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold shadow-lg transition-all duration-300 `}
							style={{
								background: darkMode
									? "linear-gradient(135deg, #0c090f, #660c5e)"
									: "",
								color: darkMode ? "#f6ebeb" : "",
								border: darkMode ? "1px solid #c646b3" : "1px solid #e9d5ff",
							}}
							onMouseEnter={(e) => {
								if (darkMode) {
									e.currentTarget.style.background = "#e100ff";
									e.currentTarget.style.color = "#000000";
								}
							}}
							onMouseLeave={(e) => {
								if (darkMode) {
									e.currentTarget.style.background =
										"linear-gradient(135deg, #0c090f, #660c5e)";
									e.currentTarget.style.color = "#ffffff";
								}
							}}
						>
							Place Order via WhatsApp 🩷
						</button>

					</div>
				</div>
			</div>
		</>
	);
};

export default CheckoutPage;