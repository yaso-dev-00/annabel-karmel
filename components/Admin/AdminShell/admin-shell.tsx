"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminSidebarLogo } from "./admin-sidebar-logo";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
};

const NAV_SECTIONS: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { href: "/admin", label: "Dashboard", exact: true },
      { href: "#", label: "Recipes", disabled: true },
    ],
  },
  {
    title: "Website content",
    items: [
      { href: "#", label: "Homepage Editor", disabled: true },
      { href: "/admin/articles", label: "Articles" },
      { href: "/admin/experts", label: "Experts" },
      { href: "/admin/advice", label: "Advice" },
      { href: "#", label: "Products", disabled: true },
      { href: "/admin/competitions", label: "Competitions" },
      { href: "/admin/partners", label: "Our Partners" },
      { href: "#", label: "Content Pages", disabled: true },
    ],
  },
];

type AdminShellProps = {
  title?: string;
  breadcrumb?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export function AdminShell({ title, breadcrumb, children, actions }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Mutations go through client fetch → API routes; revalidatePath alone does not
    // clear the App Router client cache. Refresh on each admin route so listing
    // pages (and dashboard) always pull the latest RSC payload.
    router.refresh();
  }, [pathname, router]);

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
                    const active = item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href) && item.href !== "#";

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
