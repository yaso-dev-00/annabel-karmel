"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { logoUrl, megaMenus } from "@/data/site-content";
import { isMegaMenuActive, isNavLinkActive } from "@/lib/nav-active";
import { SiteNavOverlay } from "@/components/site-nav-overlay";
import { SiteAdPlacement } from "@/components/site-ad-placement";
import { SiteNewsletterBar } from "@/components/site-newsletter-bar";

const DESKTOP_CLOSE_DELAY = 150;
const NESTED_CLOSE_DELAY = 120;

export function SiteHeader() {
  const pathname = usePathname();
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [activeNestedKey, setActiveNestedKey] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenGroups, setMobileOpenGroups] = useState<string[]>([]);
  const [mobileOpenSubGroups, setMobileOpenSubGroups] = useState<string[]>([]);
  const navId = useId();
  const headerRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const desktopCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nestedCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [panelLeft, setPanelLeft] = useState(0);

  const updatePanelAnchor = useCallback((menuLabel: string | null) => {
    if (!menuLabel) {
      return;
    }

    const trigger = triggerRefs.current[menuLabel];
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const margin = 16;
    const panel = headerRef.current?.querySelector<HTMLElement>(".nav-overlay-panel");
    const panelWidth = panel?.getBoundingClientRect().width ?? 0;
    let left = rect.left;

    if (panelWidth > 0 && left + panelWidth > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - margin - panelWidth);
    }

    setPanelLeft(left);
  }, []);

  const clearDesktopCloseTimer = useCallback(() => {
    if (desktopCloseTimerRef.current) {
      clearTimeout(desktopCloseTimerRef.current);
      desktopCloseTimerRef.current = null;
    }
  }, []);

  const closeDesktopNav = useCallback(() => {
    clearDesktopCloseTimer();
    setOpenDesktopMenu(null);
    setActiveNestedKey(null);
  }, [clearDesktopCloseTimer]);

  const scheduleDesktopClose = useCallback(() => {
    clearDesktopCloseTimer();
    desktopCloseTimerRef.current = setTimeout(closeDesktopNav, DESKTOP_CLOSE_DELAY);
  }, [clearDesktopCloseTimer, closeDesktopNav]);

  const openDesktopNav = useCallback(
    (menuLabel: string) => {
      clearDesktopCloseTimer();
      const trigger = triggerRefs.current[menuLabel];
      if (trigger) {
        setPanelLeft(trigger.getBoundingClientRect().left);
      }
      setOpenDesktopMenu((current) => {
        if (current !== menuLabel) {
          setActiveNestedKey(null);
        }
        return menuLabel;
      });
    },
    [clearDesktopCloseTimer],
  );

  const handleNestedChange = useCallback((key: string | null) => {
    if (nestedCloseTimerRef.current) {
      clearTimeout(nestedCloseTimerRef.current);
      nestedCloseTimerRef.current = null;
    }

    if (key === null) {
      nestedCloseTimerRef.current = setTimeout(() => {
        setActiveNestedKey(null);
        nestedCloseTimerRef.current = null;
      }, NESTED_CLOSE_DELAY);
      return;
    }

    setActiveNestedKey(key);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDesktopNav();
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeDesktopNav]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : originalOverflow;
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current) {
        return;
      }
      if (!headerRef.current.contains(event.target as Node)) {
        closeDesktopNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDesktopNav]);

  useEffect(() => {
    return () => {
      clearDesktopCloseTimer();
      if (nestedCloseTimerRef.current) {
        clearTimeout(nestedCloseTimerRef.current);
      }
    };
  }, [clearDesktopCloseTimer]);

  useEffect(() => {
    if (!openDesktopMenu) {
      return;
    }

    const scheduleAnchor = () => {
      window.requestAnimationFrame(() => {
        updatePanelAnchor(openDesktopMenu);
      });
    };

    scheduleAnchor();

    const panel = headerRef.current?.querySelector<HTMLElement>(".nav-overlay-panel");
    const resizeObserver =
      panel && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            updatePanelAnchor(openDesktopMenu);
          })
        : null;

    if (panel) {
      resizeObserver?.observe(panel);
    }

    const handleResize = () => updatePanelAnchor(openDesktopMenu);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [openDesktopMenu, activeNestedKey, updatePanelAnchor]);

  const toggleMobileGroup = (label: string) => {
    setMobileOpenGroups((groups) =>
      groups.includes(label) ? groups.filter((item) => item !== label) : [...groups, label],
    );
  };

  const toggleMobileSubGroup = (key: string) => {
    setMobileOpenSubGroups((groups) =>
      groups.includes(key) ? groups.filter((item) => item !== key) : [...groups, key],
    );
  };

  const leftMenus = megaMenus.filter((menu) =>
    ["Recipes", "Advice", "Competitions"].includes(menu.label),
  );
  const rightMenus = megaMenus.filter((menu) =>
    ["Our Products", "Recipe App"].includes(menu.label),
  );

  const handleTriggerClick = useCallback(
    (menuLabel: string) => {
      clearDesktopCloseTimer();
      if (openDesktopMenu === menuLabel) {
        closeDesktopNav();
        return;
      }
      openDesktopNav(menuLabel);
    },
    [clearDesktopCloseTimer, closeDesktopNav, openDesktopNav, openDesktopMenu],
  );

  const renderDesktopTriggers = (menus: typeof megaMenus) =>
    menus.map((menu) => {
      const menuActive = isMegaMenuActive(pathname, menu);
      const isOpen = openDesktopMenu === menu.label;

      return (
        <div className="menu-item" key={menu.label} onMouseEnter={() => openDesktopNav(menu.label)}>
          <button
            type="button"
            ref={(element) => {
              triggerRefs.current[menu.label] = element;
            }}
            className={`nav-trigger ${menuActive ? "is-active" : ""} ${isOpen ? "is-open" : ""}`}
            onClick={() => handleTriggerClick(menu.label)}
            onFocus={() => openDesktopNav(menu.label)}
            aria-expanded={isOpen}
            aria-controls={`${navId}-overlay-${menu.label}`}
            aria-current={menuActive ? "true" : undefined}
          >
            <span>{menu.label}</span>
            <span className="menu-caret" aria-hidden>
              ▾
            </span>
          </button>
        </div>
      );
    });

  return (
    <>
    <header
      className={`site-header ${openDesktopMenu ? "is-nav-open" : ""}`}
      ref={headerRef}
    >
      <SiteNewsletterBar />
      <div className="main-nav-wrapper">
        <div
          className="container main-nav"
          onMouseEnter={clearDesktopCloseTimer}
          onMouseLeave={scheduleDesktopClose}
        >
          <nav className="desktop-nav desktop-nav-left" aria-label="Primary navigation left">
            {renderDesktopTriggers(leftMenus)}
          </nav>

          <Link href="/" className="brand-logo" aria-label="Annabel Karmel">
            <img src={logoUrl} alt="Annabel Karmel" width={120} height={80} />
          </Link>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen((state) => !state)}
            aria-expanded={isMobileMenuOpen}
            aria-controls={`${navId}-mobile`}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="main-nav-right">
            <nav className="desktop-nav desktop-nav-right" aria-label="Primary navigation right">
              {renderDesktopTriggers(rightMenus)}
            </nav>

            <div className="header-actions">
              <a href="/search" aria-label="Search" className="header-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16L21 21" />
                </svg>
              </a>
              {/* Profile / login — disabled until auth is implemented
              <div className="account-menu" onMouseEnter={closeDesktopNav}>
                <a
                  href="/login"
                  aria-label="Account"
                  className="header-icon user"
                  onFocus={closeDesktopNav}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.3" />
                    <path d="M5.2 18.5C6.7 15.8 9 14.5 12 14.5C15 14.5 17.3 15.8 18.8 18.5" />
                  </svg>
                </a>
                <div className="account-dropdown">
                  <ul className="nav-overlay-dropdown-primary">
                    <li>
                      <Link href="/login" className="nav-overlay-link">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/register" className="nav-overlay-link">
                        Create an account
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>

        <SiteNavOverlay
          activeMenuLabel={openDesktopMenu}
          activeNestedKey={activeNestedKey}
          navId={navId}
          panelLeft={panelLeft}
          onNestedChange={handleNestedChange}
          onClose={closeDesktopNav}
          onOverlayEnter={clearDesktopCloseTimer}
          onOverlayLeave={scheduleDesktopClose}
        />

        <div
          className={`fixed inset-0 z-70 bg-[rgba(31,20,20,0.4)] transition-opacity duration-300 ${
            isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          id={`${navId}-mobile`}
        >
          <div
            className={`ml-auto h-full w-[min(430px,100%)] overflow-y-auto bg-(--surface) p-4 transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="mb-2 flex items-center justify-end">
              <span aria-hidden />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="h-[34px] w-[34px] border border-[#c9c0c2] bg-[rgba(255,255,255,0.35)] p-0 text-[20px] leading-none text-[#5c5559]"
              >
                &times;
              </button>
            </div>
            {/* Mobile login — disabled until auth is implemented
            <div className="border-y border-[#b9afb3]">
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="block px-[0.15rem] py-[0.7rem] [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[16px] font-semibold text-[#373136]">
                  Login
                </span>
              </Link>
            </div>
            */}
            {megaMenus.map((menu) => {
              const isOpen = mobileOpenGroups.includes(menu.label);
              const menuActive = isMegaMenuActive(pathname, menu);
              return (
                <div key={menu.label} className="border-b border-[#b9afb3]">
                  <button
                    type="button"
                    onClick={() => toggleMobileGroup(menu.label)}
                    aria-expanded={isOpen}
                    aria-controls={`mobile-group-${menu.label}`}
                    aria-current={menuActive ? "true" : undefined}
                    className={`flex w-full items-center justify-between bg-transparent px-[0.15rem] py-[0.82rem] text-left [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[16px] font-bold ${
                      menuActive ? "text-[#8f2f58]" : "text-[#373136]"
                    }`}
                  >
                    <span>{menu.label}</span>
                    <span className={`text-[15px] text-[#6a6368] ${isOpen ? "rotate-180" : "translate-y-px"}`} aria-hidden>
                      ▾
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    id={`mobile-group-${menu.label}`}
                  >
                    <div className="overflow-hidden pl-3">
                      {menu.layout === "dropdown"
                        ? menu.groups.flatMap((group) =>
                            group.links.map((link) => {
                              const linkActive = isNavLinkActive(pathname, link.href);
                              const childActive =
                                link.children?.some((child) => isNavLinkActive(pathname, child.href)) ?? false;
                              const nestedKey = `${menu.label}::${link.label}`;
                              const isNestedOpen = mobileOpenSubGroups.includes(nestedKey);

                              if (link.children?.length) {
                                return (
                                  <div key={link.label} className="border-t border-[#b9afb3]">
                                    <button
                                      type="button"
                                      onClick={() => toggleMobileSubGroup(nestedKey)}
                                      aria-expanded={isNestedOpen}
                                      aria-controls={`${navId}-mobile-nested-${nestedKey}`}
                                      className="flex w-full items-center justify-between bg-transparent px-[0.15rem] py-[0.62rem] text-left [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[14px] font-semibold text-[#4a4348]"
                                    >
                                      <span>{link.label}</span>
                                      <span
                                        className={`text-[14px] text-[#6a6368] ${isNestedOpen ? "rotate-180" : "translate-y-px"}`}
                                        aria-hidden
                                      >
                                        ▾
                                      </span>
                                    </button>
                                    <div
                                      className={`grid transition-[grid-template-rows] duration-300 ${
                                        isNestedOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                      }`}
                                      id={`${navId}-mobile-nested-${nestedKey}`}
                                    >
                                      <ul className="m-0 list-none overflow-hidden p-0 pb-[0.35rem]">
                                        {link.children.map((child) => {
                                          const childLinkActive = isNavLinkActive(pathname, child.href);
                                          return (
                                            <li key={child.label} className="border-t border-[#d4cdd0]">
                                              <Link
                                                href={child.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                aria-current={childLinkActive ? "page" : undefined}
                                                className={`block px-[0.15rem] py-2 [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[14px] ${
                                                  childLinkActive
                                                    ? "bg-[#f6e9ef] font-semibold text-[#8f2f58]"
                                                    : "text-[#3f3841]"
                                                }`}
                                              >
                                                {child.label}
                                              </Link>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <div key={link.label} className="border-t border-[#b9afb3]">
                                  <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-current={linkActive ? "page" : undefined}
                                    className={`block px-[0.15rem] py-[0.62rem] [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[14px] ${
                                      linkActive || childActive
                                        ? "bg-[#f6e9ef] font-semibold text-[#8f2f58]"
                                        : "text-[#3f3841]"
                                    }`}
                                  >
                                    {link.label}
                                  </Link>
                                </div>
                              );
                            }),
                          )
                        : menu.groups.map((group) => {
                            const subGroupKey = `${menu.label}::${group.title}`;
                            const isSubOpen = mobileOpenSubGroups.includes(subGroupKey);
                            return (
                              <div key={group.title} className="border-t border-[#b9afb3]">
                                <button
                                  type="button"
                                  onClick={() => toggleMobileSubGroup(subGroupKey)}
                                  aria-expanded={isSubOpen}
                                  aria-controls={`${navId}-mobile-sub-${menu.label}-${group.title}`}
                                  className="flex w-full items-center justify-between bg-transparent px-[0.15rem] py-[0.62rem] text-left [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[14px] font-semibold text-[#4a4348]"
                                >
                                  <span>{group.title}</span>
                                  <span
                                    className={`text-[14px] text-[#6a6368] ${isSubOpen ? "rotate-180" : "translate-y-px"}`}
                                    aria-hidden
                                  >
                                    ▾
                                  </span>
                                </button>
                                <div
                                  className={`grid transition-[grid-template-rows] duration-300 ${
                                    isSubOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                  }`}
                                  id={`${navId}-mobile-sub-${menu.label}-${group.title}`}
                                >
                                  <ul className="m-0 list-none overflow-hidden p-0 pb-[0.35rem]">
                                    {group.links.map((link) => {
                                      const linkActive = isNavLinkActive(pathname, link.href);
                                      return (
                                        <li key={link.label} className="border-t border-[#d4cdd0]">
                                          <Link
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            aria-current={linkActive ? "page" : undefined}
                                            className={`block px-[0.15rem] py-2 [font-family:var(--font-montserrat),Arial,Helvetica,sans-serif] text-[14px] ${
                                              linkActive
                                                ? "bg-[#f6e9ef] font-semibold text-[#8f2f58]"
                                                : "text-[#3f3841]"
                                            }`}
                                          >
                                            {link.label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
    <SiteAdPlacement placement="header" />
    </>
  );
}
