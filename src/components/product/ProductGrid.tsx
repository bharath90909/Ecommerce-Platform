import React, { useEffect, memo, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import ProductCard from "../productCard/ProductCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Product } from "../../types";

interface ProductsState {
  products: Product[];
  loading: boolean;
}

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  products: ProductsState;
  theme: ThemeState;
}

const ProductGrid: React.FC = memo(() => {
  const dispatch = useDispatch<any>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { mode } = useSelector((state: RootState) => state.theme);

  // Local state for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"a-z" | "price-low" | "price-high">(
    "a-z"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "a-z":
          return a.title.localeCompare(b.title);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, sortBy, selectedCategory]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) {
    return (
      <section className="py-8 xs:py-12 sm:py-16 px-2 xs:px-4">
        <div className="container mx-auto px-2 xs:px-4 max-w-7xl">
          <div className="flex justify-center">
            <LoadingSpinner size="large" text="Loading products..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-8 xs:py-12 sm:py-16 px-2 xs:px-4"
      id="products"
      style={{
        backgroundColor: mode === "dark" ? "rgb(17 24 39)" : "white",
      }}
    >
      <div className="container mx-auto px-2 xs:px-4 max-w-7xl">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <h2
            className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold mb-3 xs:mb-4"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Products
          </h2>
          <p
            className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 xs:px-0"
            style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
          >
            Discover our amazing collection of fashion items
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 xs:mb-10">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for products or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-12 py-4 border-2 border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900"
                style={{
                  backgroundColor:
                    mode === "dark" ? "rgb(55, 65, 81)" : "white",
                  borderColor:
                    mode === "dark" ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)",
                  color: mode === "dark" ? "white" : "rgb(17, 24, 39)",
                  boxShadow:
                    mode === "dark"
                      ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto">
            {/* Sort By */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                <label
                  className="text-sm font-semibold text-gray-700"
                  style={{ color: mode === "dark" ? "rgb(209, 213, 219)" : "" }}
                >
                  Sort by
                </label>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-300"
                style={{
                  backgroundColor:
                    mode === "dark" ? "rgb(55, 65, 81)" : "white",
                  borderColor:
                    mode === "dark" ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)",
                  color: mode === "dark" ? "white" : "rgb(17, 24, 39)",
                }}
              >
                <option value="a-z">A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <label
                  className="text-sm font-semibold text-gray-700"
                  style={{ color: mode === "dark" ? "rgb(209, 213, 219)" : "" }}
                >
                  Category
                </label>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-gray-300"
                style={{
                  backgroundColor:
                    mode === "dark" ? "rgb(55, 65, 81)" : "white",
                  borderColor:
                    mode === "dark" ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)",
                  color: mode === "dark" ? "white" : "rgb(17, 24, 39)",
                }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 hover:border-pink-300 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor:
                    mode === "dark" ? "rgba(236, 72, 153, 0.1)" : "",
                  borderColor: mode === "dark" ? "rgba(236, 72, 153, 0.3)" : "",
                  color: mode === "dark" ? "rgb(251, 207, 232)" : "",
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {(searchTerm || selectedCategory) && (
          <div className="mb-6 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200"
              style={{
                backgroundColor: mode === "dark" ? "rgb(55, 65, 81)" : "",
                borderColor: mode === "dark" ? "rgb(75, 85, 99)" : "",
              }}
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v0a2 2 0 002 2h2m0 0V5m0 4v0a2 2 0 002 2h2a2 2 0 002-2v0a2 2 0 00-2-2h-2m0 0V5"
                />
              </svg>
              <span
                className="text-sm font-medium text-gray-600"
                style={{ color: mode === "dark" ? "rgb(209, 213, 219)" : "" }}
              >
                Showing {filteredAndSortedProducts.length} of {products.length}{" "}
                products
              </span>
            </div>
          </div>
        )}

        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12 xs:py-16">
            <p
              className="text-gray-600 text-base xs:text-lg"
              style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
            >
              {products.length === 0
                ? "No products available at the moment."
                : "No products found matching your search."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

ProductGrid.displayName = "ProductGrid";

export default ProductGrid;
