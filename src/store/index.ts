import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./slices/cartSlice.ts";
import authReducer from "./slices/authSlice.ts";
import productsReducer from "./slices/productsSlice.ts";
import themeReducer from "./slices/themeSlice.ts";
import { cartMiddleware } from "./middleware/cartMiddleware";

// Clear corrupted cart data (temporary fix for string price issue)
const clearCorruptedCartData = () => {
  try {
    const savedCartState = localStorage.getItem("cartState");
    if (savedCartState) {
      const cartData = JSON.parse(savedCartState);
      // Check if any cart items have string prices
      const hasStringPrices =
        cartData.items &&
        cartData.items.some((item: any) => typeof item.price === "string");
      if (hasStringPrices || typeof cartData.totalAmount === "string") {
        console.log("Clearing corrupted cart data with string prices...");
        localStorage.removeItem("cartState");
        return true;
      }
    }
  } catch (error) {
    console.error("Error checking cart data:", error);
    localStorage.removeItem("cartState");
    return true;
  }
  return false;
};

// Load initial cart state from localStorage
const loadCartFromStorage = (): CartState => {
  // First clear any corrupted data
  const wasCleared = clearCorruptedCartData();
  if (wasCleared) {
    return {
      items: [],
      totalItems: 0,
      totalAmount: 0,
    };
  }

  try {
    const savedCartState = localStorage.getItem("cartState");
    if (savedCartState) {
      return JSON.parse(savedCartState);
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  };
};

const initialCartState = loadCartFromStorage();

const reducer = {
  cart: cartReducer,
  auth: authReducer,
  products: productsReducer,
  theme: themeReducer,
};

export const store = configureStore({
  reducer,
  preloadedState: {
    cart: initialCartState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["products/setProducts"],
        ignoredPaths: ["products.products.time"],
      },
    }).concat(cartMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
declare module "@reduxjs/toolkit" {
  interface DefaultRootState extends RootState {}
}
