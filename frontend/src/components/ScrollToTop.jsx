import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant", // You can change this to "smooth" for a smooth scroll effect  
		});
	}, [pathname]);

	return null;
};

export default ScrollToTop;