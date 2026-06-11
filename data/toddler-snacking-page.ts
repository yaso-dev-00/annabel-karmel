import type { ArticleRecipeCarouselItem } from "@/components/article-recipe-carousel";
import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "toddler-snacking";
export const articlePath = `/articles/${articleSlug}`;

export type ToddlerSnackingSection = {
  title: string;
  paragraphs: string[];
  topTip?: string;
  image?: string;
  imageAlt?: string;
  recipes?: ArticleRecipeCarouselItem[];
};

export const toddlerSnackingIntroSections: ToddlerSnackingSection[] = [
  {
    title: "When is a good time to give my toddler snacks?",
    paragraphs: [
      "Toddler snacks should be given once or twice a day, alongside three meals. Try to give your toddler their meals and snacks at regular times and don't give snacks just before meals. Don't let your child graze too much throughout the day. We are a nation of fussy eaters, and continuously giving children snacks and not allowing them to get hungry is part of the problem.",
    ],
  },
  {
    title: "What to consider with snacks?",
    paragraphs: [
      "When your toddler comes home from nursery or you're out and about for the day, your little one is probably going to get pretty hungry. It's a good idea to have some toddler snacks ready to go so you have something to hand when you're faced with a hungry toddler! You want to make sure snacks are low in salt and sugar, are nutritious and quick and easy.",
    ],
  },
];

