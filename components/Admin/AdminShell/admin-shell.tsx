'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  clearAdminSession,
  getAdminSession,
  getAdminSessionServerSnapshot,
  subscribeAdminSession,
} from '@/lib/admin/auth-session';
import { AdminSidebarLogo } from './admin-sidebar-logo';

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
  children?: NavItem[];
};

function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.flatMap((item) => [
    item,
    ...(item.children ? flattenNavItems(item.children) : []),
  ]);
}

const NAV_SECTIONS: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { href: '/admin', label: 'Dashboard', exact: true },
      {
        href: '/admin/recipes',
        label: 'Recipes',
        children: [{ href: '/admin/recipes/categories', label: 'Categories' }],
      },
      {
        href: '/admin/users',
        label: 'Users',
        children: [{ href: '/admin/users', label: 'All Users', exact: true }],
      },
    ],
  },
  {
    title: 'Website content',
    items: [
      { href: '/admin/homepage', label: 'Homepage Editor' },
      { href: '/admin/articles', label: 'Articles' },
      { href: '/admin/experts', label: 'Experts' },
      { href: '/admin/advice', label: 'Advice' },
      { href: '/admin/cookbooks', label: 'Cookbooks' },
      { href: '/admin/products', label: 'Products' },
      { href: '/admin/grow-products', label: 'Grow Products' },
      { href: '/admin/competitions', label: 'Competitions' },
      { href: '/admin/partners', label: 'Our Partners' },
      { href: '/admin/ads', label: 'Advertisements' },
      { href: '#', label: 'Content Pages', disabled: true },
    ],
  },
];

/** Only one of these collapsible groups stays open at a time. */
const ACCORDION_GROUP_HREFS = new Set(['/admin/recipes', '/admin/users']);

function isNavItemActive(
  item: NavItem,
  pathname: string,
  allItems: NavItem[],
): boolean {
  if (item.disabled || item.href === '#') return false;
  if (item.exact) {
    // Exact + trailing paths (e.g. All Users → /admin/users/[id])
    if (pathname === item.href) return true;
    if (item.href !== '/admin' && pathname.startsWith(`${item.href}/`))
      return true;
    return false;
  }

  const matches = allItems.filter(
    (candidate) =>
      !candidate.disabled &&
      candidate.href !== '#' &&
      !candidate.exact &&
      pathname.startsWith(candidate.href),
  );
  if (matches.length === 0) return false;
  const best = matches.reduce((a, b) =>
    b.href.length > a.href.length ? b : a,
  );
  return best.href === item.href;
}

function groupIsActive(
  item: NavItem,
  pathname: string,
  allNavItems: NavItem[],
): boolean {
  if (isNavItemActive(item, pathname, allNavItems)) return true;
  return Boolean(
    item.children?.some((child) =>
      isNavItemActive(child, pathname, allNavItems),
    ),
  );
}

function NavGroup({
  item,
  pathname,
  allNavItems,
  expanded,
  onToggle,
}: {
  item: NavItem;
  pathname: string;
  allNavItems: NavItem[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const active = groupIsActive(item, pathname, allNavItems);

  return (
    <div className="navGroup">
      <div className={`navGroupHeader${active ? ' navGroupHeaderActive' : ''}`}>
        <button
          type="button"
          className={`navGroupToggle${expanded ? ' navGroupToggleOpen' : ''}`}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label} menu`}
          onClick={onToggle}
        >
          <span className="navGroupChevron" aria-hidden />
        </button>
        <Link
          href={item.disabled ? '#' : item.href}
          prefetch={false}
          className={`navLink navLinkGroup${active ? ' navLinkActive' : ''}${item.disabled ? ' navLinkDisabled' : ''}`}
          aria-disabled={item.disabled}
          aria-current={active ? 'page' : undefined}
          onClick={() => {
            if (!expanded) onToggle();
          }}
        >
          {item.label}
        </Link>
      </div>
      {expanded ? (
        <div className="navSubLinks">
          {item.children?.map((child) => {
            const subActive = isNavItemActive(child, pathname, allNavItems);

            return (
              <Link
                key={child.label}
                href={child.disabled ? '#' : child.href}
                prefetch={false}
                className={`navLink navLinkSub ${subActive ? 'navLinkActive' : ''} ${child.disabled ? 'navLinkDisabled' : ''}`}
                aria-disabled={child.disabled}
                aria-current={subActive ? 'page' : undefined}
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

export function AdminShell({
  title,
  breadcrumb,
  children,
  actions,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const allNavItems = NAV_SECTIONS.flatMap((section) =>
    flattenNavItems(section.items),
  );
  const session = useSyncExternalStore(
    subscribeAdminSession,
    getAdminSession,
    getAdminSessionServerSnapshot,
  );
  const sessionEmail = session?.email ?? null;

  const accordionItems = NAV_SECTIONS.flatMap((section) =>
    section.items.filter(
      (item) => item.children?.length && ACCORDION_GROUP_HREFS.has(item.href),
    ),
  );

  const activeAccordionHref =
    accordionItems.find((item) => groupIsActive(item, pathname, allNavItems))
      ?.href ?? null;

  const [openAccordionHref, setOpenAccordionHref] = useState<string | null>(
    null,
  );
  const expandedAccordionHref = openAccordionHref ?? activeAccordionHref;

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
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [router]);

  const handleLogout = () => {
    clearAdminSession();
    router.replace('/admin/login');
  };

  const toggleAccordion = (href: string) => {
    setOpenAccordionHref((current) => (current === href ? null : href));
  };

  return (
    <div className="adminRoot">
      <div className="adminLayout">
        <aside className="sidebar">
          <AdminSidebarLogo />
          <nav className="sidebarNav" aria-label="Admin navigation">
            {NAV_SECTIONS.map((section, index) => (
              <div
                key={section.title ?? `section-${index}`}
                className={`sidebarSection${section.title ? ' sidebarSectionLabeled' : ''}`}
              >
                {section.title ? (
                  <p className="sidebarSectionTitle">{section.title}</p>
                ) : null}
                <div className="sidebarSectionLinks">
                  {section.items.map((item) => {
                    if (item.children?.length) {
                      const isAccordion = ACCORDION_GROUP_HREFS.has(item.href);
                      const expanded = isAccordion
                        ? expandedAccordionHref === item.href
                        : groupIsActive(item, pathname, allNavItems);

                      return (
                        <NavGroup
                          key={item.label}
                          item={item}
                          pathname={pathname}
                          allNavItems={allNavItems}
                          expanded={expanded}
                          onToggle={() => {
                            if (isAccordion) {
                              toggleAccordion(item.href);
                            }
                          }}
                        />
                      );
                    }

                    const active = isNavItemActive(item, pathname, allNavItems);

                    return (
                      <Link
                        key={item.label}
                        href={item.disabled ? '#' : item.href}
                        prefetch={false}
                        className={`navLink ${active ? 'navLinkActive' : ''} ${item.disabled ? 'navLinkDisabled' : ''}`}
                        aria-disabled={item.disabled}
                        aria-current={active ? 'page' : undefined}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {actions}
              {sessionEmail ? (
                <span
                  style={{ fontSize: 12, color: 'var(--admin-muted, #666)' }}
                >
                  {sessionEmail}
                </span>
              ) : null}
              <button
                type="button"
                className="btn btnSecondary"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </header>
          <div className="pageContent">{children}</div>
        </div>
      </div>
    </div>
  );
}
