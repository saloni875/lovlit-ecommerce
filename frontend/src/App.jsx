import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import Footer from "./components/Footer";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AboutPage from "./pages/AboutPage";
import CustomIdeaPage from "./pages/CustomIdeaPage";
import CheckoutPage from "./pages/CheckoutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import { useThemeStore } from "./stores/useThemeStore";
import NotFoundPage from "./pages/NotFoundPage";
import ContactPage from "./pages/ContactPage";
import WishlistPage from "./pages/WishlistPage";
import ScrollToTop from "./components/ScrollToTop";



function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { darkMode } = useThemeStore();
	const { getCartItems } = useCartStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);



	if (checkingAuth) return <LoadingSpinner />;

	return (

		<div
			className="min-h-screen relative overflow-hidden"
			style={{
				background: darkMode
					? "linear-gradient(135deg, #0c090f, #330530)"
					: "linear-gradient(to right, rgb(233 213 255), white, rgb(251 207 232))",
				color: darkMode ? "#ffffff" : "#000000",
			}}
		>
			{/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className="absolute inset-0" />
				</div>
			</div>

			<div className='relative z-50 pt-20'>
				<Navbar />
				<ScrollToTop />

				<Routes>
					<Route path='/about' element={<AboutPage />} />
					<Route path='/ideas' element={<CustomIdeaPage />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
					<Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
					<Route path='/category/:category' element={<CategoryPage />} />
					<Route path='/product/:id' element={<ProductDetailsPage />} />
					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
					<Route path='/checkout' element={user ? <CheckoutPage /> : <Navigate to='/login' />} />
					<Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

					<Route path="/terms-and-conditions" element={<TermsConditionsPage />} />

					<Route path="/shipping-policy" element={<ShippingPolicyPage />} />

					<Route path="/refund-policy" element={<RefundPolicyPage />} />

					<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />

					<Route path='/contact' element={<ContactPage />} />
					<Route
						path="/wishlist"
						element={user ? <WishlistPage /> : <Navigate to="/login" />}
					/>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
			<Footer />
			<Toaster />
		</div>
	);
}

export default App;
