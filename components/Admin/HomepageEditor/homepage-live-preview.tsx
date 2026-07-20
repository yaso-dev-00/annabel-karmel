"use client";

import {
  PreviewViewport,
  type PreviewViewportHandle,
} from "@/components/Admin/BlockEditor/preview-viewport";
import blockStyles from "@/components/Admin/BlockEditor/block-editor.module.css";
import type { HomepageDocument, HomepageSectionType } from "@/lib/homepage/types";
import {
  HOMEPAGE_PREVIEW_MESSAGE,
  HOMEPAGE_PREVIEW_READY_MESSAGE,
} from "@/lib/homepage/preview-messages";
import { writeHomepagePreviewDocument } from "@/lib/homepage/preview-session";
import {
  forwardRef,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import "./homepage-preview-layout.css";

const FRAME_SRC = "/homepage-preview-frame";
const SCROLL_RETRY_MS = [0, 80, 200, 400, 700, 1200];

type HomepageLivePreviewProps = {
  document: HomepageDocument;
  focusRequest?: { type: HomepageSectionType; nonce: number } | null;
  fullscreenActions?: ReactNode;
  className?: string;
  defaultFullscreen?: boolean;
};

function scrollIframeToSection(
  iframe: HTMLIFrameElement | null,
  sectionType: HomepageSectionType,
): boolean {
  const win = iframe?.contentWindow;
  const doc = iframe?.contentDocument;
  if (!iframe || !win || !doc) return false;

  const el = doc.querySelector<HTMLElement>(`[data-homepage-section="${sectionType}"]`);
  if (!el) return false;

  // Absolute Y of the section inside the iframe document.
  const sectionTop = el.getBoundingClientRect().top + win.scrollY - 8;
  const target = Math.max(0, sectionTop);

  doc.documentElement.scrollTop = target;
  doc.body.scrollTop = target;
  win.scrollTo(0, target);

  // Brief highlight so the jump is obvious in the phone frame.
  const prevOutline = el.style.outline;
  const prevOffset = el.style.outlineOffset;
  el.style.outline = "2px solid #c45c6a";
  el.style.outlineOffset = "4px";
  window.setTimeout(() => {
    el.style.outline = prevOutline;
    el.style.outlineOffset = prevOffset;
  }, 1200);

  // If the iframe itself sits in a scrollable preview panel, keep the frame in view.
  const scroller = iframe.closest("[data-preview-scroll]") as HTMLElement | null;
  if (scroller) {
    const iframeTop = iframe.getBoundingClientRect().top;
    const scrollerTop = scroller.getBoundingClientRect().top;
    const outerTarget = scroller.scrollTop + (iframeTop - scrollerTop) - 8;
    if (iframeTop < scrollerTop || iframeTop > scrollerTop + scroller.clientHeight * 0.5) {
      scroller.scrollTo({ top: Math.max(0, outerTarget), behavior: "smooth" });
    }
  }

  return true;
}

function HomepagePreviewFrame({
  document,
  focusRequest,
}: {
  document: HomepageDocument;
  focusRequest?: { type: HomepageSectionType; nonce: number } | null;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const readyRef = useRef(false);
  const deferred = useDeferredValue(document);
  const deferredRef = useRef(deferred);
  const postTimerRef = useRef<number | undefined>(undefined);
  const scrollTimersRef = useRef<number[]>([]);

  deferredRef.current = deferred;

  const clearScrollTimers = () => {
    for (const id of scrollTimersRef.current) window.clearTimeout(id);
    scrollTimersRef.current = [];
  };

  const postDocument = (doc: HomepageDocument) => {
    writeHomepagePreviewDocument(doc);
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage({ type: HOMEPAGE_PREVIEW_MESSAGE, document: doc }, window.location.origin);
  };

  const scrollToSection = (sectionType: HomepageSectionType) => {
    clearScrollTimers();
    for (const delay of SCROLL_RETRY_MS) {
      const id = window.setTimeout(() => {
        if (scrollIframeToSection(iframeRef.current, sectionType)) {
          // Keep a couple late retries in case images/layout shift.
          if (delay >= 400) clearScrollTimers();
        }
      }, delay);
      scrollTimersRef.current.push(id);
    }
  };

  // Seed storage before the iframe's first paint / hydrate.
  useLayoutEffect(() => {
    writeHomepagePreviewDocument(deferred);
  }, [deferred]);

  // Prefetch the heavy homepage chunk + frame route while the editor loads.
  useEffect(() => {
    void import("@/components/HomeScreen/HomePage");
    const link = globalThis.document.createElement("link");
    link.rel = "prefetch";
    link.href = FRAME_SRC;
    link.as = "document";
    globalThis.document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string } | null;
      if (data?.type !== HOMEPAGE_PREVIEW_READY_MESSAGE) return;
      readyRef.current = true;
      postDocument(deferredRef.current);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!readyRef.current) return;
    window.clearTimeout(postTimerRef.current);
    postTimerRef.current = window.setTimeout(() => {
      postDocument(deferred);
    }, 120);
    return () => window.clearTimeout(postTimerRef.current);
  }, [deferred]);

  useEffect(() => {
    if (!focusRequest) return;
    scrollToSection(focusRequest.type);
    return () => clearScrollTimers();
  }, [focusRequest]);

  useEffect(() => () => clearScrollTimers(), []);

  return (
    <iframe
      ref={iframeRef}
      src={FRAME_SRC}
      title="Homepage live preview"
      className="homepagePreviewIframe"
      onLoad={() => {
        readyRef.current = true;
        postDocument(deferredRef.current);
        if (focusRequest) {
          scrollToSection(focusRequest.type);
        }
      }}
    />
  );
}

export const HomepageLivePreview = forwardRef<PreviewViewportHandle, HomepageLivePreviewProps>(
  function HomepageLivePreview(
    { document, focusRequest, fullscreenActions, className, defaultFullscreen },
    ref,
  ) {
    return (
      <PreviewViewport
        ref={ref}
        className={className ?? blockStyles.previewPanelDocked}
        bodyClassName={`${blockStyles.previewBodyFlush} homepagePreviewBody`}
        fullscreenActions={fullscreenActions}
        defaultFullscreen={defaultFullscreen}
        dockedViewport="mobile"
        dockedWidth={390}
        viewportWidthOverrides={{ mobile: 390 }}
        title="Live preview"
      >
        <HomepagePreviewFrame document={document} focusRequest={focusRequest} />
      </PreviewViewport>
    );
  },
);
