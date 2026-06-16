import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const CheckoutPage = () => {
	const { cart, total } = useCartStore();

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

Grand Total: ₹${total}

Thank you , kindly share your payment details.`;

		window.open(
			`https://wa.me/918583094531?text=${encodeURIComponent(message)}`,
			"_blank"
		);
	};

	return (
		<div className="min-h-screen py-10 px-4">
			<div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-purple-200">

				<h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
					Checkout
				</h1>

				<div className="space-y-5">

					<div>
						<label className="block mb-2 font-semibold text-purple-700">
							Full Name *
						</label>

						<input
							type="text"
							name="name"
							placeholder="Enter your full name"
							value={customerInfo.name}
							onChange={handleChange}
							className="w-full border border-purple-200 rounded-xl p-4"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold text-purple-700">
							Phone Number *
						</label>

						<input
							type="text"
							name="phone"
							placeholder="Enter your phone number"
							value={customerInfo.phone}
							onChange={handleChange}
							className="w-full border border-purple-200 rounded-xl p-4"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold text-purple-700">
							Address Line 1 *
						</label>

						<textarea
							name="address"
							placeholder="House Number, Street, Area"
							value={customerInfo.address}
							onChange={handleChange}
							rows="4"
							className="w-full border border-purple-200 rounded-xl p-4"
						/>
					</div>

					<div>
						<label className="block mb-2 font-semibold text-purple-700">
							House Number/ Flat No/ Building Name *
						</label>

						<textarea
							name="doorNo"
							placeholder="House number, flat number, or building name"
							value={customerInfo.doorNo}
							onChange={handleChange}
							rows="4"
							className="w-full border border-purple-200 rounded-xl p-4"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

						<div>
							<label className="block mb-2 font-semibold text-purple-700">
								City *
							</label>

							<input
								type="text"
								name="city"
								value={customerInfo.city}
								onChange={handleChange}
								className="w-full border border-purple-200 rounded-xl p-4"
							/>
						</div>

						<div>
							<label className="block mb-2 font-semibold text-purple-700">
								State *
							</label>

							<input
								type="text"
								name="state"
								value={customerInfo.state}
								onChange={handleChange}
								className="w-full border border-purple-200 rounded-xl p-4"
							/>
						</div>

						<div>
							<label className="block mb-2 font-semibold text-purple-700">
								Pincode *
							</label>

							<input
								type="text"
								name="pincode"
								value={customerInfo.pincode}
								onChange={handleChange}
								className="w-full border border-purple-200 rounded-xl p-4"
							/>
						</div>

					</div>

					{/* <div>
						<label className="block mb-2 font-semibold text-purple-700">
							Instagram Username (Optional)
						</label>

						<input
							type="text"
							name="instagram"
							placeholder="@username"
							value={customerInfo.instagram}
							onChange={handleChange}
							className="w-full border border-purple-200 rounded-xl p-4"
						/>
					</div> */}

					<div className="space-y-4">

						<h3 className="text-lg font-semibold text-purple-700">
							Choose Delivery Method
						</h3>

						<label className="flex items-start gap-3 border border-purple-200 rounded-xl p-4 cursor-pointer">
							<input
								type="radio"
								name="shipping"
								checked={shippingMethod === "Standard Shipping"}
								onChange={() => {
									setShippingMethod("Standard Shipping");
									setShippingCharge(45);
								}}
							/>

							<div>
								<p className="font-medium">
									Standard Shipping — ₹45
								</p>

								<p className="text-sm text-gray-500">
									Delivery in 6–7 business days
								</p>
							</div>
						</label>

						<label className="flex items-start gap-3 border border-purple-200 rounded-xl p-4 cursor-pointer">
							<input
								type="radio"
								name="shipping"
								checked={shippingMethod === "Speed Post"}
								onChange={() => {
									setShippingMethod("Speed Post");
									setShippingCharge(72);
								}}
							/>

							<div>
								<p className="font-medium">
									Speed Post — ₹72
								</p>

								<p className="text-sm text-gray-500">
									Delivery in 3 - 4 business days
								</p>
							</div>
						</label>

					</div>


					<div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
						<p>Products Total: ₹{total}</p>

						<p>Shipping: ₹{shippingCharge}</p>

						<p className="font-bold text-lg text-purple-700">
							Grand Total: ₹{total + shippingCharge}
						</p>
					</div>

					<div className='rounded-2xl border border-purple-200 bg-purple-50 p-5 text-sm text-gray-700 space-y-2'>
						<p>📦 <b>Standard Shipping:</b> ₹45</p>

						<p>⚡ <b>Speed Post:</b> ₹72</p>

						<p>🧵 <b>Every Lovlit product is <i>handmade</i>  with care.</b></p>

						<p>🚚 <b>Dispatch & delivery may take 3-7 days.</b></p>

						<p> <b>Please record an unboxing video for any damage, return, or refund claim.</b></p>
					</div>
					<button
						onClick={handleWhatsAppOrder}
						className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-2xl transition duration-300"
					>
						Order on WhatsApp 🩷
					</button>

				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;