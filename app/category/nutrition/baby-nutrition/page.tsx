import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { enrichListingArticle } from '@/data/resolve-article-listing';
import Link from 'next/link';
import styles from './page.module.css';

type BabyNutritionPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type ListingArticle = {
  title: string;
  href: string;
  heroImage: string;
  heroAlt: string;
  category: string;
  excerpt: string;
};

/** Original listing images (same URLs as annabelkarmel.com Baby Nutrition archive). */
const AK_UPLOADS = 'https://www.annabelkarmel.com/wp-content/uploads';

const ANNABEL_ORIGIN = 'https://www.annabelkarmel.com';

/**
 * Annabel's CDN often returns SiteGround's captcha challenge (HTML) instead of image bytes for hotlinked requests.
 * Route listing images through images.weserv.nl so the browser receives a real image (public image proxy).
 */
function listingImageSrc(src: string): string {
  if (!src.startsWith(ANNABEL_ORIGIN)) {
    return src;
  }
  return `https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=900`;
}

const featuredExperts = {
  title: 'Meet our experts',
  description:
    "We've partnered with top UK experts to give you the latest first-hand advice on all those important areas in raising happy, healthy babies, children & parents! From allergies to breast and bottle feeding, sleep to post-natal care and wellness, we've got your questions and concerns covered.",
  ctaLabel: 'Read more',
  ctaHref: '/meet-our-experts',
  image: `${AK_UPLOADS}/2021/08/Experts-1-optimized.jpg`,
};

