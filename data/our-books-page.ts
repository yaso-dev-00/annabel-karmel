export const ourBooksAssets = {
  woodBackground: "/our-books/wood-background.jpg",
  booksCollage: "/our-books/books-collage.jpg",
  annabelSignature: "/our-books/annabel-signature.png",
  annabelPortrait: "/our-books/annabel-portrait.jpg",
} as const;

export const ourBooksHero = {
  title: "Bestselling cookbooks from the UK’s no.1 children’s cookery author",
  intro: [
    "With over 30 years of children’s food expertise and more than 6 million cookbooks sold, you are in safe hands when it comes to preparing delicious, nutritious meals for your family.",
    "From weaning support and trusted recipes for babies and toddlers, to cooking with kids and quick and easy family meals, Annabel’s cookbooks are a kitchen staple all over the world.",
  ],
};

export const ourBooksGridIntro = {
  heading: "Bestselling cookbooks",
  body: "Discover Annabel’s latest award-winning cookbooks.",
  body2:" From weaning to kids cooking and quick and easy family meals,",
  body3:"Annabel’s delicious, nutritious and simple recipes are a household staple."
};

export type OurBooksCarouselImage = {
  src: string;
  alt: string;
};

export type OurBooksProduct = {
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  /** Phrases to render in bold within body copy (live site <strong> tags). */
  bodyHighlights: string[];
  suitableFor: string;
  moreInfoHref: string;
  buyNowHref: string;
  carouselImages: OurBooksCarouselImage[];
};

function bookImages(slug: string, files: { file: string; alt: string }[]): OurBooksCarouselImage[] {
  return files.map(({ file, alt }) => ({
    src: `/our-books/${slug}/${file}`,
    alt,
  }));
}

