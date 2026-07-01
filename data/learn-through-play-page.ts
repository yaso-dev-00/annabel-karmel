import type { RelatedArticleItem } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { createElement, Fragment, type ReactNode } from "react";

export const articleSlug = "learn-through-play";
export const articlePath = `/articles/${articleSlug}`;

export const learnThroughPlayLead =
  "A child's foundational skills are developed through play. Just think, what's more fun than having the freedom to run, jump, balance on one foot, play with blocks, or other open-ended toys!";

export const learnThroughPlayIntro = [
  "Researchers have identified numerous types of valuable play for little ones, including 'Quiet and Creative' and 'Social and Active', both of which are encapsulated in the activities below. It may be child's play, but it can have a ripple effect on young imaginations.",
  "Key development areas for children in the early years include:",
] as const;

export const learnThroughPlayDevelopmentImage = {
  src: `${articlePath}/development-areas.png`,
  alt: "Key development areas for children including social and emotional development, gross motor skills, cognitive development, fine motor skills, speech and language, and curiosity",
} as const;

export const learnThroughPlayActivitiesIntro =
  "Here are seven simple activities for you to do at home with your own little explorers to encourage them to play and learn or as we like to say 'Learn through Play':";

export type LearnThroughPlaySection = {
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const learnThroughPlaySections: LearnThroughPlaySection[] = [
  {
    title: "Messy Play",
    image: `${articlePath}/messy-play.jpg`,
    imageAlt: "Children enjoying messy play with flour in the kitchen",
    paragraphs: [
      "Children love to use their senses and get messy using sand or water for example. Messy play encourages exploration, the development of their motor skills as well as exciting all of the senses!",
      "Try pouring water through a sieve, making bubbles with washing up liquid, squirting shaving foam or making sandcastles.",
    ],
  },
  {
    title: "Play Dough",
    image: `${articlePath}/play-dough.jpg`,
    imageAlt: "Child playing with pink play dough and letter shapes",
    paragraphs: [
      "Encourage your child to use their hands in playing, squeezing and manipulating playdough. Why not have a go at making your own – there are lots of simple recipes available online and it also acts as a nice 'messy' activity to get your little one involved with too! When playing with playdough, it encourages children to use different fine motor skills, it challenges their coordination and it can even help to build confidence too.",
    ],
  },
  {
    title: "Open ended toys",
    image: `${articlePath}/open-ended-toys.jpg`,
    imageAlt: "Child playing with rainbow pebbles and open-ended toys",
    paragraphs: [
      "Toys such as building blocks and rainbow pebbles are great options for your child as they have endless opportunities for play; sparking children's imaginations. Use in small world play, in learning to count and in the practice and development of speech. They can be stacked, sorted by colour and size and used to make fun pictures and patterns.",
    ],
  },
  {
    title: "Handy helpers",
    image: `${articlePath}/handy-helpers.jpg`,
    imageAlt: "Parent and child playing tea party in a play tent",
    paragraphs: [
      "Involving your toddler in what you are doing is a great way for them to learn about the world around them. Tasks that you might class as mundane such as hoovering, or cooking dinner might be fascinating to them!",
    ],
  },
  {
    title: "Words and numbers",
    image: `${articlePath}/words-and-numbers.jpg`,
    imageAlt: "Toddler playing with colourful alphabet blocks",
    paragraphs: [
      "As well as learning life skills at home, you can ignite a passion for letters and numbers. Counting games can be incorporated into almost any routine at any time, and by keeping it playful, you minimize any anxiety around getting things wrong a few times before getting them right.",
      "And likewise with letters. Children are currently taught the alphabet with the use of phonics; the goal of this technique is to enable early readers to decode written words by sounding them out and blending the sound-spelling patterns together.",
    ],
  },
  {
    title: "Singing",
    image: `${articlePath}/singing.jpg`,
    imageAlt: "Toddler singing with a toy microphone",
    paragraphs: [
      "Lullabies and nursery rhymes have been on children's soundtracks for years, and with good reason too. If you don't know any nursery rhymes, then you can simply make up a song about their day.",
      "As well as being soothing and comforting, music is a great way to help develop language and listening skills.",
    ],
  },
  {
    title: "Story time",
    image: `${articlePath}/story-time.jpg`,
    imageAlt: "Parent and child reading a story together",
    paragraphs: [
      "Reading to your child is recommended for lots of reasons including learning to listen, instilling a love of books, and it's a good for bonding activity too. Even if independent reading is still some way off, your child will memorise favourite stories and 'read along' with you. Children's books with rhythm and repetition are particularly good for this.",
    ],
  },
];

export const learnThroughPlayClosing: ReactNode[] = [
  createElement(
    Fragment,
    null,
    "Remember that children may find it frustrating the first time they start a new activity. But do persist and encourage them to persist too, as the more time they have to explore, the more advanced they are likely to become in terms of fine-tuning their fine motor skills, improving balance and coordination amongst others. Many play advocates from around the globe have been sharing their expertise on \u2018",
    createElement("em", null, "Learning Through Play\u2019"),
    ".",
  ),
  "So, when we can let's try to move away from technology in those early years and build those key foundational skills so that children become lifelong learners through play. Encourage your child to use their imagination, become curious about the world, explore their surroundings, be active and above all, learn through play.",
];

export const edxEducationPromo = {
  title: "Learning through play with Edx Education",
  image: `${articlePath}/edx-promo.jpg`,
  imageAlt: "Child playing with Edx Education rainbow pebbles",
  description:
    "From early childhood active play and art & craft accessories, to maths and classroom resources, Edx Education's innovative toys and resources provide children a fun and engaging way to learn.",
  shopHref: "https://www.amazon.co.uk/stores/page/23DE37C2-3BE5-4BEB-8622-80D1F174A56E?ingress=3",
  shopButtonImage: `${articlePath}/edx-button.png`,
  instagramHref: "https://www.instagram.com/edxeducation/",
  instagramIcon: `${articlePath}/instagram-icon.jpg`,
} as const;

export const learnThroughPlayRelatedArticles: RelatedArticleItem[] = [
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
