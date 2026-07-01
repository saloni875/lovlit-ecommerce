import { useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useThemeStore } from "../stores/useThemeStore";

const CustomIdeaPage = () => {
	const { darkMode } = useThemeStore();

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
		<div
			className="min-h-screen px-4 sm:px-6 py-10 sm:py-16 transition-all duration-300"
			style={{
				background: darkMode
					? "linear-gradient(135deg,#0c090f,#660c5e)"
					: "linear-gradient(to right,#f3e8ff,#ffffff,#fce7f3)",
			}}
		>
			<div
				className="max-w-3xl mx-auto rounded-3xl shadow-xl p-5 sm:p-8 transition-all duration-300"
				style={{
					background: darkMode
						? "linear-gradient(135deg,#0c090f,#660c5e)"
						: "linear-gradient(to right,#e9d5ff,#ffffff,#fce7f3)",
					border: darkMode
						? "1px solid #c026d3"
						: "1px solid #f3e8ff",
				}}
			>

				<p className={`text-sm uppercase tracking-[0.3em] mb-4 ${darkMode
					? "text-fuchsia-300"
					: "text-pink-500"
					}`}>
					Lovlit Custom Requests
				</p>

				<h1 className={`text-3xl sm:text-5xl font-bold sm:mb-6 ${darkMode
					? "text-white"
					: "text-purple-700"
					}`}>
					Share Your Idea 💜
				</h1>

				<h3 className={`block text-sm font-medium mb-2 ${darkMode
					? "text-pink"
					: "text-gray-700"
					}`}>
					Have a custom BTS inspired idea,
					keychain concept,
					jewelry design,
					candle vision,
					or aesthetic request?
					Send it here and Lovlit may bring it to life.
				</h3>

				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>

					<div>
						<label className={`block text-sm font-medium mb-2 ${darkMode
							? "text-white"
							: "text-gray-700"
							}`}>
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
							className={`w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-2  focus:ring-purple-500 transition-all duration-300 ${darkMode
								? "bg-[#18121d] border-fuchsia-700 text-white placeholder-gray-400"
								: "bg-white border-2 border-purple-300 text-black shadow-sm "
								}`}
						/>
					</div>

					<div>
						<label className={`block text-sm font-medium mb-2 ${darkMode
							? "text-white"
							: "text-gray-700"
							}`}>
							How to reach you (Instagram / WhatsApp / Contact)?
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
							className={`w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${darkMode
								? "bg-[#18121d] border-fuchsia-700 text-white placeholder-gray-400"
								: "bg-white border-2 border-purple-300 text-black shadow-sm "
								}`}
						/>
					</div>

					<div>
						<label className={`block text-sm font-medium mb-2 ${darkMode
							? "text-white"
							: "text-gray-700"
							}`}>
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
							className={`w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${darkMode
								? "bg-[#18121d] border-fuchsia-700 text-white placeholder-gray-400"
								: "bg-white border-2 border-purple-300 text-black shadow-sm "
								}`}
						/>
					</div>

					<div>
						<label className={`block text-sm font-medium mb-2 ${darkMode
							? "text-white"
							: "text-gray-700"
							}`}>
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
							className={`w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${darkMode
								? "bg-[#18121d] border-fuchsia-700 text-white placeholder-gray-400"
								: "bg-white border-2 border-purple-300 text-black shadow-sm "
								}`}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-2xl py-4 font-semibold transition-all duration-300"
						style={{
							background: darkMode
								? "linear-gradient(135deg,#0c090f,#660c5e)"
								: "#9333ea",
							color: "#fff",
							border: darkMode
								? "1px solid #d946ef"
								: "none",
						}}
						onMouseEnter={(e) => {
							if (darkMode) {
								e.currentTarget.style.background = "#e100ff";
								e.currentTarget.style.color = "#000";
							} else {
								e.currentTarget.style.background = "#7e22ce";
							}
						}}
						onMouseLeave={(e) => {
							if (darkMode) {
								e.currentTarget.style.background =
									"linear-gradient(135deg,#0c090f,#660c5e)";
								e.currentTarget.style.color = "#fff";
							} else {
								e.currentTarget.style.background = "#9333ea";
							}
						}}
					>
						{loading ? "Submitting..." : "Submit Idea"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CustomIdeaPage;