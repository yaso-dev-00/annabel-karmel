'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { megaMenus, type MegaMenu, type NavLink } from '@/data/site-content';
import { isNavLinkActive } from '@/lib/nav-active';

const NAV_EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type SiteNavOverlayProps = {
  activeMenuLabel: string | null;
  activeNestedKey: string | null;
  navId: string;
  panelLeft: number;
  onNestedChange: (key: string | null) => void;
  onClose: () => void;
  onOverlayEnter: () => void;
  onOverlayLeave: () => void;
};

function nestedKey(menuLabel: string, linkLabel: string) {
  return `${menuLabel}::${linkLabel}`;
}

function OverlayLink({
  href,
  label,
  className,
  onNavigate,
  onMouseEnter,
  onFocus,
}: {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
  onMouseEnter?: () => void;
  onFocus?: () => void;
}) {
  const pathname = usePathname();
  const active = isNavLinkActive(pathname, href);

  return (
    <Link
      href={href}
      className={`nav-overlay-link ${active ? 'is-active' : ''} ${className ?? ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={onNavigate}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
    >
      {label}
    </Link>
  );
}

function MegaMenuContent({
  menu,
  onClose,
}: {
  menu: MegaMenu;
  onClose: () => void;
}) {
  const columnCount = menu.groups.length;

  return (
    <div
      className="nav-overlay-mega-grid"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, max-content))`,
      }}
    >
      {menu.groups.map((group) => (
        <section key={group.title} className="nav-overlay-column">
          <h3>{group.title}</h3>
          <ul>
            {group.links.map((link) => (
              <li key={link.label}>
                <OverlayLink
                  href={link.href}
                  label={link.label}
                  onNavigate={onClose}
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function DropdownMenuContent({
  menu,
  activeNestedKey,
  onNestedChange,
  onClose,
  reducedMotion,
}: {
  menu: MegaMenu;
  activeNestedKey: string | null;
  onNestedChange: (key: string | null) => void;
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const pathname = usePathname();
  const links = menu.groups.flatMap((group) => group.links);

  const activeNestedLink = links.find(
    (link) =>
      link.children?.length &&
      activeNestedKey === nestedKey(menu.label, link.label),
  );

  const renderPrimaryLink = (link: NavLink) => {
    const key = nestedKey(menu.label, link.label);
    const linkActive = isNavLinkActive(pathname, link.href);
    const childActive =
      link.children?.some((child) => isNavLinkActive(pathname, child.href)) ??
      false;
    const isNestedOpen = activeNestedKey === key;

    if (link.children?.length) {
      return (
        <li key={link.label}>
          <Link
            href={link.href}
            className={`nav-overlay-link nav-overlay-nested-trigger ${linkActive || childActive || isNestedOpen ? 'is-active' : ''}`}
            aria-current={linkActive ? 'page' : undefined}
            aria-expanded={isNestedOpen}
            onMouseEnter={() => onNestedChange(key)}
            onFocus={() => onNestedChange(key)}
          >
            <span>{link.label}</span>
            <span className="nav-overlay-nested-caret" aria-hidden>
              ›
            </span>
          </Link>
        </li>
      );
    }

    const closeNested = () => onNestedChange(null);

    return (
      <li key={link.label}>
        <OverlayLink
          href={link.href}
          label={link.label}
          onNavigate={onClose}
          onMouseEnter={closeNested}
          onFocus={closeNested}
        />
      </li>
    );
  };

  return (
    <div
      className="nav-overlay-dropdown"
      onMouseLeave={() => onNestedChange(null)}
    >
      <ul className="nav-overlay-dropdown-primary">
        {links.map((link) => renderPrimaryLink(link))}
      </ul>

      <AnimatePresence mode="wait">
        {activeNestedLink?.children?.length ? (
          <motion.div
            key={activeNestedKey}
            className="nav-overlay-nested"
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 16 }}
            transition={{
              duration: reducedMotion ? 0.12 : 0.32,
              ease: NAV_EASE,
            }}
          >
            <p className="nav-overlay-nested-title">{activeNestedLink.label}</p>
            <ul>
              {activeNestedLink.children.map((child, index) => (
                <motion.li
                  key={child.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : index * 0.04,
                    duration: reducedMotion ? 0.12 : 0.28,
                    ease: NAV_EASE,
                  }}
                >
                  <OverlayLink
                    href={child.href}
                    label={child.label}
                    onNavigate={onClose}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function SiteNavOverlay({
  activeMenuLabel,
  activeNestedKey,
  navId,
  panelLeft,
  onNestedChange,
  onClose,
  onOverlayEnter,
  onOverlayLeave,
}: SiteNavOverlayProps) {
  const reducedMotion = useReducedMotion();
  const activeMenu =
    megaMenus.find((menu) => menu.label === activeMenuLabel) ?? null;

  return (
    <AnimatePresence>
      {activeMenu ? (
        <div
          key="nav-overlay-root"
          className="nav-overlay-root"
          aria-hidden={false}
        >
          <motion.button
            type="button"
            className="nav-overlay-scrim"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.12 : 0.28,
              ease: NAV_EASE,
            }}
            onClick={onClose}
          />
          <div
            role="region"
            aria-label={`${activeMenu.label} menu`}
            className="nav-overlay-panel"
            style={{ left: panelLeft }}
            onMouseEnter={onOverlayEnter}
            onMouseLeave={onOverlayLeave}
          >
            <div className="nav-overlay-inner">
              {megaMenus.map((menu) => {
                const isActive = menu.label === activeMenu.label;
                const menuIsDropdown = menu.layout === 'dropdown';

                return (
                  <div
                    key={menu.label}
                    className="nav-overlay-menu-layer"
                    hidden={!isActive}
                    id={`${navId}-overlay-${menu.label}`}
                  >
                    {menuIsDropdown ? (
                      <DropdownMenuContent
                        menu={menu}
                        activeNestedKey={isActive ? activeNestedKey : null}
                        onNestedChange={onNestedChange}
                        onClose={onClose}
                        reducedMotion={Boolean(reducedMotion)}
                      />
                    ) : (
                      <MegaMenuContent menu={menu} onClose={onClose} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
