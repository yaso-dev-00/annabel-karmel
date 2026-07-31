import styles from './marketing.module.css';

const WAVE_PATH =
  'M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z';

export function MarketingWaveDivider({
  position,
  fill = 'white',
}: {
  position: 'top' | 'bottom';
  fill?: 'white' | 'pinkSoft';
}) {
  const fillClass =
    fill === 'pinkSoft' ? styles.waveFillPinkSoft : styles.waveFill;

  return (
    <div
      className={
        position === 'top' ? styles.waveShapeTop : styles.waveShapeBottom
      }
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path className={fillClass} d={WAVE_PATH} />
      </svg>
    </div>
  );
}

export function MarketingArrowIcon({
  stroke = '#6E9CA5',
}: {
  stroke?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      aria-hidden="true"
    >
      <rect width="41" height="41" rx="16" fill="white" />
      <path
        d="M13 20.5H27"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 13.5L27 20.5L20 27.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarketingCtaButton({
  href,
  label,
  variant = 'teal',
  block = false,
  className = '',
}: {
  href: string;
  label: string;
  variant?: 'teal' | 'pink';
  block?: boolean;
  className?: string;
}) {
  const stroke = variant === 'pink' ? '#B34769' : '#6E9CA5';

  return (
    <a
      href={href}
      className={`${styles.ctaButton} ${variant === 'pink' ? styles.ctaButtonPink : ''} ${block ? styles.ctaButtonBlock : ''} ${className}`}
    >
      <span>{label}</span>
      <MarketingArrowIcon stroke={stroke} />
    </a>
  );
}

export function MarketingCheckIcon() {
  return (
    <svg
      className="h-[35px] w-[35px] shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 9L13.5 25.5L6 18"
        stroke="#494747"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
