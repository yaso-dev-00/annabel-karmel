export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type MegaMenu = {
  label: string;
  href: string;
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

export type AppSectionContent = {
  awards: string[];
  title: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type InstagramPostCard = {
  href: string;
  image: string;
  kind: "image" | "video" | "carousel";
};

export type ExpertTopic = {
  title: string;
  href?: string;
  image?: string;
};

export type ExpertDetail = {
  slug: string;
  name: string;
  role: string;
  image: string;
  sourceUrl: string;
  introParagraphs: string[];
  bioParagraphs?: string[];
  socialLink?: {
    label: string;
    href: string;
  };
  articleTopics: ExpertTopic[];
};

export const topUtilityLinks: NavLink[] = [
  { label: "Login", href: "/login" },
  { label: "Create an account", href: "/register" },
];

export const megaMenus: MegaMenu[] = [
  {
    label: "Recipes",
    href: "/recipes",
    groups: [
      {
        title: "By Age",
        links: [
          { label: "First Foods", href: "/recipe-category/first-foods" },
          { label: "6 Months +", href: "/recipe-category/6-9-months-recipes" },
          { label: "9-12 months", href: "/recipe-category/9-12-months" },
          { label: "12-18 months", href: "/recipe-category/12-18-months" },
          { label: "18 Months +", href: "/recipe-category/18-months" },
          { label: "Family", href: "/recipe-category/family-recipes" },
        ],
      },
      {
        title: "Meal Times",
        links: [
          { label: "Breakfast", href: "/meal-time/breakfast" },
          { label: "Snacks", href: "/meal-time/snack" },
          { label: "Main Meals", href: "/meal-time/main-meals" },
          { label: "Desserts", href: "/meal-time/dessert-recipes" },
          { label: "Weaning", href: "/meal-time/weaning" },
        ],
      },
      {
        title: "Free From",
        links: [
          { label: "Plant Based", href: "/allergen/vegan" },
          { label: "Vegetarian", href: "/allergen/vegetarian" },
          { label: "Dairy Free", href: "/allergen/dairy-free-recipes" },
          { label: "Egg Free", href: "/allergen/egg-free-recipes" },
          { label: "Gluten Free", href: "/allergen/gluten-free-recipes" },
          { label: "Nut Free", href: "/allergen/nut-free-recipes" },
        ],
      },
    ],
  },
  {
    label: "Advice",
    href: "/advice",
    groups: [
      {
        title: "Explore",
        links: [
          { label: "Articles", href: "/category/articles" },
          { label: "Our Experts", href: "/meet-our-experts" },
          { label: "Baby Nutrition", href: "/category/nutrition/baby-nutrition" },
          { label: "Toddler & Child", href: "/category/nutrition/nutrition-toddler-child" },
          { label: "Allergies", href: "/category/nutrition/nutrition-allergies" },
        ],
      },
      {
        title: "Hot Topics",
        links: [
          { label: "Pregnancy, birth & postnatal", href: "/advice-category/pregnancy-tips" },
          { label: "Health and Development", href: "/advice-category/child-health-and-development" },
          { label: "Sleep", href: "/advice/sleep" },
          { label: "Breastfeeding", href: "/advice/breastfeeding" },
          { label: "Bottle Feeding", href: "/advice/bottle-feeding" },
        ],
      },
    ],
  },
  {
    label: "Competitions",
    href: "/competitions",
    groups: [
      {
        title: "Community",
        links: [
          { label: "Competitions", href: "/competitions" },
          { label: "Our Partners", href: "/partners" },
          { label: "Pampers", href: "/competitions/pampers-2026" },
          { label: "Craft & Crumb", href: "/competitions/craft-crumb" },
          { label: "Pots for Tots", href: "/competitions/pots-for-tots" },
        ],
      },
    ],
  },
  {
    label: "Our Products",
    href: "/our-products",
    groups: [
      {
        title: "Ranges",
        links: [
          { label: "Little Meals", href: "/our-products/little-meals" },
          { label: "Tableware", href: "/our-products/tableware" },
          { label: "Chilled Meals", href: "/our-products/chilled-meals" },
          { label: "Frozen Meals", href: "/our-products/frozen-meals" },
          { label: "Baking Kits", href: "/our-products/baking-kits" },
          { label: "Cookbooks", href: "/our-products/cookbooks" },
        ],
      },
    ],
  },
  {
    label: "Recipe App",
    href: "/recipe-app",
    groups: [
      {
        title: "App",
        links: [
          { label: "Discover the App", href: "/recipe-app" },
          { label: "App for Business", href: "/recipe-app/business" },
          { label: "7-day free trial", href: "/recipe-app/free-trial" },
        ],
      },
    ],
  },
];

export const logoUrl =
  "https://www.annabelkarmel.com/wp-content/uploads/2023/09/AK_Logo-120x80-optimized.png";

export const heroSlides: HeroSlide[] = [
  {
    title: "Less prep time, more play time.",
    subtitle: "Delicious dinners at the speed of life.",
    cta: "Discover",
    href: "/our-products/chilled-meals",
    image: "/hero-slides/slide-1.png",
  },
  {
    title: "Snack attack!",
    subtitle: "Hangry tot? We've got you covered!",
    cta: "Discover",
    href: "/meal-time/snack",
    image: "/hero-slides/slide-2.png",
  },
  {
    title: "Mealtime ideas for all ages",
    subtitle: "Start your 7-day free trial today!",
    cta: "Discover",
    href: "/recipe-app/free-trial",
    image: "/hero-slides/slide-3.png",
  },
];

export const latestRecipes: RecipeCard[] = [
  {
    title: "Smoked Sweet Paprika, Pepper & Chicken Puree",
    duration: "20 mins",
    href: "/recipes/smoked-sweet-paprika-pepper-chicken-puree-2",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2025/05/Chicken-Puree-with-Smoked-Sweet-Paprika-768x960-optimized.jpg",
  },
  {
    title: "Salmon & Spinach Fritters",
    duration: "15 mins",
    href: "/recipes/salmon-spinach-fritters-2",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2025/02/Salmon-and-Spinach-Fritters-p.185-768x1006-1-optimized.jpg",
  },
  {
    title: "Sweet Potato & Chicken Croquettes",
    duration: "15 mins",
    href: "/recipes/sweet-potato-chicken-croquettes-2",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2025/02/Sweet-Potato-and-Chicken-Croquettes-p.126-768x1008-1-optimized.jpg",
  },
  {
    title: "Mac 'n' Cheese Veggie Muffins",
    duration: "40 mins",
    href: "/recipes/mac-n-cheese-veggie-muffins",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2025/02/Mac-%E2%80%98n-Cheese-Veggie-Muffin-p.99-768x1118-1-optimized.jpg",
  },
  {
    title: "Easy Teriyaki Salmon",
    duration: "22 mins",
    href: "/recipes/104277",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2024/09/SALMON-1-1-768x960-optimized.jpg",
  },
  {
    title: "Rainbow Veggie Pizza",
    duration: "25 mins",
    href: "/recipes/rainbow-veggie-pizza",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2024/09/RAINBOW-PIZZA-2-1-scaled-e1741012376348-768x769-optimized.jpg",
  },
  {
    title: "Choc Orange Marble Cake",
    duration: "45 mins",
    href: "/recipes/choc-orange-marble-cake",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2024/09/MARBLE-CAKE-1-1-scaled-e1741012470291-768x768-optimized.jpg",
  },
  {
    title: "Easy 5-Veg Croquettes",
    duration: "20 mins",
    href: "/recipes/easy-5-veg-croquettes",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2024/09/CROQUETTES-2-768x960-optimized.jpg",
  },
  {
    title: "Best-ever Roast Beef",
    duration: "45 mins",
    href: "/recipes/best-ever-roast-beef",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2024/09/ROAST-BEEF-1-1-768x1152-optimized.jpg",
  },
  {
    title: "Veggie Frittata Fingers",
    duration: "20 mins",
    href: "/recipes/veggie-frittata-fingers",
    image:
      "https://www.annabelkarmel.com/wp-content/uploads/2024/10/AKBABY3-scaled-e1729072983537-768x768-optimized.jpg",
  },
];

export const appFeatureCards: VisualCard[] = [
  {
    title: "Simple search tool",
    subtitle: "Handy filters to help you find what you are looking for",
    image: "/home page/app-carousel/01-simple-search-tool.png",
  },
  {
    title: "Bite-sized weaning tutorials",
    subtitle: "Unlimited access to Annabel's listen-along weaning guide",
    image: "/home page/app-carousel/02-weaning-tutorials.png",
  },
  {
    title: "Allergy support",
    subtitle: "Essential advice for managing common food allergies",
    image: "/home page/app-carousel/03-allergy-support.png",
  },
  {
    title: "Helpful guides",
    subtitle: "Latest tips and advice, from teething to finger foods",
    image: "/home page/app-carousel/04-helpful-guides.png",
  },
  {
    title: "First foods index",
    subtitle: "Learn how to safely introduce 50 nutritious first foods",
    image: "/home page/app-carousel/05-first-foods-index.png",
  },
  {
    title: "Ideas for every age and stage",
    subtitle: "Over 1,250 recipes that grow with your family",
    image: "/home page/app-carousel/06-ideas-every-age.png",
  },
];

export const appSectionContent: AppSectionContent = {
  awards: [
    "/home page/made-for-mums.webp",
    "/home page/made-for-mums-optimized.webp",
    "/home page/Frame-5-optimized.webp",
  ],
  title: "Annabel’s #1 recipe app",
  bullets: ["1500+ baby, toddler & family recipes", "New ideas weekly", "Essential tips and advice"],
  ctaLabel: "Discover more",
  ctaHref: "/recipe-app",
};

export const awardLogos = [
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_03-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_04-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_05-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_06-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_07-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_09-optimized.png",
  "https://www.annabelkarmel.com/wp-content/uploads/2025/04/AWARDS_08-optimized.png",
];

export const expertRangeCards: ExpertRangeCard[] = [
  {
    title: "Fridge meals",
    image: "/home page/anabelle expert/Chilled_Meals-img-optimized.webp",
    href: "/our-products/chilled-meals",
  },
  {
    title: "Freezer meals",
    image: "/home page/anabelle expert/Homepage-Hero-Section-scaled2-optimized.jpg",
    href: "/our-products/frozen-meals",
  },
];

export const bestsellingCookbooks: CookbookCard[] = [
  {
    title: "Finger Foods for Babies & Toddlers",
    image: "/home page/best selling cookbooks/food-optimized.jpg",
    href: "/our-products/cookbooks/finger-foods",
  },
  {
    title: "Weaning",
    image: "/home page/best selling cookbooks/weaning-optimized.jpg",
    href: "/our-products/cookbooks/weaning-2",
  },
  {
    title: "Complete Baby & Toddler Meal Planner",
    image: "/home page/best selling cookbooks/toddler-optimized.jpg",
    href: "/our-products/cookbooks/new-complete-baby-toddler-meal-planner-25th-anniversary-edition",
  },
  {
    title: "My First Cookbook",
    image: "/home page/best selling cookbooks/cookbook-optimized.jpg",
    href: "/our-products/cookbooks/my-first-cookbook",
  },
  {
    title: "Where Does My Food Come From?",
    image: "/home page/best selling cookbooks/where-optimized.jpg",
    href: "/our-products/cookbooks/where-does-my-food-come-from",
  },
  {
    title: "Fun, Fast & Easy Children's Cookbook",
    image: "/home page/best selling cookbooks/Fun-Fast-Easy-2-optimized.jpg",
    href: "/our-products/cookbooks/fun-fast-easy-childrens-cookbook",
  },
  {
    title: "Weaning Made Simple",
    image: "/home page/best selling cookbooks/weaningmade-optimized.jpg",
    href: "/our-products/cookbooks/weaning-made-simple",
  },
  {
    title: "Real Food Kids Will Love",
    image: "/home page/best selling cookbooks/kids-optimized.jpg",
    href: "/our-products/cookbooks/real-foods-kids-will-love",
  },
  {
    title: "Busy Mum's Cookbook",
    image: "/home page/best selling cookbooks/recips-optimized.jpg",
    href: "/our-products/cookbooks/busy-mums-cookbook",
  },
  {
    title: "Baby-Led Weaning Recipe Book",
    image: "/home page/best selling cookbooks/1-optimized.jpg",
    href: "/our-products/cookbooks/baby-led-weaning-recipe-book",
  },
  {
    title: "Family Cookbook",
    image: "/home page/best selling cookbooks/3-optimized.jpg",
    href: "/our-products/cookbooks/annabels-family-cookbook",
  },
  {
    title: "Baby's First Year Journal",
    image: "/home page/best selling cookbooks/2-optimized.jpg",
    href: "/our-products/cookbooks/babys-first-year-journal",
  },
];

export const collabCards: CollabCard[] = [
  {
    title: "Craft & Crumb",
    subtitle: "Bake, create and have fun!",
    href: "/competitions/craft-crumb",
    logoImage: "/home page/anabelle collabs/background image.webp",
    cardImage: "/home page/anabelle collabs/cards/Craft-Crumb-scaled-optimized.webp",
  },
  {
    title: "Pots for Tots",
    subtitle: "Handmade bites & meals for babies & tots",
    href: "/competitions/pots-for-tots",
    logoImage: "/home page/anabelle collabs/579136-logo-1708518539-optimized.webp",
    cardImage: "/home page/anabelle collabs/cards/PFT-homepage-optimized.webp",
  },
];

export const partnerLogos = [
  {
    name: "Sani Resort",
    image: "/home page/partners/1.-Sani-Resort-optimized.webp",
    href: "/partners/sani-resort",
  },
  {
    name: "Pampers",
    image: "/home page/partners/2.-pampers-optimized.webp",
    href: "/partners/pampers",
  },
  {
    name: "Dualit",
    image: "/home page/partners/3.-Dualit-optimized.webp",
    href: "/partners/dualit",
  },
  {
    name: "P&O Cruises",
    image: "/home page/partners/4-optimized.webp",
    href: "/partners/po-cruises",
  },
  {
    name: "Bugaboo",
    image: "/home page/partners/5.-Bugaboo-optimized.webp",
    href: "/partners/bugaboo",
  },
  {
    name: "Symprove",
    image: "/home page/partners/6.-Symprove-optimized.webp",
    href: "/partners/symprove",
  },
  {
    name: "HECK",
    image: "/home page/partners/7.-Heck-optimized.webp",
    href: "/partners/heck",
  },
  {
    name: "Jumeirah Carlton Tower",
    image: "/home page/partners/8.-Jumeirah-Carlton-Tower-optimized.webp",
    href: "/partners/jumeirah-carlton-tower",
  },
  {
    name: "Green Giant",
    image: "/home page/partners/9.-Green-Giant-optimized.webp",
    href: "/partners/green-giant",
  },
  {
    name: "Warburtons",
    image: "/home page/partners/10.-Warburtons-optimized.webp",
    href: "/partners/warburtons",
  },
  {
    name: "Hamleys",
    image: "/home page/partners/11.-Hamleys-optimized.webp",
    href: "/partners/hamleys",
  },
  {
    name: "Reading Eggs",
    image: "/home page/partners/12.-Reading-eggs-optimized.webp",
    href: "/partners/reading-eggs",
  },
  {
    name: "Emirates",
    image: "/home page/partners/13.-Emirates-optimized.webp",
    href: "/partners/emirates",
  },
  {
    name: "Miele",
    image: "/home page/partners/14.-Miele-optimized.webp",
    href: "/partners/miele",
  },
  {
    name: "Kallo",
    image: "/home page/partners/15.-Kallo-optimized.webp",
    href: "/partners/kallo",
  },
  {
    name: "Baby Annabell",
    image: "/home page/partners/16.-baby-Annabell-optimized.webp",
    href: "/partners/baby-annabell",
  },
];

export const footerLinkColumns: NavGroup[] = [
  {
    title: "Annabel Karmel",
    links: [
      { label: "About Annabel Karmel", href: "https://www.annabelkarmel.com/about-annabel-karmel/" },
      { label: "Contact Us", href: "https://www.annabelkarmel.com/contact/" },
      {
        label: "Annabel's Baby & Toddler App",
        href: "https://www.annabelkarmel.com/the-ultimate-baby-toddler-recipe-app/",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "https://www.annabelkarmel.com/privacy-policy/" },
      { label: "Terms & Conditions", href: "https://www.annabelkarmel.com/terms-conditions/" },
      { label: "Cookie Policy", href: "https://www.annabelkarmel.com/cookie-policy/" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/annabelkarmel/" },
      { label: "Facebook", href: "https://www.facebook.com/annabelkarmel/" },
      { label: "Pinterest", href: "https://www.pinterest.co.uk/annabelkarmel/" },
      { label: "Tiktok", href: "https://www.tiktok.com/@annabelkarmelofficial" },
    ],
  },
];

/** Left → right matches site strip: yoghurt reel, nappy carousel, eggs, quote, burger reel, salmon carousel */
export const instagramPostCards: InstagramPostCard[] = [
  {
    href: "/instagram/post-1",
    image: "/home page/insta images/670802490_1863107937686587_4855595673991752587_n.jpg",
    kind: "video",
  },
  {
    href: "/instagram/post-2",
    image: "/home page/insta images/670540182_18589797889037816_6122834599263660726_n.jpg",
    kind: "carousel",
  },
  {
    href: "/instagram/post-3",
    image: "/home page/insta images/669507134_18589300015037816_7211905225444844087_n.jpg",
    kind: "image",
  },
  {
    href: "/instagram/post-4",
    image: "/home page/insta images/669053108_18589298416037816_1648841802693883020_n.jpg",
    kind: "image",
  },
  {
    href: "/instagram/post-5",
    image: "/home page/insta images/670161684_18589288627037816_5787670877465417401_n.jpg",
    kind: "video",
  },
  {
    href: "/instagram/post-6",
    image: "/home page/insta images/662031208_18589056445037816_8836927448447459310_n.jpg",
    kind: "carousel",
  },
];

export const expertsIntro =
  "We've partnered with the UK's top experts to give you the latest first-hand advice on all those important areas in raising happy, healthy babies, children & parents! From allergies to breast and bottle feeding, sleep to post-natal care and wellness, we've got your questions and concerns covered.";

export const expertDetails: ExpertDetail[] = [
  {
    slug: "maria-betsworth",
    name: "Maria Betsworth",
    role: "CFC Breastfeeding specialist",
    image: "/meet-our-experts/maria-betsworth.jpg",
    sourceUrl: "https://www.annabelkarmel.com/experts/maria-betsworth/",
    introParagraphs: [
      "The first six months of your baby's life are some of the most crucial for growth. So whether you're breastfeeding, bottle feeding or doing a combination of both, we have all the advice you need from our resident expert to help give your baby the very best start.",
    ],
    bioParagraphs: [
      "Maria Betsworth, CLC, is a London-based German mum of two little girls (4 and 2.5 years). She runs a community helping mums get together to motivate, educate and support each other through their breastfeeding, pumping and bottle feeding journey.",
      "Maria is a qualified Antenatal teacher, birth educator, doula, and certified breastfeeding specialist. She has a BSC in Chinese medicine and acupuncture, specialising in antenatal and postnatal care.",
      "Visit Maria's @milkmakingmama community on Instagram for even more advice and support.",
    ],
    articleTopics: [
      { title: "Paced bottle feeding" },
      { title: "Responsive Bottle Feeding" },
      { title: "Breastmilk storage" },
      { title: "Pumping" },
      { title: "Newborn feeding patterns" },
      { title: "Breastfeeding friendly bottle feeding" },
      { title: "Comfort feeding" },
      { title: "Finding a pumping routine" },
      { title: "Breastfeeding cues" },
      { title: "Are endless breastfeeding sessions normal" },
      { title: "How to sterilise bottles" },
      { title: "Myths about breastfeeding and breast milk busted" },
      { title: "The different infant formula milks" },
      { title: "Introduction to breastfeeding" },
      { title: "Getting the perfect latch" },
      { title: "Choosing & preparing formula milk" },
      { title: "Managing breast engorgement" },
      { title: "You've got enough milk" },
    ],
  },
  {
    slug: "kerry-secker",
    name: "Kerry Secker",
    role: "Paediatric sleep consultant",
    image: "/meet-our-experts/kerry-secker.jpg",
    sourceUrl: "https://www.annabelkarmel.com/experts/kerry-secker/",
    introParagraphs: [
      "Sleepless nights are undoubtedly one of the toughest parts of being a parent. Having a baby or toddler that doesn't sleep can leave you feeling as though you're doing something wrong, and that you're the reason your little one is unsettled, fractious and upset. And that's why we are here with experienced paediatric sleep consultant Kerry Secker to help bring you sleep salvation.",
    ],
    bioParagraphs: [
      "Kerry is a paediatric sleep consultant and former Nanny with over 20 years' experience in supporting and advising families with sleep. She is also the founder of her unique Care It Out sleep approach.",
      "She's on a mission to get parents a settle night's sleep without tears or sleep training techniques.",
      "Kerry focuses on the fact that all families and children are unique and there isn't a quick fix or one size fits all solution when it comes to children's sleep. There is always a biological reason and sleep science behind bedtime behaviour, and a caring way forward.",
      "She's also passionate about having realistic sleep expectations and that sleep doesn't need fixing; issues are only an issue if they are one for your family.",
      "As well as running her popular Care It Out sleep sessions across the UK, Kerry has launched an Ecourse, and you can also download her free video to get you started.",
      "Also follow Kerry on Facebook and Instagram.",
    ],
    articleTopics: [
      {
        title: "Busting common baby sleep myths",
        href: "https://www.annabelkarmel.com/advice/busting-common-baby-sleep-myths/",
        image: "https://www.annabelkarmel.com/wp-content/uploads/2019/07/shutterstock_578423287-1024x1024-optimized.jpg",
      },
      {
        title: "Supporting your baby if they wake at night",
        href: "https://www.annabelkarmel.com/advice/supporting-baby-wake-night/",
        image: "https://www.annabelkarmel.com/wp-content/uploads/2019/08/shutterstock_567049537-1-optimized.jpg",
      },
      {
        title: "Resettling at nap times",
        href: "https://www.annabelkarmel.com/advice/baby-nap-times/",
        image: "https://www.annabelkarmel.com/wp-content/uploads/2019/03/shutterstock_553886122-optimized.jpg",
      },
      {
        title: "Baby sleep: the biology behind bedtime",
        href: "https://www.annabelkarmel.com/advice/baby-bedtime/",
        image: "https://www.annabelkarmel.com/wp-content/uploads/2016/08/Sleep-optimized.jpg",
      },
      {
        title: "The bedtime routine and preparing for sleep separation",
        href: "https://www.annabelkarmel.com/advice/baby-sleep-routine/",
        image: "https://www.annabelkarmel.com/wp-content/uploads/2019/08/shutterstock_683173993-1-optimized.jpg",
      },
    ],
  },
  {
    slug: "alexis-stickland-and-beccy-hands",
    name: "Alexis Stickland & Beccy Hands",
    role: "Midwife & doula duo",
    image: "/meet-our-experts/alexis-beccy.jpg",
    sourceUrl: "https://www.annabelkarmel.com/experts/alexis-stickland-and-beccy-hands/",
    introParagraphs: [
      "Expecting a baby? With our expert team, we'll guide you through every step of this exciting journey, from common symptoms and your changing body, through to what to pack in your hospital bag and what to expect during labour.",
      "We also cover postnatal care for both mum and baby - after all, you've both gone through the most emotional and physically taxing experience of your lives. Our midwife and doula duo are on hand with a whole host of tools, tips and advice to support you.",
    ],
    bioParagraphs: [
      "Alexis has been a registered midwife for over a decade, and in recent years, she has taken her passion for supporting parents-to-be further, specialising in antenatal education and hypnobirthing.",
      "Alexis is a member of the association of Hypnobirthing midwives. When it comes to motherhood, she believes with a passion that knowledge is power. The birth of a baby changes everything and we need to support and empower women on this incredible journey.",
      "After a busy and exhausting career as a producer in the TV & Film industry, Beccy decided to take a bit of a leap of faith in 2000 and re-train as a remedial massage therapist, specialising in pre-and postnatal clinical massage.",
      "During this time, she also trained as a birth and postnatal Doula, working with midwives & physios across Asia and South America. This is where she really started to understand the importance of nurturing new mums, mentally and physically. This has been the driving force for much of her postnatal work over the years, supporting women during pregnancy and the postnatal period and encouraging new mums to really take time out to rest and recoup after childbirth.",
      "Alexis and Beccy are the duo behind The Mother Box - a complete package of pregnancy, birth and postnatal gifts, courses and workshops carefully created to nurture, heal and empower new mums.",
      "Everything every mum needs to know about the postnatal period can also be found in their The Little Book of Self-Care for New Mums; a handy survival guide to becoming a new mum.",
      "For lots more support and advice, visit @the_mother_box on Instagram.",
      "Excerpt from The Little Book of Self Care for New Mums by Beccy Hands & Alexis Stickland (Vermillion, GBP12.99).",
    ],
    articleTopics: [
      {
        title: "Top ten tips for the fourth trimester",
        href: "/advice/top-ten-tips-fourth-trimester",
        image: "/advice-category/pregnancy-tips/fourth-trimester.jpg",
      },
      {
        title: "Your pregnancy month-by-month",
        href: "/advice/pregnancy-month-month",
        image: "/advice-category/pregnancy-tips/pregnancy-month-by-month.jpg",
      },
      {
        title: "Nesting in pregnancy: why and how to",
        href: "/advice/nesting",
        image: "/advice-category/pregnancy-tips/nesting.jpg",
      },
      {
        title: "What to buy",
        href: "/advice/what-to-buy",
        image: "/advice-category/pregnancy-tips/what-to-buy.jpg",
      },
    ],
  },
  {
    slug: "amy-ransom",
    name: "Amy Ransom",
    role: "Mum, writer & author",
    image: "/meet-our-experts/amy-ransom.jpg",
    sourceUrl: "https://www.annabelkarmel.com/experts/amy-ransom/",
    introParagraphs: [
      "Yes, yes. We've been told a thousand times how important it is to take care of ourselves. We know that when we put our best self forward and feel happy and healthy (mentally and physically), it overflows onto our children and we're more patient, joyful parents. But let's face it; knowing and doing are completely different things.",
      "When on earth do we find the time for 'me' when drop-offs, pick-ups, work, after-school clubs, playdates, dinner, bedtime, bedtime wake-ups have us tied-up on a daily basis?",
      "Reality check; the struggle to step out of that comfort zone of putting everyone but yourself first is real. It's oh so hard. That's why we've enlisted the brilliant Amy Ransom to share her honest, frank advice.",
    ],
    bioParagraphs: [
      "Amy is, first and foremost, a solo mum of three, just emerging from the early years. She's also the author of The New Mum's Notebook, The Not-So-New Mum's Notebook and The School Mum's Notebook, sanity saving journals to support mums and their wellbeing in every stage of motherhood, which she created after suffering from PND with her third baby. Find them at notebooksformums.co.uk.",
      "Her parenting ethos is encouraging herself and others to savour the ordinary moments and lean back in challenging times. It's a constant work in progress!",
      "You can follow Amy over on Instagram @amyransomwrites and @notebooksformums and Facebook @amyransomwrites.",
    ],
    articleTopics: [{ title: "The Truth About Sleep" }],
  },
  {
    slug: "professor-adam-fox",
    name: "Professor Adam Fox",
    role: "Paediatric allergy specialist",
    image: "/meet-our-experts/prof-adam-fox.jpg",
    sourceUrl: "https://www.annabelkarmel.com/experts/professor-adam-fox/",
    introParagraphs: [
      "Professor Fox is one of only a handful of UK doctors with recognised higher specialist training in Paediatric Allergy. He is a consultant at Guy's & St Thomas' Hospitals - the UK's largest specialist children's allergy centre, where he is Clinical Director.",
      "He has extensive experience in the management of food allergy, eczema, asthma, rhinitis (hayfever) and conjunctivitis as well as drug and insect sting allergy. Professor Fox runs the largest allergen desensitisation programme in the UK and is actively involved in cutting edge research in desensitisation, asthma prevention and food allergy.",
      "He is senior author of the Milk Allergy in Primary Care guideline, which has been widely adopted across the world and Chairman of the Paediatric committee of the British Society of Allergy & Clinical Immunology.",
      "Professor Fox was awarded 'Paediatric Allergist of the Year' from Allergy UK in 2007. His doctoral thesis on peanut allergy received the Raymond Horton Smith prize from Cambridge University in 2012 and he was included in The Times 'Britain's 100 Best Children's Doctor's' as well as The Tatler Doctor's List (Top UK 250 consultants).",
      "Professor Fox received the William Frankland Award for Outstanding contribution to Allergy by the British Society of Allergy & Clinical Immunology in 2015 and a National Clinical Excellence award from the UK Department of Health in 2016.",
      "www.allergylondon.com",
    ],
    articleTopics: [
      { title: "Professor Adam Fox, paediatric allergy specialist" },
      { title: "Breastfeeding and food allergies" },
      { title: "Travelling with children with food allergies" },
      { title: "Food allergy vs. food intolerance" },
      { title: "Cow's milk allergy" },
      { title: "Is eczema linked to food allergies?" },
      { title: "Allergies: finding support" },
      { title: "The most common food allergens in the UK" },
      { title: "Weaning and baby allergies" },
      { title: "Egg allergy" },
      { title: "Spotting food allergy symptoms" },
      { title: "Most common food allergies in babies" },
      { title: "Managing my child's food allergy" },
      { title: "Are allergies genetic?" },
      { title: "Allergies with Professor Adam Fox" },
    ],
  },
  {
    slug: "jenna-brown",
    name: "Jenna Brown",
    role: "Environmental health practitioner",
    image: "/meet-our-experts/jenna-brown.png",
    sourceUrl: "https://www.annabelkarmel.com/experts/jenna-brown/",
    introParagraphs: [
      "Jenna is a fully qualified Environmental Health Practitioner specialising in food safety and public health.",
      "She obtained a first-class Bachelor (BSc) degree in Environmental Health and has since qualified as an Environmental Health Practitioner with the Chartered Institute of Environmental Health (CIEH). Over the past 12 years she has worked in both the public and private sector advising businesses on all things food safety and public health.",
    ],
    articleTopics: [
      { title: "Top tips for thinning baby purees" },
      { title: "Weaning Equipment - Getting your kitchen ready for weaning" },
      { title: "Go to guide: preparing, freezing and reheating foods for baby" },
      { title: "Go to Guide: Handling Leftovers Safely" },
    ],
  },
  {
    slug: "gemma-arnold-sophia-ziff-mental-health-behaviour-and-wellbeing-specialists",
    name: "Gemma Arnold & Sophia Ziff",
    role: "Mental Health, Behaviour and Wellbeing Specialists",
    image: "/meet-our-experts/gemma-sophia.jpg",
    sourceUrl: "https://www.annabelkarmel.com/experts/gemma-arnold-sophia-ziff-mental-health-behaviour-and-wellbeing-specialists/",
    introParagraphs: [
      "Gemma Arnold (PGCE Primary Education at Institute of Education, BSc Hons Psychology at The University of Birmingham) and Sophia Ziff (PGCE English Secondary at Canterbury Christ Church University, BA Hons Art History at The Courtauld Institute of Art).",
      "Gemma and Sophia are Mental Health, Behaviour and Wellbeing specialists, with a combined 16 years of teaching experience across primary and secondary settings, having trained together on the Teach First Leadership Development Programme in 2013. They are also trained Youth Mental Health First Aiders with Mental Health First Aid England and Mental Health Champions with Place 2 Be.",
      "As a teacher, Gemma has worked in multiple primary school settings and has completed further intensive training in mental health support and has worked within the SENDCo department in school. She is working towards her certificate in Counselling for Children with Place2be to become a Child Psychotherapist and is currently a Year 4 Teacher. Sophia has worked as an English Literature and Language Secondary school teacher and has experience in pastoral management, leading Year 7 and 11 forms and Year 8 Year Group. Moreover, she has designed and delivers 1-1 Teen Mentoring Programmes, whole school wellbeing initiatives and Relationship Sex Health Education and Physical Social Health Education content in her current Mentoring and Student Wellbeing Coordinator capacity. Sophia will begin her Senior Mental Health Lead Diploma at Leeds Beckett Uni next academic year.",
      "Sophia and Gemma are both mums of toddlers and trained Youth Mental Health First Aiders and can totally relate firsthand to the many trials and tribulations parents face! In response to multiple pandemic lockdowns, they developed ToddlersTeensAndBetween to support parents with the wellbeing, behaviour and mental health of their toddlers, teens and between. They offer Bespoke Support and have just released their first online course for parents of babies, toddlers and early years children aged 0-6: The Younger Years Course.",
    ],
    socialLink: {
      label: "Toddlers Teens And Between",
      href: "https://www.toddlersteensandbetween.com/",
    },
    articleTopics: [
      {
        title: "Toddler Top Tips to Healthy Food Habits",
        href: "/advice/toddler-top-tips-to-healthy-food-habits",
        image: "/advice-category/child-health-and-development/toddler-top-tips.jpg",
      },
    ],
  },
];
