import React, { memo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "extra-large";
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = memo(
  ({
    isOpen,
    onClose,
    title,
    children,
    size = "medium",
    showCloseButton = true,
    closeOnBackdropClick = true,
    className = "",
  }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const sizeClasses = {
      small: "max-w-sm",
      medium: "max-w-md",
      large: "max-w-2xl",
      "extra-large": "max-w-4xl",
    };

    // Handle escape key
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isOpen, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // Focus management
    useEffect(() => {
      if (isOpen && modalRef.current) {
        modalRef.current.focus();
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div
          ref={modalRef}
          className={`
          relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden
          bg-white rounded-lg shadow-xl transform transition-all
          dark:bg-gray-800 ${className}
        `}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="
                  ml-auto bg-transparent border-0 text-gray-400 text-3xl leading-none 
                  font-semibold outline-none focus:outline-none hover:text-gray-600
                  dark:hover:text-gray-300 transition-colors
                "
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
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
          )}

          {/* Body */}
          <div className="flex-auto p-4 max-h-[calc(90vh-8rem)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = "Modal";

export default Modal;
