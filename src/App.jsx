import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Seller
import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import AddProduct from "./pages/AddProduct";
import SellerTransactions from "./pages/SellerTransactions";

// Processing
import ProcessingDashboard from "./pages/processing/Dashboard";
import ProfileTemp from "./pages/processing/profileTemp"; // ✅ NEW IMPORT

/* ================= PRIVATE ROUTE ================= */

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return user.role === "seller"
      ? <Navigate to="/seller/dashboard" replace />
      : <Navigate to="/processing/dashboard" replace />;
  }

  return children;
};

/* ================= APP ================= */

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* 🌍 PUBLIC ROUTES */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 🛒 SELLER ROUTES */}
          <Route
            path="/seller/dashboard"
            element={
              <PrivateRoute role="seller">
                <SellerDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/seller/products"
            element={
              <PrivateRoute role="seller">
                <SellerProducts />
              </PrivateRoute>
            }
          />

          <Route
            path="/seller/add-product"
            element={
              <PrivateRoute role="seller">
                <AddProduct />
              </PrivateRoute>
            }
          />

          <Route
            path="/seller/transactions"
            element={
              <PrivateRoute role="seller">
                <SellerTransactions />
              </PrivateRoute>
            }
          />

          {/* 🏭 PROCESSING ROUTES */}
          <Route
            path="/processing/dashboard"
            element={
              <PrivateRoute role="processing">
                <ProcessingDashboard />
              </PrivateRoute>
            }
          />

          {/* ✅ FIXED PROFILE ROUTE */}
          <Route
            path="/processing/profileTemp"
            element={
              <PrivateRoute role="processing">
                <ProfileTemp />
              </PrivateRoute>
            }
          />

          {/* ❌ UNKNOWN ROUTES */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;