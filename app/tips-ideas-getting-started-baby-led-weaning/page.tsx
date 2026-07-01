import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tips and ideas for getting started with baby led weaning | Annabel Karmel",
  description:
    "Annabel Karmel shares baby-led weaning tips on starter foods, managing mess, family meals, foods to avoid, and milk feeds.",
};

const relatedArticles = getRelatedArticles("/tips-ideas-getting-started-baby-led-weaning");

export default function TipsIdeasBabyLedWeaningPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            If you&apos;re looking to incorporate baby-led weaning into your baby&apos;s routine, then look no further!
            In this article Annabel Karmel shares baby led weaning tips and ideas based on the most frequently asked
            questions.
          </p>

          <h2 className={styles.sectionTitle}>What are the best baby-led weaning starter foods?</h2>
          <p className={styles.body}>
            Babies around six months tend to use their whole hand to pick things up. They need to be able to close their
            hand around the food, so avoid making the pieces too wide. Fairly long pieces stand a better chance of being
            picked up. I would suggest cutting food into 5–6cm batons or sticks so that half is held in a baby&apos;s hand
            and the other half sticks out.
          </p>
          <p className={styles.body}>
            Start with softer fingers foods such as cooked sticks of carrot, broccoli and sweet potato, and chunks of
            banana, avocado and cucumber. First tastes like steamed carrots should be cooked until soft but not too mushy
            so that they can grab it with their fist. It&apos;s best to wait until your baby has teeth before you offer
            harder foods like raw carrot.
          </p>
          <p className={styles.body}>
            Try using a crinkle cutter when you&apos;re cutting fruit and veg. The ridges will make it easier for your
            baby to grip the food – and even more fun to chew on.
          </p>
          <p className={styles.body}>
            Don&apos;t overwhelm your baby with too many food options at the beginning. Just a couple of pieces of food,
            or a small portion of a family meal will be adequate.
          </p>
          <img
            src="/articles/tips-ideas-getting-started-baby-led-weaning/chicken-quinoa-balls.jpg"
            alt="Chicken, Quinoa, Apple & Sage Balls"
            width={815}
            height={543}
            className={styles.contentImage}
          />

          <h2 className={styles.sectionTitle}>How do I avoid too much mess when baby-led weaning?</h2>
          <p className={styles.body}>
            It&apos;s inevitable that there will be mess, but to ease the clear-up, choose an easy-clean highchair with a
            wide tray. Alternatively, choose a highchair without a tray and bring it up to the table.
          </p>
          <p className={styles.body}>
            Don&apos;t worry about serving meals on plates or bowls when you start out. The likelihood is it will end up
            on the floor anyway. Just place the food straight onto their highchair tray. Invest in a wipe-clean bib and a
            splash mat for the floor. Shower curtains are a great option and can be bought cheaply.
          </p>
          <img
            src="/articles/tips-ideas-getting-started-baby-led-weaning/weaning-mess.jpg"
            alt="Baby-led weaning"
            width={862}
            height={862}
            className={styles.contentImage}
          />

          <h2 className={styles.sectionTitle}>Can I give my baby what I&apos;m eating?</h2>
          <p className={styles.body}>
            Baby-led weaning or BLW, is about making family mealtimes a social experience. While finger foods are important
            (particularly soft foods at the beginning), there&apos;s no reason why you can&apos;t serve them a portion of
            cottage pie, a mini roast dinner, or some salmon and roasted cauliflower. Just be sure to leave out the salt.
          </p>
          <p className={styles.body}>
            Don&apos;t worry if your baby doesn&apos;t like certain foods – it&apos;s important that they explore a wide
            variety of foods independently. Try and think of mealtimes during the early stages as playtime, when baby
            explores different tastes and textures and gets comfortable with different foods.
          </p>
          <p className={styles.body}>
            Let your baby pick up food with their fingers when they start baby-led weaning. Babies must learn to move
            foods safely around their mouths, so don&apos;t put food in their mouth. That way they will only pick up foods
            they can manage.
          </p>

          <h2 className={styles.sectionTitle}>What foods should I avoid giving my baby before 12 months?</h2>
          <p className={styles.body}>
            It&apos;s important to be aware of the foods which your baby shouldn&apos;t eat under the age of 12 months.
            Check out the{" "}
            <a href="/foods-to-avoid-when-baby-led-weaning" className={styles.link}>
              foods to avoid
            </a>
            .
          </p>
          <p className={styles.body}>
            Wait until your baby is ready. She should be able to sit in a highchair unassisted. Check out the{" "}
            <a href="/baby-led-weaning" className={styles.link}>
              signs that your baby is ready
            </a>
            .
          </p>
          <p className={styles.body}>
            Don&apos;t rush your baby or encourage her to eat a set amount or specific food. She chooses what, how much,
            and how quickly to eat.
          </p>

          <h2 className={styles.sectionTitle}>Should I still be giving my baby milk feeds?</h2>
          <p className={styles.body}>
            Babies should be given breast or formula milk for the entire first year. She&apos;ll gradually consume less
            breast milk or formula in favour of solid foods, although between six months and one year, your baby will
            still need 500-600ml of breastmilk or formula each day.
          </p>

          <div className={`${styles.bookPromo} flex flex-col gap-8 md:flex-row md:items-start md:gap-10`}>
            <img
              src="/articles/tips-ideas-getting-started-baby-led-weaning/book.png"
              alt="Baby-Led Weaning Recipe Book by Annabel Karmel"
              className="mx-auto h-auto w-full max-w-[300px] shrink-0 md:mx-0"
            />
            <div className="min-w-0 flex-1">
              <p className={styles.bookPromoText}>
                Annabel&apos;s new{" "}
                <a href="/our-products/cookbooks/baby-led-weaning-recipe-book" className={styles.link}>
                  Baby-Led Weaning Recipe Book
                </a>{" "}
                equips families with the option to do what they feel is best. This book can be used on its own for
                exclusive baby-led weaning. Or it can be used as a companion cookbook to Annabel&apos;s original feeding
                guide, the{" "}
                <a
                  href="/our-products/cookbooks/new-complete-baby-toddler-meal-planner-25th-anniversary-edition"
                  className={styles.link}
                >
                  New Complete Baby &amp; Toddler Meal Planner
                </a>
                , which is filled with her popular puree recipes.
              </p>
              <p className={styles.bookPromoText}>
                As well as being packed with useful advice and top tips, the book is filled with 120 recipes which the
                whole family can enjoy together – from breakfast and snacks, to vegetables, poultry, fish, meat and more.
              </p>
            </div>
          </div>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>

        <div className="mb-[90px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
