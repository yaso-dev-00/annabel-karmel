export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

/** Canonical route — matches annabelkarmel.com/the-ultimate-baby-toddler-recipe-app */
export const recipeAppPath = '/the-ultimate-baby-toddler-recipe-app';

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type MegaMenu = {
  label: string;
  href: string;
  layout?: 'mega' | 'dropdown';
  groups: NavGroup[];
};

export type HeroSlide = {
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
};

export type RecipeCard = {
  title: string;
  duration: string;
  href: string;
  image: string;
};

export type VisualCard = {
  title: string;
  subtitle: string;
  image: string;
};

export type ExpertRangeCard = {
  title: string;
  image: string;
  href: string;
};

export type CookbookCard = {
  title: string;
  image: string;
  href: string;
};

export type CollabCard = {
  title: string;
  subtitle: string;
  href: string;
  logoImage?: string;
  cardImage: string;
};

export type AppSectionBullet = {
  lead: string;
  text: string;
};

export type AppSectionContent = {
  heading: string;
  bullets: AppSectionBullet[];
  ctaLabel: string;
  ctaHref: string;
  appStoreHref: string;
  playStoreHref: string;
  awards: { src: string; alt: string }[];
  phonesImage: string;
};

export type InstagramPostCard = {
  href: string;
  image: string;
  kind: 'image' | 'video' | 'carousel';
};

// export const topUtilityLinks: NavLink[] = [
//   { label: "Login", href: "/login" },
//   { label: "Create an account", href: "/register" },
// ];

