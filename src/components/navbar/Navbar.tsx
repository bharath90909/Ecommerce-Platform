import React, { Fragment, useState, useCallback, memo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";
import { logout as logoutAction } from "../../store/slices/authSlice";
import { selectCartTotalItems } from "../../store/slices/cartSlice";

// Utils and constants
import { logout } from "../../utils/auth";
import { ROUTES, THEME_MODES } from "../../utils/constants";
import { CartItem, User } from "../../types";

interface ThemeState {
  mode: "light" | "dark";
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

interface RootState {
  theme: ThemeState;
  cart: CartState;
  auth: AuthState;
}

const CartBadge = memo(({ count }: { count: number }) => {
  if (count <= 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center transition-all duration-300 ease-in-out transform scale-100">
      {count > 99 ? "99+" : count}
    </span>
  );
});

CartBadge.displayName = "CartBadge";

const Navbar: React.FC = memo(() => {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  // Redux state
  const { mode } = useSelector((state: RootState) => state.theme);
  const totalItems = useSelector(selectCartTotalItems);
  const { user, isAuthenticated, isAdmin } = useSelector(
    (state: RootState) => state.auth
  );

  const userName = user?.user?.name || user?.user?.email || "User";

  // Helper function to check if link is active
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const handleToggleMode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(toggleTheme());
      // Remove focus to prevent persistent focus ring
      e.currentTarget.blur();
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
    logout();
  }, [dispatch]);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        backgroundColor: mode === THEME_MODES.DARK ? "#282c34" : "white",
      }}
    >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
                style={{
                  backgroundColor:
                    mode === THEME_MODES.DARK ? "rgb(40, 44, 52)" : "",
                  color: mode === THEME_MODES.DARK ? "white" : "",
                }}
              >
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={closeModal}
                    aria-label="Close menu"
                  >
                    <RxCross2 size={24} />
                  </button>
                </div>

                <nav className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link
                    to={ROUTES.HOME}
                    className={`text-sm font-medium transition-colors ${
                      isActiveLink(ROUTES.HOME)
                        ? "text-pink-600 font-semibold"
                        : "text-gray-900 hover:text-gray-700"
                    }`}
                    style={{
                      color: isActiveLink(ROUTES.HOME)
                        ? "#ec4899"
                        : mode === THEME_MODES.DARK
                        ? "white"
                        : "",
                    }}
                    onClick={closeModal}
                  >
                    Home
                  </Link>

                  {isAdmin && (
                    <Link
                      to={ROUTES.DASHBOARD}
                      className={`block text-sm font-medium transition-colors ${
                        isActiveLink(ROUTES.DASHBOARD)
                          ? "text-pink-600 font-semibold"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                      style={{
                        color: isActiveLink(ROUTES.DASHBOARD)
                          ? "#ec4899"
                          : mode === THEME_MODES.DARK
                          ? "white"
                          : "",
                      }}
                      onClick={closeModal}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-2"
                      style={{
                        color: mode === THEME_MODES.DARK ? "white" : "",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Logout ({userName})
                    </button>
                  ) : (
                    <Link
                      to={ROUTES.LOGIN}
                      className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                      style={{
                        color: mode === THEME_MODES.DARK ? "white" : "",
                      }}
                      onClick={closeModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Login
                    </Link>
                  )}

                  <Link
                    to={ROUTES.CART}
                    className={`block text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActiveLink(ROUTES.CART)
                        ? "text-pink-600 font-semibold"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      color: isActiveLink(ROUTES.CART)
                        ? "#ec4899"
                        : mode === THEME_MODES.DARK
                        ? "white"
                        : "",
                    }}
                    onClick={closeModal}
                  >
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          isActiveLink(ROUTES.CART) ? "text-pink-600" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{
                          color: isActiveLink(ROUTES.CART)
                            ? "#ec4899"
                            : mode === THEME_MODES.DARK
                            ? "white"
                            : "",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <CartBadge count={totalItems} />
                    </div>
                    Cart
                  </Link>

                  <button
                    onClick={handleToggleMode}
                    className="block w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    style={{
                      color: mode === THEME_MODES.DARK ? "white" : "",
                    }}
                  >
                    {mode === THEME_MODES.DARK ? (
                      <FiSun size={20} />
                    ) : (
                      <BsFillCloudSunFill size={20} />
                    )}
                    {mode === THEME_MODES.DARK ? "Light Mode" : "Dark Mode"}
                  </button>

                  <div
                    className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    style={{ color: mode === THEME_MODES.DARK ? "white" : "" }}
                  >
                    <img
                      src="https://flagcdn.com/w40/in.png"
                      alt="India"
                      className="w-5 h-4 object-cover rounded"
                    />
                    India
                  </div>
                </nav>

                {/* Removing India section */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop */}
      <header className="relative bg-white">
        {showBanner && (
          <div
            className="relative flex h-10 items-center justify-center bg-pink-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
            style={{
              backgroundColor: mode === THEME_MODES.DARK ? "rgb(62 64 66)" : "",
              color: mode === THEME_MODES.DARK ? "white" : "",
            }}
          >
            <p>Get free delivery on orders over ₹300</p>
            <button
              onClick={(e) => {
                setShowBanner(false);
                e.currentTarget.blur();
              }}
              className="absolute right-2 p-1 hover:bg-pink-700 rounded-full transition-colors duration-200"
              style={{
                backgroundColor:
                  mode === THEME_MODES.DARK ? "rgb(75 85 99)" : "",
              }}
              aria-label="Close banner"
            >
              <RxCross2 size={16} />
            </button>
          </div>
        )}

        <nav
          aria-label="Top navigation"
          className="bg-gray-100 px-2 xs:px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{
            backgroundColor: mode === THEME_MODES.DARK ? "#282c34" : "",
            color: mode === THEME_MODES.DARK ? "white" : "",
          }}
        >
          <div className="flex h-14 xs:h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              type="button"
              className="rounded-md bg-white p-1 xs:p-2 text-gray-400 lg:hidden hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={openModal}
              style={{
                backgroundColor:
                  mode === THEME_MODES.DARK ? "rgb(80 82 87)" : "",
                color: mode === THEME_MODES.DARK ? "white" : "",
              }}
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 xs:w-6 xs:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex lg:ml-0">
              <Link to={ROUTES.HOME} className="flex items-center">
                <h1
                  className="text-lg xs:text-xl sm:text-2xl font-bold text-black px-1 xs:px-2 py-1 rounded hover:opacity-80 transition-opacity truncate"
                  style={{ color: mode === THEME_MODES.DARK ? "white" : "" }}
                >
                  Fashion Forward
                </h1>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
              <div className="flex items-center space-x-12 mr-8">
                <Link
                  to={ROUTES.HOME}
                  className={`text-sm font-medium transition-colors ${
                    isActiveLink(ROUTES.HOME)
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{
                    color: isActiveLink(ROUTES.HOME)
                      ? "#ec4899"
                      : mode === THEME_MODES.DARK
                      ? "white"
                      : "",
                  }}
                >
                  Home
                </Link>

                {isAdmin && (
                  <Link
                    to={ROUTES.DASHBOARD}
                    className={`text-sm font-medium transition-colors ${
                      isActiveLink(ROUTES.DASHBOARD)
                        ? "text-pink-600 font-semibold"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    style={{
                      color: isActiveLink(ROUTES.DASHBOARD)
                        ? "#ec4899"
                        : mode === THEME_MODES.DARK
                        ? "white"
                        : "",
                    }}
                  >
                    Admin Dashboard
                  </Link>
                )}

                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    style={{ color: mode === THEME_MODES.DARK ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                ) : (
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
                    style={{ color: mode === THEME_MODES.DARK ? "white" : "" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Login
                  </Link>
                )}
              </div>

              {/* Right side icons */}
              <div className="flex items-center space-x-4 xs:space-x-6 sm:space-x-8">
                {/* Theme toggle */}
                <button
                  onClick={handleToggleMode}
                  className="p-1 xs:p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-full"
                  style={{
                    backgroundColor:
                      mode === THEME_MODES.DARK ? "rgb(80 82 87)" : "",
                    color: mode === THEME_MODES.DARK ? "white" : "",
                  }}
                >
                  {mode === THEME_MODES.DARK ? (
                    <FiSun size={18} className="xs:w-5 xs:h-5" />
                  ) : (
                    <BsFillCloudSunFill size={18} className="xs:w-5 xs:h-5" />
                  )}
                </button>

                {/* Cart */}
                <Link
                  to={ROUTES.CART}
                  className="group -m-1 xs:-m-2 flex items-center p-1 xs:p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-5 h-5 xs:w-6 xs:h-6 group-hover:text-gray-500 ${
                      isActiveLink(ROUTES.CART)
                        ? "text-pink-600"
                        : "text-gray-400"
                    }`}
                    style={{
                      color: isActiveLink(ROUTES.CART)
                        ? "#ec4899"
                        : mode === THEME_MODES.DARK
                        ? "white"
                        : "",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span
                    className={`ml-1 xs:ml-2 text-sm font-medium group-hover:text-gray-800 ${
                      isActiveLink(ROUTES.CART)
                        ? "text-pink-600 font-semibold"
                        : "text-gray-700"
                    }`}
                    style={{
                      color: isActiveLink(ROUTES.CART)
                        ? "#ec4899"
                        : mode === THEME_MODES.DARK
                        ? "white"
                        : "",
                    }}
                  >
                    {totalItems}
                  </span>
                </Link>

                {/* Country selector - hidden on very small screens */}
                <div
                  className="hidden xs:flex items-center px-2 xs:px-3 py-1 rounded-full bg-gray-50 border border-gray-200"
                  style={{
                    backgroundColor:
                      mode === THEME_MODES.DARK ? "rgb(80 82 87)" : "",
                    borderColor:
                      mode === THEME_MODES.DARK ? "rgb(60 62 65)" : "",
                  }}
                >
                  <img
                    src="https://flagcdn.com/w40/in.png"
                    alt="India"
                    className="w-4 h-3 xs:w-5 xs:h-4 object-cover rounded"
                  />
                  <span
                    className="ml-1 xs:ml-2 text-xs xs:text-sm font-medium text-gray-900"
                    style={{ color: mode === THEME_MODES.DARK ? "white" : "" }}
                  >
                    India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
