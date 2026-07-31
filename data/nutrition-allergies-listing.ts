/**
 * Card copy from annabelkarmel.com/category/nutrition/nutrition-allergies/
 * Excerpts use the site’s curly apostrophes and ellipsis truncation.
 */

export type NutritionAllergiesListingArticle = {
  title: string;
  href: string;
  heroImage: string;
  heroAlt: string;
  category: string;
  excerpt: string;
};

const AK_UPLOADS = 'https://www.annabelkarmel.com/wp-content/uploads';

/** Page 1 — archive order */
export const nutritionAllergiesPageOne: NutritionAllergiesListingArticle[] = [
  {
    title: 'Food Allergies – your common questions & concerns answered',
    href: '/food-allergies-your-common-questions-concerns-answered',
    heroImage: `${AK_UPLOADS}/2022/01/DSC_1828.2-1002x1024-optimized.jpg`,
    heroAlt: 'Food Allergies – your common questions & concerns answered',
    category: 'Nutrition',
    excerpt:
      'Childhood food allergies are on the increase, so it’s natural that you might be nervous about introducing potentially allergenic foods, ...',
  },
  {
    title: "Food Allergies – Natasha's Law put a label on it",
    href: '/food-allergies-put-a-label-on-it',
    heroImage: `${AK_UPLOADS}/2022/01/Untitled-design-optimized.png`,
    heroAlt: "Food Allergies – Natasha's Law put a label on it",
    category: 'Nutrition',
    excerpt:
      'In today’s climate we tend to avoid putting a label on things, but when it comes to the food industry ...',
  },
  {
    title: "A Dairy-free Diet for Cow's Milk Protein Allergy",
    href: '/dairy-free-diet-cows-milk-protein-allergy',
    heroImage: `${AK_UPLOADS}/2019/04/cows-milk-optimized.jpg`,
    heroAlt: "Cow's Milk Protein Allergy",
    category: 'Articles',
    excerpt:
      "A dairy free diet for cow's milk protein allergy involves avoiding all forms of dairy foods such as milk, butter, ...",
  },
  {
    title: 'Are allergies genetic?',
    href: '/are-allergies-genetic',
    heroImage: '/articles/are-allergies-genetic/hero.jpg',
    heroAlt: 'Are allergies genetic?',
    category: 'Nutrition',
    excerpt:
      'If your family has a history of allergies, it’s understandable to be concerned that you might have passed on these ...',
  },
  {
    title: "Managing my child's food allergy",
    href: '/managing-childs-food-allergy',
    heroImage: `${AK_UPLOADS}/2017/06/party-cake-optimized.jpg`,
    heroAlt: "Managing my child's food allergy",
    category: 'Nutrition',
    excerpt:
      'From the weekly food shop to those all-important kids’ parties, managing your child’s food allergy can be stressful for both ...',
  },
  {
    title: 'Spotting food allergy symptoms',
    href: '/spotting-food-allergy-symptoms',
    heroImage: `${AK_UPLOADS}/2017/06/shutterstock_638610991-optimized.jpg`,
    heroAlt: 'Spotting food allergy symptoms',
    category: 'Nutrition',
    excerpt:
      'It can be difficult spotting food allergy symptoms and different parts of the body can be affected by a variety ...',
  },
  {
    title: 'Weaning and baby allergies',
    href: '/weaning-baby-allergies',
    heroImage: `${AK_UPLOADS}/2017/06/shutterstock_379936597-optimized.jpg`,
    heroAlt: 'Weaning and baby allergies',
    category: 'Nutrition',
    excerpt:
      'Entering into the wonderful world of weaning can be daunting at the best of times, let alone when you’re also ...',
  },
  {
    title: "Cow's milk allergy",
    href: '/cows-milk-allergy',
    heroImage: `${AK_UPLOADS}/2017/06/milk-allergies-optimized.jpg`,
    heroAlt: "Cow's milk allergy",
    category: 'Nutrition',
    excerpt:
      "Infants and children usually experience Cow's milk allergy (CMA) symptoms in their first few months as cow’s milk and dairy ...",
  },
  {
    title: 'Food allergy vs. food intolerance',
    href: '/food-allergy-vs-food-intolerance',
    heroImage: `${AK_UPLOADS}/2017/06/intolerance-vs-allergy-1-optimized.jpg`,
    heroAlt: 'Food allergy vs. food intolerance',
    category: 'Nutrition',
    excerpt:
      'Many different names are used to describe adverse reactions to foods, including food hypersensitivity, food intolerance, food allergy and other ...',
  },
  {
    title: 'Travelling with Children with Food Allergies',
    href: '/travelling-children-food-allergies',
    heroImage: `${AK_UPLOADS}/2016/07/shutterstock_280220411-optimized.jpg`,
    heroAlt: 'Travelling with Children with Food Allergies',
    category: 'Nutrition',
    excerpt:
      'Travelling abroad to a holiday destination can be stressful for a family if a child has an allergy. Allergy UK’s ...',
  },
  {
    title: 'Breastfeeding and food allergies',
    href: '/breastfeeding-food-allergies',
    heroImage: `${AK_UPLOADS}/2017/06/shutterstock_590219558-optimized.jpg`,
    heroAlt: 'Breastfeeding and food allergies',
    category: 'Nutrition',
    excerpt:
      'Apprehensive about breastfeeding and food allergies? Can breastfeeding your baby help stop allergies in their tracks? Consultant Paediatric Allergist Professor ...',
  },
  {
    title: 'Is eczema linked to food allergies?',
    href: '/eczema-linked-food-allergies',
    heroImage: `${AK_UPLOADS}/2017/06/eczema-optimized.jpg`,
    heroAlt: 'Is eczema linked to food allergies?',
    category: 'Nutrition',
    excerpt:
      'Many parents want to know is eczema linked to food allergies? Eczema, also known as ‘atopic eczema’ or ‘atopic dermatitis’, ...',
  },
  {
    title: 'Allergies: finding support',
    href: '/allergies-finding-support',
    heroImage: `${AK_UPLOADS}/2017/06/shutterstock_302699477-optimized.jpg`,
    heroAlt: 'Allergies: finding support',
    category: 'Nutrition',
    excerpt:
      'Finding support for your child or for yourself can be quite challenging but there is support out there for the ...',
  },
  {
    title: 'The most common food allergens in the UK',
    href: '/common-food-allergens-uk',
    heroImage: `${AK_UPLOADS}/2017/06/shutterstock_1441241306-optimized.jpg`,
    heroAlt: 'The most common food allergens in the UK',
    category: 'Nutrition',
    excerpt:
      'There are 14 major allergens which must be clearly mentioned on food labels or on information such as restaurant menus ...',
  },
  {
    title: 'Egg allergy',
    href: '/egg-allergy',
    heroImage: `${AK_UPLOADS}/2017/06/Egg-allergy-optimized.jpg`,
    heroAlt: 'Egg allergy',
    category: 'Nutrition',
    excerpt:
      'Most children will outgrow an allergy to eggs which explains why egg allergy is much more common in young children ...',
  },
  {
    title: 'Most common food allergies in babies',
    href: '/common-food-allergies-babies',
    heroImage: `${AK_UPLOADS}/2017/06/top-baby-allergies-optimized.jpg`,
    heroAlt: 'Most common food allergies in babies',
    category: 'Nutrition',
    excerpt:
      'Consultant Paediatric Allergist Professor Adam Fox explores the most common food allergies in babies. A food allergy is when your ...',
  },
  {
    title: 'Food Allergies with Professor Adam Fox',
    href: '/allergies-with-professor-adam-fox',
    heroImage: `${AK_UPLOADS}/2016/08/Allergies-optimized.jpg`,
    heroAlt: 'Food allergy advice for babies and children',
    category: 'Articles',
    excerpt:
      'Consultant Paediatric Allergist Professor Adam Fox explains all there is to know about food allergies. Childhood food allergies seem to ...',
  },
  {
    title: "Managing your baby's lactose intolerance",
    href: '/managing-your-babys-lactose-intolerance',
    heroImage: `${AK_UPLOADS}/2019/04/shutterstock_570212251-1-optimized.jpg`,
    heroAlt: "Managing your baby's lactose intolerance",
    category: 'Nutrition',
    excerpt:
      'Lactose intolerance is when the digestive enzyme lactase is missing and so the carbohydrate or sugar in milk called lactose ...',
  },
];

/** Page 2 */
export const nutritionAllergiesPageTwo: NutritionAllergiesListingArticle[] = [
  {
    title: "A Dairy-free Diet for Cow's Milk Protein Allergy",
    href: '/cows-milk-protein-allergy',
    heroImage: `${AK_UPLOADS}/2019/04/cows-milk-optimized.jpg`,
    heroAlt: "Cow's Milk Protein Allergy",
    category: 'Articles',
    excerpt:
      "A dairy free diet for cow's milk protein allergy involves avoiding all forms of dairy foods such as milk, butter, ...",
  },
];