export const megaMenus: MegaMenu[] = [
  {
    label: 'Recipes',
    href: '/recipes',
    groups: [
      {
        title: 'By Age',
        links: [
          { label: 'First Foods', href: '/recipe-category/first-foods' },
          { label: '6 Months +', href: '/recipe-category/6-9-months-recipes' },
          { label: '9-12 months', href: '/recipe-category/9-12-months' },
          { label: '12-18 months', href: '/recipe-category/12-18-months' },
          { label: '18 Months +', href: '/recipe-category/18-months' },
          { label: 'Family', href: '/recipe-category/family-recipes' },
        ],
      },
      {
        title: 'Meal Times',
        links: [
          { label: 'Breakfast', href: '/meal-time/breakfast' },
          { label: 'Snacks', href: '/meal-time/snack' },
          { label: 'Main Meals', href: '/meal-time/main-meals' },
          { label: 'Desserts', href: '/meal-time/dessert-recipes' },
          { label: 'Weaning', href: '/meal-time/weaning' },
        ],
      },
      {
        title: 'Free From',
        links: [
          { label: 'Plant Based', href: '/allergen/vegan' },
          { label: 'Vegetarian', href: '/allergen/vegetarian' },
          { label: 'Dairy Free', href: '/allergen/dairy-free-recipes' },
          { label: 'Egg Free', href: '/allergen/egg-free-recipes' },
          { label: 'Gluten Free', href: '/allergen/gluten-free-recipes' },
          { label: 'Nut Free', href: '/allergen/nut-free-recipes' },
        ],
      },
    ],
  },
  {
    label: 'Advice',
    href: '/advice',
    groups: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/category/articles' },
          { label: 'Our Experts', href: '/meet-our-experts' },
          {
            label: 'Baby Nutrition',
            href: '/category/nutrition/baby-nutrition',
          },
          {
            label: 'Toddler & Child',
            href: '/category/nutrition/nutrition-toddler-child',
          },
          {
            label: 'Allergies',
            href: '/category/nutrition/nutrition-allergies',
          },
        ],
      },
      {
        title: 'Hot Topics',
        links: [
          {
            label: 'Pregnancy, birth & postnatal',
            href: '/advice-category/pregnancy-tips',
          },
          {
            label: 'Health and Development',
            href: '/advice-category/child-health-and-development',
          },
          { label: 'Sleep', href: '/advice-category/baby-sleep-advice' },
          {
            label: 'Breastfeeding',
            href: '/advice-category/breastfeeding-advice',
          },
          {
            label: 'Bottle Feeding',
            href: '/advice-category/bottle-feeding-tips',
          },
        ],
      },
    ],
  },
  {
    label: 'Competitions',
    href: '/competitions',
    layout: 'dropdown',
    groups: [
      {
        title: '',
        links: [
          { label: 'Competitions', href: '/competitions' },
          {
            label: 'Our Partners',
            href: '/partners',
            children: [
              { label: 'Pampers x Snacking', href: '/pampers-snacking' },
              { label: 'Pampers x Superfoods', href: '/pampers-2026' },
              { label: 'Birds Eye', href: '/birds-eye' },
              { label: 'Craft & Crumb', href: '/craft-crumb' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Our Products',
    href: '/our-products',
    layout: 'dropdown',
    groups: [
      {
        title: '',
        links: [
          { label: 'Little Meals', href: '/product-category/australia-frozen' },
          { label: 'Tableware', href: '/tableware' },
          { label: 'Chilled Meals', href: '/product-category/chilled-meals' },
          { label: 'Frozen Meals', href: '/product-category/frozen-meals' },
          {
            label: 'Plant Powered Bites',
            href: '/product-category/plant-powered-bites',
          },
          { label: 'Baking Kits', href: '/craft-crumb' },
          { label: 'Supermarket Offers', href: '/offers-page' },
          { label: 'Cookbooks', href: '/app-book-category/our-books' },
        ],
      },
    ],
  },
  {
    label: 'Recipe App',
    href: recipeAppPath,
    layout: 'dropdown',
    groups: [
      {
        title: '',
        links: [
          { label: 'Discover the App', href: recipeAppPath },
          { label: 'App for Business', href: '/empower-your-employees' },
        ],
      },
    ],
  },
];

export const logoUrl = '/brand/annabel-karmel-logo.png';

export const footerLogoUrl = '/hero-slides/logo.png';

export const heroSlides: HeroSlide[] = [
  {
    title: 'Fish Finger Pie',
    subtitle: 'Your new failsafe family favourite has arrived!',
    cta: 'Discover',
    href: '/recipes/fish-finger-pie',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2026/06/Birds-Eye-Fish-Finger-Hero-scaled.jpg',
  },
  {
    title: 'Plant-powered for kids!',
    subtitle:
      "The tastiest take on kids' all time favourites, now available at Asda.",
    cta: 'Discover',
    href: 'https://www.asda.com/groceries/search/annabel%20karmel%20meat%20free',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2026/05/PLant-Based-Launch-Hero-scaled.jpg',
  },
  {
    title: "Kids' tikka, quikka",
    subtitle: 'Delicious dinners at the speed of life.',
    cta: 'Discover',
    href: '/products/mild-chicken-tikka/',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2026/06/Chicken-Tikka_1080x1350_Plate_NoText.jpg',
  },
];

export const latestRecipes: RecipeCard[] = [
  {
    title: 'Smoked Sweet Paprika, Pepper & Chicken Puree',
    duration: '20 mins',
    href: '/recipes/smoked-sweet-paprika-pepper-chicken-puree-2',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2025/05/Chicken-Puree-with-Smoked-Sweet-Paprika-768x960-optimized.jpg',
  },
  {
    title: 'Salmon & Spinach Fritters',
    duration: '15 mins',
    href: '/recipes/salmon-spinach-fritters-2',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2025/02/Salmon-and-Spinach-Fritters-p.185-768x1006-1-optimized.jpg',
  },
  {
    title: 'Sweet Potato & Chicken Croquettes',
    duration: '15 mins',
    href: '/recipes/sweet-potato-chicken-croquettes-2',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2025/02/Sweet-Potato-and-Chicken-Croquettes-p.126-768x1008-1-optimized.jpg',
  },
  {
    title: "Mac 'n' Cheese Veggie Muffins",
    duration: '40 mins',
    href: '/recipes/mac-n-cheese-veggie-muffins',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2025/02/Mac-%E2%80%98n-Cheese-Veggie-Muffin-p.99-768x1118-1-optimized.jpg',
  },
  {
    title: 'Easy Teriyaki Salmon',
    duration: '22 mins',
    href: '/recipes/104277',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2024/09/SALMON-1-1-768x960-optimized.jpg',
  },
  {
    title: 'Rainbow Veggie Pizza',
    duration: '25 mins',
    href: '/recipes/rainbow-veggie-pizza',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2024/09/RAINBOW-PIZZA-2-1-scaled-e1741012376348-768x769-optimized.jpg',
  },
  {
    title: 'Choc Orange Marble Cake',
    duration: '45 mins',
    href: '/recipes/choc-orange-marble-cake',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2024/09/MARBLE-CAKE-1-1-scaled-e1741012470291-768x768-optimized.jpg',
  },
  {
    title: 'Easy 5-Veg Croquettes',
    duration: '20 mins',
    href: '/recipes/easy-5-veg-croquettes',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2024/09/CROQUETTES-2-768x960-optimized.jpg',
  },
  {
    title: 'Best-ever Roast Beef',
    duration: '45 mins',
    href: '/recipes/best-ever-roast-beef',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2024/09/ROAST-BEEF-1-1-768x1152-optimized.jpg',
  },
  {
    title: 'Veggie Frittata Fingers',
    duration: '20 mins',
    href: '/recipes/veggie-frittata-fingers',
    image:
      'https://www.annabelkarmel.com/wp-content/uploads/2024/10/AKBABY3-scaled-e1729072983537-768x768-optimized.jpg',
  },
];

export const appFeatureCards: VisualCard[] = [
  {
    title: 'Simple search tool',
    subtitle: 'Handy filters to help you find what you are looking for',
    image: '/home page/app-carousel/01-simple-search-tool.png',
  },
  {
    title: 'Bite-sized weaning tutorials',
    subtitle: "Unlimited access to Annabel's listen-along weaning guide",
    image: '/home page/app-carousel/02-weaning-tutorials.png',
  },
  {
    title: 'Allergy support',
    subtitle: 'Essential advice for managing common food allergies',
    image: '/home page/app-carousel/03-allergy-support.png',
  },
  {
    title: 'Helpful guides',
    subtitle: 'Latest tips and advice, from teething to finger foods',
    image: '/home page/app-carousel/04-helpful-guides.png',
  },
  {
    title: 'First foods index',
    subtitle: 'Learn how to safely introduce 50 nutritious first foods',
    image: '/home page/app-carousel/05-first-foods-index.png',
  },
  {
    title: 'Ideas for every age and stage',
    subtitle: 'Over 1,250 recipes that grow with your family',
    image: '/home page/app-carousel/06-ideas-every-age.png',
  },
];

// Previous homepage recipe app copy (carousel section) — kept for reference
// export const oldAppSectionContent = {
//   awards: [
//     "/home page/made-for-mums.webp",
//     "/home page/made-for-mums-optimized.webp",
//     "/home page/Frame-5-optimized.webp",
//   ],
//   title: "Annabel’s #1 recipe app",
//   bullets: ["1500+ baby, toddler & family recipes", "New ideas weekly", "Essential tips and advice"],
//   ctaLabel: "Discover more",
//   ctaHref: "/recipe-app",
// };

export const appSectionContent: AppSectionContent = {
  heading: 'Your go-to recipe app for every age & stage',
  bullets: [
    {
      lead: '1,500+ recipes',
      text: ' for baby, toddler, and the whole family',
    },
    {
      lead: 'Explore 100+ first foods',
      text: ' and learn how to safely serve them',
    },
    {
      lead: 'Track your baby’s food journey',
      text: ' and celebrate milestones',
    },
    {
      lead: 'Expert advice',
      text: ' to support you at every age and stage',
    },
  ],
  ctaLabel: 'Start your 7-day FREE trial',
  ctaHref: recipeAppPath,
  appStoreHref: `${recipeAppPath}/download/ios`,
  playStoreHref: `${recipeAppPath}/download/android`,
  awards: [
    {
      src: '/home page/recipe-app/lbp-app-2026.png',
      alt: 'LovedByParents Winner 2026',
    },
    {
      src: '/home page/recipe-app/mfm-app-2025.png',
      alt: 'Made for Mums Gold 2025',
    },
    {
      src: '/home page/recipe-app/tmm-app-2026.png',
      alt: 'The Mum Marketplace Gold 2026',
    },
    {
      src: '/home page/recipe-app/lbp-tried-tested-app-2026.png',
      alt: 'LovedByParents Tried & Tested 2026',
    },
    {
      src: '/home page/recipe-app/ftm-app-2026.png',
      alt: 'First Time Mums Top 5 2026',
    },
  ],
  phonesImage: '/home page/recipe-app/home-app-image.png',
};

export const awardLogos = [
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_03-optimized.png',
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_04-optimized.png',
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_05-optimized.png',
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_06-optimized.png',
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_07-optimized.png',
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_09-optimized.png',
  'https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_08-optimized.png',
];

export const expertRangeCards: ExpertRangeCard[] = [
  {
    title: 'Fridge meals',
    image: '/home page/anabelle expert/Chilled_Meals-img-optimized.webp',
    href: '/product-category/chilled-meals',
  },
  {
    title: 'Freezer meals',
    image:
      '/home page/anabelle expert/Homepage-Hero-Section-scaled2-optimized.jpg',
    href: '/product-category/frozen-meals',
  },
];

export const bestsellingCookbooks: CookbookCard[] = [
  {
    title: 'Finger Foods for Babies & Toddlers',
    image: '/home page/best selling cookbooks/food-optimized.jpg',
    href: '/apps-books/finger-foods',
  },
  {
    title: 'Weaning',
    image: '/home page/best selling cookbooks/weaning-optimized.jpg',
    href: '/apps-books/weaning-2',
  },
  {
    title: 'Complete Baby & Toddler Meal Planner',
    image: '/home page/best selling cookbooks/toddler-optimized.jpg',
    href: '/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition',
  },
  {
    title: 'My First Cookbook',
    image: '/home page/best selling cookbooks/cookbook-optimized.jpg',
    href: '/apps-books/my-first-cookbook',
  },
  {
    title: 'Where Does My Food Come From?',
    image: '/home page/best selling cookbooks/where-optimized.jpg',
    href: '/apps-books/where-does-my-food-come-from',
  },
  {
    title: "Fun, Fast & Easy Children's Cookbook",
    image: '/home page/best selling cookbooks/Fun-Fast-Easy-2-optimized.jpg',
    href: '/apps-books/fun-fast-easy-childrens-cookbook',
  },
  {
    title: 'Weaning Made Simple',
    image: '/home page/best selling cookbooks/weaningmade-optimized.jpg',
    href: '/apps-books/weaning-made-simple',
  },
  {
    title: 'Real Food Kids Will Love',
    image: '/home page/best selling cookbooks/kids-optimized.jpg',
    href: '/apps-books/real-foods-kids-will-love',
  },
  {
    title: "Busy Mum's Cookbook",
    image: '/home page/best selling cookbooks/recips-optimized.jpg',
    href: '/app-book-category/our-books',
  },
  {
    title: 'Baby-Led Weaning Recipe Book',
    image: '/home page/best selling cookbooks/1-optimized.jpg',
    href: '/apps-books/baby-led-weaning-recipe-book',
  },
  {
    title: 'Family Cookbook',
    image: '/home page/best selling cookbooks/3-optimized.jpg',
    href: '/apps-books/annabels-family-cookbook',
  },
  {
    title: "Baby's First Year Journal",
    image: '/home page/best selling cookbooks/2-optimized.jpg',
    href: '/apps-books/babys-first-year-journal',
  },
];

export const collabCards: CollabCard[] = [
  {
    title: 'Craft & Crumb',
    subtitle: 'Bake, create and have fun!',
    href: '/craft-crumb',
    logoImage: '/home page/anabelle collabs/background image.webp',
    cardImage:
      '/home page/anabelle collabs/cards/Craft-Crumb-scaled-optimized.webp',
  },
  {
    title: 'Pots for Tots',
    subtitle: 'Handmade bites & meals for babies & tots',
    href: '/competitions/pots-for-tots',
    logoImage:
      '/home page/anabelle collabs/579136-logo-1708518539-optimized.webp',
    cardImage: '/home page/anabelle collabs/cards/PFT-homepage-optimized.webp',
  },
];

export const partnerLogos = [
  {
    name: 'Sani Resort',
    image: '/home page/partners/1.-Sani-Resort-optimized.webp',
    href: '/partners/sani-resort',
  },
  {
    name: 'Pampers',
    image: '/home page/partners/2.-pampers-optimized.webp',
    href: '/partners/pampers',
  },
  {
    name: 'Dualit',
    image: '/home page/partners/3.-Dualit-optimized.webp',
    href: '/partners/dualit',
  },
  {
    name: 'P&O Cruises',
    image: '/home page/partners/4-optimized.webp',
    href: '/partners/po-cruises',
  },
  {
    name: 'Bugaboo',
    image: '/home page/partners/5.-Bugaboo-optimized.webp',
    href: '/partners/bugaboo',
  },
  {
    name: 'Symprove',
    image: '/home page/partners/6.-Symprove-optimized.webp',
    href: '/partners/symprove',
  },
  {
    name: 'HECK',
    image: '/home page/partners/7.-Heck-optimized.webp',
    href: '/partners/heck',
  },
  {
    name: 'Jumeirah Carlton Tower',
    image: '/home page/partners/8.-Jumeirah-Carlton-Tower-optimized.webp',
    href: '/partners/jumeirah-carlton-tower',
  },
  {
    name: 'Green Giant',
    image: '/home page/partners/9.-Green-Giant-optimized.webp',
    href: '/partners/green-giant',
  },
  {
    name: 'Warburtons',
    image: '/home page/partners/10.-Warburtons-optimized.webp',
    href: '/partners/warburtons',
  },
  {
    name: 'Hamleys',
    image: '/home page/partners/11.-Hamleys-optimized.webp',
    href: '/partners/hamleys',
  },
  {
    name: 'Reading Eggs',
    image: '/home page/partners/12.-Reading-eggs-optimized.webp',
    href: '/partners/reading-eggs',
  },
  {
    name: 'Emirates',
    image: '/home page/partners/13.-Emirates-optimized.webp',
    href: '/partners/emirates',
  },
  {
    name: 'Miele',
    image: '/home page/partners/14.-Miele-optimized.webp',
    href: '/partners/miele',
  },
  {
    name: 'Kallo',
    image: '/home page/partners/15.-Kallo-optimized.webp',
    href: '/partners/kallo',
  },
  {
    name: 'Baby Annabell',
    image: '/home page/partners/16.-baby-Annabell-optimized.webp',
    href: '/partners/baby-annabell',
  },
];

export const footerLinkColumns: NavGroup[] = [
  {
    title: 'Annabel Karmel',
    links: [
      { label: 'About Annabel Karmel', href: '/about-annabel-karmel' },
      { label: 'Contact Us', href: '/contact' },
      {
        label: "Annabel's Baby & Toddler App",
        href: recipeAppPath,
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-conditions' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/annabelkarmel/' },
      { label: 'Facebook', href: 'https://www.facebook.com/annabelkarmel/' },
      {
        label: 'Pinterest',
        href: 'https://www.pinterest.co.uk/annabelkarmel/',
      },
      {
        label: 'Tiktok',
        href: 'https://www.tiktok.com/@annabelkarmelofficial',
      },
    ],
  },
];

/** Left → right matches site strip: yoghurt reel, nappy carousel, eggs, quote, burger reel, salmon carousel */
export const instagramPostCards: InstagramPostCard[] = [
  {
    href: '/instagram/post-1',
    image:
      '/home page/insta images/670802490_1863107937686587_4855595673991752587_n.jpg',
    kind: 'video',
  },
  {
    href: '/instagram/post-2',
    image:
      '/home page/insta images/670540182_18589797889037816_6122834599263660726_n.jpg',
    kind: 'carousel',
  },
  {
    href: '/instagram/post-3',
    image:
      '/home page/insta images/669507134_18589300015037816_7211905225444844087_n.jpg',
    kind: 'image',
  },
  {
    href: '/instagram/post-4',
    image:
      '/home page/insta images/669053108_18589298416037816_1648841802693883020_n.jpg',
    kind: 'image',
  },
  {
    href: '/instagram/post-5',
    image:
      '/home page/insta images/670161684_18589288627037816_5787670877465417401_n.jpg',
    kind: 'video',
  },
  {
    href: '/instagram/post-6',
    image:
      '/home page/insta images/662031208_18589056445037816_8836927448447459310_n.jpg',
    kind: 'carousel',
  },
];
