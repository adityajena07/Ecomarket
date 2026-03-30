import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Normal Pages */
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OtpVerifyPage from "../pages/OtpVerifyPage";

/* Seller Pages */
import SellerDashboard from "../pages/SellerDashboard";
import AddProduct from "../pages/AddProduct";
import SellerProducts from "../pages/SellerProducts";
import SellerTransactions from "../pages/SellerTransactions";

/* Processing Unit Pages */
import ProcessingDashboard from "../pages/processing/Dashboard";
import ProductDetail from "../pages/processing/ProductDetail";
import ProfileTemp from "../pages/processing/profileTemp";
import Subscribe from "../pages/processing/Subscribe";
import Invoice from "../pages/processing/Invoice";
import MyOrders from "../pages/processing/MyOrders";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC */}

                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<OtpVerifyPage />} />

                {/* SELLER */}

                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/add-product" element={<AddProduct />} />
                <Route path="/seller/products" element={<SellerProducts />} />
                <Route path="/seller/transactions" element={<SellerTransactions />} />

                {/* PROCESSING UNIT */}

                <Route path="/processing/dashboard" element={<ProcessingDashboard />} />

                <Route path="/processing/product/:id" element={<ProductDetail />} />

                <Route path="/processing/profileTemp" element={<ProfileTemp />} />

                <Route path="/processing/subscribe" element={<Subscribe />} />

                <Route path="/processing/orders" element={<MyOrders />} />

                <Route path="/processing/invoice/:id" element={<Invoice />} />

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;