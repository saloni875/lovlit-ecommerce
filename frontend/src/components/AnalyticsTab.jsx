import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
	Users,
	Package,
	ShoppingCart,
	DollarSign,
} from "lucide-react";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});

	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");

				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return (
			<div className='text-center text-purple-700 text-xl font-semibold'>
				Loading Analytics...
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
				<AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='from-purple-500 to-pink-500'
				/>

				<AnalyticsCard
					title='Total Products'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='from-fuchsia-500 to-purple-500'
				/>

				<AnalyticsCard
					title='Total Sales'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color='from-pink-500 to-rose-500'
				/>

				<AnalyticsCard
					title='Total Revenue'
					value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					color='from-violet-500 to-purple-700'
				/>
			</div>

			
			<motion.div
				className='bg-white border border-purple-200 rounded-3xl p-6 shadow-2xl'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<h2 className='text-3xl font-bold text-purple-700 mb-6 text-center'>
					Sales Overview
				</h2>

				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#E9D5FF' />

						<XAxis
							dataKey='name'
							stroke='#7E22CE'
						/>

						<YAxis
							yAxisId='left'
							stroke='#EC4899'
						/>

						<YAxis
							yAxisId='right'
							orientation='right'
							stroke='#9333EA'
						/>

						<Tooltip />

						<Legend />

						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#EC4899'
							strokeWidth={3}
							activeDot={{ r: 8 }}
							name='Sales'
						/>

						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#9333EA'
							strokeWidth={3}
							activeDot={{ r: 8 }}
							name='Revenue'
						/>
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};

export default AnalyticsTab;

const AnalyticsCard = ({
	title,
	value,
	icon: Icon,
	color,
}) => (
	<motion.div
		className={`rounded-3xl p-6 shadow-xl overflow-hidden relative bg-gradient-to-br ${color}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex justify-between items-center relative z-10'>
			<div>
				<p className='text-white/80 text-sm mb-2 font-semibold uppercase tracking-wide'>
					{title}
				</p>

				<h3 className='text-white text-4xl font-bold'>
					{value}
				</h3>
			</div>

			<div className='bg-white/20 p-4 rounded-2xl'>
				<Icon className='h-10 w-10 text-white' />
			</div>
		</div>

		<div className='absolute -bottom-8 -right-8 text-white/10'>
			<Icon className='h-40 w-40' />
		</div>
	</motion.div>
);