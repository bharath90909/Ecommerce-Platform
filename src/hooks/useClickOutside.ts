import { useEffect, RefObject } from "react";

/**
 * Custom hook to detect clicks outside a specified element
 * Useful for closing modals, dropdowns, etc.
 */
function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ref, callback, enabled]);
}

export default useClickOutside;