export const toddlerSnackingSections: ToddlerSnackingSection[] = [
  {
    title: "Fruit and Veg Snacks",
    paragraphs: [
      "Fruits and vegetables are packed full of vitamins, minerals, fibre, antioxidants, and water making them a great, nutrient-rich, toddler snacks.",
      "Whilst whole fruit may be disregarded, fruit or vegetable slices displayed in fun ways such as being skewered on to straws, can seem much more fun to your little ones! Try to keep the fruit and veg varied as this will help your toddler get a good range of vitamins and minerals. Cucumber sticks, sliced blueberries, dried apricots and strawberries all make great snacks.",
    ],
    topTip:
      "If you cut up a few carrots and put them in cold water in an airtight container, they will last for several days in the fridge.",
  },
  {
    title: "Carbohydrate Based Snacks",
    image: `${articlePath}/low-gi-carbohydrates.jpg`,
    imageAlt: "Low GI Carbohydrates",
    paragraphs: [
      "Carbohydrates and fats are the main source of energy for toddlers. Carbohydrates are foods which break down in to sugars. This breakdown process releases energy which we can use. When we think of carbohydrates we often think of bread, rice and potatoes which break down in to glucose (a type of sugar). But fruits are also carbohydrates as they contain fructose sugars as well as glucose sugars, that's why fruits are naturally sweet. Dairy foods also contain sugars called lactose which provide sweetness. There are also nutrient poor carbohydrate foods such as biscuits and cakes which should be saved for occasional treats.",
      "We can look at the Glycaemic Index (GI) of carbohydrates to help see how healthy they are. GI is a measure of the rate at which blood sugar levels rise after eating a particular food. Low GI foods release energy slower than high GI foods meaning you feel fuller for longer. This slow energy release also means that blood sugar and insulin levels are more stable which, in turn, keeps concentration and energy levels much more stable. Whole grain foods and natural carbohydrates such as pasta, wholegrain bread, oats and basmati rice all have a low GI.",
    ],
    topTip: "Slightly flatten bread with a rolling pin so the sandwich isn't too big for your toddler's mouth",
    recipes: [
      {
        title: "Pasta Shells with Butternut Squash",
        href: "https://www.annabelkarmel.com/recipes/pasta-shells-with-butternut-squash/",
        image: "/articles/pasta-recipes-for-baby/tomato-butternut-squash-pasta.jpg",
      },
      {
        title: "Mini Energy Balls",
        href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
        image: "/articles/healthy-snacks-for-toddlers-and-kids/mini-energy-balls.png",
      },
    ],
  },
  {
    title: "Protein Rich Toddler Snacks",
    image: `${articlePath}/protein-toddler-snacks.jpg`,
    imageAlt: "Protein Toddler snacks",
    paragraphs: [
      "When we eat proteins, we break them down in to amino acids which we can then use to build muscle, organs, our nervous system and more. We can categorise amino acids as 'non-essential' (those our bodies make themselves) and 'essential' (those we need to eat as we can't make). Most of the ones we can't make are found in animal sources such as meat and dairy products so even vegetarian diets contain most essential amino acids as cheese and eggs provide these. However, there are very few vegan foods which contain all of the essential amino acids, quinoa, soy, and chia seeds are exceptions.",
    ],
    topTip:
      "Roll up wafer-thin cooked meats in to cigar shapes for a quick protein boost that's easy for your little one to hold.",
    recipes: [
      {
        title: "Scrambled-Egg Tortilla Wrap",
        href: "https://www.annabelkarmel.com/recipes/scrambled-egg-tortilla-wrap/",
        image: "/articles/healthy-snacks-for-toddlers-and-kids/scrambled-egg-teddy-bears.jpg",
      },
      {
        title: "Tasty Beef Croquettes with Five Vegetables",
        href: "https://www.annabelkarmel.com/recipes/tasty-beef-croquettes-with-five-vegetables/",
        image: "/articles/annabels-top-15-recipes/superfood-veggie-croquettes.jpg",
      },
    ],
  },
  {
    title: "Snacks with Healthy Fats",
    paragraphs: [
      "There are different types of fats, some are healthier than others. As a general rule, unsaturated fats come from fish, eggs and plants and are healthier than saturated fats which come from animal sources (meat and dairy), with the exception of coconut and palm oils. Fats are a source of energy and they are need to carry fat soluble vitamins (A, D, E, K) around the body. Essential fatty acids (Omega oils) which help build cells, regulate the nervous system, strengthen the cardiovascular system, build immunity, and help the body absorb nutrients, can't be made by the body. They are found in fatty fish and to a lesser extent in flaxseeds, walnuts, kale, and soybean oil and algae.",
    ],
    topTip:
      "Oily fish, such as salmon, mackerel and fresh tuna, are also a rgeat source of vitamin D and calcium and should be eaten by you and your toddler at least twice a week",
    recipes: [
      {
        title: "Cod & Salmon Quinoa Balls",
        href: "https://www.annabelkarmel.com/recipes/cod-salmon-quinoa-balls/",
        image: "/articles/fabulous-finger-food-2/cod-salmon-quinoa.jpg",
      },
      {
        title: "Mini Energy Balls",
        href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
        image: "/articles/healthy-snacks-for-toddlers-and-kids/mini-energy-balls.png",
      },
    ],
  },
  {
    title: "Sweet treats",
    image: `${articlePath}/toddler-snacks-sweet.png`,
    imageAlt: "Toddler snacks, sweet",
    paragraphs: [
      "Enjoying regular healthy snacks is a good habit to get your child into and can instil a love of healthy food early on. That isn't to say that chocolate and biscuits should be banned; forbidding something can make more tempting. But if your child isn't used to having regular sugary snacks, she isn't likely to miss them if they aren't there.",
    ],
    topTip:
      "Sweet treats don't have to be nutritionally poor. Adding dried or fresh fruits, oats and nuts to sweet treats can can help you balance the sweetness with the goodness.",
    recipes: [
      {
        title: "Tasty Carrot & Oat Energy Bars",
        href: "https://www.annabelkarmel.com/recipes/tasty-carrot-oat-energy-bars/",
        image: "/articles/foods-boost-childs-brainpower/recipes/tasty-carrot-oat-energy-bars.jpg",
      },
      {
        title: "Mini Energy Balls",
        href: "https://www.annabelkarmel.com/recipes/mini-energy-balls/",
        image: "/articles/healthy-snacks-for-toddlers-and-kids/mini-energy-balls.png",
      },
    ],
  },
];

export const toddlerSnackingRelatedArticles: RelatedArticleItem[] = [
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
