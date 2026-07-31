const assetBase = '/recipe-app';

export const recipeAppLinks = {
  appStore:
    'https://apps.apple.com/us/app/baby-toddler-recipe-app/id409157308?platform=iphone',
  playStore:
    'https://play.google.com/store/apps/details?id=com.applikation.annabelkarmel&hl=en&gl=US',
  trialCta: 'https://annabelkaremel.onelink.me/MP0T/y7jrx92n',
};

export const recipeAppAssets = {
  heroDesktop: `${assetBase}/hero-desktop.png`,
  heroDesktopWidth: 1920,
  heroDesktopHeight: 1080,
  heroMobile: `${assetBase}/hero-mobile.png`,
  heroMobileWidth: 768,
  heroMobileHeight: 1200,
  group1: `${assetBase}/group1.png`,
  group1Width: 1102,
  group1Height: 1086,
  group2: `${assetBase}/group2.png`,
  group2Width: 470,
  group2Height: 1086,
  joinMobileBottomCollage: `${assetBase}/recipes/recipe-2.svg`,
  joinMobileBottomCollageWidth: 391,
  joinMobileBottomCollageHeight: 131,
  annabelQuote: `${assetBase}/annabel-quote.png`,
  annabelQuoteWidth: 600,
  annabelQuoteHeight: 485,
  vectorQuote: `${assetBase}/vector-quote.png`,
  customersBg: `${assetBase}/customers-bg.png`,
  pricingVector: `${assetBase}/pricing-vector.png`,
  testimonialAvatar: `${assetBase}/testimonial-avatar.png`,
  appStoreBadge: `${assetBase}/app-store.png`,
  googlePlayBadge: `${assetBase}/google-play.png`,
  discoverCallout: `${assetBase}/discover/callout.svg`,
};

export const recipeAppHero = {
  eyebrow: 'JOIN 100,000+ FAMILIES ALREADY USING THE APP',
  title: 'The Multi Award-Winning Baby & Toddler Recipe App',
  bullets: [
    {
      lead: '1500+ baby, toddler & family recipes',
      text: 'Nutritious ideas for every age and stage',
    },
    {
      lead: 'New ideas weekly',
      text: 'Your inspiration for everyday cooking',
    },
    {
      lead: 'Essential tips and advice',
      text: 'Practical support for weaning and beyond',
    },
  ],
  trialHeading: 'Start your 7 day free trial',
};

export const recipeAppIntro = {
  title: 'Your go-to recipe app for every age & stage',
  body: "Whether you're feeding your baby, toddler, or the entire family, Annabel's recipe app keeps mealtimes fresh and easy. With simple recipes for every age, stage and occasion – and new dishes added every week – it's no wonder parents call Annabel's app their essential kitchen companion!",
};

export const recipeAppAwards = [
  {
    src: `${assetBase}/awards/platinum-logo.png`,
    alt: 'Tried and Tested Platinum award',
    width: 2080,
    height: 2560,
  },
  {
    src: `${assetBase}/awards/mama-awards-2024.png`,
    alt: 'Mother & Baby Awards 2024',
    width: 207,
    height: 199,
  },
  {
    src: `${assetBase}/awards/best-family-app.png`,
    alt: 'Best Family App 2026 award',
    width: 1839,
    height: 2560,
  },
  {
    src: `${assetBase}/awards/product-silver.png`,
    alt: 'Product silver award',
    width: 157,
    height: 211,
  },
  {
    src: `${assetBase}/awards/mum-marketplace.jpeg`,
    alt: 'Mum Marketplace 2026 award',
    width: 836,
    height: 879,
  },
  {
    src: `${assetBase}/awards/best-2024.png`,
    alt: 'Best 2024 award',
    width: 201,
    height: 209,
  },
];

export const recipeAppJoin = {
  title: "Join Annabel's Baby & Toddler Recipe App today",
  price: 'Only £4.99 a month',
  cta: 'Start your 7-day FREE trial',
  rating: '4.5 • 1.7K Ratings',
};

