"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type ListingPaginationScrollProps = {
  anchorId?: string;
};

/**
 * After ?page changes, scroll to the article card grid. Next.js can restore a
 * stale scroll position (e.g. near the footer) when returning from a shorter page.
 */
export function ListingPaginationScroll({ anchorId = "articles-list" }: ListingPaginationScrollProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const previousPageRef = useRef<string | null>(null);

  useEffect(() => {
    const previousPage = previousPageRef.current;
    previousPageRef.current = page;

    if (previousPage === null || previousPage === page) {
      return;
    }

    const scrollToCards = () => {
      const target = document.getElementById(anchorId);
      if (!target) return;
      target.scrollIntoView({ block: "start" });
    };

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToCards);
    });

    return () => cancelAnimationFrame(frame);
  }, [page, anchorId]);

  return null;
}
