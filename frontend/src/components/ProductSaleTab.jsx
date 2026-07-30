import { useThemeStore } from "../stores/useThemeStore";
import { useProductStore } from "../stores/useProductStore";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";


const ProductSaleTab = () => {
    const { darkMode } = useThemeStore();
    const {
        products,
        fetchAllProducts,
        updateProduct
    } = useProductStore();

    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [salePrice, setSalePrice] = useState("");



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
                Set a sale price for a product. The discount percentage will be calculated automatically.
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
                                    setSalePrice(product.salePrice ?? "");
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
                                    src={product.images?.[0] || "/placeholder.png"}
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
                                src={selectedProduct.images?.[0] || "/placeholder.png"}
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

                                {/* CURRENT PRICE */}
                                <p
                                    className="mt-2"
                                    style={{
                                        color: darkMode ? "#d1d5db" : "#4b5563",
                                    }}
                                >
                                    Current Price:{" "}
                                    <span className="font-bold text-pink-500">
                                        ₹{selectedProduct.price}
                                    </span>
                                </p>

                                <p
                                    className="mt-2"
                                    style={{
                                        color: darkMode ? "#d1d5db" : "#4b5563",
                                    }}
                                >
                                    Sale Price:{" "}
                                    <span className="font-bold">
                                        {selectedProduct.salePrice
                                            ? `₹${selectedProduct.salePrice}`
                                            : "No Sale"}
                                    </span>

                                    {selectedProduct.salePrice && (
                                        <span className="font-bold text-green-500 ml-2">
                                            {Math.round(
                                                ((selectedProduct.price - selectedProduct.salePrice) /
                                                    selectedProduct.price) *
                                                100
                                            )}% OFF
                                        </span>
                                    )}

                                </p>



                            </div>

                        </div>
                    </div>
                )}



                {selectedProduct && (
                    <div
                        className="rounded-2xl p-4 sm:p-6 mt-5"
                        style={{
                            background: darkMode ? "#1a1020" : "#ffffff",
                            border: darkMode
                                ? "1px solid #c646b3"
                                : "1px solid #d8b4fe",
                        }}
                    >
                        <h3
                            className="text-xl sm:text-2xl font-bold text-center mb-6"
                            style={{
                                color: darkMode ? "#ffffff" : "#6b21a8",
                            }}
                        >
                            Live Calculation
                        </h3>

                        <div className="space-y-5 max-w-md mx-auto">

                            {/* CURRENT PRICE */}
                            <div className="flex items-center justify-between gap-4">
                                <label
                                    className="font-semibold"
                                    style={{
                                        color: darkMode ? "#d1d5db" : "#4b5563",
                                    }}
                                >
                                    Current Price
                                </label>

                                <div className="text-xl font-bold text-pink-500">
                                    ₹{selectedProduct.price}
                                </div>
                            </div>

                            {/* SALE PRICE */}
                            <div className="flex items-center justify-between gap-4">
                                <label
                                    className="font-semibold"
                                    style={{
                                        color: darkMode ? "#d1d5db" : "#4b5563",
                                    }}
                                >
                                    Sale Price
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max={selectedProduct.price}
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(e.target.value)}
                                    placeholder="Enter price"
                                    className="w-36 rounded-xl px-3 py-2 outline-none text-right font-bold"
                                    style={{
                                        background: darkMode ? "#0c090f" : "#faf5ff",
                                        color: darkMode ? "#ffffff" : "#111827",
                                        border: darkMode
                                            ? "1px solid #c646b3"
                                            : "1px solid #d8b4fe",
                                    }}
                                />
                            </div>

                            {/* LIVE DISCOUNT */}
                            <div className="flex items-center justify-between gap-4">
                                <span
                                    className="font-semibold"
                                    style={{
                                        color: darkMode ? "#d1d5db" : "#4b5563",
                                    }}
                                >
                                    Discount
                                </span>

                                <span className="text-lg font-bold text-green-500">
                                    {salePrice &&
                                        Number(salePrice) > 0 &&
                                        Number(salePrice) < selectedProduct.price
                                        ? Math.round(
                                            ((selectedProduct.price - Number(salePrice)) /
                                                selectedProduct.price) *
                                            100
                                        )
                                        : 0}
                                    % OFF
                                </span>
                            </div>

                            {/* VALIDATION */}
                            {salePrice &&
                                Number(salePrice) >= selectedProduct.price && (
                                    <p className="text-sm text-red-500 text-center">
                                        Sale price must be less than original price.
                                    </p>
                                )}

                            {salePrice && Number(salePrice) <= 0 && (
                                <p className="text-sm text-red-500 text-center">
                                    Sale price must be greater than 0.
                                </p>
                            )}

                            {/* BUTTONS */}
                            <div className="grid grid-cols-2 gap-3 pt-3">

                                <button
                                    disabled={
                                        !salePrice ||
                                        Number(salePrice) <= 0 ||
                                        Number(salePrice) >= selectedProduct.price
                                    }
                                    onClick={async () => {
                                        await updateProduct(
                                            selectedProduct._id,
                                            {
                                                salePrice: Number(salePrice),
                                            }
                                        );

                                        await fetchAllProducts();

                                        setSelectedProduct((prev) => ({
                                            ...prev,
                                            salePrice: Number(salePrice),
                                        }));
                                    }}
                                    className="py-3 px-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={async () => {
                                        await updateProduct(
                                            selectedProduct._id,
                                            {
                                                salePrice: null,
                                            }
                                        );

                                        await fetchAllProducts();

                                        setSalePrice("");

                                        setSelectedProduct((prev) => ({
                                            ...prev,
                                            salePrice: null,
                                        }));
                                    }}
                                    className="py-3 px-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition"
                                >
                                    Remove Sale
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductSaleTab;