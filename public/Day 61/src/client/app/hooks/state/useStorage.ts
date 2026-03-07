import { useState, useEffect } from "react";

type StorageType = "local" | "session";

function useStorage<T>(
  key: string,
  initialValue: T,
  storageType: StorageType = "local"
) {
  const isClient = typeof window !== "undefined";
  const storage = isClient
    ? storageType === "local"
      ? window.localStorage
      : window.sessionStorage
    : null;

  const getStoredValue = (): T => {
    if (!isClient || !storage) return initialValue;
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  useEffect(() => {
    if (!isClient || !storage) return;
    try {
      storage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting storage key "${key}":`, error);
    }
  }, [key, storedValue, storage, isClient]);

  return [storedValue, setStoredValue] as const;
}

export default useStorage;
