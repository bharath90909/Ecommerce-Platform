import React, { useState, useEffect, memo, useCallback } from "react";
import { useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { fetchProducts } from "../../store/slices/productsSlice";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Product, CartItem } from "../../types";

interface ThemeState {
  mode: "light" | "dark";
}

interface ProductsState {
  products: Product[];
  loading: boolean;
}

interface CartState {
  items: CartItem[];
}

interface RootState {
  theme: ThemeState;
  products: ProductsState;
  cart: CartState;
}

// Memoized product details component
const ProductDetails = memo(
  ({
    product,
    mode,
    formatPrice,
    isInCart,
    onAddToCart,
  }: {
    product: Product;
    mode: "light" | "dark";
    formatPrice: (price: number) => string;
    isInCart: boolean;
    onAddToCart: () => void;
  }) => (
    <div className="space-y-6">
      <div>
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: mode === "dark" ? "white" : "inherit" }}
        >
          {product.title}
        </h1>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl font-bold text-pink-600">
            {formatPrice(product.price)}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            Free Shipping
          </span>
        </div>
      </div>

      <div>
        <h2
          className="text-xl font-semibold mb-2"
          style={{ color: mode === "dark" ? "white" : "inherit" }}
        >
          Description
        </h2>
        <p
          className="text-gray-600 leading-relaxed"
          style={{
            color: mode === "dark" ? "rgb(156, 163, 175)" : "inherit",
          }}
        >
          {product.description}
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onAddToCart}
          size="large"
          variant={isInCart ? "secondary" : "primary"}
          className="text-lg flex-1"
        >
          {isInCart ? (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L16.5 18M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4"
                />
              </svg>
              Add to Cart
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="large"
          className="flex-1"
          onClick={() => window.history.back()}
        >
          Back to Products
        </Button>
      </div>
    </div>
  )
);

ProductDetails.displayName = "ProductDetails";

const ProductInfo: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<any>();

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { mode } = useSelector((state: RootState) => state.theme);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Find selected product
  useEffect(() => {
    if (products.length > 0 && id) {
      const product = products.find((item) => item.id === id);
      setSelectedProduct(product || null);
    }
  }, [products, id]);

  const handleAddToCart = useCallback(() => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      toast.success(`${selectedProduct.title} added to cart!`);
    }
  }, [dispatch, selectedProduct]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const isInCart = Boolean(
    selectedProduct && cartItems.some((item) => item.id === selectedProduct.id)
  );

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <LoadingSpinner size="large" text="Loading product..." />
        </div>
      </Layout>
    );
  }

  if (!selectedProduct) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="medium" />
              </div>
            )}
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              className={`w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://via.placeholder.com/500x500?text=No+Image";
                setImageLoading(false);
              }}
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedProduct.category}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <ProductDetails
            product={selectedProduct}
            mode={mode}
            formatPrice={formatPrice}
            isInCart={isInCart}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </Layout>
  );
});

ProductInfo.displayName = "ProductInfo";

export default ProductInfo;
