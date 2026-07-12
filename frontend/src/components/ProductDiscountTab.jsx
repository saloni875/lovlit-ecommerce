import { useThemeStore } from "../stores/useThemeStore";
import { useProductStore } from "../stores/useProductStore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";


const ProductDiscountTab = () => {
    const { darkMode } = useThemeStore();
    const {
        products,
        fetchAllProducts,
        updateProductDiscount,
    } = useProductStore();

    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [discount, setDiscount] = useState(0);


    useEffect(() => {
        fetchAllProducts();
    }, []);
    return (
        <div
            className="rounded-3xl shadow-xl border p-6 transition-all duration-300"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg,#1a1020,#0c090f)"
                    : "#ffffff",
                border: darkMode
                    ? "1px solid #c646b3"
                    : "1px solid #e9d5ff",
            }}
        >
            <h2
                className="text-3xl font-bold mb-2"
                style={{
                    color: darkMode ? "#ffffff" : "#6b21a8",
                }}
            >
                Product Discount
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6" style={{
                color: darkMode
                    ? "#ffffff"
                    : "#6b21a8",
            }}>
                Choose one product and apply a discount only to that product.
            </p>

            {/* <p
                className="text-center py-10"
                style={{
                    color: darkMode ? "#9ca3af" : "#6b7280",
                }}
            >
                Product discount settings will appear here.
            </p> */}

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition"
                    style={{
                        background: darkMode ? "#1a1020" : "#ffffff",
                        color: darkMode ? "#ffffff" : "#000000",
                        border: darkMode
                            ? "1px solid #c646b3"
                            : "1px solid #d8b4fe",
                    }}
                />

                <div className="max-h-[400px] overflow-y-auto space-y-2">

                    {products
                        .filter((product) =>
                            product.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((product) => (
                            <button
                                key={product._id}
                                onClick={() => {
                                    setSelectedProduct(product);
                                    setDiscount(product.productDiscount || 0);
                                }}
                                className="w-full flex items-center gap-3 p-3 transition  dark:hover:bg-purple-900"
                                
                                style={{
                                    background:
                                        selectedProduct?._id === product._id
                                            ? darkMode
                                                ? "#2b1535"
                                                : "#f3e8ff"
                                            : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedProduct?._id !== product._id) {
                                        e.currentTarget.style.background = darkMode
                                            ? "#9b0081"
                                            : "#f5f3ff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedProduct?._id !== product._id) {
                                        e.currentTarget.style.background = "transparent";
                                    }
                                }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-14 h-14 rounded-xl object-cover"
                                />

                                <div className="text-left">

                                    <h3
                                        style={{
                                            color: darkMode
                                                ? "#ffffff"
                                                : "#6b21a8",
                                        }}
                                    >
                                        {product.name}
                                    </h3>

                                    <p
                                        style={{
                                            color: darkMode
                                                ? "#d1d5db"
                                                : "#6b7280",
                                        }}
                                    >
                                        ₹{product.price}
                                    </p>

                                </div>
                            </button>
                        ))}
                </div>

                {selectedProduct && (
                    <div
                        className="rounded-2xl p-5"
                        style={{
                            background: darkMode
                                ? "#1a1020"
                                : "#faf5ff",
                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",
                        }}
                    >
                        <div className="flex flex-col sm:flex-row gap-5 items-center">

                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-28 h-28 rounded-2xl object-cover"
                            />

                            <div className="flex-1">

                                <h3
                                    className="text-2xl font-bold"
                                    style={{
                                        color: darkMode
                                            ? "#ffffff"
                                            : "#6b21a8",
                                    }}
                                >
                                    {selectedProduct.name}
                                </h3>

                                <p
                                    className="mt-2"
                                    style={{
                                        color: darkMode
                                            ? "#d1d5db"
                                            : "#4b5563",
                                    }}
                                >
                                    Category :
                                    <span className="font-semibold">
                                        {" "}
                                        {selectedProduct.category}
                                    </span>
                                </p>

                                <p
                                    className="mt-2"
                                    style={{
                                        color: darkMode
                                            ? "#d1d5db"
                                            : "#4b5563",
                                    }}
                                >
                                    Current Price :
                                    <span className="font-bold text-pink-500">
                                        {" "}
                                        ₹{selectedProduct.price}
                                    </span>
                                </p>

                                <p
                                    className="mt-2"
                                    style={{
                                        color: darkMode
                                            ? "#d1d5db"
                                            : "#4b5563",
                                    }}
                                >
                                    Current Product Discount :

                                    <span className="font-bold text-green-500">
                                        {" "}
                                        {selectedProduct.productDiscount || 0}%
                                    </span>

                                </p>

                            </div>

                        </div>
                    </div>
                )}

                {selectedProduct && (
                    <div
                        className="rounded-2xl p-5 mt-5"
                        style={{
                            background: darkMode ? "#1a1020" : "#ffffff",
                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",
                        }}
                    >
                        <h3
                            className="text-xl font-bold mb-5"
                            style={{
                                color: darkMode ? "#fff" : "#6b21a8",
                            }}
                        >
                            Apply Product Discount
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-4">

                            <select
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                className="flex-1 rounded-xl p-3 outline-none"
                                style={{
                                    background: darkMode ? "#0c090f" : "#ffffff",
                                    color: darkMode ? "#ffffff" : "#111827",
                                    border: darkMode
                                        ? "1px solid #c646b3"
                                        : "1px solid #d8b4fe",
                                }}
                            >
                                {Array.from({ length: 81 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i}%
                                    </option>
                                ))}
                            </select>

                            {discount > 60 && (
                            <p className="mt-4 text-red-500 font-medium">
                                ⚠ Discounts above 60% may remove most or all of your profit. Check before applying.
                            </p>)}

                            <button
                                onClick={async () => {
                                    await updateProductDiscount(
                                        selectedProduct._id,
                                        discount
                                    );

                                    await fetchAllProducts();

                                    setSelectedProduct((prev) => ({
                                        ...prev,
                                        productDiscount: discount,
                                    }));
                                }}
                                className="px-6 py-3 rounded-xl font-semibold text-white bg-purple-600 hover:purple transition"
                                style={{
                                    background: darkMode
                                        ? "linear-gradient(135deg, #0c090f, #660c5e)"
                                        : "",
                                    color: darkMode ? "#ffffff" : "",
                                    border: darkMode ? "1px solid #c646b3" : "1px solid #e9d5ff",
                                }}
                                onMouseEnter={(e) => {
                                    if (darkMode) {
                                        e.currentTarget.style.background = "#e100ff";
                                        e.currentTarget.style.color = "#000000";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (darkMode) {
                                        e.currentTarget.style.background =
                                            "linear-gradient(135deg, #0c090f, #660c5e)";
                                        e.currentTarget.style.color = "#ffffff";
                                    }
                                }}
                            >
                                Save Discount
                            </button>

                            <button
                                onClick={async () => {
                                    await updateProductDiscount(
                                        selectedProduct._id,
                                        0
                                    );

                                    await fetchAllProducts();

                                    setSelectedProduct((prev) => ({
                                        ...prev,
                                        productDiscount: 0,
                                    }));
                                }}
                                className="px-6 py-3 rounded-xl font-semibold transition"
                                style={{
                                    background: "#ec0606",
                                    color: "#ffffff",
                                }}
                            >
                                Remove
                            </button>

                        </div>

                        <div
                            className="mt-6 rounded-2xl p-5"
                            style={{
                                background: darkMode
                                    ? "#15101d"
                                    : "#faf5ff",
                                border: darkMode
                                    ? "1px solid #c646b3"
                                    : "1px solid #d8b4fe",
                            }}
                        >
                            <h3
                                className="text-lg font-bold mb-4"
                                style={{
                                    color: darkMode ? "#ffffff" : "#6b21a8",
                                }}
                            >
                                Price Preview
                            </h3>

                            <div className="space-y-3">

                                <div className="flex justify-between">
                                    <span
                                        style={{
                                            color: darkMode ? "#d1d5db" : "#6b7280",
                                        }}
                                    >
                                        Original Price
                                    </span>

                                    <strong
                                        style={{
                                            color: darkMode ? "#ffffff" : "#111827",
                                        }}
                                    >
                                        ₹{selectedProduct.price}
                                    </strong>
                                </div>

                                <div className="flex justify-between">
                                    <span
                                        style={{
                                            color: darkMode ? "#d1d5db" : "#6b7280",
                                        }}
                                    >
                                        Selected Discount
                                    </span>

                                    <strong className="text-green-500">
                                        {discount}%
                                    </strong>
                                </div>

                                <hr />

                                <div className="flex justify-between items-center">

                                    <span
                                        className="font-semibold"
                                        style={{
                                            color: darkMode ? "#ffffff" : "#6b21a8",
                                        }}
                                    >
                                        Final Selling Price
                                    </span>

                                    <span className="text-2xl font-bold text-pink-500">
                                        ₹
                                        {(
                                            selectedProduct.price *
                                            (100 - discount) /
                                            100
                                        ).toFixed(2)}
                                    </span>

                                </div>

                            </div>
                        </div>

                        
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDiscountTab;