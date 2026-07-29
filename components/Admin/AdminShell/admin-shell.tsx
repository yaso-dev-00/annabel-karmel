"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminSidebarLogo } from "./admin-sidebar-logo";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
  children?: NavItem[];
};

function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [item, ...(item.children ? flattenNavItems(item.children) : [])]);
}

const NAV_SECTIONS: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { href: "/admin", label: "Dashboard", exact: true },
      {
        href: "/admin/recipes",
        label: "Recipes",
        children: [{ href: "/admin/recipes/categories", label: "Categories" }],
      },
    ],
  },
  {
    title: "Website content",
    items: [
      { href: "/admin/homepage", label: "Homepage Editor" },
      { href: "/admin/articles", label: "Articles" },
      { href: "/admin/experts", label: "Experts" },
      { href: "/admin/advice", label: "Advice" },
      { href: "/admin/cookbooks", label: "Cookbooks" },
      { href: "/admin/products", label: "Products" },
      { href: "/admin/grow-products", label: "Grow Products" },
      { href: "/admin/competitions", label: "Competitions" },
      { href: "/admin/partners", label: "Our Partners" },
      { href: "/admin/ads", label: "Advertisements" },
      { href: "#", label: "Content Pages", disabled: true },
    ],
  },
];

function isNavItemActive(item: NavItem, pathname: string, allItems: NavItem[]): boolean {
  if (item.disabled || item.href === "#") return false;
  if (item.exact) return pathname === item.href;

  const matches = allItems.filter(
    (candidate) =>
      !candidate.disabled &&
      candidate.href !== "#" &&
      !candidate.exact &&
      pathname.startsWith(candidate.href),
  );
  if (matches.length === 0) return false;
  const best = matches.reduce((a, b) => (b.href.length > a.href.length ? b : a));
  return best.href === item.href;
}

function NavGroup({
  item,
  pathname,
  allNavItems,
}: {
  item: NavItem;
  pathname: string;
  allNavItems: NavItem[];
}) {
  const childActive = item.children?.some((child) => isNavItemActive(child, pathname, allNavItems));
  const active = isNavItemActive(item, pathname, allNavItems);
  const [expanded, setExpanded] = useState(Boolean(childActive));

  useEffect(() => {
    if (childActive) setExpanded(true);
  }, [childActive]);

  const open = expanded;
  const parentActive = active;

  return (
    <div className="navGroup">
      <div className={`navGroupHeader${parentActive ? " navGroupHeaderActive" : ""}`}>
        <button
          type="button"
          className={`navGroupToggle${open ? " navGroupToggleOpen" : ""}`}
          aria-expanded={open}
          aria-label={`${open ? "Collapse" : "Expand"} ${item.label} menu`}
          onClick={() => setExpanded((current) => !current)}
        >
          <span className="navGroupChevron" aria-hidden />
        </button>
        <Link
          href={item.disabled ? "#" : item.href}
          prefetch={false}
          className={`navLink navLinkGroup${parentActive ? " navLinkActive" : ""}${item.disabled ? " navLinkDisabled" : ""}`}
          aria-disabled={item.disabled}
          aria-current={parentActive ? "page" : undefined}
        >
          {item.label}
        </Link>
      </div>
      {open ? (
        <div className="navSubLinks">
          {item.children?.map((child) => {
            const subActive = isNavItemActive(child, pathname, allNavItems);

            return (
              <Link
                key={child.label}
                href={child.disabled ? "#" : child.href}
                prefetch={false}
                className={`navLink navLinkSub ${subActive ? "navLinkActive" : ""} ${child.disabled ? "navLinkDisabled" : ""}`}
                aria-disabled={child.disabled}
                aria-current={subActive ? "page" : undefined}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

type AdminShellProps = {
  title?: string;
  breadcrumb?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function AdminShell({ title, breadcrumb, children, actions }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const allNavItems = NAV_SECTIONS.flatMap((section) => flattenNavItems(section.items));

  useEffect(() => {
    // Mutations go through client fetch → API routes; revalidatePath alone does not
    // clear the App Router client cache. Refresh on each admin route so listing
    // pages (and dashboard) always pull the latest RSC payload.
    router.refresh();
  }, [pathname, router]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) router.refresh();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [router]);

  return (
    <div className="adminRoot">
      <div className="adminLayout">
        <aside className="sidebar">
          <AdminSidebarLogo />
          <nav className="sidebarNav" aria-label="Admin navigation">
            {NAV_SECTIONS.map((section, index) => (
              <div
                key={section.title ?? `section-${index}`}
                className={`sidebarSection${section.title ? " sidebarSectionLabeled" : ""}`}
              >
                {section.title ? <p className="sidebarSectionTitle">{section.title}</p> : null}
                <div className="sidebarSectionLinks">
                  {section.items.map((item) => {
                    if (item.children?.length) {
                      return (
                        <NavGroup
                          key={item.label}
                          item={item}
                          pathname={pathname}
                          allNavItems={allNavItems}
                        />
                      );
                    }

                    const active = isNavItemActive(item, pathname, allNavItems);

                    return (
                      <Link
                        key={item.label}
                        href={item.disabled ? "#" : item.href}
                        prefetch={false}
                        className={`navLink ${active ? "navLinkActive" : ""} ${item.disabled ? "navLinkDisabled" : ""}`}
                        aria-disabled={item.disabled}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>
        <div className="mainArea">
          <header className="topBar">
            <div>
              {breadcrumb ? (
                <p className="breadcrumb">
                  Admin / <strong>{breadcrumb}</strong>
                </p>
              ) : null}
              {title ? <h1 className="cardTitle">{title}</h1> : null}
            </div>
            {actions ? <div>{actions}</div> : null}
          </header>
          <div className="pageContent">{children}</div>
        </div>
      </div>
    </div>
  );
}
