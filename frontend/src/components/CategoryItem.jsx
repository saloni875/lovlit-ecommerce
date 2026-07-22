import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	return (
		<div className='relative overflow-hidden h-56 sm:h-72 lg:h-96 w-full rounded-2xl group shadow-lg'>
			<Link to={`/category/${category.href}`}>
				<div className='w-full h-full cursor-pointer'>
					<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10' />

					<img
						src={category.imageUrl}
						alt={category.name}
						className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110'
						loading='lazy'
					/>

					<div className='absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20'>
						<h3 className='text-white text-lg sm:text-xl lg:text-2xl font-bold'>
							{category.name}
						</h3>

						<p className='text-white/90 text-xs sm:text-sm'>
							Explore {category.name}
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;