export function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] ?? path;
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

export function isNavLinkActive(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (current === target) return true;
  if (target !== "/" && current.startsWith(`${target}/`)) return true;
  return false;
}

export function isMegaMenuActive(
  pathname: string,
  menu: { href: string; groups: { links: { href: string }[] }[] },
): boolean {
  if (isNavLinkActive(pathname, menu.href)) return true;
  return menu.groups.some((group) =>
    group.links.some((link) => isNavLinkActive(pathname, link.href)),
  );
}
