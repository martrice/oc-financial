import { useSyncExternalStore } from "react";

/** True only after client hydration — false during SSR. */
export function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
