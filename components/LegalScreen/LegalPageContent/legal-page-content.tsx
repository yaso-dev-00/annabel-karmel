import { prepareLegalHtml } from '@/lib/linkify-html';
import styles from './legal-page-content.module.css';

type LegalPageContentProps = {
  title: string;
  html: string;
};

export function LegalPageContent({ title, html }: LegalPageContentProps) {
  const preparedHtml = prepareLegalHtml(html);

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <h1 className={styles.title}>{title}</h1>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: preparedHtml }}
        />
      </section>
    </main>
  );
}
