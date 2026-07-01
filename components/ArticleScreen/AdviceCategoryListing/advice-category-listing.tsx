import Link from "next/link";
import styles from "./advice-category-listing.module.css";

export type AdviceCategoryListingArticle = {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
};

type AdviceCategoryListingProps = {
  articles: AdviceCategoryListingArticle[];
};

export function AdviceCategoryListing({ articles }: AdviceCategoryListingProps) {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.href}>
          <article className={styles.row}>
            <Link href={article.href} className={styles.imageLink} aria-label={article.title}>
              <img src={article.image} alt={article.imageAlt} className={styles.image} loading="lazy" />
            </Link>
            <div className={styles.body}>
              <h2 className={styles.title}>
                <Link href={article.href} className={styles.titleLink}>
                  {article.title}
                </Link>
              </h2>
              <Link href={article.href} className={styles.readMore}>
                Read More
              </Link>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
