import React, { useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage } from "../../store/slices/authSlice";
import { getCurrentUser } from "../../utils/auth";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { CartItem } from "../../types";

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

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
  className = "",
}) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);

  // Initialize app state from localStorage on mount
  useEffect(() => {
    // Load user from localStorage
    const user = getCurrentUser();
    if (user) {
      dispatch(loadUserFromStorage(user));
    }
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden flex flex-col ${className}`}
      style={{
        backgroundColor: mode === "dark" ? "rgb(17, 24, 39)" : "white",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      {showNavbar && <Navbar />}

      <main className="flex-grow w-full pt-20 xs:pt-24 sm:pt-28">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
