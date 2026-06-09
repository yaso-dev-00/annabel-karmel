import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "cooking-with-kids";
export const articlePath = `/articles/${articleSlug}`;

export const cookingWithKidsLead =
  "From the most eager of eaters to the faddiest of little foodies, children of all ages can benefit from cooking in the kitchen. There are lots of simple tasks for tiny hands from peeling to grating, to mixing and rolling. Some of my happiest memories are of my children cooking and baking. Cooking with kids is a great way to spend quality time together. I used to love watching their faces peering through the oven door, waiting for their cakes to rise or for their jacket potatoes to crisp.";

export const cookingWithKidsIntro = [
  "Preparing simple meals together from scratch can help to instil a love of good healthy food. And cooking with kids doesn't need to be complicated or time-consuming – why not start with a simple savoury muffin, or a quick and easy frittata recipe (with lots of tasty topping). We all know that kids love to ask questions – my three children would always ask me about anything and everything! Their thirst for knowledge never ceased to amaze me. That's why I fed their curiosity in the kitchen, which worked wonders – although I quickly learnt their enthusiasm waned when it came to washing up.",
  "I want to point out that there isn't a 'best before' date on learning how to cook and whilst starting young equips children with the knowledge and skills to make good food choices as they grow-up, it's never too late to learn good habits. So how can you have a cracking time in the kitchen?",
] as const;

export type CookingTextLink = {
  label: string;
  href: string;
};

export type CookingSection = {
  title: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  paragraphs?: string[];
  bodyParts?: (string | CookingTextLink)[];
};

export const cookingWithKidsSections: CookingSection[] = [
  {
    title: "Early birds",
    image: `${articlePath}/early-birds.png`,
    imageAlt: "Children cooking together in the kitchen with Annabel Karmel",
    imageCaption: "cooking with kids by Annabel Karmel",
    paragraphs: [
      "Children can join you in the kitchen earlier than you might think. Whether it's counting out, weighing or stirring ingredients, mashing, cracking eggs or rolling dough, little ones can give you a helping hand. At the age of 4, 6 and 7 I encouraged my children to cook the supper for the family every Friday. It's a great way to teach them how to cook and about different foods, where they come from and how to handle utensils sensibly.",
    ],
  },
  {
    title: "Keep it simple",
    image: `${articlePath}/keep-it-simple.jpg`,
    imageAlt: "The very hungry caterpillar sandwich recipe by Annabel Karmel",
    imageCaption: "The very hungry caterpillar recipe by Annabel Karmel",
    bodyParts: [
      "Cooking with kids can be anything from measuring out ingredients to decorating pizzas! Just remember that children (especially toddlers) have short attention spans, so start with recipes that are extra easy and provide a result reasonably quickly. Even if you're simply making a spot of lunch one afternoon then why not get your little helper in the kitchen prepping a sandwich with you. My ",
      {
        label: "Very Hungry Caterpillar",
        href: "https://www.annabelkarmel.com/recipes/the-very-hungry-caterpillar/",
      },
      " sandwich is a super simple recipe (albeit with some added fun factor) and pancakes, omelettes and ",
      {
        label: "cupcakes",
        href: "https://www.annabelkarmel.com/recipes/easy-cupcakes/",
      },
      " are great options too.",
    ],
  },
  {
    title: "Get messy",
    image: `${articlePath}/get-messy.jpg`,
    imageAlt: "Kid eating chocolate Annabel Karmel",
    imageCaption: "kid eating chocolate Annabel Karmel",
    paragraphs: [
      "Let's face it; cooking with kids is never going to be mess-free. Spending time in the kitchen should be a fun and memorable experience, so don't worry about a bit of mess. Make sure you wear aprons or old clothes and use plastic tablecloths to make tidying up easier. Trust me: ingredients like chocolate get everywhere!",
    ],
  },
  {
    title: "Go go gadget",
    image: `${articlePath}/go-go-gadget.jpg`,
    imageAlt: "Herby Chicken Nuggets with Spiralized Sweet Potato Curls recipe by Annabel Karmel",
    imageCaption: "Herby Chicken Nuggets with Spiralized Sweet Potato Curls recipe by Annabel Karmel",
    bodyParts: [
      "I love using a spiralizer and kids will too. I promise you, ",
      {
        label: "sweet potato and courgettes",
        href: "https://www.annabelkarmel.com/recipes/spiralizer-herby-chicken-nuggets-spiralized-sweet-potato-curls/",
      },
      " will have never looked so good or been so appealing! Try baking sweet potato curls in the oven with a little olive oil and a sprinkling of herbs and it turns them into the most delectable dish. And, we all know kids love spaghetti so you can get them to help you make a healthy alternative with courgetti.",
    ],
  },
  {
    title: "Art attack",
    image: `${articlePath}/art-attack.jpg`,
    imageAlt: "Animal cupcakes recipe by Annabel Karmel",
    imageCaption: "Animal cupcakes recipe by Annabel Karmel",
    bodyParts: [
      "You can even get creative when cooking with kids! Decorating their creations, whether that's ",
      {
        label: "cupcakes",
        href: "https://www.annabelkarmel.com/recipes/easy-cupcakes/",
      },
      ", mini pizzas or a bowl of fruit salad, will very quickly become their new favourite tasty task. Lay out ingredient bowls and assign mini helpers with themed foodie challenges such as animal bagels, or funny face pizzas.",
    ],
  },
];

export const foodSchoolParagraphs = [
  "A fun game to play whilst cooking with kids is to try taste testing with new foods. Blindfold each child so they can't see, then introduce mystery foods and ask them to guess what it is. Giving them facts is likely to make them more interested in what is going into the food they are preparing (and eating). Cooking with kids is more than teaching them about a balanced diet, as they weigh and measure out ingredients they are developing maths skills without even realising! And following recipe instructions and being mindful of utensils are both good life skills.",
  "Getting children to take an active interest in what they're eating is essential for their general health and wellbeing. And if you have a fussy eater, they're far more likely to eat something they've prepared themselves than something you've put in front of them.",
  "My ethos is that we as parents need to help give our children a positive relationship with food, and that means letting them help out in the kitchen. Yes it be might be messy, or chaotic and their enthusiasm might disappear halfway through a recipe, but believe me, they'll always be back to eat the goods at the end.",
] as const;

export const bookPromo = {
  image: `${articlePath}/book.jpg`,
  imageAlt: "Real Food Kids Will Love cookbook by Annabel Karmel",
  bookTitle: "Real Food Kids Will Love cookbook",
  bookHref: "https://www.annabelkarmel.com/our-products/cookbooks/",
  paragraphs: [
    "Annabel's brand new Real Food Kids Will Love cookbook is packed full of advice, top tips and over 100 simple and delicious recipes which the whole family can enjoy together – from 15 minute meals to healthy fast food favourites, cooking with the kids, lunchbox snacks and more.",
    "Many recipes include handy swap-outs to cater for those with food allergies, intolerances or particularly fussy eaters! There is also a range of meat-free and vegan meal options too, meaning mealtimes can be made healthy and fun for the whole family whatever your family's foodie preferences.",
  ],
} as const;

export const cookingWithKidsRelatedArticles: RelatedArticleItem[] = [
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
    href: "/get-kids-kitchen",
    title: "Top tips for cooking with kids",
    image: "/articles/get-kids-kitchen/hero.png",
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
];
