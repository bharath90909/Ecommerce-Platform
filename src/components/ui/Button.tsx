import React, { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500 active:bg-pink-800",
    secondary:
      "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800",
    outline:
      "border-2 border-pink-600 text-pink-600 bg-transparent hover:bg-pink-50 focus:ring-pink-500 active:bg-pink-100",
    ghost:
      "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
  };

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClass}
    ${className}
  `.trim();

  const isDisabled = disabled || loading;

  return (
    <button className={buttonClasses} disabled={isDisabled} {...props}>
      {loading ? (
        <>
          <LoadingSpinner size="small" color="white" />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
