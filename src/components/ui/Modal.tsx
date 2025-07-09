import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import useClickOutside from "../../hooks/useClickOutside";
import useKeyPress from "../../hooks/useKeyPress";
import Button from "./Button";

interface ThemeState {
  mode: "light" | "dark";
}

interface RootState {
  theme: ThemeState;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "small" | "medium" | "large" | "fullscreen";
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  className = "",
  overlayClassName = "",
}) => {
  const { mode } = useSelector((state: RootState) => state.theme);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle click outside
  useClickOutside(modalRef, onClose, isOpen && closeOnClickOutside);

  // Handle escape key
  const escapePressed = useKeyPress("Escape");
  useEffect(() => {
    if (escapePressed && isOpen && closeOnEscape) {
      onClose();
    }
  }, [escapePressed, isOpen, closeOnEscape, onClose]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }

      // Restore body scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-lg",
    large: "max-w-4xl",
    fullscreen: "max-w-screen-xl w-full h-full",
  };

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      aria-labelledby={title ? "modal-title" : undefined}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeClasses[size]} max-h-[90vh] 
          bg-white rounded-lg shadow-xl overflow-hidden
          transform transition-all animate-scale-in
          ${className}
        `}
        style={{
          backgroundColor: mode === "dark" ? "rgb(55, 65, 81)" : "white",
          color: mode === "dark" ? "white" : "black",
        }}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{
              borderColor:
                mode === "dark" ? "rgb(75, 85, 99)" : "rgb(229, 231, 235)",
            }}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold"
                style={{ color: mode === "dark" ? "white" : "inherit" }}
              >
                {title}
              </h2>
            )}

            {showCloseButton && (
              <Button
                onClick={onClose}
                variant="ghost"
                size="small"
                className="ml-auto"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 overflow-y-auto custom-scrollbar max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );

  // Render modal in portal
  return createPortal(modalContent, document.body);
};

export default Modal;
