import { useEffect, useState } from "react";

// Wait before returning the latest search value.
// This prevents an API request after every key press.
export default function useDebounce(
  value,
  delay = 350
) {
  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}