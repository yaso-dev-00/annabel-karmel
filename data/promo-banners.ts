export type SiteAdBanner = {
  id: string;
  title: string;
  image: string;
  href: string;
  ariaLabel: string;
  width: number;
  height: number;
};

export type SiteAdPlacementId = "header" | "footer";

export const newsletterBarContent = {
  desktopText: "Join Annabel's newsletter for exclusive recipes, competitions, offers and more!",
  mobileText: "Exclusive recipes, competitions and more",
  closeIconUrl: "https://www.annabelkarmel.com/wp-content/uploads/2025/03/Close-optimized.png",
};

export const newsletterPopupContent = {
  title: "Join Annabel's newsletter",
  subtitle: "Be the first to hear about new competitions, recipes, offers and more!",
  emailPlaceholder: "Enter your email address",
  submitLabel: "Sign Up",
  legalText:
    "By signing up, you agree to receive email marketing from Annabel Karmel. Unsubscribe at any time.",
  successMessage: "Thank you for signing up!",
  errorMessage: "Something went wrong. Please try again later.",
};

/** Global leaderboard ads from annabelkarmel.com header/footer placements (June 2026). */
export const siteAdBanners: SiteAdBanner[] = [
  {
    id: "finger-food-plant-powered-2026",
    title: "Finger Food Launch May 2026",
    image: "https://www.annabelkarmel.com/wp-content/uploads/2026/05/Ad-banner-4-1.png",
    href: "https://www.annabelkarmel.com/product-category/plant-powered-bites/",
    ariaLabel: "Plant-powered for kids — now available at Asda",
    width: 728,
    height: 200,
  },
  {
    id: "gruffalo-competition-june-2026",
    title: "Gruffalo Competition June 2026",
    image: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/Gruffalo-Comp-June-2026.png",
    href: "https://www.instagram.com/p/DZKChoNjA3J/?utm_source=ig_web_copy_link",
    ariaLabel: "Gruffalo competition — enter on Instagram",
    width: 728,
    height: 200,
  },
  {
    id: "app-weaning-update-june-2026",
    title: "New App - Weaning Update June 2026",
    image: "https://www.annabelkarmel.com/wp-content/uploads/2026/06/App-Leaderboard-June-2026.png",
    href: "https://annabelkaremel.onelink.me/MP0T/y7jrx92n",
    ariaLabel: "Annabel Karmel app — weaning update, try for free",
    width: 728,
    height: 200,
  },
];

export const NEWSLETTER_BAR_STORAGE_KEY = "ak-newsletter-bar-dismissed";
