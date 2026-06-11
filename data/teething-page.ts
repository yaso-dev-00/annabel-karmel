import accordionStyles from "@/app/eggs-questions-answered/page.module.css";
import type { FoodCategoryItem } from "@/components/food-category-accordion";
import type { RelatedArticleItem } from "@/components/related-articles-carousel";
import Link from "next/link";
import { createElement, Fragment, type ReactNode } from "react";

export const articleSlug = "teething";
export const articlePath = `/articles/${articleSlug}`;

export const teethingIntro =
  "Your baby was born with tooth buds in their gums and their pearly whites usually start to appear at about six months. It can take over a year for all the milk teeth to come through but most babies have a full set by the time they are two and a half.";

const yoghurtLolliesParagraph: ReactNode = createElement(
  Fragment,
  null,
  createElement("strong", null, "Yummy Yoghurt Lollies"),
  " are a teething treat, great for baby to suck or chew to help soothe sore or swollen gums ",
  createElement(
    Link,
    {
      href: "https://www.annabelkarmel.com/recipes/fruit-veg-ice-lollies/",
      className: accordionStyles.accordionInlineLink,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    "https://www.annabelkarmel.com/recipes/fruit-veg-ice-lollies/",
  ),
);

export const teethingAccordionItems: FoodCategoryItem[] = [
  {
    title: "What to expect",
    paragraphs: [
      "The bottom front teeth are usually the first to appear, followed by the top front ones a couple of months later. The top lateral incisors (either side of the top front teeth) follow at about nine to 11 months and the bottom lateral incisors at about 10 -12 months.",
      "The back teeth (molars) come in at 12-16 months and the canines – which are towards the back of the mouth – arrive at 16-20 months. The second molars complete the set at 20-30 months.",
      "Here are some telltale signs that the teething fun and games are about to commence:",
    ],
    subsections: [
      {
        heading: "Swollen red gums",
        paragraphs: [
          "Teeth have to push their way through soft gums, which can cause them to swell. Pressure from chewing can help to ease the discomfort.",
        ],
      },
      {
        heading: "Gum rubbing",
        paragraphs: [
          "Your baby is helpless to stop the discomfort but may put their fingers in their mouths to try to stop the pain. You can help them my giving them a dummy, chewing the teat will be more effective than chewing their hands.",
        ],
      },
      {
        heading: "Not feeding as well",
        paragraphs: [
          "Sucking causes more blood to flow to the swollen gums so feeding can be a miserable experience for a teething baby, which is why they may turn away from the breast or bottle.",
        ],
      },
      {
        heading: "Drooling",
        paragraphs: [
          "A soggy chin from too much dribble can make the skin sore, try to wipe it gently with a soft cloth. Barrier creams can help to protect against irritation.",
        ],
      },
      {
        heading: "Flushed face",
        paragraphs: [
          "Rosy cheeks don't always come with a temperature and there is no research to prove that teething comes with a fever. If your baby feels flushed and warm ensure that there is nothing else making them unwell; ear infections are easily mistaken for teething and if you are unsure consult your doctor.",
        ],
      },
      {
        heading: "Irritable and restless",
        paragraphs: [
          "Your happy baby could be a bit crankier than usual for a week or so while the first troublesome teeth make their appearance known. Teething soothers can provide a distraction and cheer them up.",
        ],
      },
      {
        heading: "Waking at night",
        paragraphs: [
          "Your teething baby may become unsettled at night, which can be particularly frustrating if you had just hit a six-month-more-sleep milestone. Be reassured that not all emerging teeth will cause this much bother.",
        ],
      },
    ],
    closingParagraphs: [
      "Like most areas of parenting it is just a phase and one that you will both conquer!",
    ],
  },
  {
    title: "Teething soothers & recipes",
    paragraphs: [
      "Teething gels contain a local anaesthetic and antiseptic. They cause a temporary numbness so it is best not to use them just before you breastfeed, a numb tongue could stop baby sucking properly and the gel may also numb the skin around your nipple making it tricky for you too.",
      "Solid silicone-based teething rings are considered safer than liquid filled ones because they can be sterilised and can't leak. Putting them in the fridge so they are chilled can optimise their effectiveness.",
      "Freezing a wet flannel for baby to gnaw can help and frozen fruit slices like peaches or melons or hard vegetables can soothe inflammation Never leave your baby unattended with food items, they may be growing teeth but they need to learn to chew and food items can be a choke hazard.",
      yoghurtLolliesParagraph,
    ],
  },
  {
    title: "Teeth, meet brush!",
    paragraphs: [
      "By letting your baby play with a toothbrush as soon as teeth start to appear, you can introduce the concept of brushing. Choose one that is the right size – a chunky handle will be easier to grip.",
      "Much as baby will be keen to take the lead, it's important that you remain the toothy teacher, brush in a circular motion over gums as well as teeth twice a day. Given that teething babies are desperate to chew, chomping on a toothbrush is a good way to mix work and pleasure!",
      "Babies like to copy, so let them see you brush your teeth. As they grows, so too does their sense of independence and if they resent you brushing their teeth, try letting them have a go first while you 'tidy up' afterwards. As with most areas of parenting the more fun you can make the chore the more successful (not stressful) it is likely to be.",
      "You can reduce the chances of tooth decay by avoiding high sugar foods and drinks, and encourage drinks to be had from a cup not a bottle.",
      "Use just a smear of age appropriate toothpaste on the end of the brush as chances are it will be swallowed. Dentists recommend that babies have at least 1000ppm of fluoride in their toothpaste. Too much fluoride can lead to mottled enamel so if you live in an area where fluoride has been added to the water, or are unsure if you need to consider supplements, have a chat with your dentist.",
      "Drama at the dentist is not uncommon for little ones but by taking your child along to your appointments you can reduce their fear. If you are anxious about your own appointments then consider letting them accompany a friend or relative to their appointment. It is not usually necessary for your child to have an in-depth check-up as soon as teeth begin to appear but most dentists are keen to expose children to the experience so it becomes familiar.",
    ],
  },
];

export const teethingRelatedArticles: RelatedArticleItem[] = [
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
    href: "/advice/cooking-with-kids",
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
