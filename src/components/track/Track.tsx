import React, { memo } from "react";
import { useSelector } from "react-redux";

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  theme: ThemeState;
}

interface TrackingStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const trackingSteps: TrackingStep[] = [
  {
    id: "1",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    title: "Free Shipping",
    description: "Free shipping on orders over ₹999",
  },
  {
    id: "2",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Quality Guarantee",
    description: "100% authentic products guaranteed",
  },
  {
    id: "3",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Customer Support",
    description: "24/7 customer support available",
  },
  {
    id: "4",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
];

const Track: React.FC = memo(() => {
  const { mode } = useSelector((state: RootState) => state.theme);

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: mode === "dark" ? "rgb(17 24 39)" : "white",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Why Choose Fashion Forward?
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
          >
            We're committed to providing you with the best shopping experience.
            Here's what makes us special.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trackingSteps.map((step) => (
            <div
              key={step.id}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(75 85 99)" : "",
                    color: mode === "dark" ? "rgb(236 72 153)" : "",
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                {step.title}
              </h3>
              <p
                className="text-gray-600 text-sm leading-relaxed"
                style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="mt-16 text-center">
          <div
            className="inline-flex items-center justify-center space-x-8 p-6 rounded-lg bg-gray-50"
            style={{
              backgroundColor: mode === "dark" ? "rgb(31 41 55)" : "",
              border: mode === "dark" ? "1px solid rgb(75 85 99)" : "",
            }}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="text-sm font-medium"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Secure Payment
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="text-sm font-medium"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Fast Delivery
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="text-sm font-medium"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Verified Products
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Track.displayName = "Track";

export default Track;
