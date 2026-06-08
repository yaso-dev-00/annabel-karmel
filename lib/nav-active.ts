export const ALLERGIES_LISTING_PATH = "/category/nutrition/nutrition-allergies";

/** Article routes listed under Nutrition → Allergies (listing + nav active state). */
const ALLERGY_ARTICLE_PATHS = [
  "/food-allergies-your-common-questions-concerns-answered",
  "/food-allergies-put-a-label-on-it",
  "/dairy-free-diet-cows-milk-protein-allergy",
  "/cows-milk-protein-allergy",
  "/are-allergies-genetic",
  "/managing-my-childs-food-allergy",
  "/spotting-food-allergy-symptoms",
  "/weaning-and-baby-allergies",
  "/cows-milk-allergy",
  "/food-allergy-vs-food-intolerance",
  "/travelling-with-children-with-food-allergies",
  "/breastfeeding-and-food-allergies",
  "/is-eczema-linked-to-food-allergies",
  "/allergies-finding-support",
  "/the-most-common-food-allergens-in-the-uk",
  "/egg-allergy",
  "/most-common-food-allergies-in-babies",
  "/allergies-with-professor-adam-fox",
  "/managing-your-babys-lactose-intolerance",
  "/introducing-allergenic-foods",
];

export function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] ?? path;
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

export function isAllergiesSectionActive(pathname: string): boolean {
  const current = normalizePath(pathname);
  if (current === ALLERGIES_LISTING_PATH) return true;
  return ALLERGY_ARTICLE_PATHS.some(
    (path) => current === path || current.startsWith(`${path}/`),
  );
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === ALLERGIES_LISTING_PATH && isAllergiesSectionActive(pathname)) return true;
  if (current === target) return true;
  if (target !== "/" && current.startsWith(`${target}/`)) return true;
  return false;
}

function isNavTreeActive(
  pathname: string,
  links: { href: string; children?: { href: string }[] }[],
): boolean {
  return links.some((link) => {
    if (isNavLinkActive(pathname, link.href)) return true;
    return link.children?.some((child) => isNavLinkActive(pathname, child.href)) ?? false;
  });
}

export function isMegaMenuActive(
  pathname: string,
  menu: { href: string; groups: { links: { href: string; children?: { href: string }[] }[] }[] },
): boolean {
  if (isNavLinkActive(pathname, menu.href)) return true;
  return menu.groups.some((group) => isNavTreeActive(pathname, group.links));
}
