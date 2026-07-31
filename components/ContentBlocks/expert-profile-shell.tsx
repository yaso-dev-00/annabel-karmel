import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Expert } from '@/lib/experts/types';
import styles from './expert-profile-shell.module.css';

function isInternalHref(href: string): boolean {
  return href.startsWith('/');
}

function ExpertTopicLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

type ExpertProfileShellProps = {
  expert: Expert;
};

export function ExpertProfileShell({ expert }: ExpertProfileShellProps) {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <article>
          <h1 className={styles.title}>
            {expert.name} - {expert.role}
          </h1>
          {expert.image ? (
            <img
              src={expert.image}
              alt={expert.name}
              className={styles.portrait}
            />
          ) : null}
          <div className={styles.body}>
            {expert.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {expert.bioParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {expert.socialLink ? (
            <a
              href={expert.socialLink.href}
              target="_blank"
              rel="noreferrer"
              className={styles.social}
            >
              {expert.socialLink.label}
            </a>
          ) : null}
        </article>
      </section>

      <section className={styles.topics}>
        <div className={styles.topicList}>
          {expert.articleTopics.map((topic) => {
            const topicHref = topic.href ?? expert.sourceUrl;

            return (
              <article
                key={`${topic.title}-${topicHref}`}
                className={styles.topic}
              >
                <ExpertTopicLink
                  href={topicHref}
                  className={styles.topicImageLink}
                >
                  <img
                    src={topic.image ?? expert.image}
                    alt={topic.title}
                    className={styles.topicImage}
                  />
                </ExpertTopicLink>
                <div className={styles.topicCopy}>
                  <h3 className={styles.topicTitle}>
                    <ExpertTopicLink href={topicHref}>
                      {topic.title}
                    </ExpertTopicLink>
                  </h3>
                  <ExpertTopicLink href={topicHref} className={styles.readMore}>
                    Read More
                  </ExpertTopicLink>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
