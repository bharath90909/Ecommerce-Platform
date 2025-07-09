import React, { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { useSelector } from "react-redux";

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  theme: ThemeState;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  variant?: "default" | "filled" | "outlined";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      variant = "default",
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const { mode } = useSelector((state: RootState) => state.theme);

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses =
      "block w-full px-3 py-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
      default: `border border-gray-300 rounded-md bg-white focus:border-pink-500 ${
        error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
      }`,
      filled: `border-0 rounded-md bg-gray-100 focus:bg-white ${
        error ? "bg-red-50 focus:bg-red-50" : ""
      }`,
      outlined: `border-2 border-gray-300 rounded-lg bg-transparent focus:border-pink-500 ${
        error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
      }`,
    };

    const darkModeStyles =
      mode === "dark"
        ? {
            backgroundColor:
              variant === "default" ? "rgb(55, 65, 81)" : "rgb(75, 85, 99)",
            borderColor: error ? "rgb(239, 68, 68)" : "rgb(107, 114, 128)",
            color: "white",
          }
        : {};

    const widthClass = fullWidth ? "w-full" : "";

    const inputClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${leftIcon ? "pl-10" : ""}
    ${rightIcon ? "pr-10" : ""}
    ${className}
  `.trim();

    return (
      <div className={`${widthClass}`}>
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-1 ${
              error
                ? "text-red-700"
                : mode === "dark"
                ? "text-gray-200"
                : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className={`${error ? "text-red-500" : "text-gray-400"}`}>
                {leftIcon}
              </span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            style={darkModeStyles}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className={`${error ? "text-red-500" : "text-gray-400"}`}>
                {rightIcon}
              </span>
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className={`mt-1 text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
