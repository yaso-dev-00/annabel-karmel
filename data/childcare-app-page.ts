const assetBase = '/annabel-karmels-app-for-childcare';
const sharedBase = '/empower-your-employees';

export const childcareAssets = {
  heroDesktop: `${assetBase}/hero-desktop.png`,
  heroDesktopWidth: 2090,
  heroDesktopHeight: 1708,
  heroMobile: `${assetBase}/hero-mobile.png`,
  heroMobileWidth: 1024,
  heroMobileHeight: 837,
  happyFamilies: `${sharedBase}/happy-families.jpg`,
  happyFamiliesWidth: 1024,
  happyFamiliesHeight: 1024,
  essentialTools: `${sharedBase}/essential-tools.jpg`,
  essentialToolsWidth: 603,
  essentialToolsHeight: 754,
  supportingParents: `${sharedBase}/supporting-parents.jpg`,
  supportingParentsWidth: 1024,
  supportingParentsHeight: 1024,
  howItWorks: `${sharedBase}/how-it-works.jpg`,
  howItWorksWidth: 917,
  howItWorksHeight: 1200,
  formBg: `${sharedBase}/form-bg.png`,
  formBgWidth: 2560,
  formBgHeight: 2116,
  weaningFrameBg: `${assetBase}/weaning/frame-bg.png`,
  oneStopWaveBg: `${assetBase}/one-stop-wave-bg.svg`,
  quoteVectorBg: `${assetBase}/quote/vector-bg.png`,
  quoteAnnabel: `${assetBase}/quote/annabel.png`,
  quoteAnnabelWidth: 600,
  quoteAnnabelHeight: 485,
};

export const childcareHero = {
  title: 'Welcome to Annabel Karmel’s App for Childcare',
  ctaLabel: 'Request a demo',
  ctaHref: '#request-a-demo',
};

export const childcareAwards = [
  {
    src: `${sharedBase}/awards/platinum-logo.png`,
    alt: 'Tried and Tested Platinum award',
    width: 2080,
    height: 2560,
  },
  {
    src: `${sharedBase}/awards/best-family-app.png`,
    alt: 'Best Family App 2026 award',
    width: 1839,
    height: 2560,
  },
  {
    src: `${sharedBase}/awards/absolutely-mama.png`,
    alt: 'Absolutely Mama Gold 2024 award',
    width: 300,
    height: 320,
  },
  {
    src: `${sharedBase}/awards/pregnancy-baby-fair.png`,
    alt: 'Pregnancy Baby Fair 2024 award',
    width: 300,
    height: 320,
  },
  {
    src: `${sharedBase}/awards/first-time-mums.png`,
    alt: 'First Time Mums Awards logo',
    width: 300,
    height: 320,
  },
  {
    src: `${sharedBase}/awards/mum-marketplace.jpeg`,
    alt: 'Mum Marketplace 2026 award',
    width: 836,
    height: 879,
  },
];

export const childcareProfessionals = {
  title: 'The #1 recipe app for childcare professionals',
  body: 'Equip your childcare team with expert recipes and resources to nurture healthy, happy eaters. It’s their daily essential for every age and stage.',
  ctaLabel: 'Learn more',
};

export const childcareEssentialTools = {
  title: 'One-stop resource for ideas, support and advice',
  items: [
    '1500+ baby & family recipes',
    'New ideas weekly',
    'Custom meal planners',
    'Managing allergies',
    'Helpful food guides',
    'Weaning support',
  ],
  ctaLabel: 'Request a demo',
};

const recipeImageSize = 196;

