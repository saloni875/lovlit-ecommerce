import CategorySale from "../models/categorySale.model.js";
import FestivalSale from "../models/festivalSale.model.js";

const calculateDiscount = async (product) => {
    // 1. Product Discount (Highest Priority)
    if (product.discountType === "product" && product.discount > 0) {
        const salePrice = Math.round(product.price - (product.price * product.discount) / 100);

        return {
            salePrice,
            discount: product.discount,
            discountType: "product",
        };
    }

    // 2. Category Discount
    const categorySale = await CategorySale.findOne({
        category: product.category,
        active: true,
    });

    if (categorySale) {
        const salePrice = Math.round(product.price - (product.price * categorySale.discount) / 100);

        return {
            salePrice,
            discount: categorySale.discount,
            discountType: "category",
        };
    }

    // 3. Festival Discount
    const festivalSale = await FestivalSale.findOne({
        active: true,
    });

    if (festivalSale) {
        const applyFestival =
            festivalSale.applyToAll ||
            festivalSale.categories.includes(product.category);

        if (applyFestival) {
            const salePrice = Math.round(product.price - (product.price * festivalSale.discount) / 100);

            return {
                salePrice,
                discount: festivalSale.discount,
                discountType: "festival",
            };
        }
    }

    // 4. No Discount
    return {
        salePrice: product.price,
        discount: 0,
        discountType: "none",
    };
};

export default calculateDiscount;
