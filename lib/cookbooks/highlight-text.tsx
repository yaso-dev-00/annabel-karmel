import type { ReactNode } from "react";

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Unique highlights, longest first (so longer phrases win overlaps). */
export function normalizeHighlights(highlights: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const raw of highlights) {
    const value = raw.trim();
    if (!value) continue;
    const key = value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(value);
  }
  return unique.sort((a, b) => b.length - a.length);
}

export function highlightExistsInText(text: string, phrase: string): boolean {
  if (!text || !phrase) return false;
  return text.toLowerCase().includes(phrase.toLowerCase());
}

/**
 * Split text into plain / bold segments. Matching is case-insensitive;
 * the original source casing is kept in the output.
 */
export function splitHighlightedText(
  text: string,
  highlights: string[],
): { text: string; bold: boolean }[] {
  const phrases = normalizeHighlights(highlights);
  if (!text || phrases.length === 0) {
    return text ? [{ text, bold: false }] : [];
  }

  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(pattern);
  const lowerPhrases = new Set(phrases.map((p) => p.toLowerCase()));

  return parts
    .filter((part) => part.length > 0)
    .map((part) => ({
      text: part,
      bold: lowerPhrases.has(part.toLowerCase()),
    }));
}

export function renderHighlightedText(text: string, highlights: string[]): ReactNode {
  const segments = splitHighlightedText(text, highlights);
  if (segments.length === 0) return text;
  if (segments.length === 1 && !segments[0].bold) return segments[0].text;

  return segments.map((segment, index) =>
    segment.bold ? (
      <strong key={`${segment.text}-${index}`}>{segment.text}</strong>
    ) : (
      <span key={`${segment.text}-${index}`}>{segment.text}</span>
    ),
  );
}

/** Prefer storing the casing as it appears in the source copy. */
export function resolveHighlightPhrase(sourceText: string, selected: string): string | null {
  const trimmed = selected.trim();
  if (!trimmed) return null;
  const idx = sourceText.toLowerCase().indexOf(trimmed.toLowerCase());
  if (idx === -1) return trimmed;
  return sourceText.slice(idx, idx + trimmed.length);
}

export function addHighlightPhrase(highlights: string[], phrase: string): string[] {
  const next = phrase.trim();
  if (!next) return highlights;
  if (highlights.some((h) => h.toLowerCase() === next.toLowerCase())) {
    return highlights;
  }
  return [...highlights, next];
}
