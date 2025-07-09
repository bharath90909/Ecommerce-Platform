import { useCallback, useMemo } from "react";

/**
 * Enhanced useCallback with dependency optimization
 * Useful for complex callback functions that need memoization
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(callback, deps);
}

/**
 * Hook for memoizing expensive calculations
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}

/**
 * Hook for creating stable object references
 * Prevents unnecessary re-renders when passing objects as props
 */
export function useStableObject<T extends Record<string, any>>(obj: T): T {
  return useMemo(() => obj, Object.values(obj));
}

/**
 * Hook for creating stable array references
 * Prevents unnecessary re-renders when passing arrays as props
 */
export function useStableArray<T>(arr: T[]): T[] {
  return useMemo(() => arr, arr);
}