/** Page 1 — same order, copy and images as annabelkarmel.com/category/nutrition/baby-nutrition/ */
const pageOneArticles: ListingArticle[] = [
  {
    title: 'The Best Foods to Help Your Baby Sleep',
    href: '/best-foods-to-help-your-baby-sleep',
    heroImage: `${AK_UPLOADS}/2026/01/Sleeping-baby4-1-1024x683-optimized.png`,
    heroAlt: 'The Best Foods to Help Your Baby Sleep',
    category: 'Articles',
    excerpt:
      "The Best Foods to Help Your Baby Sleep In partnership with Nanit We all know that a good night's sleep ...",
  },
  {
    title: 'What to do when your baby is sick',
    href: '/what-to-do-when-your-baby-is-sick',
    heroImage: `${AK_UPLOADS}/2022/12/shutterstock_1216760320-1024x683-optimized.jpg`,
    heroAlt: 'What to do when your baby is sick',
    category: 'Articles',
    excerpt:
      'We live in a funny world where we offer parenting classes to teach you how to deliver a placenta, but ...',
  },
  {
    title: "Annabel's Top 15 recipes",
    href: '/annabels-top-15-recipes',
    heroImage:
      '/articles/annabels-top-15-recipes/chicken-tomato-veggie-stars.jpg',
    heroAlt: "Annabel's Top 15 recipes",
    category: 'Baby Nutrition',
    excerpt:
      "Stuck for fresh mealtime ideas? We've done the hard work for you and put together our top 15 recipes of ...",
  },
  {
    title: '10 Quick & Easy Pasta Recipes for Baby',
    href: '/pasta-recipes-for-baby',
    heroImage: `${AK_UPLOADS}/2023/12/Annabel-Karmels-pasta-shells-with-tomato-and-mascarpone-sauce-optimized.jpg`,
    heroAlt: '10 Quick & Easy Pasta Recipes for Baby',
    category: 'Articles',
    excerpt:
      'Pasta is a family staple for good reason – not only is it delicious and pastably one of the easiest ...',
  },
  {
    title: "Annabel's Top 10 Summer Baby Purees",
    href: '/annabels-top-10-summer-baby-purees',
    heroImage: `${AK_UPLOADS}/2021/07/Blueberry-Pear-and-Banana-Puree-3-optimized.jpg`,
    heroAlt: "Annabel's Top 10 Summer Baby Purees",
    category: 'Articles',
    excerpt:
      'Summertime and the living is easy… especially with these easy, peasy baby purees! Whether you and your little one are ...',
  },
  {
    title: 'What spices can you give to your baby?',
    href: '/what-spices-can-you-give-to-your-baby',
    heroImage: `${AK_UPLOADS}/2022/08/Untitled-1-1-1024x1024-optimized.png`,
    heroAlt: 'What spices can you give to your baby?',
    category: 'Articles',
    excerpt:
      'Ban bland baby food! Little ones should be savouring tasty and varied meals packed with flavour, and the best way ...',
  },
  {
    title: "Top foodie tips for boosting yours and your child's immune system",
    href: '/boost-your-childs-immune-system',
    heroImage: `${AK_UPLOADS}/2021/12/AK-FOODS-TO-FIGHT-VIRUSES-200311-01-1024x1024-optimized.jpg`,
    heroAlt:
      "Top foodie tips for boosting yours and your child's immune system",
    category: 'Articles',
    excerpt:
      "If there's anything that we've learnt from the past two years, it's that we can't underestimate the importance of a ...",
  },
  {
    title: 'Rich in flavour, zero salt family recipes',
    href: '/zero-salt-family-recipes',
    heroImage: `${AK_UPLOADS}/2023/10/20210914-AK07399_1-1024x1024-optimized.jpg`,
    heroAlt: 'Rich in flavour, zero salt family recipes',
    category: 'Articles',
    excerpt:
      "I've teamed up with Knorr to launch #KnorrFamilyFlavours using their history-making #KnorrZeroSalt range of stock cubes. These pioneering stock cubes ...",
  },
  {
    title: "Annabel's Top 10 Finger Food Recipes",
    href: '/annabels-top-10-finger-food-recipes',
    heroImage: `${AK_UPLOADS}/2022/01/recipe2-8-1024x1024-optimized.png`,
    heroAlt: "Annabel's Top 10 Finger Food Recipes",
    category: 'Articles',
    excerpt:
      "These finger food recipes are easy to make and tasty and convenient for when you're on the go. There are ...",
  },
  {
    title: 'Meatless Iron Rich Purees',
    href: '/meatless-iron-rich-purees',
    heroImage: `${AK_UPLOADS}/2022/01/meatless-purees-8-2-1024x1024-optimized.png`,
    heroAlt: 'Meatless Iron Rich Purees',
    category: 'Articles',
    excerpt:
      'Iron is one of the most important critical nutrients you will need to introduce to your baby from six months. ...',
  },
  {
    title: 'What foods should you avoid when baby led weaning?',
    href: '/foods-to-avoid-when-baby-led-weaning',
    heroImage: `${AK_UPLOADS}/2021/08/AdobeStock_147437418-1024x683-optimized.jpeg`,
    heroAlt: 'What foods should you avoid when baby led weaning?',
    category: 'Nutrition',
    excerpt:
      'Baby-led weaning (BLW) is a great opportunity to introduce your baby to a variety of tastes and textures. And while ...',
  },
  {
    title: 'What are the best baby finger foods?',
    href: '/baby-finger-foods',
    heroImage: `${AK_UPLOADS}/2016/08/finger-foods-optimized.jpg`,
    heroAlt: 'What are the best baby finger foods?',
    category: 'Nutrition',
    excerpt:
      'Finger foods are a fun way to encourage co-ordination and help your little one develop the skills necessary to bite, ...',
  },
  {
    title: 'How to introduce finger foods?',
    href: '/introduction-to-finger-foods',
    heroImage: `${AK_UPLOADS}/2019/10/CBTMP4-e1638438811251-optimized.jpg`,
    heroAlt: 'How to introduce finger foods?',
    category: 'Nutrition',
    excerpt:
      'Quite often babies are determined to feed themselves before they have the hand-eye coordination required to use a spoon. And ...',
  },
  {
    title: 'Advice on runny eggs',
    href: '/advice-runny-eggs',
    heroImage: `${AK_UPLOADS}/2019/03/Advice-on-runny-eggs_square_1-optimized.jpg`,
    heroAlt: 'Advice on runny eggs by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Eggs rule. They are quick to cook and full of essential vitamins and minerals. Babies can also now eat them ...',
  },
  {
    title: 'Your Egg Questions Answered',
    href: '/eggs-questions-answered',
    heroImage: `${AK_UPLOADS}/2019/03/British-Lion-Eggs-Square-190306-02-1-1024x871-optimized.jpg`,
    heroAlt: 'Eggs for Babies | Annabel Karmel',
    category: 'Baby Nutrition',
    excerpt:
      'Eggs rule. They are quick to cook and full of essential vitamins and minerals. Babies can also now eat them ...',
  },
  {
    title: 'Why eggs are so good for your growing family?',
    href: '/eggs-good-growing-family',
    heroImage: `${AK_UPLOADS}/2019/03/British-Lion-Eggs-Square-190306-01-1-1024x871-optimized.jpg`,
    heroAlt: 'Why eggs are so good for your growing family? Annabel Karmel',
    category: 'Baby Nutrition',
    excerpt:
      'Eggs are good for us and our little ones but what is it that makes them one of the best ...',
  },
  {
    title: 'Fabulous Finger Food',
    href: '/fabulous-finger-food-2',
    heroImage: `${AK_UPLOADS}/2021/06/chicken-sticks-1-optimized.png`,
    heroAlt: 'Broccoli, Chicken & Potato Bites recipe by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      "These finger food recipes are easy to make and tasty and convenient for when you're on the go. My chicken ...",
  },
  {
    title: 'What is baby-led weaning?',
    href: '/baby-led-weaning',
    heroImage: `${AK_UPLOADS}/2023/10/TunaButternutCroquettes_076-1-683x1024-optimized.jpg`,
    heroAlt: 'What is baby-led weaning?',
    category: 'Nutrition',
    excerpt:
      'If you are about to embark on the weaning journey you probably heard about the different types of weaning techniques. ...',
  },
];

