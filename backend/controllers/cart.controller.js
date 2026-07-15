import Product from "../models/product.model.js";

export const getCartProducts = async (req, res) => {
	try {
		const productIds = req.user.cartItems.map(
			(item) => item.product
		);

		const products = await Product.find({
			_id: { $in: productIds },
		});

		const cartItems = products.map((product) => {
			const item = req.user.cartItems.find(
				(cartItem) =>
					cartItem.product &&
					cartItem.product.toString() ===
					product._id.toString()
			);

			return {
				...product.toJSON(),

				quantity: item.quantity,

				selectedOption:
					item.selectedOption || "",

				customText:
					item.customText || "",

				optionType:
					product.optionType || "",
			};
		});

		res.json(cartItems);
	} catch (error) {
		console.log(
			"Error in getCartProducts controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const addToCart = async (req, res) => {
	try {
		const {
			productId,
			selectedOption,
			customText,
			quantity,
		} = req.body;

		const user = req.user;

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}
		if (product.stock <= 0) {
			return res.status(400).json({
				message: "Product is out of stock",
			});
		}

		if ((quantity || 1) > product.stock) {
			return res.status(400).json({
				message: "Not enough stock available",
			});
		}

		if ((quantity || 1) < 1) {
			return res.status(400).json({
				message: "Invalid quantity",
			});
		}

		if (customText && customText.length > 100) {
			return res.status(400).json({
				message: "Custom text is too long",
			});
		}

		user.cartItems.push({
			product: productId,
			quantity: quantity || 1,
			selectedOption: selectedOption || "",
			customText: customText || "",
		});

		await user.save();

		res.json(user.cartItems);
	} catch (error) {
		console.log(
			"Error in addToCart controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = req.user;

		console.log("Removing product:", productId);

		if (!productId) {
			user.cartItems = [];
		} else {
			user.cartItems = user.cartItems.filter((item) => {
				console.log(
					"Cart Item Product:",
					item.product?.toString()
				);

				return (
					item.product &&
					item.product.toString() !== productId
				);
			});
		}

		await user.save();

		res.json(user.cartItems);
	} catch (error) {
		console.log(
			"Error in removeAllFromCart controller",
			error.message
		);

		res.status(500).json({
			message: "Server error",
			error: error.message,
		});
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const { quantity } = req.body;
		const user = req.user;
		const existingItem = user.cartItems.find((item) => item.id === productId);

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				message: "Product not found",
			});
		}

		if (quantity < 1) {
			return res.status(400).json({
				message: "Invalid quantity",
			});
		}

		if (quantity > product.stock) {
			return res.status(400).json({
				message: "Not enough stock available",
			});
		}

		if (existingItem) {
			if (quantity === 0) {
				user.cartItems = user.cartItems.filter((item) => item.id !== productId);
				await user.save();
				return res.json(user.cartItems);
			}

			existingItem.quantity = quantity;
			await user.save();
			res.json(user.cartItems);
		} else {
			res.status(404).json({ message: "Product not found" });
		}


	} catch (error) {
		console.log("Error in updateQuantity controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
