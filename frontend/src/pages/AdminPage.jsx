import { BarChart, PlusCircle, ShoppingBasket, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";
import AnnouncementForm from "../components/AnnouncementFrom";

const tabs = [
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
	{ id: "announcement", label: "Banner", icon: Megaphone },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white overflow-hidden'>
			<div className='relative z-10 container mx-auto px-4 py-8 sm:py-12'>
				<motion.h1
					className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10 text-purple-700 text-center'
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
							className={`flex items-center justify-center px-2 sm:px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 text-sm sm:text-base ${activeTab === tab.id
									? "bg-purple-600 text-white scale-105"
									: "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100"
								}`}
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
					{activeTab === "announcement" && <AnnouncementForm/>}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;