import { useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const CustomIdeaPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		contact: "",
		idea: "",
		inspirationLink: "",
	});

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			await axios.post("/ideas", formData);

			toast.success(
				"Idea submitted successfully 💜"
			);

			setFormData({
				name: "",
				contact: "",
				idea: "",
				inspirationLink: "",
			});
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					"Something went wrong"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-r from-purple-100 via-white to-pink-100 px-4 sm:px-6 py-10 sm:py-16'>
			<div className='max-w-3xl mx-auto bg-gradient-to-r from-purple-200 via-white to-pink-100 rounded-3xl shadow-xl border border-purple-100 p-5 sm:p-8'>

				<p className='text-sm uppercase tracking-[0.3em] text-pink-500 mb-4'>
					Lovlit Custom Requests
				</p>

				<h1 className='text-3xl sm:text-5xl font-bold text-purple-700 sm:mb-6'>
					Share Your Idea 💜
				</h1>

				<p className='text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10'>
					Have a custom BTS inspired idea,
					keychain concept,
					jewelry design,
					candle vision,
					or aesthetic request?
					Send it here and Lovlit may bring it to life.
				</p>

				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Your Name
						</label>

						<input
							type='text'
							value={formData.name}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
							required
							className='w-full rounded-2xl border border-purple-200 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Instagram / WhatsApp / Contact
						</label>

						<input
							type='text'
							value={formData.contact}
							onChange={(e) =>
								setFormData({
									...formData,
									contact: e.target.value,
								})
							}
							required
							className='w-full rounded-2xl border border-purple-200 px-4 sm:py-5 py-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Your Idea
						</label>

						<textarea
							rows='6'
							value={formData.idea}
							onChange={(e) =>
								setFormData({
									...formData,
									idea: e.target.value,
								})
							}
							required
							className='w-full rounded-2xl border border-purple-200 sm:px-5 py-4 py-4 sm:py-5 focus:outline-none focus:ring-2 focus:ring-purple-500'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Inspiration Link (optional)
						</label>

						<input
							type='text'
							value={formData.inspirationLink}
							onChange={(e) =>
								setFormData({
									...formData,
									inspirationLink:
										e.target.value,
								})
							}
							className='w-full rounded-2xl border border-purple-200 sm:px-5 py-4 py-3 sm:py-5 focus:outline-none focus:ring-2 focus:ring-purple-500'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='w-full rounded-2xl bg-purple-600 px-6 py-3 sm:py-4 text-white font-semibold hover:bg-purple-700 transition duration-300'
					>
						{loading
							? "Submitting..."
							: "Submit Idea"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CustomIdeaPage;