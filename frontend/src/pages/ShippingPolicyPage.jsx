const ShippingPolicyPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white py-12 px-4">

			<div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-purple-200 p-6 sm:p-10">

				<h1 className="logo-font text-5xl text-center text-purple-700 mb-2">
					Lovlit
				</h1>

				<h2 className="text-3xl font-bold text-center text-pink-500 mb-8">
					Shipping Policy
				</h2>

				<div className="space-y-6 text-gray-700 leading-relaxed">

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Shipping Coverage
						</h3>

						<p>
							Lovlit by Anshu currently ships across India.
							International shipping is not available at this time.
						</p>
					</section>

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Courier Partner
						</h3>

						<p>
							Orders are shipped through India Post.
						</p>
					</section>

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Shipping Charges
						</h3>

						<ul className="list-disc ml-6 space-y-2">
							<li>Standard Shipping: ₹45</li>
							<li>Speed Post: ₹72</li>
						</ul>
					</section>

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Dispatch Time
						</h3>

						<p>
							As all Lovlit products are handmade, order preparation
							and dispatch may take approximately 3–7 days.
						</p>
					</section>

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Estimated Delivery Time
						</h3>

						<ul className="list-disc ml-6 space-y-2">
							<li>Standard Shipping: 6–7 business days</li>
							<li>Speed Post: 3–4 business days</li>
						</ul>
					</section>

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Shipping Delays
						</h3>

						<p>
							Delivery may occasionally be delayed due to weather
							conditions, public holidays, festivals, courier issues,
							or other circumstances beyond our control.
						</p>
					</section>

					<section>
						<h3 className="text-xl font-semibold text-purple-700 mb-2">
							Customer Responsibility
						</h3>

						<p>
							Customers are responsible for providing accurate
							shipping details. Lovlit by Anshu is not responsible
							for delays or delivery issues caused by incorrect
							address information.
						</p>
					</section>

				</div>

			</div>

		</div>
	);
};

export default ShippingPolicyPage;