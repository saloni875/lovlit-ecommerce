import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Megaphone } from "lucide-react";
import toast from "react-hot-toast";

const AnnouncementForm = () => {
	const [text, setText] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetchAnnouncement();
	}, []);

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
		<div className='bg-white rounded-3xl shadow-xl p-6 max-w-xl mx-auto border border-purple-200'>
			<div className='flex items-center gap-3 mb-6'>
				<Megaphone className='text-purple-700' />

				<h2 className='text-2xl font-bold text-purple-700'>
					Announcement Banner
				</h2>
			</div>

			<form onSubmit={handleSubmit} className='space-y-5'>

				<div>
					<label className='block mb-2 font-medium text-purple-700'>
						Banner Text
					</label>

					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						rows='4'
						placeholder='🎀 Rakhi Collection Live Now'
						className='w-full border border-purple-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
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

					<label className='font-medium text-purple-700'>
						Show Banner
					</label>
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition'
				>
					{loading ? "Saving..." : "Save Banner"}
				</button>
			</form>
		</div>
	);
};

export default AnnouncementForm;