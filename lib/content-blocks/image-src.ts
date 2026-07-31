/**
 * Normalize CMS / editor image URLs for next/image.
 * Unwraps `/_next/image?url=…` optimizer URLs to the underlying asset URL.
 * Absolute http(s) URLs are left intact (allowed via images.remotePatterns).
 */
export function normalizeCmsImageSrc(src: string): string {
  const raw = src.trim();
  if (!raw) return '';

  if (raw.startsWith('blob:') || raw.startsWith('data:')) {
    return raw;
  }

  try {
    const absolute =
      raw.startsWith('http://') ||
      raw.startsWith('https://') ||
      raw.startsWith('//')
        ? new URL(raw.startsWith('//') ? `https:${raw}` : raw)
        : raw.startsWith('/_next/image')
          ? new URL(raw, 'http://localhost')
          : null;

    if (absolute?.pathname.includes('/_next/image')) {
      const inner = absolute.searchParams.get('url');
      if (inner) {
        return normalizeCmsImageSrc(decodeURIComponent(inner));
      }
    }
  } catch {
    // keep original
  }

  return raw;
}

export function resolveImageSrc(src?: string): string | null {
  const value = src?.trim();
  if (!value) return null;
  const normalized = normalizeCmsImageSrc(value);
  return normalized || null;
}
