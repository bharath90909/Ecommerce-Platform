// User Types
export interface User {
  user: {
    name?: string;
    email: string;
    uid: string;
  };
}

// Product Types
export interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  time: any; // Firestore Timestamp
  date: string;
}

export interface ProductFormData {
  title: string | null;
  price: string | null;
  imageUrl: string | null;
  category: string | null;
  description: string | null;
  time: any;
  date: string;
}

// Cart Types
export interface CartItem extends Product {
  quantity: number;
}

// Context Types
export interface AppContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  products: ProductFormData;
  setProducts: (products: ProductFormData) => void;
  addProduct: () => Promise<void>;
  product: Product[];
  updateProduct: (item: Product) => Promise<void>;
  edithandle: (item: Product) => void;
  deleteProduct: (item: Product) => Promise<void>;
  user: any[];
}

// Firebase Types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Theme Types
export type ThemeMode = "light" | "dark";

// Route Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
