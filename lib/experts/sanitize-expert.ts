import type { Expert, ExpertSocialLink, ExpertTopic, ExpertsStore } from "@/lib/experts/types";
import { normalizeExpert } from "@/lib/admin/expert-status";

function trimString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function sanitizeParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function sanitizeTopic(raw: unknown): ExpertTopic | null {
  if (!raw || typeof raw !== "object") return null;
  const topic = raw as Record<string, unknown>;
  const title = trimString(topic.title);
  if (!title) return null;
  const href = trimString(topic.href);
  const image = trimString(topic.image);
  const id = trimString(topic.id) || crypto.randomUUID();
  return {
    id,
    title,
    ...(href ? { href } : {}),
    ...(image ? { image } : {}),
  };
}

function sanitizeSocialLink(raw: unknown): ExpertSocialLink | null {
  if (!raw || typeof raw !== "object") return null;
  const link = raw as Record<string, unknown>;
  const label = trimString(link.label);
  const href = trimString(link.href);
  if (!label || !href) return null;
  return { label, href };
}

export function sanitizeExpert(raw: unknown): Expert {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid expert payload");
  }

  const input = raw as Record<string, unknown>;
  const slug = trimString(input.slug);
  const name = trimString(input.name);
  if (!slug) throw new Error("Expert slug is required");
  if (!name) throw new Error("Expert name is required");

  const topics = Array.isArray(input.articleTopics)
    ? input.articleTopics.flatMap((topic) => {
        const sanitized = sanitizeTopic(topic);
        return sanitized ? [sanitized] : [];
      })
    : [];

  const sortOrder =
    typeof input.sort_order === "number" && Number.isFinite(input.sort_order)
      ? Math.max(0, Math.floor(input.sort_order))
      : 0;

  const expert: Expert = {
    id: trimString(input.id) || crypto.randomUUID(),
    slug,
    name,
    role: trimString(input.role),
    image: trimString(input.image),
    sourceUrl: trimString(input.sourceUrl),
    introParagraphs: sanitizeParagraphs(input.introParagraphs),
    bioParagraphs: sanitizeParagraphs(input.bioParagraphs),
    socialLink: sanitizeSocialLink(input.socialLink),
    articleTopics: topics,
    sort_order: sortOrder,
    status: input.status as Expert["status"],
    scheduled_at: (input.scheduled_at as string | null | undefined) ?? null,
    published_at: (input.published_at as string | null | undefined) ?? null,
    updated_at: trimString(input.updated_at) || new Date().toISOString(),
    created_at: trimString(input.created_at) || new Date().toISOString(),
  };

  return normalizeExpert(expert);
}

export function sanitizeExpertsStore(raw: unknown): ExpertsStore {
  if (!raw || typeof raw !== "object") {
    return { intro: "", experts: [] };
  }
  const store = raw as Record<string, unknown>;
  const experts = Array.isArray(store.experts)
    ? store.experts.flatMap((expert) => {
        try {
          return [sanitizeExpert(expert)];
        } catch {
          return [];
        }
      })
    : [];

  return {
    intro: trimString(store.intro),
    experts,
  };
}
