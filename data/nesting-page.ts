import type { RelatedArticleItem } from "@/components/related-articles-carousel";

export const articleSlug = "nesting";
export const articlePath = `/articles/${articleSlug}`;

export const motherBoxUrl = "https://themotherbox.co.uk/";

export type NestingTextPart = string | { label: string; href: string };

export type NestingParagraph = string | { parts: NestingTextPart[] };

export const nestingIntro: NestingParagraph[] = [
  "In a strange course of events, as you near the end of your pregnancy – a time when your focus should be on resting up (with your feet up), you might all of a sudden find yourself with bursts of energy and a desire to clean, tidy and organise every room in the house!",
  "Don't worry, this slightly unexpected reaction is a completely natural part of pregnancy known as nesting. It's our in-built desire to create a safe environment for our baby, and some researchers have even found that in these final stages of pregnancy, women can even become more selective about the company they keep as the act of nesting creates an urgent need to 'protect and prepare' for the imminent arrival of their baby.",
];

export const bigCleanSection = {
  heading: "The big clean!",
  paragraphs: [
    "Just because you suddenly have a new lease of life, do remember that you are still heavily pregnant! While most domestic tasks are completely safe to do during pregnancy, at this stage more than ever you need to make sure you are looking after yourself.",
    "Although your partner, mum and dad or friends won't experience the same hormonal desire to frantically clean that comes with nesting, don't be afraid to get them involved too. Nesting is a really lovely project to do with your partner as it is a good way to get them involved in feeling part of the pregnancy.",
    "But, whoever you ask, it is particularly important to ask for help when it comes to anything too strenuous such as moving heavy furniture or climbing any ladders up to the attic for example. And if you're planning to paint your baby's room in the final weeks then enlist the help of a partner, family member, friend or professional if you are using oil-based paints as these are full of strong chemicals and you shouldn't be going anywhere near these.",
    "The same goes for cleaning products. It is absolutely fine to give the house a once over or a bit of a spring clean ahead of baby's arrival; it will make you feel relaxed and ready to enter this next exciting chapter, however, just keep an eye on your choice of cleaning products as some can be quite toxic and you need to be extra careful not to breathe these in or get any on your skin.",
  ] as NestingParagraph[],
};

export const lessStrenuousSection = {
  heading: "Less strenuous nesting",
  paragraphs: [
    {
      parts: [
        "Once you have managed to tear yourself away from those household cleaning jobs, or, if you have handed these over to a willing helper, then nesting can be a good time to prepare your ",
        { label: "hospital bag", href: "https://www.annabelkarmel.com/babys-hospital-bag/" },
        " so you know that you are ready when the time comes. You could also look at batch cooking some meals so that your freezer is full for when you get home from the hospital.",
      ],
    },
    {
      parts: [
        "Now is also a good time to make sure you have all of the essential numbers for the hospital, the maternity unit and your GP stored in your phone as well as anyone else you might want to call. It's a good idea to use this time to go through your ",
        { label: "birth plan", href: "https://www.annabelkarmel.com/your-birth-plan/" },
        " with your birthing partner; see if there is anything you want to add, remove or change and triple check to see if anything is missing.",
      ],
    },
    "Although nesting might give you more energy, don't overdo it physically. Instead, do use this opportunity to research a little into what comes next. Pregnancy and the birth will have been a focus up until now but it is worthwhile getting ahead if you can so that what does come next is not a complete shock! Check out your local services, or look into feeding methods, for example, if you are thinking of breastfeeding then take this time to locate and visit your local breastfeeding group. And if you have friends or family who have recently had babies, call them up for some advice and tips. If not, there are lots of parenting forums and local pregnancy groups where you can soon make friends and ask for some guidance.",
    {
      parts: [
        "Finally, a word of warning as nesting can also make you feel the need to go shopping (seeing as you've cleared loads of stuff from the house there is now space for those new-born 'essentials'). There are endless lists of products and equipment available for pregnancy, birth and new babies and many of these just aren't necessary. Looking through these lists of products can be daunting particularly when you start considering the amount of space they will take up, let alone the cost of it all! Make sure that you have ",
        { label: "bought the essentials", href: "/advice/what-to-buy" },
        " but don't get too ahead of yourselves as you can always add as you go once you've worked out what you genuinely need.",
      ],
    },
  ] as NestingParagraph[],
};

export const nestingRelatedArticles: RelatedArticleItem[] = [
  {
    href: "/advice/pregnancy-month-month",
    title: "Your pregnancy month-by-month",
    image: "/articles/pregnancy-month-month/hero.jpg",
  },
  {
    href: "/advice/top-ten-tips-fourth-trimester",
    title: "Top ten tips for the fourth trimester",
    image: "/articles/top-ten-tips-fourth-trimester/hero.jpg",
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
    href: "/balanced-diet-throughout-trimesters",
    title: "A balanced diet throughout your trimesters",
    image: "/articles/balanced-diet-throughout-trimesters/hero.jpg",
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
    href: "/food-allergies-your-common-questions-concerns-answered",
    title: "Food Allergies – your common questions & concerns answered",
    image: "/articles/food-allergies-your-common-questions-concerns-answered/hero.jpg",
  },
  {
    href: "/gagging-vs-choking",
    title: "Gagging vs Choking: The differences you need to know when weaning your baby",
    image: "/articles/gagging-vs-choking/hero.jpg",
  },
];
