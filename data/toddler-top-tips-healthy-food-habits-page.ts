import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "toddler-top-tips-to-healthy-food-habits";
export const articlePath = `/articles/${articleSlug}`;
export const ttabLogoSrc = `${articlePath}/ttab-logo.png`;

export const toddlersTeensUrl = "https://www.toddlersteensandbetween.com/";
export const toddlersTeensCourseUrl = "https://www.toddlersteensandbetween.com/";
export const gemmaExpertHref =
  "/meet-our-experts/gemma-arnold-sophia-ziff-mental-health-behaviour-and-wellbeing-specialists";

export type ToddlerFoodTipLink = {
  label: string;
  href: string;
};

export type ToddlerFoodTip = {
  title: string;
  body?: string;
  bodyParts?: (string | ToddlerFoodTipLink)[];
};

export const toddlerTopTipsIntro = [
  "That anticipation of wondering whether the meal you slaved over for hours will end up on the floor or not is a gamble with very little reward!",
  "Most parents (myself included) are all too familiar with that sense of dread, especially when faced with a fussy eater on their hands, but fret not, there are ways to combat messy mealtimes.",
] as const;

export const toddlerTopTipsLead =
  "Here are my and children's behavioural experts ToddlersTeensAndBetween top tips to help your little eater develop healthy mealtimes habits and a smoother food experience for all!";

export const toddlerTopTips: ToddlerFoodTip[] = [
  {
    title: "Give them a choice",
    body: "Giving toddlers a 'this' or 'that' choice allows them to have some autonomy and control during mealtimes. This choice doesn't have to be what they're eating, rather the order they can eat it in, what plate they have it from and where they sit to eat their meal!",
  },
  {
    title: "Routine is supreme",
    body: "Set and stick to firm boundaries around mealtimes: these might be that they sit down on their chair or where they eat each meal. This embedded routine will provide your toddlers with a cue for mealtime structures and will help build a good association with food and eating!",
  },
  {
    title: "Remain impartial",
    body: "Maintain a neutral reaction to food. All food is fuel. It all serves a purpose and when we relax our little ones begin to embody that relaxed energy and eat intuitively, listening to their own bodies cues to decide how much and what to eat. If we don't label food as 'good' or 'bad' or 'naughty' then all food becomes what it is, fuel.",
  },
  {
    title: "Get them involved with tasks",
    body: "Most children adore assisting you in the kitchen with fun tasks. Things like squeezing fresh orange juice or cracking eggs are well within the capabilities of a young child. It's amazing how being involved in the planning and preparation of a meal can stimulate a child's appetite!",
  },
  {
    title: "Let them eat with their eyes",
    bodyParts: [
      "Without going to unnecessary lengths, try to make your child's food not only taste good but look good too. Make ",
      {
        label: "mini portions in ramekins",
        href: "https://www.annabelkarmel.com/recipes/mini-fish-pies-3/",
      },
      ", ",
      {
        label: "chicken skewers",
        href: "https://www.annabelkarmel.com/recipes/chicken-satay/",
      },
      " or thread bite sized pieces of fruit onto a straw. Salad lollipops are a great way to try lots of different foods and textures in one go.",
    ],
  },
  {
    title: "Lead by example",
    body: "Eat together to show your fussy eater how good the food is – your little ones love to mimic, it's how they learn. Eating together and sharing the same, or parts of the same, meal can create a really positive atmosphere all around. When your little one sees their family enjoying their meals, it can be enough inspiration for them to give it a go themselves.",
  },
  {
    title: "Hide those veggies",
    body: "If you're worried that your fussy eater isn't getting enough nutrients then you can always sneak them in to their food! For example my Bolognese sauce contains multiple hidden veggies that even the most seasoned detective would struggle to spot!",
  },
  {
    title: "Stay hydrated",
    body: "Children are particularly at risk of becoming dehydrated because a child's body is less effective at perspiring and produces more heat during physical exertion. Because children also tend to be more physically active than adults, heat and dehydration can happen more quickly. A child that is 'always hungry for snacks', could in fact, simply be thirsty. Try offering drinks instead of repeated snacks.",
  },
  {
    title: "Get cooking",
    body: "Getting kids in the kitchen and taking an active interest in what they're eating is essential for their general health and wellbeing. Particularly if you have a fussy eater, as they're far more likely to eat something that they have prepared themselves than something you've put in front of them. Plus, it's such a wonderful and creative way to spend quality time together and cook up some memories to treasure for a lifetime – my Fun, Fast & Easy Children's Cookbook was cooked up for exactly this reason!",
  },
  {
    title: "Healthy 'junk' food",
    body: "Try making your own healthy junk food using good quality lean meat for burgers, English muffins for pizza bases and a good way to coat homemade fish fingers is to dip them in seasoned flour, beaten egg and crushed cornflakes. For dessert it's easy to make fresh fruit ice lollies from fruit juice and pureed fruits. Try swapping fast food McDonalds for Krispie chicken nuggets, or fries for sweet potato wedges, you can substitute greasy pizzas for cauliflower pizzas, and add extra veggies to hidden veggie burgers.",
  },
];

export const toddlerTopTipsRelatedArticles: RelatedArticleItem[] = [
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
    image: "/articles/top-tips-washing-babies-hands/hero.jpg",
  },
  {
    href: "/go-guide-handling-leftovers-safely",
    title: "Go to Guide: Handling Leftovers Safely",
    image: "/articles/go-guide-handling-leftovers-safely/hero.jpg",
  },
  {
    href: "/top-weaning-tips",
    title: "Annabel Karmel's Top 10 Weaning Tips",
    image: "/articles/top-weaning-tips/hero.jpg",
  },
  {
    href: "/gagging-vs-choking",
    title: "Gagging vs Choking: The differences you need to know when weaning your baby",
    image: "/articles/gagging-vs-choking/hero.jpg",
  },
  {
    href: "/weaning-premature-babies",
    title: "Weaning premature babies",
    image: "/articles/weaning-premature-babies/hero.jpg",
  },
];