export const recipeAppQuote = {
  text: "My award-winning recipe app brings you expert, nutritious, and easy-to-make meals that will win-over babies, toddlers, and the whole family. It's your everyday essential for stress-free mealtimes.",
  author: 'Annabel Karmel',
};

const featureImage = 1024;

export const recipeAppFeatures = [
  {
    id: 'library',
    eyebrow: 'YOUR GO-TO RECIPE LIBRARY',
    title: '1500+ easy, nutritious ideas',
    body: "It's simple to search for and discover tasty, simple recipes for every age and stage, from weaning and baby, to toddler and family.",
    cta: 'Join today',
    image: `${assetBase}/features/1500-ideas.png`,
    mobileImage: `${assetBase}/features/mobile-ideas.png`,
    imageWidth: featureImage,
    imageHeight: featureImage,
    mobileImageWidth: 573,
    mobileImageHeight: 625,
    variant: 'pink' as const,
  },
  {
    id: 'weekly',
    eyebrow: 'WEEKLY INSPIRATION',
    title: 'Fresh ideas every week!',
    body: "Enjoy a batch of new recipes fresh out of Annabel's kitchen every week. PLUS, dip into popular Recipe Collections.",
    cta: 'Get started',
    image: `${assetBase}/features/fresh-ideas.png`,
    mobileImage: `${assetBase}/features/mobile-fresh.png`,
    imageWidth: featureImage,
    imageHeight: featureImage,
    mobileImageWidth: 573,
    mobileImageHeight: 625,
    variant: 'blue' as const,
  },
  {
    id: 'bank',
    eyebrow: 'SAVE & ORGANISE',
    title: 'Build your recipe bank',
    body: 'Save and store your favourite recipes to make shopping and cooking for the family easy.',
    cta: 'Explore now',
    image: `${assetBase}/features/recipe-bank.png`,
    mobileImage: `${assetBase}/features/mobile-bank.png`,
    imageWidth: featureImage,
    imageHeight: featureImage,
    mobileImageWidth: 500,
    mobileImageHeight: 672,
    variant: 'purple' as const,
  },
];

const recipeThumb = 196;

