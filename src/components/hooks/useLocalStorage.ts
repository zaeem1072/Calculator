import { useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });
  const setLocalStorageStateValue = (
    valueOrFn: (prev: T) => T
  ): void => {
    const newValue = valueOrFn(localStorageValue);

    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };

  return [localStorageValue, setLocalStorageStateValue] as const;
}

export { useLocalStorage };
