import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "looking-after-childrens-teeth";
export const articlePath = `/articles/${articleSlug}`;

export const lookingAfterTeethIntro =
  "As a mum, I appreciate the daily struggles and dilemmas that parents and carers have around doing what is best for their children, and I even find a lot of the information available confusing and conflicting-what can be good for your general health can actually be harmful to teeth. So, to help, I have put together my own ‘10 things you need to know about looking after your children’s teeth’….";

export type TeethTextLink = {
  label: string;
  href: string;
};

export type LookingAfterTeethSection = {
  title: string;
  image: string;
  imageAlt: string;
  imageHref?: string;
  paragraphs?: string[];
  bodyParts?: (string | TeethTextLink)[];
  footnote?: string;
  caption?: string;
  nhsNoteParts?: (string | TeethTextLink)[];
};

export const lookingAfterTeethSections: LookingAfterTeethSection[] = [
  {
    title: "1. Toothbrushing",
    image: `${articlePath}/01-toothbrushing.jpg`,
    imageAlt: "Toddler brushing teeth with a colourful toothbrush",
    paragraphs: [
      "Start brushing as soon as teeth start to erupt (come through), at around 6 months of age, using an appropriate fluoridated toothpaste. Night time brushing is the most important time, and brush on at least one other occasion, using a smear of toothpaste for under 3s (at least 1000ppmF), a small pea sized amount for 3-6 year olds (more than 1000ppmF), for children 6 years and over the recommended amount is pea size 1350-1500ppmF (family toothpaste). Aim for 2 minutes each time, encourage your child to spit out but don’t rinse the toothpaste, supervising brushing until your child is at least 7.",
    ],
    footnote: "*ppmF concentrations are based on current UK guidelines",
  },
  {
    title: "2. Bedtime Routine",
    image: `${articlePath}/02-bedtime-routine.jpg`,
    imageAlt: "Child sleeping in bed at night",
    paragraphs: [
      "Aim for nothing to eat or drink except water in the last hour before bed. When we sleep our saliva production reduces and harmful acid stays around the teeth for longer at night. It may be impractical to do this with younger children but as your child increases in age, start eliminating the bedtime and night feeds (easier said than done I know!).",
    ],
  },
  {
    title: "3. Bottle Use",
    image: `${articlePath}/03-bottle-use.jpg`,
    imageAlt: "Baby with a bottle of milk",
    paragraphs: [
      "Only ever give milk or plain water in a bottle and introduce free-flow sippy cups from around 6 months, anything else in a bottle (eg cordial or fruit juice, even ‘no added sugar’) can predispose teeth to ‘nursing caries’ (rapidly occurring decay that is caused by bottle use). Sugary drinks have no place in a child’s daily diet. From age 1, drinking from a bottle should be discouraged.",
    ],
  },
  {
    title: "4. Sugar",
    image: `${articlePath}/04-sugar.jpg`,
    imageAlt: "Healthy dip with pitta breadsticks",
    imageHref: "https://www.annabelkarmel.com/recipes/dips/",
    paragraphs: [
      "Reduce the amount and frequency of sugar intake, stick to meal times only for treats if you are going to give them, once per day maximum. Sugar, honey or any other natural or artificial sweetener should not be added to weaning foods or drinks. Examples of healthy snacks include fresh fruits, raw vegetables, a small amount of cheese (low salt versions), hummus, unsalted rice cakes and toast.",
    ],
    caption: "Click on the image above for delicious dip recipes!",
  },
  {
    title: "5. Labelling",
    image: `${articlePath}/05-labelling.jpg`,
    imageAlt: "Infused waters in glass bottles",
    imageHref: "https://www.annabelkarmel.com/recipes/infused-waters/",
    paragraphs: [
      "‘No added sugar’ doesn’t mean ‘no sugar’ -some of these products can contain a large amount of natural sugar and may also contain artificial sweeteners. Sugar free means there are no sugars (less than 0.5g) in the products, but often these can be acidic and erosive to teeth. This can lead to the softening of the outer tooth surface (enamel) leaving it more vulnerable to wear and to decay. Examples include a high sugar diet, sugar free carbonated drinks, flavoured waters and adding fruit to water in water bottles.",
    ],
  },
  {
    title: "6. Fruits and smoothies",
    image: `${articlePath}/06-fruits-smoothies.jpg`,
    imageAlt: "Colourful fruit smoothies in glass bottles",
    paragraphs: [
      "Dried fruits, particularly raisins, and smoothies can contain lots of natural sugar, so things perceived as a “healthy” snack can alone contain children’s recommended daily allowance of sugar. Dentists advise that these products should be given only occasionally and consumed with a meal.",
    ],
  },
  {
    title: "7. Make a Sugar Swap",
    image: `${articlePath}/07-sugar-swap.jpg`,
    imageAlt: "Apricot and Cocoa Energy Balls",
    imageHref: "https://www.annabelkarmel.com/recipes/raw-cacao-energy-balls/",
    bodyParts: [
      "Get into the habit of counting sugar that your child is consuming and make sugar swaps when possible. The recommended maximum daily allowances are 5 cubes of sugar for 4-6-year olds, 6 cubes for 7-10-year olds and 7 cubes for 11 years and over. One cube sugar is approximately 4g of sugar. It can be surprisingly easy to exceed the maximum daily amounts. (There is presently no official maximum intake for sugar consumption for under 4s, but food and drink with added sugars should be restricted as much as possible). Personally, I find the ‘Sugar Check’ tool at ",
      { label: "www.savekidsfromsugar.co.uk", href: "https://www.savekidsfromsugar.co.uk/" },
      " a useful visual resource.",
    ],
    caption: "Click on the image above for a delicious sugar-free, no-cook snack!",
  },
  {
    title: "8. Caregivers",
    image: `${articlePath}/08-caregivers.jpg`,
    imageAlt: "Bowl of colourful breakfast cereal",
    paragraphs: [
      "Be aware of what children are consuming with other care providers, including grandparents and nursery settings. Be aware particularly of cereals and snacks, in my experience they have not always been low sugar.",
    ],
  },
  {
    title: "9. Dummies",
    image: `${articlePath}/09-dummies.jpg`,
    imageAlt: "Baby with a dummy on a rug",
    paragraphs: [
      "Prolonged use of a dummy can be associated with speech and dental disturbances. Teeth can get a gap at the front (an open bite) or the top teeth can stick out more (an overjet). NHS recommendations are to stop dummy use by one, in reality two may be a more realistic goal for parents, as long as you are working on reducing and stopping use. As children grow rapidly around this stage, dental disturbances usually tend to correct themselves, but the earlier that use is stopped, the more likely this is to occur.",
    ],
  },
  {
    title: "10. Dental Visits",
    image: `${articlePath}/10-dental-visits.jpg`,
    imageAlt: "Dentist giving a child a high five in the dental chair",
    paragraphs: [
      "Visit the dentist at least once per year and then as advised by your dentist. Parents and guardians are encouraged to take children in their care to a dentist when their teeth start to come through and ideally by their first birthday,",
    ],
    nhsNoteParts: [
      "If you live in England, you can find details of how to find an NHS dentist ",
      { label: "https://www.nhs.uk/", href: "https://www.nhs.uk/" },
      " in the NHS Services section, click on ‘find a dentist’. If you can’t find a dentist accepting NHS patients, you should call NHS England’s Customer Contract Centre on ",
      { label: "0300 311 2233", href: "tel:03003112233" },
      ". For other regions, you should contact your local health board who will be able to direct you to the appropriate department.",
    ],
  },
];

