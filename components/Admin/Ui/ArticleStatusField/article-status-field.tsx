"use client";

import { useState } from "react";
import { ConfirmModal } from "@/components/Admin/Ui/ConfirmModal";
import {
  ADVICE_ARTICLE_STATUSES,
  ADVICE_ARTICLE_STATUS_HINTS,
  ADVICE_ARTICLE_STATUS_LABELS,
} from "@/lib/admin/advice-article-status";
import type { AdviceArticleStatus } from "@/lib/content-blocks/types";
import styles from "./article-status-field.module.css";

type ArticleStatusFieldProps = {
  value: AdviceArticleStatus;
  scheduledAt?: string | null;
  onChange: (status: AdviceArticleStatus, scheduledAt?: string | null) => void;
};

function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDatetimeLocalValue(value: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

export function ArticleStatusField({ value, scheduledAt, onChange }: ArticleStatusFieldProps) {
  const [confirmDisable, setConfirmDisable] = useState(false);

  const requestStatusChange = (status: AdviceArticleStatus) => {
    if (status === "disabled" && value !== "disabled") {
      setConfirmDisable(true);
      return;
    }
    onChange(status, scheduledAt);
  };

  return (
    <>
      <div className={styles.root}>
        <p className={styles.label} id="article-status-label">
          Status
        </p>
        <div
          className={styles.options}
          role="radiogroup"
          aria-labelledby="article-status-label"
        >
          {ADVICE_ARTICLE_STATUSES.map((status) => {
            const selected = value === status;
            return (
              <button
                key={status}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`${styles.option} ${selected ? styles.optionSelected : ""} ${status === "disabled" && selected ? styles.optionDisabledSelected : ""}`}
                onClick={() => requestStatusChange(status)}
              >
                <span className={styles.radio} aria-hidden />
                {ADVICE_ARTICLE_STATUS_LABELS[status]}
              </button>
            );
          })}
        </div>
        <p className={styles.hint}>{ADVICE_ARTICLE_STATUS_HINTS[value]}</p>
        {value === "scheduled" ? (
          <div className={styles.scheduleField}>
            <label className={styles.scheduleLabel} htmlFor="article-scheduled-at">
              Publish date & time
            </label>
            <input
              id="article-scheduled-at"
              type="datetime-local"
              className={styles.scheduleInput}
              value={toDatetimeLocalValue(scheduledAt)}
              onChange={(e) => onChange("scheduled", fromDatetimeLocalValue(e.target.value))}
            />
          </div>
        ) : null}
      </div>

      <ConfirmModal
        open={confirmDisable}
        title="Disable this article?"
        message="The article will be hidden from the public site and preview will be unavailable until you change the status again."
        confirmLabel="Disable article"
        onConfirm={() => {
          onChange("disabled", scheduledAt);
          setConfirmDisable(false);
        }}
        onCancel={() => setConfirmDisable(false)}
      />
    </>
  );
}
