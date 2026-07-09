import Product from "../models/product.model.js";
import { calculateSalePrice } from "./calculateDiscount.js";

export const applyDiscount = async (
	product,
	discount,
	discountType
) => {

	// Product discount always wins
	if (
		product.discountType === "product" &&
		discountType !== "product"
	) {
		return;
	}

	// Category discount wins over festival
	if (
		product.discountType === "category" &&
		discountType === "festival"
	) {
		return;
	}

	product.discount = discount;
	product.discountType = discountType;
	product.salePrice = calculateSalePrice(
		product.price,
		discount
	);

	await product.save();
};