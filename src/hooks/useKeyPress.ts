import { useState, useEffect } from "react";

/**
 * Custom hook to detect specific key presses
 * Useful for keyboard shortcuts and accessibility features
 */
function useKeyPress(targetKey: string | string[]): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event: KeyboardEvent) => {
      const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
      if (keys.includes(event.key)) {
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      const keys = Array.isArray(targetKey) ? targetKey : [targetKey];
      if (keys.includes(event.key)) {
        setKeyPressed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

export default useKeyPress;
