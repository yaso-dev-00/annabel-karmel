type SearchIconProps = {
  className?: string;
};

export function SearchIcon({ className = "h-6 w-6" }: SearchIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="10.5" cy="10.5" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
