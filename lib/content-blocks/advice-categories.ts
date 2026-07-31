export const ADVICE_CATEGORY_OPTIONS = [
  { value: 'breastfeeding-advice', label: 'Breastfeeding' },
  { value: 'bottle-feeding-tips', label: 'Bottle Feeding' },
  { value: 'baby-sleep-advice', label: 'Sleep' },
  { value: 'pregnancy-tips', label: 'Pregnancy' },
  { value: 'child-health-and-development', label: 'Health & Development' },
] as const;

export type AdviceCategorySlug =
  (typeof ADVICE_CATEGORY_OPTIONS)[number]['value'];

export function getAdviceCategoryLabel(categorySlug: string): string {
  return (
    ADVICE_CATEGORY_OPTIONS.find((option) => option.value === categorySlug)
      ?.label ?? categorySlug
  );
}