/** Page 2 — same order as annabelkarmel.com/category/nutrition/baby-nutrition/page/2/ */
const pageTwoArticles: ListingArticle[] = [
  {
    title: 'Weaning: getting started',
    href: '/weaning-getting-started',
    heroImage: `${AK_UPLOADS}/2016/07/WEANING-optimized.png`,
    heroAlt: 'Weaning: getting started | Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Some mums feel sad that weaning signals the end of the teeny tiny baby stage, but weaning offers a real ...',
  },
  {
    title: 'Top weaning tips',
    href: '/top-weaning-tips',
    heroImage: `${AK_UPLOADS}/2017/07/ak-weaning-optimized.png`,
    heroAlt: 'Top weaning tips | Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Some mums feel sad that weaning signals the end of the teeny, tiny baby stage, but weaning offers a real ...',
  },
  {
    title: 'Top Tips for Washing Babies Hands',
    href: '/top-tips-washing-babies-hands',
    heroImage: `${AK_UPLOADS}/2020/11/shutterstock_1071027245-1024x768-optimized.png`,
    heroAlt: 'Top Tips for Washing Babies Hands | Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Anyone who has begun weaning their little one can sympathise it gets MESSY! But what about cleaning your baby before ...',
  },
  {
    title: 'Statistics on baby-led weaning',
    href: '/statistics-baby-led-weaning',
    heroImage: `${AK_UPLOADS}/2021/05/blw-optimized.png`,
    heroAlt: 'Statistics on baby-led weaning',
    category: 'Nutrition',
    excerpt:
      'Discover what UK families say about baby-led weaning We had a huge response to our nationwide baby-led weaning survey, and ...',
  },
  {
    title: 'Weaning preterm infants',
    href: '/weaning-preterm-infants',
    heroImage: `${AK_UPLOADS}/2016/08/preterm-optimized.jpg`,
    heroAlt: 'Weaning Preterm Infants | Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Expert advice from Caroline King Dietitian (Neonatal Specialist) Imperial College Healthcare NHS Trust The department of health guidelines for weaning ...',
  },
  {
    title: 'Weaning equipment & cooking',
    href: '/weaning-equipment-cooking',
    heroImage: `${AK_UPLOADS}/2009/01/eat-your-greens-puree-2-optimized.jpg`,
    heroAlt: 'Weaning equipment & Cooking | Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Equipment As well as enthusiasm, some basic weaning equipment can help you on your weaning way and the following items ...',
  },
  {
    title: 'Top tips for thinning baby purees',
    href: '/top-tips-thinning-baby-purees-2',
    heroImage: `${AK_UPLOADS}/2020/09/shutterstock_138858143-1024x1024-optimized.png`,
    heroAlt: 'Top tips for thinning baby purees by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'As you start preparing those first few purees for your baby, you are likely to find that you need some ...',
  },
  {
    title: "Portion size for babies: why there's no easy answer",
    href: '/portion-size-babies-theres-no-easy-answer',
    heroImage: `${AK_UPLOADS}/2023/02/Frozen-Purees-TBP-041033-optimized.jpg`,
    heroAlt: 'Portion size for babies',
    category: 'Nutrition',
    excerpt:
      'Getting the right portion size is a worry for a lot of parents. Simply Google the term and you will ...',
  },
  {
    title: 'Tips and ideas for getting started with baby led weaning',
    href: '/tips-ideas-getting-started-baby-led-weaning',
    heroImage: `${AK_UPLOADS}/2024/07/Chicken-balls-with-Broccoli-Tomato-Chutney-819x1024-1-optimized.jpg`,
    heroAlt: 'Tips and ideas for getting started with baby led weaning',
    category: 'Nutrition',
    excerpt:
      "If you're looking to incorporate baby-led weaning into your baby's routine, then look no further! In this article Annabel Karmel ...",
  },
  {
    title: 'Weaning Equipment \u2013 Getting your kitchen ready for weaning',
    href: '/weaning-equipment-getting-kitchen-ready-weaning',
    heroImage: `${AK_UPLOADS}/2020/08/weaning-optimized.png`,
    heroAlt: 'Weaning Equipment - Getting your kitchen ready by Annabel Karmel',
    category: 'Articles',
    excerpt:
      'Beginning your weaning journey with your baby is such an exciting time for so many reasons but it can also ...',
  },
  {
    title: 'Iron Rich Foods',
    href: '/iron-rich-foods',
    heroImage: `${AK_UPLOADS}/2020/11/minin-beef-meatballs-optimized.jpg`,
    heroAlt: 'Iron Rich Foods',
    category: 'Nutrition',
    excerpt:
      'The best iron-rich food source is red meat, in fact, meat should be one of your babies first foods. Other ...',
  },
  {
    title: 'Introducing lumps, bumps and new flavours',
    href: '/introducing-lumps-bumps-new-flavours',
    heroImage: `${AK_UPLOADS}/2016/07/Popeye-pasta-pg-87-1024x1024-optimized.jpg`,
    heroAlt: 'Introducing lumps, bumps and new flavours by Annabel Karmel',
    category: 'Baby Nutrition',
    excerpt:
      "It's a good idea to progress from purees after a short while, not just because life has more to offer ...",
  },
  {
    title: 'Go to guide: preparing, freezing and reheating foods for baby',
    href: '/go-guide-preparing-freezing-reheating-foods-baby-2',
    heroImage: `${AK_UPLOADS}/2020/09/go-to-guide-optimized.png`,
    heroAlt:
      'Go to guide: preparing, freezing and reheating foods for baby by Annabel Karmel',
    category: 'Baby Nutrition',
    excerpt:
      "There's no doubt that there are so many exciting things to think about when you begin your weaning journey with ...",
  },
  {
    title:
      'Gagging vs Choking: The differences you need to know when weaning your baby',
    href: '/gagging-vs-choking',
    heroImage: `${AK_UPLOADS}/2020/08/5.1.3-SLIDE-3-1024x683-optimized.jpg`,
    heroAlt:
      'Gagging vs Choking: The differences you need to know when weaning your baby by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Introducing solid foods to your baby and starting to wean is a big milestone for parents. The process of slowly ...',
  },
  {
    title: 'Critical nutrients for your baby: the importance of iron',
    href: '/critical-nutrients-baby-importance-iron',
    heroImage: `${AK_UPLOADS}/2018/10/Annecy-Move-to-a-drive03460-1024x1024-optimized.jpg`,
    heroAlt: 'iron for babies',
    category: 'Nutrition',
    excerpt:
      'From the very start of weaning your baby will need a number of all-important essential nutrients to support their mental ...',
  },
  {
    title:
      'Critical nutrients for your baby: the importance of essential fatty acids',
    href: '/critical-nutrients-baby-importance-essential-fatty-acids',
    heroImage: `${AK_UPLOADS}/2020/05/Salmon-Potato-Pasta-Dill-1024x1024-optimized.jpg`,
    heroAlt:
      'Critical nutrients for your baby: the importance of essential fatty acids by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Along with that all-important iron which I covered over in Critical Nutrients for your Baby: Iron, another key nutrient to ...',
  },
  {
    title: 'Best first foods for baby led weaning',
    href: '/best-first-foods-baby-led-weaning',
    heroImage: `${AK_UPLOADS}/2017/05/BLW-optimized.jpg`,
    heroAlt: 'Best first foods for baby led weaning by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      "It's absolutely normal to feel a little anxious when first starting out with first foods for baby-led weaning. That's why ...",
  },
  {
    title: "Baby's Hydration",
    href: '/babys-hydration-2',
    heroImage: `${AK_UPLOADS}/2016/08/hydration-optimized.jpg`,
    heroAlt: "Baby's hydration by Annabel Karmel",
    category: 'Nutrition',
    excerpt:
      'Milk You may be moo-ving into the grown-up world of real food but milk still has an important role for ...',
  },
];

