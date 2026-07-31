type BlockVisibilityIconProps = {
  /** When true, the block is visible on the published page. */
  visible: boolean;
  className?: string;
};

export function BlockVisibilityIcon({
  visible,
  className,
}: BlockVisibilityIconProps) {
  if (visible) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none">
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none">
      <path
        d="M2 12s3.5-7 10-7c2.12 0 3.97.74 5.47 1.73M22 12s-3.5 7-10 7c-2.12 0-3.97-.74-5.47-1.73"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.88 9.88a3 3 0 104.24 4.24"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3 3l18 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
