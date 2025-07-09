import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types";

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      // Ensure price is a number
      const price =
        typeof action.payload.price === "string"
          ? parseFloat(action.payload.price)
          : action.payload.price;

      if (existingItemIndex !== -1) {
        const newQuantity = state.items[existingItemIndex].quantity + 1;
        state.totalItems = state.totalItems + 1;
        state.totalAmount = state.totalAmount + price;
        state.items[existingItemIndex].quantity = newQuantity;
      } else {
        state.items.push({ ...action.payload, price, quantity: 1 });
        state.totalItems = state.totalItems + 1;
        state.totalAmount = state.totalAmount + price;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        const price =
          typeof removedItem.price === "string"
            ? parseFloat(removedItem.price)
            : removedItem.price;

        state.totalItems = state.totalItems - removedItem.quantity;
        state.totalAmount = state.totalAmount - price * removedItem.quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);

      if (itemIndex === -1) return;

      const item = state.items[itemIndex];
      const price =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
      const quantityDiff = quantity - item.quantity;

      if (quantity <= 0) {
        state.totalItems = state.totalItems - item.quantity;
        state.totalAmount = state.totalAmount - price * item.quantity;
        state.items.splice(itemIndex, 1);
      } else {
        state.totalItems = state.totalItems + quantityDiff;
        state.totalAmount = state.totalAmount + price * quantityDiff;
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },

    loadCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      // Ensure all prices are numbers when loading from storage
      state.items = action.payload.map((item) => ({
        ...item,
        price:
          typeof item.price === "string" ? parseFloat(item.price) : item.price,
      }));

      const totals = state.items.reduce(
        (acc, item) => ({
          totalItems: acc.totalItems + item.quantity,
          totalAmount: acc.totalAmount + item.price * item.quantity,
        }),
        { totalItems: 0, totalAmount: 0 }
      );
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
  },
});

// Selectors for optimized cart state access
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalItems = (state: { cart: CartState }) =>
  state.cart.totalItems;
export const selectCartTotalAmount = (state: { cart: CartState }) =>
  state.cart.totalAmount;

export const selectIsInCart = createSelector(
  [selectCartItems, (_: { cart: CartState }, productId: string) => productId],
  (items, productId) => items.some((item) => item.id === productId)
);

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
