"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function isAdminListPath(pathname: string, listPath: string): boolean {
  return pathname === listPath || pathname === `${listPath}/`;
}

/**
 * Keeps admin listing tables fresh after edits. Server-rendered props can lag behind
 * client navigations; this refetches from the admin API when the list route is active.
 */
export function useAdminListRefresh<T>(
  initial: T[],
  fetcher: () => Promise<T[]>,
  listPath: string,
): T[] {
  const pathname = usePathname();
  const [items, setItems] = useState(initial);

  const refresh = useCallback(async () => {
    try {
      const next = await fetcher();
      setItems(next);
    } catch {
      // Keep the last good payload if the API is temporarily unavailable.
    }
  }, [fetcher]);

  useEffect(() => {
    setItems(initial);
  }, [initial]);

  useEffect(() => {
    if (!isAdminListPath(pathname, listPath)) return;
    void refresh();
  }, [pathname, listPath, refresh]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && isAdminListPath(pathname, listPath)) {
        void refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [pathname, listPath, refresh]);

  return items;
}
