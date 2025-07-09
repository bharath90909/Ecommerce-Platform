import React, { memo, useCallback } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { CartItem } from "../../types";

interface ThemeState {
  mode: "light" | "dark";
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

interface RootState {
  theme: ThemeState;
  cart: CartState;
}

// Memoized cart item component
const CartItemComponent = memo(
  ({
    item,
    onRemove,
    onUpdateQuantity,
    formatPrice,
  }: {
    item: CartItem;
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
    formatPrice: (price: number) => string;
  }) => (
    <Card key={item.id} className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-32 h-32 flex-shrink-0">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.category}</p>
          <p className="font-bold text-pink-600 text-lg">
            {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-4">
          <Button
            variant="ghost"
            size="small"
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-700"
          >
            Remove
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="small"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center font-semibold">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="small"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>

          <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </Card>
  )
);

CartItemComponent.displayName = "CartItemComponent";

const CartPage: React.FC = memo(() => {
  const dispatch = useDispatch();
  const { items, totalItems, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const { mode } = useSelector((state: RootState) => state.theme);

  const handleRemoveFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
    },
    [dispatch]
  );

  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) {
        handleRemoveFromCart(id);
        return;
      }
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch, handleRemoveFromCart]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  }, [dispatch]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <Card className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L16.5 18M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4"
                />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Add some products to your cart to get started.
              </p>
              <Link to={ROUTES.HOME}>
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            <Card className="sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Items ({totalItems})</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <Button fullWidth size="large" className="mb-4">
                Proceed to Checkout
              </Button>

              <Link to={ROUTES.HOME}>
                <Button variant="outline" fullWidth>
                  Continue Shopping
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
});

CartPage.displayName = "CartPage";

export default CartPage;
