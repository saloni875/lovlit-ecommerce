import { useEffect, useState } from "react";
import axios from "../lib/axios";

const AnnouncementBanner = () => {
	const [announcement, setAnnouncement] = useState(null);

	useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				const res = await axios.get("/announcement");
				setAnnouncement(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchAnnouncement();
	}, []);

	if (
		!announcement ||
		!announcement.isVisible ||
		!announcement.text
	) {
		return null;
	}

	return (
		<div className="w-full bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 border-b border-purple-300 py-3 px-4 text-center">
			<p className="font-semibold text-purple-800 text-sm md:text-base">
				{announcement.text}
			</p>
		</div>
	);
};

export default AnnouncementBanner;