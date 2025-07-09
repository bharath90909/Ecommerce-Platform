import { Middleware } from "@reduxjs/toolkit";

interface CartState {
  items: any[];
  totalItems: number;
  totalAmount: number;
}

interface AppState {
  cart: CartState;
}

export const cartMiddleware: Middleware<{}, AppState> =
  (store) => (next) => (action: any) => {
    const result = next(action);

    // Only persist cart state for cart-related actions
    if (action.type?.startsWith("cart/")) {
      try {
        const cartState = (store.getState() as AppState).cart;
        localStorage.setItem("cartState", JSON.stringify(cartState));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }

    return result;
  };
