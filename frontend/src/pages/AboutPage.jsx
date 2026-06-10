import { Link } from "react-router-dom";

const AboutPage = () => {
	return (
		<div className='min-h-screen px-6 py-16 bg-gradient-to-r from-purple-200 via-white to-pink-100'>


			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>


				<div className='relative flex justify-center'>
					<div className='absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-300 blur-3xl opacity-40 rounded-full' />

					<img
						src='anshu1.jpeg'
						alt='Lovlit Owner'
						className='relative z-10 w-[350px] md:w-[450px] object-cover rounded-[40px] shadow-2xl border border-purple-200'
					/>
				</div>


				<div>
					<p className='text-sm uppercase tracking-[0.3em] text-pink-500 mb-5 font-semibold'>
						Small Business • Handmade With Love
					</p>

					<h1 className='text-5xl md:text-7xl font-bold leading-tight text-black mb-8'>
						More than a brand, <br />

						<span className='text-purple-700'>
							Lovlit is a feeling.
						</span>
					</h1>

					<p className='text-xl text-gray-700 leading-relaxed mb-6'>
						Lovlit was created from a simple dream ...
						to make people feel special through
						<span className='text-pink-500 font-semibold'>
							{" "}handmade gifts
						</span>,
						aesthetic collections, and meaningful creations inspired by
						<span className='text-purple-700 font-semibold'>
							{" "}love, memories, comfort, and BTS.
						</span>
					</p>

					<p className='text-xl text-gray-700 leading-relaxed mb-6'>
						Started by a student and young entrepreneur,
						Lovlit is built with passion, creativity,
						and the belief that even small gifts can create beautiful emotions.
						Every collection is designed carefully to help people express
						love in the most personal way possible.
					</p>

					<p className='text-xl text-gray-700 leading-relaxed mb-10'>
						From handmade accessories to aesthetic candles,
						Lovlit focuses on creating products that feel
						<span className='text-purple-700 font-semibold'>
							{" "}comforting, beautiful, affordable,
						</span>
						and emotionally connected.
					</p>

					<Link to='/' className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition duration-300'>
						Shop Now 💗
					</Link>
				</div>
			</div>


			<div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-28'>

				<div className='backdrop-blur-md bg-white/40 border border-pink-100 rounded-3xl p-6'>
					<h2 className='text-2xl font-bold text-purple-700 mb-3'>
						Handmade
					</h2>

					<p className='text-lg text-gray-700 leading-relaxed'>
						Every product is created with care, creativity,
						and attention to detail.
					</p>
				</div>

				<div className='backdrop-blur-md bg-white/40 border border-pink-100 rounded-3xl p-6'>
					<h2 className='text-2xl font-bold text-purple-700 mb-3'>
						Affordable
					</h2>

					<p className='text-lg text-gray-700 leading-relaxed'>
						Cute and aesthetic products should feel accessible
						without losing quality or emotion.
					</p>
				</div>

				<div className='backdrop-blur-md bg-white/40 border border-pink-100 rounded-3xl p-6'>
					<h2 className='text-2xl font-bold text-purple-700 mb-3'>
						Fandom Love
					</h2>

					<p className='text-lg text-gray-700 leading-relaxed'>
						Inspired by comfort, music, emotions,
						and BTS inspired aesthetics loved by fans.
					</p>
				</div>

				<div className='backdrop-blur-md bg-white/40 border border-pink-100 rounded-3xl p-6'>
					<h2 className='text-2xl font-bold text-purple-700 mb-3'>
						Meaningful Gifts
					</h2>

					<p className='text-lg text-gray-700 leading-relaxed'>
						Lovlit believes small gifts can create unforgettable memories
						and make loved ones feel truly special.
					</p>
				</div>
			</div>


			<div className='mt-28 text-center max-w-4xl mx-auto'>
				<h2 className='text-5xl font-bold text-black/80 mb-8'>
					A vision beyond candles
				</h2>

				<p className='text-xl text-gray-700 leading-relaxed mb-6'>
					Lovlit is currently working on special handmade candles
					created with intention and positivity.
					The vision is to create candles connected with
					<span className='text-pink-500 font-semibold'>
						{" "}comfort, prosperity, abundance,
					</span>
					peace, healing, and good energy.
				</p>

				<p className='text-2xl text-pink-600 font-semibold leading-relaxed'>
					Because sometimes people don't just buy products —
					they buy feelings, hope, and comfort.
				</p>
			</div>


			<div className='mt-32 text-center'>
				<h2 className='text-5xl font-bold text-purple-700 mb-6'>
					Thank you for supporting a small business 💜
				</h2>

				<p className='text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10'>
					Every order supports a student dream,
					a growing handmade brand,
					and a journey built with love and creativity.
				</p>
				<Link
					to='/'
					className='inline-block rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 px-10 py-5 text-xl font-semibold text-white shadow-xl hover:scale-105 transition duration-300'
				>
					Explore Lovlit
				</Link>

			</div>
		</div>
	);
};

export default AboutPage;