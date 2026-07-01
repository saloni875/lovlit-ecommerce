import { BarChart, PlusCircle, ShoppingBasket, Megaphone, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";
import AnnouncementForm from "../components/AnnouncementFrom";
import IdeasList from "../components/IdeasList";
import { useThemeStore } from "../stores/useThemeStore";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
	{ id: "announcement", label: "Banner", icon: Megaphone },
	{ id: "ideas", label: "Ideas", icon: MessageSquare },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();
	const { darkMode } = useThemeStore();
	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div
			className="min-h-screen overflow-hidden transition-all duration-300"
			style={{
				background: darkMode
					? "linear-gradient(135deg,#0c090f,#660c5e)"
					: "linear-gradient(to bottom right,#f3e8ff,#fdf2f8,#ffffff)",
			}}
		>
			<div className='relative z-10 container mx-auto px-4 py-8 sm:py-12'>
				<motion.h1
					className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-center ${darkMode ? "text-white" : "text-purple-700"
						}`}
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className='grid grid-cols-2 sm:flex justify-center mb-8 flex-wrap gap-3 max-w-md mx-auto'>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className="flex items-center justify-center px-2 sm:px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 text-sm sm:text-base"
							style={{
								background: activeTab === tab.id
									? darkMode
										? "linear-gradient(135deg,#0c090f,#660c5e)"
										: "#9333ea"
									: darkMode
										? "#1a1020"
										: "#ffffff",

								color: activeTab === tab.id
									? "#ffffff"
									: darkMode
										? "#ffffff"
										: "#6b21a8",

								border: darkMode
									? "1px solid #c646b3"
									: "1px solid #d8b4fe",

								transform: activeTab === tab.id
									? "scale(1.05)"
									: "scale(1)",
							}}
							onMouseEnter={(e) => {
								if (darkMode) {
									e.currentTarget.style.background = "#e100ff";
									e.currentTarget.style.color = "#000000";
								} else if (activeTab !== tab.id) {
									e.currentTarget.style.background = "#f3e8ff";
								}
							}}

							onMouseLeave={(e) => {
								if (darkMode) {
									e.currentTarget.style.background =
										activeTab === tab.id
											? "linear-gradient(135deg,#0c090f,#660c5e)"
											: "#1a1020";

									e.currentTarget.style.color = "#ffffff";
								} else {
									e.currentTarget.style.background =
										activeTab === tab.id
											? "#9333ea"
											: "#ffffff";

									e.currentTarget.style.color =
										activeTab === tab.id
											? "#ffffff"
											: "#6b21a8";
								}
							}}
						>
							<tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
						</button>
					))}
				</div>

				<div className='pb-10'>
					{activeTab === "create" && <CreateProductForm />}
					{activeTab === "products" && <ProductsList />}
					{activeTab === "analytics" && <AnalyticsTab />}
					{activeTab === "announcement" && <AnnouncementForm />}
					{activeTab === "ideas" && <IdeasList />}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;