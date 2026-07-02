import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Megaphone } from "lucide-react";
import toast from "react-hot-toast";
import { useThemeStore } from "../stores/useThemeStore";

const AnnouncementForm = () => {
	const [text, setText] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchAnnouncement();
	}, []);
	const { darkMode } = useThemeStore();

	const fetchAnnouncement = async () => {
		try {
			const res = await axios.get("/announcement");

			setText(res.data.text || "");
			setIsVisible(res.data.isVisible || false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			await axios.put("/announcement", {
				text,
				isVisible,
			});

			toast.success("Banner updated successfully");
		} catch (error) {
			toast.error("Failed to update banner");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`rounded-3xl shadow-xl p-6 max-w-xl mx-auto transition-all duration-300 ${darkMode
				? "border border-fuchsia-700"
				: "border border-purple-200"
				}`}
			style={{
				background: darkMode
					? "linear-gradient(135deg,#18111f,#3b0b39)"
					: "#ffffff",
			}}
		>
			<div className="flex items-center gap-3 mb-6">
				<Megaphone
					className={darkMode ? "text-pink-400" : "text-purple-700"}
				/>

				<h2
					className={`text-2xl font-bold ${darkMode ? "text-white" : "text-purple-700"
						}`}
				>
					Announcement Banner
				</h2>
			</div>

			<form onSubmit={handleSubmit} className='space-y-5'>

				<div>
					<label
						className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-purple-700"
							}`}
					>
						Banner Text
					</label>

					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						rows="4"
						placeholder="🎀 Rakhi Collection Live Now"
						className={`w-full rounded-xl p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 ${darkMode
							? "bg-[#18111f] border border-fuchsia-700 text-white placeholder:text-gray-400"
							: "bg-white border-2 border-purple-300 text-black"
							}`}
					/>
				</div>

				<div className='flex items-center gap-3'>
					<input
						type='checkbox'
						checked={isVisible}
						onChange={(e) =>
							setIsVisible(e.target.checked)
						}
						className='w-5 h-5 accent-purple-600'
					/>
					<label
						className={`font-medium ${darkMode ? "text-white" : "text-purple-700"
							}`}
					>
						Show Banner
					</label>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
					style={{
						background: darkMode
							? "linear-gradient(135deg,#0c090f,#660c5e)"
							: "#9333ea",
						color: "#fff",
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
					{loading ? "Saving..." : "Save Banner"}
				</button>
			</form>
		</div>
	);
};

export default AnnouncementForm;