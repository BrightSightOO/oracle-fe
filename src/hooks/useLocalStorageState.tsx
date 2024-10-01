import { useState, useCallback } from 'react';

export function useLocalStorageState<T>(
  key: string,
  defaultState?: T,
): [T | null, (newState: T | null) => void] {
  const [state, setState] = useState<T | null>(() => {
    if (typeof window !== 'undefined') {
      const storedState = localStorage.getItem(key);
      if (storedState) {
        return JSON.parse(storedState);
      }
    }
    return defaultState;
  });

  const setLocalStorageState = useCallback(
    (newState: T | null) => {
      const changed = state !== newState;
      if (!changed) {
        return;
      }
      setState(newState);
      if (newState === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newState));
      }
    },
    [state, key],
  );

  return [state, setLocalStorageState];
}
