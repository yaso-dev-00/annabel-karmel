import Link from "next/link";
import {
  formatDashboardDate,
  formatDashboardDateTime,
  getDashboardStatusLabel,
  type DashboardSummary,
} from "@/lib/admin/dashboard-summary";
import styles from "./admin-dashboard.module.css";

type AdminDashboardProps = {
  summary: DashboardSummary;
};

function publishedBreakdownLabel(summary: DashboardSummary): string {
  const parts: string[] = [];
  const { advice, article, competition, partner, expert } = summary.publishedBreakdown;
  if (advice) parts.push(`${advice} advice`);
  if (article) parts.push(`${article} article${article === 1 ? "" : "s"}`);
  if (competition) parts.push(`${competition} competition${competition === 1 ? "" : "s"}`);
  if (partner) parts.push(`${partner} partner${partner === 1 ? "" : "s"}`);
  if (expert) parts.push(`${expert} expert${expert === 1 ? "" : "s"}`);
  if (parts.length === 0) return "Nothing published in the last 7 days";
  return parts.join(" · ");
}

const AVATAR_ACCENTS = [
  styles.accent0,
  styles.accent1,
  styles.accent2,
  styles.accent3,
  styles.accent4,
  styles.accent5,
] as const;

function statusClass(status: DashboardSummary["recent"][number]["status"]): string {
  switch (status) {
    case "published":
      return styles.statusPublished;
    case "scheduled":
      return styles.statusScheduled;
    case "private":
      return styles.statusPrivate;
    case "disabled":
      return styles.statusDisabled;
    default:
      return styles.statusDraft;
  }
}

export function AdminDashboard({ summary }: AdminDashboardProps) {
  const draftBadge =
    summary.draftsThisWeek > 0 ? `+${summary.draftsThisWeek} this week` : "steady";
  const scheduledBadge = summary.scheduled > 0 ? "on track" : "clear";
  const nextScheduledLabel = summary.nextScheduled
    ? `Next: ${summary.nextScheduled.title} · ${formatDashboardDateTime(summary.nextScheduled.at)}`
    : "No upcoming schedules";

  return (
    <div className={styles.root}>
      <section className={styles.kpiGrid} aria-label="Content overview">
        <article className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <p className={styles.kpiLabel}>Pending drafts</p>
            <span className={`${styles.kpiChip} ${styles.kpiChipMuted}`}>{draftBadge}</span>
          </div>
          <p className={styles.kpiValue}>{summary.drafts}</p>
          <p className={styles.kpiHint}>
            {summary.drafts === 0
              ? "No drafts waiting"
              : `${summary.drafts} item${summary.drafts === 1 ? "" : "s"} still in draft`}
          </p>
        </article>

        <article className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <p className={styles.kpiLabel}>Scheduled</p>
            <span
              className={`${styles.kpiChip} ${
                summary.scheduled > 0 ? styles.kpiChipGood : styles.kpiChipMuted
              }`}
            >
              {scheduledBadge}
            </span>
          </div>
          <p className={styles.kpiValue}>{summary.scheduled}</p>
          <p className={styles.kpiHint}>
            {summary.nextScheduled ? (
              <Link href={summary.nextScheduled.href} className={styles.kpiHintLink}>
                {nextScheduledLabel}
              </Link>
            ) : (
              nextScheduledLabel
            )}
          </p>
        </article>

        <article className={styles.kpiCard}>
          <div className={styles.kpiHeader}>
            <p className={styles.kpiLabel}>Published this week</p>
          </div>
          <p className={styles.kpiValue}>{summary.publishedThisWeek}</p>
          <p className={styles.kpiHint}>{publishedBreakdownLabel(summary)}</p>
        </article>
      </section>

      <section className={styles.recentCard} aria-label="Recently updated">
        <div className={styles.recentHeader}>
          <h2 className={styles.recentTitle}>Recently updated</h2>
          <Link href="/admin/advice" className={styles.recentLink}>
            View all advice
          </Link>
        </div>

        {summary.recent.length === 0 ? (
          <p className={styles.empty}>No content yet — create an advice article to get started.</p>
        ) : (
          <ul className={styles.recentList}>
            {summary.recent.map((item) => (
              <li key={`${item.kind}-${item.id}`} className={styles.recentRow}>
                <Link href={item.href} className={styles.recentMain}>
                  <span
                    className={`${styles.avatar} ${AVATAR_ACCENTS[item.accentIndex] ?? styles.accent0}`}
                    aria-hidden
                  >
                    {item.initials}
                  </span>
                  <span className={styles.recentCopy}>
                    <span className={styles.recentItemTitle}>{item.title}</span>
                    <span className={styles.recentMeta}>
                      {item.kindLabel} · {item.categoryLabel}
                    </span>
                  </span>
                </Link>
                <span className={`${styles.status} ${statusClass(item.status)}`}>
                  {getDashboardStatusLabel(item.status)}
                </span>
                <time className={styles.recentDate} dateTime={item.updatedAt}>
                  {formatDashboardDate(item.updatedAt)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
