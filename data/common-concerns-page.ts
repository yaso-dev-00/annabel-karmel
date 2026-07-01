import accordionStyles from "@/app/eggs-questions-answered/page.module.css";
import type { FoodCategoryItem } from "@/components/ArticleScreen/FoodCategoryAccordion";
import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import Link from "next/link";
import { createElement, Fragment, type ReactNode } from "react";

export const articleSlug = "common-concerns";
export const articlePath = `/articles/${articleSlug}`;

export const commonConcernsIntro =
  "Here are a list of some common ailments, how to spot the symptoms, and how best to get your toddler feeling tip top as soon as possible.";

const nitsVideoLink: ReactNode = createElement(
  Fragment,
  null,
  createElement(
    Link,
    {
      href: "https://www.youtube.com/watch?v=jy9HRqAd-VE#t=14",
      className: accordionStyles.accordionInlineLink,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    "https://www.youtube.com/watch?v=jy9HRqAd-VE#t=14",
  ),
);

export const commonConcernsAccordionItems: FoodCategoryItem[] = [
  {
    title: "Nits",
    paragraphs: [
      "Head lice are the insects that live in the hair, nits are the empty white sacs where the lice eggs have hatched from, and are attached to a hair shaft using a strong glue-like substance making them difficult to remove.",
      "A usual outbreak contains about 30 lice per head. The lice are the size of a sesame seed and cling onto the hair shaft with little hook-like claws on the ends of their 6 legs. They survive by biting the scalp and feeding on the blood. They move about by crawling so can only be caught by head-to-head contact with someone who already has them.",
      "Once hatched, it takes 10 days for the lice to mature to adults and can live for roughly 1 month in someone's scalp. Lice will die if they are away from a human's head/body for more than 2 days so it is very rare to catch them from a pillow or a towel. Lice congregate behind the ears and at the nape of the neck so make sure to check thoroughly in these areas.",
    ],
    subsections: [
      {
        heading: "Dispelling the myths:",
        listItems: [
          "lice cannot hop like fleas, burrow like mites or fly like mosquitos",
          "you cannot catch head lice from pets",
          "not all cases of nits cause itchy scalps",
          "Itching does not guarantee their presence – only live lice on wet combing confirms diagnosis.",
        ],
      },
      {
        heading: "Treatment options",
        paragraphs: [
          "Only treat if live head lice are present on combing as this confirms a live infestation. Don't treat them 'just in case'. Don't forget to wet comb the rest of the family for any live lice, as they will need treatment too.",
          "Treatment used to consist of insecticides but lice would often develop resistance to them, so these types of treatments have been replaced with silicone and oil-based preparations which have a physical rather than a chemical action on lice.",
        ],
        listItems: [
          "Dimeticone 4% lotion (trade name: Hedrin®). This is a silicone-based product which is thought to work by blocking the lice's breathing tubes but it is not thought to kill unhatched eggs, so a second treatment is needed. It should be applied twice – 7 days apart with each application left on overnight and then washed off with shampoo and water. Dimeticone is suitable for all ages, and is available on prescription. You can also buy dimeticone over-the-counter (although not for children younger than 6 months of age).",
          "Wet combing using the Bug Buster® comb and method. This method removes head lice (but not eggs) without having to use a lotion to kill them, and is similar to detection combing. This treatment can be very time consuming as it takes up to an hour to do wet combing sessions properly and you need to repeat this every 4 days for 16 days to ensure you are removing the lice that hatched from eggs after the previous session. Wash the hair with ordinary shampoo, rinse and put on lots of ordinary condition. Detangle the hair with an ordinary brush/comb and then, using the specialised detection comb, start combing from the scalp to the ends, paying particular attention to behind the ears and nape of the neck. Check the comb for lice after each stroke, wiping any onto a tissue. After combing the whole head, rinse out the conditioner.",
          "Isopropyl myristate and cyclomethicone solution (trade name: Full Marks Solution®). This works in a similar way to dimeticone. You apply the solution to the scalp and leave in place for 10 minutes. The hair is then combed with a fine-toothed comb to remove lice. Then wash the solution away using ordinary shampoo. The treatment should then be repeated in 7 days time. It is not suitable for children younger than 2. It is available on prescription and also to buy over-the-counter.",
          "Coconut, anise and ylang ylang (CAY) spray (brand name: Lyclear Spray Away®). This too works in a similar way to dimeticone. You apply the spray to the hair and scalp and leave in place for 15 minutes. The hair is then combed with a fine-toothed comb to remove lice. Then wash the spray away using ordinary shampoo. The treatment should then be repeated in 7 days time. It is not suitable for children younger than 2. It is available on prescription and also to buy over-the-counter.",
          "Malathion 0.5% aqueous liquid (has various trade names e.g. Derbac-M). This is a chemical insecticide that has been used for many years and poisons the lice. You should apply the lotion twice – seven days apart. Each application is left on for at least 12 hours (overnight) and then washed off with shampoo and water. It is available on prescription but you can also buy malathion over-the-counter (although not for children younger than 6 months). Please note: shampoos, mousses and creme rinse preparations of malathion or other insecticides are not recommended, as they do not work as well as lotions or liquids.",
        ],
      },
      {
        heading: "Here is a helpful video:",
        paragraphs: [nitsVideoLink],
      },
    ],
  },
  {
    title: "Chickenpox",
    paragraphs: [
      "Chickenpox is a highly infectious disease mainly of children under 10 years old, though it may occur at any age. It is characterised by a temperature and a rash of red itchy spots that turn into fluid-filled blisters. They then crust over to form scabs, which eventually drop off. It is caused by the virus called Varicella Zoster. Some children only have a few spots, but other children can have spots that cover their entire body mainly on their face and trunk but can be in scalp, ears and genitals. Chickenpox outbreaks often follow a seasonal pattern with the most common months being from March to May.",
      "The virus stays dormant within the nervous system until occasionally in later life, it can be reactivated and cause shingles – a painful blistering condition.",
    ],
    subsections: [
      {
        heading: "Can you prevent chickenpox?",
        paragraphs: [
          "There is a chickenpox vaccination available privately for children above 1 year old. Although this has been part of the American childhood vaccination schedule for some time, the UK vaccination committee do not recommend routine childhood vaccination against chickenpox as the post-vaccination immunity is less than natural immunity after an actual infection.",
        ],
      },
      {
        heading: "Once your child has chickenpox, how do you stop it spreading?",
        paragraphs: [
          "Keep children off nursery or school until all their spots have crusted over. Also try to keep them away from public areas to avoid contact with people who may not have had it e.g. newborn babies, pregnant women and anyone with a weakened immune system e.g. from cancer treatment.",
        ],
      },
      {
        heading: "Treatment options",
        paragraphs: [
          "Although chickenpox in children is considered a mild illness, your child will probably feel pretty miserable and irritable while they have it.",
        ],
        listItems: [
          "Painkillers – only if they are in pain or have a fever, you can give them paracetamol. Do not given ibuprofen as this can cause unusual skin reactions during chickenpox.",
          "Avoid dehydration – if they have a sore mouth, suck on ice lollies will help soothe as well as hydrate them. Avoid salty or acidic foods if their mouths are sore.",
          "Stop the scratching to avoid future scarring – cut fingernails very short, put gloves on at night (or socks over hands) to prevent scratching in their sleep, calamine lotion (the pink stuff!) helps if dabbed onto the spots with cotton wool.",
        ],
      },
      {
        heading: "When to see a doctor:",
        paragraphs: [
          "Occasionally children can become more seriously ill with chickenpox and need to see a doctor, so contact your GP straight away if your child develops any of the following:",
        ],
        listItems: [
          "The blisters on their skin become infected",
          "They have a pain in their chest or difficulty breathing",
          "Ongoing fever with new blisters forming after 6 days from the first spots",
        ],
      },
    ],
  },
  {
    title: "Colds",
    paragraphs: [
      "Most colds are caused by viruses. In three or four days your body will make enough antibodies to kill the virus and you will feel better without needing to see a healthcare professional. If your child develops a runny nose/'the snots', whether the mucus is clear or bright green, doctors will not prescribe antibiotics because they do not work against viruses. Only if there are other more concerning features associated with the runny nose will they consider them.",
      "The best advice is to treat your child's symptoms at home, and here are some helpful tips:",
    ],
    listItems: [
      "Try placing a bowl of warm water in the room where the child sleeps. This raises the humidity which may help to loosen thick mucus overnight, so you can help them blow it out the next morning!",
      "If they are not yet able to blow their noses you can spin out a wisp of cotton wool between your fingers and thumb and then put it up your child's nose and give it a wiggle! This should cause them to sneeze out the mucus for you so be ready with a tissue!",
      "Saline (salt-water) drops or sprays may be useful if your child will allow you to use them! Saline drops thin the mucus and so make it easier for them to clear it. You can buy saline drops from a pharmacist who can also advise on how to use them. If saline is used too often, the skin around the nose may become a little sore.",
      "Keep them hydrated – like with any cold or flu-like illness, make sure they drink plenty of liquid otherwise they will generally feel worse, plus their mucus will become very sticky and hard to clear.",
      "Vapour rubs are a popular treatment and are applied to the chest and back but there is little scientific evidence as to how well they work at unblocking noses.",
    ],
  },
  {
    title: "Teeth-care",
    paragraphs: [
      "As soon as their first baby teeth begin to appear you should start to clean them. At first you may find it easier to use a piece of clean gauze or cloth wrapped around your forefinger. As more teeth appear you will need to use a baby toothbrush. Use a smear of fluoride toothpaste and gently massage it around their teeth and gums.",
      "As the child gets older it may be difficult to do it this way, but you can gradually give them more responsibility for cleaning their teeth. It is important to clean their teeth twice a day with a toothpaste that contains at least 1000ppm (parts per million) of fluoride. After 3 years old, you can use toothpaste that contains 1350ppm to 1500ppm. You should supervise brushing until the age of 7 and make sure they don't eat or lick toothpaste from the tube, encouraging them to spit out excess toothpaste.",
    ],
    subsections: [
      {
        heading: "When to see the dentist?",
        paragraphs: [
          "It is best to discuss their first visit with your dentist first, but you could take your child with you to your own routine check-ups. This can help them to get used to the surroundings. Generally speaking, the baby's own check-ups can start any time from about 6 months or from when the teeth start to appear. When you visit the dentist, be positive about it and make the trip fun. This will stop your child worrying about future visits. Don't forget that your dentist will be able to offer advice and prescribe medicines for teething pains etc., and will be happy to answer any questions you may have.",
          "If you are unsure about how to look after your child's teeth, ask your dentist or health visitor.",
        ],
      },
    ],
  },
  {
    title: "Constipation / diarrhoea",
    paragraphs: [
      "Constipation is common in childhood, and the causes are countless. Many parents don't recognise the signs of constipation which include: soiling underwear, foul smelling wind/stools, excessive wind, straining whilst sitting on the toilet, passing enormous stools (sometimes with minor bleeding) or small pellets like rabbit droppings, deliberate withholding to stop passage of stools, tummy pain or swelling and poor appetite to name a few.",
      "Some non-pathological causes include painful stooling so they hold it in, dehydration either from not drinking enough or being unwell with a temperature, fussy eaters who don't eat enough fibre, psychological issues e.g. illness of parent or birth of new sibling, early toilet training and some medicines e.g. Gaviscon for reflux can cause constipation.",
      "Treatment involves laxatives, behavioural interventions and a balanced diet and fluid intake.",
      "Acute diarrhoea in children is commonly caused by infection from a virus e.g. rotavirus. It should clear up quickly and mainstay treatment is ensure adequate hydration as they can lose a lot of fluid through watery stools e.g. by using oral rehydration salts (e.g. Dioralyte). Chronic diarrhoea usually has a non-infectious cause e.g. cow's milk intolerance and more serious illnesses often associated with weight loss or rectal bleeding – in which case you should see your GP urgently.",
    ],
  },
];

export const commonConcernsRelatedArticles: RelatedArticleItem[] = [
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