/** Page 3 — same order as annabelkarmel.com/category/nutrition/baby-nutrition/page/3/ (13 posts) */
const pageThreeArticles: ListingArticle[] = [
  {
    title: "Baby's hydration",
    href: '/babys-hydration-2',
    heroImage: `${AK_UPLOADS}/2016/08/hydration-optimized.jpg`,
    heroAlt: "baby's hydration annabel karmel",
    category: 'Nutrition',
    excerpt:
      'Milk You may be moo-ving into the grown-up world of real food but milk still has an important role for ...',
  },
  {
    title: 'Baby led weaning pros and cons',
    href: '/baby-led-weaning-pros-cons',
    heroImage: `${AK_UPLOADS}/2020/04/YoghurtBananaPancakes_019-optimized.jpg`,
    heroAlt: 'Baby led weaning recipes Anabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Baby-led weaning has never been more popular, yet, as a new parent, you wonder if self-feeding over spoon-fed weaning is ...',
  },
  {
    title: "Annabel's top tips for baby led weaning",
    href: '/annabels-top-tips-baby-led-weaning',
    heroImage: `${AK_UPLOADS}/2021/05/Camile_005-683x1024-optimized.jpg`,
    heroAlt: "Annabel's top tips for baby led weaning by Annabel Karmel",
    category: 'Nutrition',
    excerpt:
      'Weaning can be a daunting experience, but it is a great opportunity to bond with your baby. In this article, ...',
  },
  {
    title: 'Weaning premature babies',
    href: '/weaning-premature-babies',
    heroImage: `${AK_UPLOADS}/2019/10/shutterstock_394780183-optimized.jpg`,
    heroAlt: 'Weaning premature babies by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'There is a lot of weaning guidance available for babies born on or around their due date (from week 37 ...',
  },
  {
    title: 'Go to Guide: Handling Leftovers Safely',
    href: '/go-guide-handling-leftovers-safely',
    heroImage: `${AK_UPLOADS}/2020/04/Pasta-Shells-with-veggie-sauce-optimized.jpg`,
    heroAlt: 'Go to Guide: Handling Leftovers Safely by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Anyone on the weaning journey will appreciate all of the meal planning and prep work that goes into each and ...',
  },
  {
    title: '10 things only weaning parents know to be true',
    href: '/10-things-only-weaning-parents-know-to-be-true',
    heroImage: `https://www.annabelkarmel.com/wp-content/plugins/elementor/assets/images/placeholder.png`,
    heroAlt: '10 things only weaning parents know to be true',
    category: 'Nutrition',
    excerpt:
      "You've just perfected milk feeds (you can literally do them with your eyes closed!) but now it's all change once ...",
  },
  {
    title: 'Top 10 weaning recipes for baby',
    href: '/top-10-weaning-recipes',
    heroImage: `${AK_UPLOADS}/2017/07/Starting-to-wean_Square_1-optimized.jpg`,
    heroAlt: 'Top 10 weaning recipes for baby',
    category: 'Articles',
    excerpt:
      "Reaching that all important milestone of weaning your baby is a key moment for every parent. It's exciting and full ...",
  },
  {
    title: 'Top 10 baby-led weaning recipes',
    href: '/top-10-baby-led-weaning-recipes',
    heroImage: `${AK_UPLOADS}/2023/08/CBTMP4-optimized.jpg`,
    heroAlt: 'Top 10 baby-led weaning recipes by Annabel Karmel',
    category: 'Articles',
    excerpt:
      "Once your baby has got to grips with those first finger foods when baby-led weaning, it's important to continue to ...",
  },
  {
    title: 'Top tips for thinning baby purees',
    href: '/top-tips-thinning-baby-purees-2',
    heroImage: `${AK_UPLOADS}/2020/09/shutterstock_138858143-1024x1024-optimized.png`,
    heroAlt: 'top tips for thinning baby purees by annabel karmel',
    category: 'Nutrition',
    excerpt:
      'As you start preparing those first few purees for your baby, you are likely to find that you need some ...',
  },
  {
    title: 'The health benefits of spinach',
    href: '/health-benefits-of-spinach',
    heroImage: `${AK_UPLOADS}/2020/08/20200704-AK03527-1024x1024-optimized.jpg`,
    heroAlt:
      'spinach recipes - the health benefits of spinach by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      "It's no secret that spinach is one serious superfood! It contains a whole host of antioxidants to help build and ...",
  },
  {
    title: "Why is salmon so important in your baby's diet?",
    href: '/salmon-important-babys-diet',
    heroImage: `${AK_UPLOADS}/2020/08/20200704-AK03619-1024x1024-optimized.jpg`,
    heroAlt: 'salmon recipes by annabel karmel',
    category: 'Nutrition',
    excerpt:
      'Oily fish such as salmon is the best source of Omega 3 essential fatty acids for your growing baby. These ...',
  },
  {
    title: 'Our top 10 most popular baby recipes',
    href: '/top-10-baby-recipes',
    heroImage: `${AK_UPLOADS}/2020/01/cairo-optimized.png`,
    heroAlt: 'Top ten most popular baby recipes by Annabel Karmel',
    category: 'Nutrition',
    excerpt:
      'Mums have trusted Annabel Karmel recipes for years, but which of her recipes are the most popular? Below we count ...',
  },
  {
    title: 'Fabulous Finger Food',
    href: '/fabulous-finger-food',
    heroImage: `${AK_UPLOADS}/2019/01/fab-finger-foods-header-optimized.jpg`,
    heroAlt: 'finger food recipes by annabel karmel',
    category: 'Articles',
    excerpt:
      "These finger food recipes are easy to make and tasty and convenient for when you're on the go. My chicken ...",
  },
];

const curatedPageArticles: Record<number, ListingArticle[]> = {
  1: pageOneArticles,
  2: pageTwoArticles,
  3: pageThreeArticles,
};

const totalPages = 3;
const basePath = '/category/nutrition/baby-nutrition';

export default async function BabyNutritionPage({
  searchParams,
}: BabyNutritionPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawPageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const requestedPage = Number.parseInt(rawPageParam ?? '1', 10);
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(requestedPage, 1), totalPages)
    : 1;

  const visibleArticles = (curatedPageArticles[currentPage] ?? []).map(
    enrichListingArticle,
  );
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1200px] px-4 pb-8 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <p className="[font-family:var(--font-montserrat)] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8a7a7f]">
            Nutrition
          </p>
          <h1 className="mt-3 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#161418] md:text-[52px]">
            Baby Nutrition
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] [font-family:var(--font-montserrat)] text-[19px] leading-[1.55] text-[#514a52] md:text-[20px]">
            Practical, dietitian-approved advice on weaning, first foods, key
            nutrients and feeding milestones — to help you raise a happy,
            healthy little eater.
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1200px] px-4 pb-6 sm:px-6 lg:px-8">
          <article className="overflow-hidden border border-[#e8e1e3] bg-[#fef3f4]">
            <div className="grid grid-cols-1 md:grid-cols-[1.95fr_1fr]">
              <div className="p-6 md:p-8">
                <h2 className="[font-family:var(--font-playfair)] text-[34px] font-[400]! leading-[1.08] text-[#161418] md:text-[50px]">
                  {featuredExperts.title}
                </h2>
                <p className="mt-5 max-w-[760px] [font-family:var(--font-montserrat)] text-[18px] leading-normal text-[#514a52] md:text-[20px]">
                  {featuredExperts.description}
                </p>
                <Link
                  href={featuredExperts.ctaHref}
                  className="mt-7 inline-flex items-center rounded-[4px] bg-[#6f7987] px-5 py-2 [font-family:var(--font-montserrat)] text-[18px] font-medium text-white! transition-colors hover:bg-[#626c79]"
                >
                  {featuredExperts.ctaLabel}
                </Link>
              </div>
              <img
                src={listingImageSrc(featuredExperts.image)}
                alt="Meet our experts"
                className="h-[280px] w-full bg-[#f4eef0] object-cover object-center md:h-[360px]"
              />
            </div>
          </article>
        </section>

        <section
          id="articles-list"
          className="mx-auto w-full max-w-[1200px] scroll-mt-[120px] px-4 pb-16 pt-8 sm:px-6 lg:px-8"
        >
          {visibleArticles.length > 0 ? (
            <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((article) => (
                <li key={article.href} className="flex">
                  <article className={styles.card}>
                    <Link
                      href={article.href}
                      className={styles.cardImageWrap}
                      aria-label={article.title}
                    >
                      <img
                        src={listingImageSrc(article.heroImage)}
                        alt={article.heroAlt}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    </Link>
                    <div className={styles.cardBody}>
                      <p className={styles.cardCategory}>{article.category}</p>
                      <h2 className={styles.cardTitle}>
                        <Link href={article.href}>{article.title}</Link>
                      </h2>
                      <p className={styles.cardExcerpt}>{article.excerpt}</p>
                      <div className={styles.cardCta}>
                        <Link href={article.href} className={styles.cardButton}>
                          Read More
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-[640px] py-16 text-center [font-family:var(--font-montserrat)] text-[18px] leading-[1.55] text-[#514a52]">
              More Baby Nutrition articles for this page are coming soon.
            </div>
          )}

          <nav
            className={styles.pagination}
            aria-label="Baby Nutrition pagination"
          >
            {prevPage ? (
              <Link
                href={`${basePath}?page=${prevPage}#articles-list`}
                className={styles.paginationStep}
                aria-label="Previous page"
              >
                &laquo; Previous
              </Link>
            ) : null}
            <ol className="m-0 flex list-none items-center gap-3 p-0">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                if (isActive) {
                  return (
                    <li key={pageNumber}>
                      <span
                        aria-current="page"
                        aria-label={`Page ${pageNumber}, current page`}
                        className={`${styles.paginationItem} ${styles.paginationItemActive}`}
                      >
                        {pageNumber}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={pageNumber}>
                    <Link
                      href={`${basePath}?page=${pageNumber}#articles-list`}
                      aria-label={`Page ${pageNumber}`}
                      className={styles.paginationItem}
                    >
                      {pageNumber}
                    </Link>
                  </li>
                );
              })}
            </ol>
            {nextPage ? (
              <Link
                href={`${basePath}?page=${nextPage}#articles-list`}
                className={styles.paginationStep}
                aria-label="Next page"
              >
                Next &raquo;
              </Link>
            ) : null}
          </nav>
        </section>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
