"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSidebarLogo } from "./admin-sidebar-logo";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
};

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "Website content",
    items: [
      { href: "/admin", label: "Dashboard", exact: true },
      { href: "#", label: "Homepage Editor", disabled: true },
      { href: "#", label: "Recipes", disabled: true },
      { href: "#", label: "Articles", disabled: true },
      { href: "#", label: "Experts", disabled: true },
      { href: "/admin/advice", label: "Advice" },
      { href: "#", label: "Products", disabled: true },
      { href: "#", label: "Competitions", disabled: true },
      { href: "#", label: "Our Partners", disabled: true },
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

  return (
    <div className="adminRoot">
      <div className="adminLayout">
        <aside className="sidebar">
          <AdminSidebarLogo />
          <nav className="sidebarNav" aria-label="Admin navigation">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="sidebarSection">
                <p className="sidebarSectionTitle">{section.title}</p>
                <div className="sidebarSectionLinks">
                  {section.items.map((item) => {
                    const active = item.exact
                      ? pathname === item.href
                      : pathname.startsWith(item.href) && item.href !== "#";

                    return (
                      <Link
                        key={item.label}
                        href={item.disabled ? "#" : item.href}
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
