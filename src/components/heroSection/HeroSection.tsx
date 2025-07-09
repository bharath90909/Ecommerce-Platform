import React, { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HeroSection: React.FC = memo(() => {
  const { mode } = useSelector((state: RootState) => state.theme);

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12 xs:py-16 sm:py-20 lg:py-32 px-2 xs:px-4"
      style={{
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #1f2937 0%, #374151 100%)"
            : "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-white bg-opacity-10 background-pattern"></div>
      </div>

      <div className="container mx-auto px-2 xs:px-4 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 xs:mb-6 leading-tight">
              Fashion
              <span className="block text-yellow-300">Forward</span>
            </h1>

            <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-6 xs:mb-8 text-gray-100 leading-relaxed px-2 xs:px-0">
              Discover the latest trends in fashion. Premium quality clothing
              and accessories at unbeatable prices. Express your unique style
              with our curated collection.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center lg:justify-start px-2 xs:px-0">
              <button
                onClick={scrollToProducts}
                className="px-4 xs:px-6 sm:px-8 py-2 xs:py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white border-2 border-white rounded-full font-medium hover:bg-white hover:text-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm xs:text-base"
              >
                Shop Now
              </button>

              <button className="px-4 xs:px-6 sm:px-8 py-2 xs:py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-pink-600 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl text-sm xs:text-base">
                View Collection
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 xs:gap-8 sm:gap-12 mt-8 xs:mt-12 justify-center lg:justify-start px-2 xs:px-0">
              <div className="text-center lg:text-left">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">
                  1000+
                </div>
                <div className="text-xs xs:text-sm text-gray-200">Products</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">
                  50k+
                </div>
                <div className="text-xs xs:text-sm text-gray-200">
                  Happy Customers
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">
                  5★
                </div>
                <div className="text-xs xs:text-sm text-gray-200">Rating</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-2 xs:mx-0">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Fashion Collection"
                className="w-full h-48 xs:h-56 sm:h-64 md:h-96 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-2 xs:top-4 right-2 xs:right-4 bg-yellow-400 text-black px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-semibold">
                New Arrivals
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-2 xs:-top-4 -left-2 xs:-left-4 w-16 xs:w-20 sm:w-24 h-16 xs:h-20 sm:h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-2 xs:-bottom-4 -right-2 xs:-right-4 w-20 xs:w-24 sm:w-32 h-20 xs:h-24 sm:h-32 bg-white rounded-full opacity-10 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 xs:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="w-5 xs:w-6 h-5 xs:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
