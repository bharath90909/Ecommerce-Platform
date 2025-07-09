import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  theme: ThemeState;
}

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "small" | "medium" | "large";
  shadow?: "none" | "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large";
  border?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "medium",
  shadow = "medium",
  rounded = "medium",
  border = true,
  hoverable = false,
  onClick,
}) => {
  const { mode } = useSelector((state: RootState) => state.theme);

  const paddingClasses = {
    none: "",
    small: "p-3",
    medium: "p-4",
    large: "p-6",
  };

  const shadowClasses = {
    none: "",
    small: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-lg",
  };

  const roundedClasses = {
    none: "",
    small: "rounded",
    medium: "rounded-lg",
    large: "rounded-xl",
  };

  const baseClasses = "bg-white transition-all duration-200";
  const borderClass = border ? "border border-gray-200" : "";
  const hoverClass = hoverable
    ? "hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    : "";
  const clickableClass = onClick ? "cursor-pointer" : "";

  const darkModeStyles =
    mode === "dark"
      ? {
          backgroundColor: "rgb(55, 65, 81)",
          borderColor: "rgb(75, 85, 99)",
          color: "white",
        }
      : {};

  const cardClasses = `
    ${baseClasses}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${borderClass}
    ${hoverClass}
    ${clickableClass}
    ${className}
  `.trim();

  return (
    <div
      className={cardClasses}
      style={darkModeStyles}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default Card;
