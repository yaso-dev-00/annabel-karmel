'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

type ProgressPhase = 'idle' | 'loading' | 'completing';

function SiteNavProgressInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<ProgressPhase>('idle');
  const [animationKey, setAnimationKey] = useState(0);
  const isNavigatingRef = useRef(false);
  const hideTimerRef = useRef<number | undefined>(undefined);
  const routeKeyRef = useRef('');
  const isPreviewFrame = pathname === '/homepage-preview-frame';

  const start = useCallback(() => {
    window.clearTimeout(hideTimerRef.current);
    isNavigatingRef.current = true;
    setAnimationKey((key) => key + 1);
    setPhase('loading');
  }, []);

  useEffect(() => {
    if (isPreviewFrame) return;

    const routeKey = `${pathname}?${searchParams.toString()}`;

    if (routeKeyRef.current === '') {
      routeKeyRef.current = routeKey;
      return;
    }

    if (routeKey === routeKeyRef.current) {
      return;
    }

    routeKeyRef.current = routeKey;

    if (!isNavigatingRef.current) {
      return;
    }

    isNavigatingRef.current = false;
    setPhase('completing');
    hideTimerRef.current = window.setTimeout(() => setPhase('idle'), 350);
  }, [pathname, searchParams, isPreviewFrame]);

  useEffect(() => {
    if (isPreviewFrame) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      if (anchor.hasAttribute('download') || anchor.target === '_blank') {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) {
        return;
      }

      const currentRoute = `${window.location.pathname}${window.location.search}`;
      const targetRoute = `${url.pathname}${url.search}`;
      if (targetRoute === currentRoute) {
        return;
      }

      start();
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [start, isPreviewFrame]);

  useEffect(() => {
    return () => window.clearTimeout(hideTimerRef.current);
  }, []);

  if (isPreviewFrame || phase === 'idle') {
    return null;
  }

  return (
    <div
      className={`site-nav-progress site-nav-progress--${phase}`}
      aria-hidden="true"
      role="presentation"
    >
      <div key={animationKey} className="site-nav-progress-bar" />
    </div>
  );
}

export function SiteNavProgress() {
  return (
    <Suspense fallback={null}>
      <SiteNavProgressInner />
    </Suspense>
  );
}
