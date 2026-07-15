export const ARTICLE_CATEGORY_OPTIONS = [
  { value: "baby-nutrition", label: "Baby Nutrition" },
  { value: "toddler-child", label: "Toddler & Child" },
  { value: "allergies", label: "Allergies" },
] as const;

export type ArticleCategorySlug = (typeof ARTICLE_CATEGORY_OPTIONS)[number]["value"];

export function getArticleCategoryLabel(categorySlug: string): string {
  return ARTICLE_CATEGORY_OPTIONS.find((option) => option.value === categorySlug)?.label ?? categorySlug;
}
