import { useEffect, useRef } from "react";

export function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number = 500,
): (...args: Args) => void {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cập nhật callback mới nhất để tránh lỗi stale closure
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Hàm debounce
  const debouncedFn = (...args: Args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  };

  // Hủy timeout nếu component bị unmount giữa chừng
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}