export const ourBooksProducts: OurBooksProduct[] = [
  {
    slug: "finger-foods",
    title: "Finger Foods for Babies & Toddlers",
    subtitle: "Your essential finger food guide for babies and toddlers",
    body:
      "Finger Foods for Babies & Toddlers is packed with over 100 nutritious, delicious recipes and the very latest advice on how to safely serve finger foods to babies and toddlers. It’s the perfect cookbook for raising independent little eaters!",
    bodyHighlights: ["Finger Foods for Babies & Toddlers"],
    suitableFor: "babies 6 months+ and toddlers",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/finger-foods/",
    buyNowHref: "https://geni.us/FingerFoodsCookbook",
    carouselImages: bookImages("finger-foods", [
      { file: "High-res-flat-lay-scaled-1-optimized.jpg", alt: "Finger Foods for Babies & Toddlers flat lay" },
      { file: "Sweet-Potato-and-Chicken-Croquettes-p.126-scaled-1-optimized.jpg", alt: "Sweet potato and chicken croquettes" },
      { file: "Finger-Foods-1-e1737027984835-1-optimized.jpg", alt: "Finger foods recipe" },
      { file: "Salmon-and-Spinach-Fritters-p.185-scaled-1-optimized.jpg", alt: "Salmon and spinach fritters" },
      { file: "Finger-Foods-2-e1737028004861-1-optimized.jpg", alt: "Finger foods recipe page" },
      { file: "Banana-Apple-and-Sultana-Pancakes-p.59-scaled-1-e1737028266891-optimized.jpg", alt: "Banana apple and sultana pancakes" },
      { file: "Finger-Foods-1-1-e1737028365759-1-optimized.jpg", alt: "Finger foods cookbook spread" },
    ]),
  },
  {
    slug: "weaning-2",
    title: "Weaning",
    subtitle: "What to feed, when to feed and how to feed your baby",
    body:
      "Weaning will take you through every aspect of feeding your baby, with advice on when to start weaning, which foods to introduce first, and how to prepare foods safely. With the latest information on allergies and intolerances, and over 60 recipes to take you through every stage of weaning, this new edition of my bestselling cookbook is packed with everything you need to know.",
    bodyHighlights: ["Weaning"],
    suitableFor: "babies from around 6 months",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/weaning-2/",
    buyNowHref:
      "https://www.amazon.co.uk/Weaning-What-Feed-When-Your-dp-024165548X/dp/024165548X/ref=dp_ob_image_bk",
    carouselImages: bookImages("weaning-2", [
      { file: "Weaning-book-3d-1-e1708693514242-optimized.png", alt: "Weaning book cover" },
      { file: "Puree-scaled-e1708693345331-1-e1708693922113-optimized.jpg", alt: "Puree recipes" },
      { file: "frittata-muffins-page-scaled-e1709564171991-optimized.jpg", alt: "Frittata muffins page" },
      { file: "FAQ-Page-scaled-e1708693896933-1-optimized.jpg", alt: "Weaning FAQ page" },
      { file: "Finger-foods-scaled-e1708694001281-1-optimized.jpg", alt: "Finger foods page" },
      { file: "Frozen-yoghurt-bark-page-scaled-e1709564378170-optimized.jpg", alt: "Frozen yoghurt bark page" },
      { file: "Combined-purees-scaled-e1708694062615-1-optimized.jpg", alt: "Combined purees page" },
      { file: "Weaning-Book-pasta-1-e1708694115172-1-optimized.jpg", alt: "Weaning book pasta recipe" },
    ]),
  },
  {
    slug: "new-complete-baby-toddler-meal-planner-25th-anniversary-edition",
    title: "Complete Baby & Toddler Meal Planner",
    subtitle: "Recipes, advice and meal planners for weaning through to the toddler years",
    body:
      "For three decades The Complete Baby & Toddler Meal Planner has reigned as the most trusted feeding guide for families. Hailed as a parenting ‘bible’ this go-to guide is packed with the very latest essential advice for weaning and beyond as well as delicious and healthy recipes, simple age and stage meal planners, and a handy pull-out guide to step-by-step weaning.",
    bodyHighlights: ["The Complete Baby & Toddler Meal Planner"],
    suitableFor: "babies from around 6 months and toddlers",
    moreInfoHref:
      "https://www.annabelkarmel.com/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition/",
    buyNowHref:
      "https://www.amazon.co.uk/Annabel-Karmels-Complete-Toddler-anniversary/dp/0091924855/ref=sr_1_2",
    carouselImages: bookImages("new-complete-baby-toddler-meal-planner-25th-anniversary-edition", [
      { file: "CBTMP-e1697639746552-optimized.jpg", alt: "Complete Baby & Toddler Meal Planner cover" },
      { file: "CBTMP-contents-optimized.jpg", alt: "Meal planner contents" },
      { file: "CBTMP1.1-e1697639676102-optimized.jpg", alt: "Meal planner spread" },
      { file: "CBTMP2-optimized.jpg", alt: "Meal planner recipes" },
      { file: "CBTMPfirsttastes-e1697639624313-optimized.jpg", alt: "First tastes section" },
      { file: "072_banana_pancakes-min-scaled-e1697638986161-optimized.jpg", alt: "Banana pancakes recipe" },
    ]),
  },
  {
    slug: "my-first-cookbook",
    title: "My First Cookbook",
    subtitle: "Toddler’s first step-by-step recipe book",
    body:
      "My First Cookbook is the perfect first introduction to cooking for little kitchen helpers. Each simple recipe includes step-by-step instructions and fun illustrations. From power-packed breakfasts and dinner winners to healthy snacks and little treats, Annabel’s recipes will bring the whole family together.",
    bodyHighlights: ["My First Cookbook"],
    suitableFor: "children 2+ and families",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/my-first-cookbook/",
    buyNowHref: "https://geni.us/MyFirstCookBook",
    carouselImages: bookImages("my-first-cookbook", [
      { file: "My-First-Cookbook-front-cover-optimized.jpg", alt: "My First Cookbook cover" },
      { file: "1-optimized.jpg", alt: "My First Cookbook spread 1" },
      { file: "5-optimized.jpg", alt: "My First Cookbook spread 5" },
      { file: "3-optimized.jpg", alt: "My First Cookbook spread 3" },
      { file: "4-optimized.jpg", alt: "My First Cookbook spread 4" },
      { file: "2-optimized.jpg", alt: "My First Cookbook spread 2" },
    ]),
  },
  {
    slug: "where-does-my-food-come-from",
    title: "Where Does My Food Come From?",
    subtitle: "Discovery picture book with recipes",
    body:
      "Now here’s a book for inquisitive minds and budding chefs! Where Does My Food Come From? is a jam-packed trail of food discovery, filled with crafty activities, fun experiments, mind-boggling foodie facts and yummy recipes children will love to make.",
    bodyHighlights: ["Where Does My Food Come From?"],
    suitableFor: "toddlers, kids & families",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/where-does-my-food-come-from/",
    buyNowHref:
      "https://www.amazon.co.uk/Where-Does-Food-Come-favourite/dp/1783128593/ref=tmm_pap_swatch_0",
    carouselImages: bookImages("where-does-my-food-come-from", [
      { file: "Where-Food-Comes-From-Cover-optimized.jpg", alt: "Where Does My Food Come From cover" },
      { file: "1-optimized.jpg", alt: "Where Does My Food Come From spread 1" },
      { file: "2-optimized.jpg", alt: "Where Does My Food Come From spread 2" },
      { file: "3-optimized.jpg", alt: "Where Does My Food Come From spread 3" },
      { file: "4-optimized.jpg", alt: "Where Does My Food Come From spread 4" },
      { file: "5-optimized.jpg", alt: "Where Does My Food Come From spread 5" },
      { file: "6-optimized.jpg", alt: "Where Does My Food Come From spread 6" },
    ]),
  },
  {
    slug: "fun-fast-easy-childrens-cookbook",
    title: "Fun, Fast & Easy Children's Cookbook",
    subtitle: "Step-by-step recipes to cook together",
    body:
      "There are boundless benefits to getting even the youngest of children cooking. And Annabel’s colourful step-by-step Fun, Fast & Easy Children’s Cookbook is packed with simple recipes – from power-packed breakfasts and superhero snacks to family dinner winners and special treats.",
    bodyHighlights: ["Fun, Fast & Easy Children’s Cookbook"],
    suitableFor: "children 3+ and families",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/fun-fast-easy-childrens-cookbook/",
    buyNowHref:
      "https://www.amazon.co.uk/Annabel-Karmels-Fast-Childrens-Cookbook/dp/1787398161/ref=sr_1_1",
    carouselImages: bookImages("fun-fast-easy-childrens-cookbook", [
      { file: "9781787398160-scaled-optimized.jpg", alt: "Fun Fast & Easy Children's Cookbook cover" },
      { file: "ffe1-optimized.jpg", alt: "Fun Fast & Easy spread 1" },
      { file: "ffe2-optimized.jpg", alt: "Fun Fast & Easy spread 2" },
      { file: "ffe3-optimized.jpg", alt: "Fun Fast & Easy spread 3" },
      { file: "ffe4-optimized.jpg", alt: "Fun Fast & Easy spread 4" },
      { file: "ffe5-optimized.jpg", alt: "Fun Fast & Easy spread 5" },
    ]),
  },
  {
    slug: "weaning-made-simple",
    title: "Weaning Made Simple",
    subtitle: "A go-to guide to baby’s first foods",
    body:
      "Weaning Made Simple guides parents through each stage of a baby’s weaning journey and covers everything from critical nutrients and finger foods to allergies and catering to special diets. It also comes packed with practical recipes for those very first tastes to growing independence.\n\nThere are so many questions every parent wants answered. That’s why Annabel has cooked-up Weaning Made Simple; her go-to visual guide packed with the very latest advice and 100 practical everyday recipes.",
    bodyHighlights: ["Weaning Made Simple"],
    suitableFor: "babies from around 6 months",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/weaning-made-simple/",
    buyNowHref: "https://www.amazon.co.uk/dp/1509892648",
    carouselImages: bookImages("weaning-made-simple", [
      { file: "Weaning-Made-Simple-hi-res-optimized.jpg", alt: "Weaning Made Simple cover" },
      { file: "WMS1-e1697640225470-optimized.jpg", alt: "Weaning Made Simple spread 1" },
      { file: "WMS3-e1697640178246-optimized.jpg", alt: "Weaning Made Simple spread 3" },
      { file: "WMS-4-e1697640125465-optimized.jpg", alt: "Weaning Made Simple spread 4" },
      { file: "Annabel-Babies_110-1-scaled-e1697639995780-optimized.jpg", alt: "Weaning Made Simple baby recipes" },
      { file: "Lollies-1-_026-e1697640031747-optimized.jpg", alt: "Weaning Made Simple lollies recipe" },
    ]),
  },
  {
    slug: "real-foods-kids-will-love",
    title: "Real Food Kids Will Love",
    subtitle: "Simple, delicious recipes for toddlers and kids",
    body:
      "Real Food Kids Will Love is an essential cookbook for toddlers who are ready to start joining in with family mealtimes. From Fifteen Minute Meals to Healthy ‘Fast Food,’ Holiday Cooking with Kids and Lunchbox Snacks, each recipe in the book is designed to be enjoyed by the whole family, whilst remaining simple, healthy, and nutritionally balanced for young children.",
    bodyHighlights: ["Real Food Kids Will Love"],
    suitableFor: "children 1+ and families",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/real-foods-kids-will-love/",
    buyNowHref: "https://amzn.to/2T6sbib",
    carouselImages: bookImages("real-foods-kids-will-love", [
      { file: "RFKWL-e1697642121993-optimized.jpg", alt: "Real Food Kids Will Love cover" },
      { file: "20180118_annabel_fishandchips-scaled-e1697642229430-optimized.jpg", alt: "Fish and chips recipe" },
      { file: "20180117_annabel_carbonara-e1697642276133-optimized.jpg", alt: "Carbonara recipe" },
      { file: "20180118_annabel_chickenmotz-scaled-e1697642306671-optimized.jpg", alt: "Chicken mozzarella recipe" },
      { file: "Beetroot-Chocolate-Cake-scaled-e1697642350259-optimized.jpg", alt: "Beetroot chocolate cake" },
      { file: "Carrot-Cheese-Tomato-Muffins-2-scaled-e1697642405844-optimized.jpg", alt: "Carrot cheese and tomato muffins" },
    ]),
  },
  {
    slug: "baby-led-weaning-recipe-book",
    title: "Baby-Led Weaning Recipe Book",
    subtitle: "Recipes to encourage baby to take the lead",
    body:
      "No ‘one-size-fits-all’ when it comes to weaning! Championing a flexible approach to feeding, this recipe-filled practical guide is designed for those wanting to explore baby-led weaning exclusively, and families looking to introduce baby-led weaning and finger foods alongside purees. This Baby-Led Weaning Recipe Book is packed with a tasty collection of family-friendly recipes paired with simple tips and advice, whatever your weaning approach.",
    bodyHighlights: ["Baby-Led Weaning Recipe Book"],
    suitableFor: "babies from 6 months +",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/baby-led-weaning-recipe-book/",
    buyNowHref: "https://amzn.to/38NVugl",
    carouselImages: bookImages("baby-led-weaning-recipe-book", [
      { file: "BLW-e1697642505486-optimized.jpg", alt: "Baby-Led Weaning Recipe Book cover" },
      { file: "BLW2-1-1-optimized.jpg", alt: "Baby-Led Weaning spread 2" },
      { file: "BLW1-1-optimized.jpg", alt: "Baby-Led Weaning spread 1" },
      { file: "Balls-resized-optimized.jpg", alt: "Baby-Led Weaning recipe balls" },
      { file: "HF_Bites_Open_WorkHres-scaled-optimized.jpg", alt: "Baby-Led Weaning bites" },
      { file: "porridge-optimized.jpg", alt: "Porridge recipe" },
      { file: "Quesadilla-optimized.jpg", alt: "Quesadilla recipe" },
      { file: "veggie-balls-optimized.jpg", alt: "Veggie balls recipe" },
    ]),
  },
  {
    slug: "annabels-family-cookbook",
    title: "Family Cookbook",
    subtitle: "Simple, delicious recipes for the whole family",
    body:
      "Tired of making one meal for the kids and another for the adults? Annabel’s Family Cookbook offers no-fuss, tasty recipes that will get everyone around the table at the same time – whether they be 2 years old or twenty! From quick and easy 30 minutes meals to foolproof prep ahead freezer favourites, super-snacks and lunchbox inspiration, this cookbook will be your new go-to for family mealtimes.",
    bodyHighlights: ["Annabel’s Family Cookbook"],
    suitableFor: "children 2+ and families",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/annabels-family-cookbook/",
    buyNowHref: "http://www.amazon.co.uk/dp/0091957664/?tag=annabelkarmeluknew-21",
    carouselImages: bookImages("annabels-family-cookbook", [
      { file: "Family-cookbook-optimized.jpg", alt: "Family Cookbook cover" },
      { file: "045_sesame_beef-scaled-optimized.jpg", alt: "Sesame beef recipe" },
      { file: "053_chicken_fingers-scaled-optimized.jpg", alt: "Chicken fingers recipe" },
      { file: "092_sweetcorn_broccoli_fritters-scaled-optimized.jpg", alt: "Sweetcorn broccoli fritters" },
      { file: "113_granola-scaled-optimized.jpg", alt: "Granola recipe" },
      { file: "193_summer_fruit_brulee-scaled-optimized.jpg", alt: "Summer fruit brulee" },
      { file: "208_vanilla_cheesecake-scaled-optimized.jpg", alt: "Vanilla cheesecake" },
    ]),
  },
  {
    slug: "babys-first-year-journal",
    title: "Baby's First Year Journal",
    subtitle: "Baby's first year record book",
    body:
      "They grow up so quickly! Keep a journal of the first twelve months for you to look back on and to show your little one when they’re older.\n\nThis book helps you to record and store all those special memories of your baby’s first precious year, with ideas and spaces for things like milestones and what the world was like during the first year of their life.",
    bodyHighlights: [],
    suitableFor: "families",
    moreInfoHref: "https://www.annabelkarmel.com/apps-books/babys-first-year-journal/",
    buyNowHref: "https://www.amazon.co.uk/Babys-First-Year-Journal-Keepsake/dp/0241365600",
    carouselImages: bookImages("babys-first-year-journal", [
      { file: "2-optimized.png", alt: "Baby's First Year Journal cover" },
    ]),
  },
];
