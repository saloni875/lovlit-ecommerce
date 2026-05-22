const LoadingSpinner = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
			<div className='flex flex-col items-center'>
				
				<div className='relative'>
					
					<div className='w-24 h-24 border-4 border-purple-200 rounded-full shadow-lg' />

					
					<div className='w-24 h-24 border-4 border-transparent border-t-purple-600 animate-spin rounded-full absolute left-0 top-0' />

					
					<div className='absolute inset-0 flex items-center justify-center'>
						<span className='text-3xl'>💜</span>
					</div>
				</div>

				
				<h2 className='mt-6 text-3xl font-bold text-purple-700 logo-font'>
					Lovlit
				</h2>

				<p className='mt-2 text-gray-500 text-lg'>
					Loading your aesthetic collection...
				</p>

				<div className='sr-only'>Loading</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;