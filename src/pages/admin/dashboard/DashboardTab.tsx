import React, { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../../../store/slices/productsSlice";
import { ROUTES } from "../../../utils/constants";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";

import { Product } from "../../../types";

interface ThemeState {
  mode: "light" | "dark";
}

interface ProductsState {
  products: Product[];
  loading: boolean;
}

interface RootState {
  theme: ThemeState;
  products: ProductsState;
}

const DashboardTab: React.FC = memo(() => {
  const dispatch = useDispatch<any>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { mode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="large" text="Loading products..." />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Products Management
          </h2>
          <p
            className="text-gray-600 mt-1"
            style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
          >
            Total products: {products.length}
          </p>
        </div>

        <Link to={ROUTES.ADD_PRODUCT}>
          <Button>Add New Product</Button>
        </Link>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <Card className="text-center py-16">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            No products found
          </h3>
          <p
            className="text-gray-600 mb-6"
            style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
          >
            Start by adding your first product to the store.
          </p>
          <Link to={ROUTES.ADD_PRODUCT}>
            <Button>Add First Product</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-pink-600 bg-pink-100 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h3
                  className="font-semibold text-lg mb-2 line-clamp-2"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  {product.title}
                </h3>

                <p
                  className="text-gray-600 text-sm mb-3 line-clamp-2"
                  style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
                >
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-pink-600">
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className="text-sm text-gray-500"
                    style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
                  >
                    {product.date}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`${ROUTES.UPDATE_PRODUCT}/${product.id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" size="small" fullWidth>
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
});

DashboardTab.displayName = "DashboardTab";

export default DashboardTab;
