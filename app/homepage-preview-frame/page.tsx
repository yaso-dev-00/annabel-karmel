"use client";

import {
  HOMEPAGE_PREVIEW_MESSAGE,
  HOMEPAGE_PREVIEW_READY_MESSAGE,
} from "@/lib/homepage/preview-messages";
import { readHomepagePreviewDocument } from "@/lib/homepage/preview-session";
import type { HomepageDocument } from "@/lib/homepage/types";
import { useEffect, useLayoutEffect, useState } from "react";
import { HomePageContent } from "@/components/HomeScreen/HomePage";
import "./preview-frame.css";

export default function HomepagePreviewFramePage() {
  const [document, setDocument] = useState<HomepageDocument | null>(null);

  useLayoutEffect(() => {
    const seeded = readHomepagePreviewDocument();
    if (seeded) setDocument(seeded);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as {
        type?: string;
        document?: HomepageDocument;
      } | null;
      if (!data?.type) return;

      if (data.type === HOMEPAGE_PREVIEW_MESSAGE && data.document) {
        const next = data.document;
        setDocument((prev) => {
          if (prev && JSON.stringify(prev) === JSON.stringify(next)) {
            return prev;
          }
          return next;
        });
      }
    };
    window.addEventListener("message", onMessage);
    window.parent.postMessage({ type: HOMEPAGE_PREVIEW_READY_MESSAGE }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!document) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#8a8588",
          fontSize: 14,
        }}
      >
        Loading homepage preview…
      </div>
    );
  }

  return <HomePageContent document={document} previewMode />;
}
