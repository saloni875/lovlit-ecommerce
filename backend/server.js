import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import ideaRoutes from "./routes/idea.route.js";
import announcementRoutes from "./routes/announcement.routes.js";
import reviewRoutes from "./routes/review.route.js";
import categorySaleRoutes from "./routes/categorySale.routes.js";
import festivalSaleRoutes from "./routes/festivalsales.routes.js";

import { connectDB } from "./lib/db.js";

dotenv.config();
// console.log("process.env.MONGO_URI", process.env.MONGO_URI);

const app = express();
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ideas", ideaRoutes);
app.use("/api/announcement", announcementRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/category-sale" , categorySaleRoutes);
app.use("/api/festival-sale", festivalSaleRoutes);

app.get("/api/test", (req, res) => {
	res.send("Backend is working");
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:" + PORT);
	connectDB();
});
