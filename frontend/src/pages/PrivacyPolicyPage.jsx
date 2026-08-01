import {Helmet} from "react-helmet-async";


const PrivacyPolicyPage = () => {
	return (
		<>

			<Helmet>
				<title>Privacy Policy | Lovlit</title>

				<meta
					name="description"
					content="Read Lovlit's Privacy Policy to learn how we collect, use and protect your personal information."
				/>
			</Helmet>
			<div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white py-12 px-4">

				<div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200 p-6 sm:p-10">

					<h1 className="logo-font text-5xl text-center text-purple-700 mb-2">
						Lovlit
					</h1>

					<h2 className="text-3xl font-bold text-center text-pink-500 mb-8">
						Privacy Policy
					</h2>

					<div className="space-y-6 text-gray-700 leading-relaxed">

						<section>
							<h3 className="text-xl font-semibold text-purple-700 mb-2">
								Information We Collect
							</h3>

							<p>
								When placing an order, we may collect your
								name, phone number, shipping address,
								city, state, pincode and Instagram username
								(if provided).
							</p>
						</section>

						<section>
							<h3 className="text-xl font-semibold text-purple-700 mb-2">
								How We Use Your Information
							</h3>

							<p>
								Your information is used only for order
								processing, shipping, customer support,
								and order updates.
							</p>
						</section>

						<section>
							<h3 className="text-xl font-semibold text-purple-700 mb-2">
								Information Sharing
							</h3>

							<p>
								Lovlit by Anshu does not sell, rent,
								or share customer information for
								marketing purposes.
							</p>

							<p className="mt-2">
								Information may be shared only with
								shipping partners when required
								to deliver your order.
							</p>
						</section>

						<section>
							<h3 className="text-xl font-semibold text-purple-700 mb-2">
								Data Retention
							</h3>

							<p>
								Customer information is stored only as long
								as required to process and deliver orders.
								Order records and screenshots are regularly
								removed after order completion.
							</p>
						</section>

						<section>
							<h3 className="text-xl font-semibold text-purple-700 mb-2">
								Payment Information
							</h3>

							<p>
								We do not store card details, UPI PINs,
								bank account passwords, or other sensitive
								payment credentials.
							</p>
						</section>

						<section>
							<h3 className="text-xl font-semibold text-purple-700 mb-2">
								Contact Us
							</h3>

							<p>
								If you have any questions regarding this
								Privacy Policy, please contact Lovlit by Anshu
								through WhatsApp or Instagram.
							</p>
						</section>

					</div>

				</div>

			</div>
		</>
	);
};

export default PrivacyPolicyPage;