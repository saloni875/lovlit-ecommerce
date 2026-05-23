import { useParams } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";


const ProductDetailsPage = () => {
    const { id } = useParams();

    const { products } = useProductStore();
    const { addToCart } = useCartStore();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = products.find((item) => item._id === id);

        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [id, products]);

    if (!product) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <h1 className='text-3xl font-bold text-purple-700'>
                    Product not found
                </h1>
            </div>
        );
    }

    return (
        <div className='min-h-screen px-6 py-16'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl p-8 border border-purple-100'>

                <div className='relative overflow-hidden rounded-3xl'>
                    <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-[500px] object-cover rounded-3xl hover:scale-105 transition duration-500'
                    />

                    <div className='absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-lg'>
                        <Heart className='text-purple-600 w-6 h-6' />
                    </div>
                </div>


                <div className='flex flex-col justify-center'>
                    <p className='text-sm uppercase tracking-widest text-purple-500 mb-3'>
                        {product.category}
                    </p>

                    <h2 className='text-3xl font-bold text-black/70 mb-6 capitalize'>
                        {product.name}
                    </h2>

                    <p className='text-4xl font-bold text-pink-500 mb-6'>
                        ₹{product.price}
                    </p>

                    <p className='text-gray-600 leading-relaxed text-lg mb-8'>
                        {product.description}
                    </p>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-10'>

                        {product.highlights?.length > 0 && (
                            <div>
                                <h2 className='text-2xl font-bold text-black/70 mb-4'>
                                    Product Highlights
                                </h2>

                                <div className='space-y-2'>
                                    {product.highlights.map((item, index) => (
                                        <p
                                            key={index}
                                            className='text-gray-700 text-lg'
                                        >
                                            {item}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}


                        {product.details?.length > 0 && (
                            <div>
                                <h2 className='text-2xl font-bold text-black/70 mb-4'>
                                    Additional Details
                                </h2>

                                <div className='space-y-2'>
                                    {product.details.map((detail, index) => (
                                        <p
                                            key={index}
                                            className='text-gray-700 text-lg'
                                        >
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    <div className='flex flex-col sm:flex-row gap-4'>
                        <button
                            onClick={() => addToCart(product)}
                            className='flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-4 text-white font-semibold hover:bg-purple-700 transition duration-300'
                        >
                            <ShoppingCart className='mr-2' />
                            Add to Cart
                        </button>

                        <button
                            className='rounded-2xl border border-purple-600 px-6 py-4 text-purple-700 font-semibold hover:bg-purple-50 transition duration-300'
                        >
                            💜 Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;