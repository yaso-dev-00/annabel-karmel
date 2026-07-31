/** Responsive `sizes` hints for next/image across empower page breakpoints. */
export const empowerImageSizes = {
  heroDesktop:
    '(max-width: 767px) 0px, (max-width: 1023px) 100vw, (max-width: 1439px) 1300px, 1300px',
  heroMobile: '100vw',
  splitColumn:
    '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1439px) 660px, 660px',
  fullWidthCard: '(max-width: 767px) 100vw, (max-width: 1439px) 1300px, 1300px',
  sectionBackground: '100vw',
  awards:
    '(max-width: 767px) 30vw, (max-width: 1023px) 120px, (max-width: 1439px) 140px, 150px',
  statIcon: '(max-width: 767px) 80px, (max-width: 1023px) 100px, 120px',
  stepNumber:
    '(max-width: 767px) 72px, (max-width: 1023px) 88px, (max-width: 1439px) 100px, 100px',
  recipe:
    '(max-width: 767px) 45vw, (max-width: 1023px) 30vw, (max-width: 1439px) 22vw, 196px',
  expert:
    '(max-width: 767px) 86vw, (max-width: 1023px) 42vw, (max-width: 1439px) 33vw, 380px',
} as const;
