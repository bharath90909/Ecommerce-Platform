import React, { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { Product, CartItem } from "../../types";
import { ROUTES } from "../../utils/constants";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { toast } from "react-toastify";

interface ThemeState {
  mode: "light" | "dark";
}

interface CartState {
  items: CartItem[];
}

interface RootState {
  theme: ThemeState;
  cart: CartState;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, className = "" }) => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state: RootState) => state.theme);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const isInCart = cartItems.some((item) => item.id === product.id);

    const handleAddToCart = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(addToCart(product));
        toast.success(`${product.title} added to cart!`, {
          position: "bottom-right",
          autoClose: 1500,
        });
      },
      [dispatch, product]
    );

    const formatPrice = useCallback((price: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }, []);

    if (!product) {
      return null;
    }

    return (
      <Link
        to={`${ROUTES.PRODUCT_INFO}/${product.id}`}
        className={`block group ${className}`}
      >
        <Card hoverable className="h-full flex flex-col" padding="none">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-t-lg aspect-square">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />

            {/* Quick Add to Cart overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                onClick={handleAddToCart}
                size="small"
                variant={isInCart ? "secondary" : "primary"}
                className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Category badge */}
            <div className="absolute top-2 left-2">
              <span
                className="inline-block px-2 py-1 text-xs font-semibold rounded-full"
                style={{
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(0, 0, 0, 0.7)"
                      : "rgba(255, 255, 255, 0.9)",
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-2 xs:p-3 sm:p-4 flex-grow flex flex-col">
            <h3
              className="font-semibold text-sm xs:text-base sm:text-lg mb-1 xs:mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors"
              style={{ color: mode === "dark" ? "white" : "inherit" }}
              title={product.title}
            >
              {product.title}
            </h3>

            <p
              className="text-xs xs:text-sm text-gray-600 mb-2 xs:mb-3 line-clamp-2 flex-grow"
              style={{
                color: mode === "dark" ? "rgb(156, 163, 175)" : "inherit",
              }}
              title={product.description}
            >
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto gap-2">
              <span
                className="text-base xs:text-lg sm:text-xl font-bold text-pink-600 truncate"
                style={{
                  color: mode === "dark" ? "rgb(236, 72, 153)" : "inherit",
                }}
              >
                {formatPrice(product.price)}
              </span>

              <Button
                onClick={handleAddToCart}
                size="small"
                variant={isInCart ? "outline" : "primary"}
                className="shrink-0 px-2 xs:px-3"
              >
                {isInCart ? (
                  <svg
                    className="w-3 xs:w-4 h-3 xs:h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-3 xs:w-4 h-3 xs:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </Button>
            </div>

            {/* Date added */}
            <div
              className="mt-1 xs:mt-2 text-xs text-gray-500"
              style={{
                color: mode === "dark" ? "rgb(156, 163, 175)" : "inherit",
              }}
            >
              Added {product.date}
            </div>
          </div>
        </Card>
      </Link>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
