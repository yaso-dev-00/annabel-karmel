export type ExpertStatus = "draft" | "published" | "scheduled" | "private" | "disabled";

export type ExpertTopic = {
  id?: string;
  title: string;
  href?: string;
  image?: string;
};

export type ExpertSocialLink = {
  label: string;
  href: string;
};

export type Expert = {
  id: string;
  slug: string;
  name: string;
  role: string;
  image: string;
  sourceUrl: string;
  introParagraphs: string[];
  bioParagraphs: string[];
  socialLink?: ExpertSocialLink | null;
  articleTopics: ExpertTopic[];
  sort_order: number;
  status?: ExpertStatus;
  scheduled_at?: string | null;
  published_at: string | null;
  updated_at: string;
  created_at: string;
};

export type ExpertsStore = {
  intro: string;
  experts: Expert[];
};

/** Status-shaped slice used by advice-article status helpers. */
export type ExpertStatusFields = {
  status?: ExpertStatus;
  scheduled_at?: string | null;
  published_at: string | null;
  updated_at: string;
};