export const helenClintBio = [
  "Helen Clint qualified with Honours from University of Liverpool in 2005, with a distinction in Oral Health. She works as a primary care dentist in general practice in Liverpool. She enjoys all aspects of dentistry, but since becoming a mum herself is passionate about improving children’s oral health. She has completed her MJDF (RCS England) and is an Educational Supervisor.",
  "She has two children under 5, so can empathise with parents and knows from a personal perspective how tough parenting can be!",
  "Helen is an NHS England Clinical Entrepreneur on this year’s cohort of the Programme. Her aim is to make the Oral Health message more relatable and accessible to families and she has launched her own social media account as a platform for this.",
] as const;

export const helenClintInstagramUrl = "https://www.instagram.com/dentalmummy/";

export const lookingAfterTeethRelatedArticles: RelatedArticleItem[] = [
  {
    href: "/advice/toddler-top-tips-to-healthy-food-habits",
    title: "Toddler Top Tips to Healthy Food Habits",
    image: "/articles/toddler-top-tips-to-healthy-food-habits/hero.jpg",
  },
  {
    href: "/advice/infertility-and-iodine-deficiency-everything-you-need-to-know",
    title: "Infertility and Iodine Deficiency: Everything You Need to Know",
    image: "/articles/infertility-and-iodine-deficiency-everything-you-need-to-know/hero.jpg",
  },
  {
    href: "/advice/the-best-foods-for-boosting-fertility",
    title: "The Best Foods for Boosting Fertility",
    image: "/articles/the-best-foods-for-boosting-fertility/hero.jpg",
  },
  {
    href: "/food-allergies-your-common-questions-concerns-answered",
    title: "Food Allergy Awareness",
    image: "/articles/food-allergies-your-common-questions-concerns-answered/hero.jpg",
  },
  {
    href: "/top-tips-washing-babies-hands",
    title: "Top Tips for Washing Babies Hands",
    image: "/articles/top-tips-washing-babies-hands/wash-hands-sink.png",
  },
  {
    href: "/go-guide-handling-leftovers-safely",
    title: "Go to Guide: Handling Leftovers Safely",
    image: "/articles/go-guide-handling-leftovers-safely/hero.jpg",
  },
  {
    href: "/top-weaning-tips",
    title: "Annabel Karmel's Top 10 Weaning Tips",
    image: "/articles/top-weaning-tips/hero.png",
  },
  {
    href: "/advice/gagging-vs-choking",
    title: "Gagging vs Choking: The differences you need to know when weaning your baby",
    image: "/articles/gagging-vs-choking/hero.jpg",
  },
  {
    href: "/advice/weaning-premature-babies",
    title: "Weaning premature babies",
    image: "/articles/weaning-premature-babies/hero.jpg",
  },
  {
    href: "/allergies-with-professor-adam-fox",
    title: "Professor Adam Fox, paediatric allergy specialist",
    image: "/articles/allergies-with-professor-adam-fox/hero.jpg",
  },
];
