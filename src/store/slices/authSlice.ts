import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

// Get admin email from environment variable
const ADMIN_EMAIL =
  import.meta.env.VITE_ADMIN_EMAIL || "kumarachineearner@gmail.com";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // Check if user is admin
      state.isAdmin = action.payload.user.email === ADMIN_EMAIL;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.loading = false;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    loadUserFromStorage: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;

        // Check if user is admin
        state.isAdmin = action.payload.user.email === ADMIN_EMAIL;
      }
    },
  },
});

export const {
  loginSuccess,
  logout,
  setLoading,
  setError,
  clearError,
  loadUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