export const childcareRecipeCategories = [
  {
    label: 'First foods',
    image: `${sharedBase}/recipes/first-foods.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: '6-9 months',
    image: `${sharedBase}/recipes/6-9-months.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: '9-12 months',
    image: `${sharedBase}/recipes/9-12-months.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: '12-18 months',
    image: `${sharedBase}/recipes/12-18-months.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Finger foods',
    image: `${sharedBase}/recipes/finger-foods.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Toddler',
    image: `${sharedBase}/recipes/toddler.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Snacks',
    image: `${sharedBase}/recipes/snacks.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Lunchboxes',
    image: `${sharedBase}/recipes/lunchboxes.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Family meals',
    image: `${sharedBase}/recipes/family-meals.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Breakfast',
    image: `${sharedBase}/recipes/breakfast.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Allergies',
    image: `${sharedBase}/recipes/allergies.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
  {
    label: 'Vegetarian',
    image: `${sharedBase}/recipes/vegetarian.jpg`,
    width: recipeImageSize,
    height: recipeImageSize,
  },
];

export const childcareRecipeHighlights = [
  {
    title: '1500+ recipes for all ages',
    body: 'Easily search for simple recipes for every age and stage, from baby and toddler to kids and family.',
  },
  {
    title: 'Fresh ideas every week',
    body: 'New healthy recipes served up every week to keep mealtimes fresh and interesting.',
  },
  {
    title: 'Build your recipe bank',
    body: 'Save and store favourite recipes to make shopping and cooking for the family easy.',
  },
];

export const childcareWeaning = {
  desktopTitle: 'Weaning Hub',
  mobileTitle: 'Weaning Hub',
  desktopBody:
    'Annabel Karmel’s app is the leading resource for safe and easy weaning, making it an ideal resource for those caring for babies.',
  mobileBody:
    'Your go-to resource for safe and easy weaning, guiding you through every step of your baby’s first foods journey.',
  cards: [
    {
      title: 'First foods index',
      body: 'Learn how to safely introduce 100+ nutritious first foods',
      image: `${assetBase}/weaning/first-foods-index.png`,
      imageWidth: 280,
      imageHeight: 320,
    },
    {
      title: 'Expert advice',
      body: 'Quick bite-sized reads, from teething to fussy eating',
      image: `${assetBase}/weaning/expert-advice.png`,
      imageWidth: 280,
      imageHeight: 320,
    },
    {
      title: 'Allergy support',
      body: 'Essential advice for managing common food allergies in babies',
      image: `${assetBase}/weaning/allergy-support.png`,
      imageWidth: 280,
      imageHeight: 320,
    },
  ],
};

const expertImageWidth = 1220;
const expertImageHeight = 800;

export const childcareExpertBenefits = [
  {
    title: 'Everyday inspiration',
    body: 'Access to over 1,250 easy recipes and fresh ideas every week to pack in variety and meals that babies and children love.',
    image: `${assetBase}/expert/everyday-inspiration.jpg`,
    width: expertImageWidth,
    height: expertImageHeight,
  },
  {
    title: 'Confidence in nutrition',
    body: 'With Annabel Karmel’s expert guidance, caregivers are given the confidence and tools to meet children’s nutritional needs at every age and stage.',
    image: `${assetBase}/expert/confidence-in-nutrition.jpg`,
    width: expertImageWidth,
    height: expertImageHeight,
  },
  {
    title: 'Allergy aware',
    body: 'With an extensive bank of recipes designed for allergies, and a helpful Allergy Tracker, childcare providers can feel safe and confident that they are meeting every child’s dietary needs.',
    image: `${assetBase}/expert/allergy-aware.jpg`,
    width: expertImageWidth,
    height: expertImageHeight,
  },
  {
    title: 'Simplified meal planning',
    body: 'The app’s intuitive interface and categorised recipes allow users to quickly find meals based on specific criteria like age, dietary preferences, and prep time. This streamlines the meal planning process, reducing stress and ensuring children always get well-rounded meals.',
    image: `${assetBase}/expert/simplified-meal-planning.jpg`,
    width: expertImageWidth,
    height: expertImageHeight,
  },
  {
    title: 'Support for caregiver development',
    body: 'By using a trusted resource like Annabel Karmel’s expert app, you’ll be offering ongoing professional development for your team or agency workers, helping them stay up-to-date with best practices in child nutrition and meal preparation.',
    image: `${assetBase}/expert/caregiver-development.jpg`,
    width: expertImageWidth,
    height: expertImageHeight,
  },
  {
    title: 'Building bonds',
    body: 'Feeling well equipped to support children’s development through considered, nutritious meals also helps caregivers build stronger relationships with families.',
    image: `${assetBase}/expert/building-bonds.jpg`,
    width: expertImageWidth,
    height: expertImageHeight,
  },
];

export const childcareStats = [
  {
    value: '73%',
    label: 'are preparing healthier meals',
    icon: `${sharedBase}/stats/icon-1.png`,
    iconWidth: 260,
    iconHeight: 260,
    valueColor: '#b34769',
  },
  {
    value: '67%',
    label: 'see cooking as less of a chore',
    icon: `${sharedBase}/stats/icon-2.png`,
    iconWidth: 260,
    iconHeight: 260,
    valueColor: '#c5728b',
  },
  {
    value: '81%',
    label: 'are using the app to feed the whole family',
    icon: `${sharedBase}/stats/icon-3.png`,
    iconWidth: 260,
    iconHeight: 260,
    valueColor: '#b34769',
  },
  {
    value: '57%',
    label: 'feel more confident in the kitchen',
    icon: `${sharedBase}/stats/icon-4.png`,
    iconWidth: 260,
    iconHeight: 260,
    valueColor: '#c5728b',
  },
  {
    value: '70%',
    label: 'are more motivated to plan ahead',
    icon: `${sharedBase}/stats/icon-5.png`,
    iconWidth: 260,
    iconHeight: 260,
    valueColor: '#b34769',
    centerOnMobile: true,
  },
];

export const childcareQuote = {
  text: 'My award-winning recipe app brings you expert, nutritious, and easy-to-make meals that will win over babies, toddlers, and the whole family. It’s your everyday essential for stress-free mealtimes.',
  author: 'Annabel Karmel',
};

export const childcareHowItWorksSteps = [
  {
    text: 'Simply choose how many employees you’d like to support with access to Annabel’s expert app.',
    number: `${sharedBase}/steps/step-1.svg`,
    numberWidth: 40,
    numberHeight: 69,
  },
  {
    text: 'We’ll provide you with the everything you need to get them setup and making the most of the app’s functions and features.',
    number: `${sharedBase}/steps/step-2.svg`,
    numberWidth: 40,
    numberHeight: 69,
  },
  {
    text: 'Track employee usage and access support from our helpful customer care team.',
    number: `${sharedBase}/steps/step-3.svg`,
    numberWidth: 40,
    numberHeight: 69,
  },
];

export const childcareFormHelpOptions = [
  'I am looking to support my employees',
  'I am a healthcare service provider looking to support families',
  'I am a childcare business looking to support my team',
  'Other',
];

export const childcareCompanySizeOptions = [
  '1-19 employees',
  '20-149 employees',
  '150-499 employees',
  '500-999 employees',
  '1000+ employees',
];

export const childcareForm = {
  title:
    'Complete this form to request a demo and learn more about how Annabel Karmel’s expert recipe app can support your employees',
};
