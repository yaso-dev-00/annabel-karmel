import { resolveAdviceArticleStatus } from "@/lib/admin/advice-article-status";
import { resolveArticleStatus } from "@/lib/admin/article-status";
import { resolveCompetitionStatus } from "@/lib/admin/competition-status";
import { resolveExpertStatus } from "@/lib/admin/expert-status";
import { resolvePartnerPageStatus } from "@/lib/admin/partner-page-status";
import type {
  AdviceArticle,
  AdviceArticleStatus,
  Article,
  Competition,
  PartnerPage,
} from "@/lib/content-blocks/types";
import type { Expert } from "@/lib/experts/types";

export type DashboardContentKind = "advice" | "article" | "competition" | "partner" | "expert";

export type DashboardStatus = AdviceArticleStatus;

export type DashboardRecentItem = {
  id: string;
  title: string;
  kind: DashboardContentKind;
  kindLabel: string;
  categoryLabel: string;
  status: DashboardStatus;
  updatedAt: string;
  href: string;
  initials: string;
  accentIndex: number;
};

export type DashboardSummary = {
  drafts: number;
  scheduled: number;
  publishedThisWeek: number;
  draftsThisWeek: number;
  publishedBreakdown: {
    advice: number;
    article: number;
    competition: number;
    partner: number;
    expert: number;
  };
  nextScheduled: { title: string; at: string; href: string } | null;
  recent: DashboardRecentItem[];
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const KIND_LABEL: Record<DashboardContentKind, string> = {
  advice: "Advice",
  article: "Article",
  competition: "Competition",
  partner: "Partner",
  expert: "Expert",
};

function initialsFromTitle(title: string): string {
  const parts = title
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 0) return "?";
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

function accentIndexFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash + id.charCodeAt(i) * (i + 1)) % 6;
  return hash;
}

function isWithinLastWeek(iso: string | null | undefined, now: number): boolean {
  if (!iso) return false;
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return false;
  return now - time <= WEEK_MS && time <= now;
}

function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type NormalizedItem = {
  id: string;
  title: string;
  kind: DashboardContentKind;
  categoryLabel: string;
  status: DashboardStatus;
  updatedAt: string;
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  href: string;
};

function normalizeAdvice(article: AdviceArticle): NormalizedItem {
  return {
    id: article.id,
    title: article.title,
    kind: "advice",
    categoryLabel: humanizeSlug(article.category_slug),
    status: resolveAdviceArticleStatus(article),
    updatedAt: article.updated_at,
    publishedAt: article.published_at,
    scheduledAt: article.scheduled_at ?? null,
    createdAt: article.created_at,
    href: `/admin/advice/${article.id}/edit`,
  };
}

function normalizeArticle(article: Article): NormalizedItem {
  return {
    id: article.id,
    title: article.title,
    kind: "article",
    categoryLabel: humanizeSlug(article.category_slug),
    status: resolveArticleStatus(article),
    updatedAt: article.updated_at,
    publishedAt: article.published_at,
    scheduledAt: article.scheduled_at ?? null,
    createdAt: article.created_at,
    href: `/admin/articles/${article.id}/edit`,
  };
}

function normalizeCompetition(competition: Competition): NormalizedItem {
  return {
    id: competition.id,
    title: competition.title,
    kind: "competition",
    categoryLabel: "Campaign",
    status: resolveCompetitionStatus(competition),
    updatedAt: competition.updated_at,
    publishedAt: competition.published_at,
    scheduledAt: competition.scheduled_at ?? null,
    createdAt: competition.created_at,
    href: `/admin/competitions/${competition.id}/edit`,
  };
}

function normalizePartner(partner: PartnerPage): NormalizedItem {
  return {
    id: partner.id,
    title: partner.title,
    kind: "partner",
    categoryLabel: "Partner page",
    status: resolvePartnerPageStatus(partner),
    updatedAt: partner.updated_at,
    publishedAt: partner.published_at,
    scheduledAt: partner.scheduled_at ?? null,
    createdAt: partner.created_at,
    href: `/admin/partners/${partner.id}/edit`,
  };
}

function normalizeExpert(expert: Expert): NormalizedItem {
  return {
    id: expert.id,
    title: expert.name,
    kind: "expert",
    categoryLabel: expert.role || "Expert",
    status: resolveExpertStatus(expert),
    updatedAt: expert.updated_at,
    publishedAt: expert.published_at,
    scheduledAt: expert.scheduled_at ?? null,
    createdAt: expert.created_at,
    href: `/admin/experts/${expert.id}/edit`,
  };
}

export function buildDashboardSummary(input: {
  advice: AdviceArticle[];
  articles: Article[];
  competitions: Competition[];
  partners: PartnerPage[];
  experts?: Expert[];
  now?: number;
}): DashboardSummary {
  const now = input.now ?? Date.now();
  const items: NormalizedItem[] = [
    ...input.advice.map(normalizeAdvice),
    ...input.articles.map(normalizeArticle),
    ...input.competitions.map(normalizeCompetition),
    ...input.partners.map(normalizePartner),
    ...(input.experts ?? []).map(normalizeExpert),
  ];

  let drafts = 0;
  let scheduled = 0;
  let publishedThisWeek = 0;
  let draftsThisWeek = 0;
  const publishedBreakdown = { advice: 0, article: 0, competition: 0, partner: 0, expert: 0 };

  let nextScheduled: DashboardSummary["nextScheduled"] = null;

  for (const item of items) {
    if (item.status === "draft") {
      drafts += 1;
      if (isWithinLastWeek(item.createdAt, now) || isWithinLastWeek(item.updatedAt, now)) {
        draftsThisWeek += 1;
      }
    }
    if (item.status === "scheduled") {
      scheduled += 1;
      if (item.scheduledAt) {
        const at = new Date(item.scheduledAt).getTime();
        if (!Number.isNaN(at) && at >= now) {
          if (!nextScheduled || at < new Date(nextScheduled.at).getTime()) {
            nextScheduled = { title: item.title, at: item.scheduledAt, href: item.href };
          }
        }
      }
    }
    if (item.status === "published" && isWithinLastWeek(item.publishedAt ?? item.updatedAt, now)) {
      publishedThisWeek += 1;
      publishedBreakdown[item.kind] += 1;
    }
  }

  const recent = items
    .slice()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      title: item.title,
      kind: item.kind,
      kindLabel: KIND_LABEL[item.kind],
      categoryLabel: item.categoryLabel,
      status: item.status,
      updatedAt: item.updatedAt,
      href: item.href,
      initials: initialsFromTitle(item.title),
      accentIndex: accentIndexFromId(item.id),
    }));

  return {
    drafts,
    scheduled,
    publishedThisWeek,
    draftsThisWeek,
    publishedBreakdown,
    nextScheduled,
    recent,
  };
}

export function formatDashboardDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDashboardDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getDashboardStatusBadgeClass(status: DashboardStatus): string {
  switch (status) {
    case "published":
      return "badgePublished";
    case "scheduled":
      return "badgeScheduled";
    case "private":
      return "badgePrivate";
    case "disabled":
      return "badgeDisabled";
    default:
      return "badgeDraft";
  }
}

export function getDashboardStatusLabel(status: DashboardStatus): string {
  switch (status) {
    case "published":
      return "Published";
    case "scheduled":
      return "Scheduled";
    case "private":
      return "Private";
    case "disabled":
      return "Disabled";
    default:
      return "Draft";
  }
}
