import Link from "next/link";
import { pregnancyCategoryNav } from "@/data/pregnancy-advice-listings";
import styles from "./pregnancy-category-nav.module.css";

type PregnancyCategoryNavProps = {
  activeSlug: "pregnancy-tips" | "your-pregnancy";
};

export function PregnancyCategoryNav({ activeSlug }: PregnancyCategoryNavProps) {
  return (
    <nav className={styles.nav} aria-label="Pregnancy advice categories">
      <ul className={styles.list}>
        {pregnancyCategoryNav.map((item) => {
          const isActive = item.slug === activeSlug;
          return (
            <li key={item.slug}>
              <Link
                href={item.href}
                className={`${styles.link}${isActive ? ` ${styles.linkActive}` : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
