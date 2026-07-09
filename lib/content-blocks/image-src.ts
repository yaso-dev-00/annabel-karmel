export function resolveImageSrc(src?: string): string | null {
  const value = src?.trim();
  return value ? value : null;
}
