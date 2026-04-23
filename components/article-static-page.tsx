import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { InstagramShareSection } from "@/components/instagram-share-section";
import styles from "@/components/article-static-page.module.css";

type ArticleSection = {
  title: string;
  points: string[];
};

type ArticleStaticPageProps = {
  category: string;
  title: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  sections: ArticleSection[];
};

export function ArticleStaticPage(props: ArticleStaticPageProps) {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <div className={styles.hero}>
          <img src={props.heroImage} alt={props.heroAlt} className={styles.heroImage} />
        </div>
        <article className={styles.content}>
          <p className={styles.eyebrow}>{props.category}</p>
          <h1 className={styles.title}>{props.title}</h1>
          <p className={styles.intro}>{props.intro}</p>

          <div className={styles.sectionGrid}>
            {props.sections.map((section) => (
              <section key={section.title} className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <ul className={styles.sectionList}>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className={styles.ctaRow}>
            <a href="/category/articles" className={styles.cta}>
              Back to Articles
            </a>
          </div>
        </article>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