export const recipeAppCategories = [
  {
    label: 'First foods',
    image: `${assetBase}/recipes/first-foods.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: '6-9 months',
    image: `${assetBase}/recipes/6-9-months.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: '9-12 months',
    image: `${assetBase}/recipes/9-12-months.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: '12-18 months',
    image: `${assetBase}/recipes/12-18-months.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Finger foods',
    image: `${assetBase}/recipes/finger-foods.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Toddler',
    image: `${assetBase}/recipes/toddler.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Snacks',
    image: `${assetBase}/recipes/snacks.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Lunchboxes',
    image: `${assetBase}/recipes/lunchboxes.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Family meals',
    image: `${assetBase}/recipes/family-meals.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Breakfast',
    image: `${assetBase}/recipes/breakfast.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Allergies',
    image: `${assetBase}/recipes/allergies.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
  {
    label: 'Vegetarian',
    image: `${assetBase}/recipes/vegetarian.jpg`,
    width: recipeThumb,
    height: recipeThumb,
  },
];

export const recipeAppWeaningPhoneDisplay = {
  maxWidth: 200,
  visibleHeight: 223,
} as const;

export const recipeAppWeaning = {
  desktopTitle: 'Weaning Support',
  mobileTitle: 'Weaning Hub',
  body: "Your go-to resource for safe and easy weaning, guiding you through every step of your baby's first foods journey.",
  frameBg: `${assetBase}/weaning/frame-bg.png`,
  cards: [
    {
      title: 'First foods index',
      body: 'Learn how to safely introduce 100+ nutritious first foods',
      image: `${assetBase}/weaning/first-foods-index.png`,
      imageWidth: 200,
      imageHeight: 223,
    },
    {
      title: 'Expert advice',
      body: 'Quick bite-sized reads, from teething to fussy eating',
      image: `${assetBase}/weaning/expert-advice.png`,
      imageWidth: 200,
      imageHeight: 223,
    },
    {
      title: 'First foods tracker',
      body: 'Keep track of the foods your little one has tried and loved',
      image: `${assetBase}/weaning/first-foods-tracker.png`,
      imageWidth: 200,
      imageHeight: 223,
    },
  ],
};

export const recipeAppDiscoverFeatures = [
  {
    id: 'allergy',
    label: 'Handy allergy tracker',
    body: 'Create a food reaction log to share with your healthcare professional',
    image: `${assetBase}/discover/allergy-tracker.png`,
    imageWidth: 900,
    imageHeight: 700,
  },
  {
    id: 'planner',
    label: 'Custom Meal Planners',
    body: "Follow Annabel's expert planners or curate your own",
    image: `${assetBase}/discover/meal-plans.png`,
    imageWidth: 900,
    imageHeight: 700,
  },
  {
    id: 'thumbs',
    label: 'Thumbs up?',
    body: 'Easily keep tabs on recipes your baby loves',
    image: `${assetBase}/discover/thumbs-up.png`,
    imageWidth: 900,
    imageHeight: 700,
  },
  {
    id: 'collections',
    label: "Annabel's recipe collections",
    body: 'New ideas to refresh your weekly repertoire',
    image: `${assetBase}/discover/recipe-collections.png`,
    imageWidth: 900,
    imageHeight: 700,
  },
  {
    id: 'search',
    label: 'Simple search tool',
    body: "Handy filters to find what you're looking for",
    image: `${assetBase}/discover/search.png`,
    imageWidth: 900,
    imageHeight: 700,
  },
];

export const recipeAppTestimonials = [
  {
    quote:
      "I'm not the most competent in the kitchen but Annabel's recipe hit with my little girl every time, I must say the recipes are great for me too!",
    name: 'Greg S W',
  },
  {
    quote:
      "Lots of recipes and inspiration, and super helpful to search for an ingredient and filter by age group. Absolute must have for children's food!",
    name: 'Jules_444',
  },
  {
    quote:
      "The recipes are easy to follow and quick to make, I've found so many meals that my fussy baby will always eat",
    name: 'eve_f96',
  },
  {
    quote:
      'Love the variety of recipes available on the app and the fact it is constantly updated. Keeps ideas fresh and never makes mealtimes boring.',
    name: 'Kkavia',
  },
  {
    quote:
      'I love the planners as I felt completely clueless going into weaning with my little boy. It takes some of the stress away!',
    name: 'Dfc204',
  },
  {
    quote:
      "As a mum who isn't a great cook and who was really panicking about what to make her son, this app has been a lifesaver. Also very handy that you can filter by dairy-free as my son has an intolerance",
    name: 'KezT23',
  },
  {
    quote:
      'As a first time mum, the audio section on weaning is really useful ad has given me the confidence to start weaning my baby',
    name: 'BrookeCartmell',
  },
  {
    quote:
      'What a fantastic app! It has helped us so much with our little boys, weaning from when he was 6 months old and trying foods for the first time, to even now with an 18-month-old toddler who will eat most things!',
    name: 'Fallan&Jackson',
  },
  {
    quote:
      'I have a 2 year old (egg & peanut allergy) and a 6 month old (possible dairy allergy) and found this app really helpful and allergy friendly',
    name: 'Thkendrick90',
  },
  {
    quote:
      "A friend from baby group recommended this app and I'm so glad she did! Lots of the recipes are quick and simple and include ingredients you tend to have at home anyway making it all SO much easier!",
    name: 'Samx5',
  },
  {
    quote:
      'The 15 min meals are just amazing, absolute life saver and the kids love them',
    name: 'cmz1981',
  },
];

export const recipeAppPricing = {
  title: 'Choose your plan',
  body: 'Enjoy nutritious recipes, custom meal planners, and more for easy family meals.',
  monthlyPrice: '£4.99',
  yearlyPrice: '£29.99',
  trialNote: 'Includes a 7-day FREE trial.',
  cancelNote: 'Cancel anytime.',
};
