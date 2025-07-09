// Routes configuration
export const ROUTES = {
  HOME: "/",
  CART: "/cart",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ADD_PRODUCT: "/addproduct",
  UPDATE_PRODUCT: "/updateproduct",
  PRODUCT_INFO: "/productinfo",
} as const;

// Theme modes
export const THEME_MODES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

// Storage keys
export const STORAGE_KEYS = {
  CART: "fashion-forward-cart",
  THEME: "fashion-forward-theme",
  USER: "fashion-forward-user",
  AUTH_TOKEN: "fashion-forward-auth-token",
} as const;

// App configuration
export const APP_CONFIG = {
  NAME: "Fashion Forward",
  VERSION: "2.0.0",
  DESCRIPTION: "Modern React ecommerce platform with TypeScript",
  AUTHOR: "Fashion Forward Team",
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  PASSWORD_MISMATCH: "Passwords do not match",
  PRICE_INVALID: "Please enter a valid price",
  URL_INVALID: "Please enter a valid URL",
} as const;

// Product categories
export const PRODUCT_CATEGORIES = [
  "Fashion",
  "Shirt",
  "Jacket",
  "Mobile",
  "Laptop",
  "Shoes",
  "Home",
  "Books",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// API endpoints (if needed for future expansion)
export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  USERS: "/api/users",
  ORDERS: "/api/orders",
} as const;

// UI Constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 12,
  SEARCH_DEBOUNCE_MS: 300,
  CART_MAX_QUANTITY: 99,
  IMAGE_PLACEHOLDER: "https://via.placeholder.com/300x300?text=No+Image",
} as const;
