import React from "react";
import { useSelector } from "react-redux";

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  theme: ThemeState;
}

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "white";
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "primary",
  text,
  className = "",
}) => {
  const { mode } = useSelector((state: RootState) => state.theme);

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-pink-600",
    secondary: "text-gray-600",
    white: "text-white",
  };

  const spinnerClasses = `${sizeClasses[size]} ${colorClasses[color]} animate-spin ${className}`;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg
        className={spinnerClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>

      {text && (
        <p
          className="text-sm font-medium"
          style={{ color: mode === "dark" ? "white" : "inherit" }}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
