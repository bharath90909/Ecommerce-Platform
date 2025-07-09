import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./utils/constants";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy load components for better performance
const Home = lazy(() => import("./pages/home/Home"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const Login = lazy(() => import("./pages/registration/Login.tsx"));
const Signup = lazy(() => import("./pages/registration/Signup"));
const ProductInfo = lazy(() => import("./pages/productInfo/ProductInfo"));
const AddProduct = lazy(() => import("./pages/admin/pages/AddProduct"));
const UpdateProduct = lazy(() => import("./pages/admin/pages/UpdateProduct"));
const ErrorPage = lazy(() => import("./pages/error/Error"));

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" text="Loading..." />
  </div>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route
            path={`${ROUTES.PRODUCT_INFO}/:id`}
            element={<ProductInfo />}
          />

          {/* Auth Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />

          {/* Protected Admin Routes */}
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADD_PRODUCT}
            element={
              <ProtectedRoute requireAdmin>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${ROUTES.UPDATE_PRODUCT}/:id`}
            element={
              <ProtectedRoute requireAdmin>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />

          {/* Error Routes */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
