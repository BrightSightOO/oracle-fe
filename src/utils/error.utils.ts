import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

export const IGNORED_ERRORS = ['User rejected the request.'];

export const isIgnoredError = (error: any) =>
  IGNORED_ERRORS.includes(error) ||
  (error.message && IGNORED_ERRORS.includes(error.message));

// A single function that handles logging errors to make sure that we get the most info out of the error as we can for debugging. This is especially helpful for getting solana program logs.
// Could also be a place where we can send errors to a reporting service (like Sentry) in the future.
export const logError = (error: any) => {
  if (isIgnoredError(error)) return;

  console.error(error);
  if (error?.logs) {
    console.error(error.logs);
  }
};

/**
 *
 * Allows the consumer to call this fn to get the error message to display in the UI
 * but also logs all error data, including the logs if it's coming from a solana RPC call.
 * It debounces the logging so that it's safe to use w/in the render method of a component.
 */
export const useDisplayQueryError = () => {
  const lastErrorMessage = useRef<string | null>(null);
  const debouncedLogError = useCallback(
    debounce((message: string) => {
      lastErrorMessage.current = message;
    }, 5000),
    [],
  );

  const displayQueryError = useCallback(
    (error: any): string => {
      if (isIgnoredError(error)) return '';
      const errorMessage = `${error.name}: ${error.message}`;
      // if (errorMessage !== lastErrorMessage.current) {
      logError(error); // Log immediately for a new error
      debouncedLogError(errorMessage); // Start debounce timer
      // }
      return errorMessage + '\n';
    },
    [debouncedLogError],
  );

  return displayQueryError;
};
