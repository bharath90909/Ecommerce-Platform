import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { User } from "../types";

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem("fashion-forward-user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem("fashion-forward-user");
    localStorage.removeItem("fashion-forward-auth-token");
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to logout");
  }
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  const adminEmail =
    import.meta.env.VITE_ADMIN_EMAIL || "kumarachineearner@gmail.com";
  return Boolean(user && user.user && user.user.email === adminEmail);
};

export const setUserSession = (user: User, token?: string): void => {
  localStorage.setItem("fashion-forward-user", JSON.stringify(user));
  if (token) {
    localStorage.setItem("fashion-forward-auth-token", token);
  }
};

export const clearUserSession = (): void => {
  localStorage.removeItem("fashion-forward-user");
  localStorage.removeItem("fashion-forward-auth-token");
};
