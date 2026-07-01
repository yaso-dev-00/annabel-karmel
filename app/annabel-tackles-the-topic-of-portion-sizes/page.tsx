import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Annabel tackles the topic of portion sizes | Annabel Karmel",
  description:
    "A practical guide to toddler portion sizes, fussy eating phases, and simple strategies to keep mealtimes positive and nutritious.",
};

const relatedArticles = getRelatedArticles("/annabel-tackles-the-topic-of-portion-sizes");

const inlineImages = [
  {
    src: "/articles/top-10-tips-coping-fussy-eater/hero.jpg",
    alt: "Parent serving food to a toddler",
  },
  {
    src: "/articles/top-10-tips-coping-fussy-eater/tip-03.jpg",
    alt: "Child-friendly lunch idea",
  },
  {
    src: "/articles/top-10-tips-coping-fussy-eater/tip-06.jpg",
    alt: "Mini family meal portions",
  },
  {
    src: "/articles/top-10-tips-coping-fussy-eater/tip-02.jpg",
    alt: "Chicken bites for children",
  },
] as const;

export default function AnnabelPortionSizesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={`${styles.body} mt-0!`}>
            I always get asked about the question of portion size. Although every baby is different, even from a young
            age, they have a strong sense of appetite - eating when they are hungry and stopping when they have had
            enough. However, with slightly older children this advice changes slightly. Mealtimes with my picky son
            would always start the same way. I&apos;d lift the spoon or fork to his lips or put something new in front
            of him to explore, and the battle would commence. He would squirm and shake his head and the floor would
            end up covered in dinner. In this case, it might not be because they&apos;ve had enough but instead that
            they are simply trying to assert their independence. But don&apos;t worry, it&apos;s just a phase and soon
            you&apos;ll start to work out the tricks of the trade to get them playing ball.
          </p>

          <div className={styles.imageWrap}>
            <img src={inlineImages[0].src} alt={inlineImages[0].alt} width={1024} height={680} loading="eager" />
          </div>

          <p className={styles.body}>
            Whether you&apos;ve been landed with a fussy eater or not, don&apos;t insist on them eating a big portion
            as this can often be overwhelming for a small child. Instead, keep mealtimes calm and casual. Rather than
            portion size, focus more on introducing variety, encouraging curiosity and cultivating healthy eating.
            Eating a full plate isn&apos;t important. Instead, get them to try a few mouthfuls of everything and try
            not to make it into a big deal if they don&apos;t.
          </p>

          <p className={styles.body}>
            Unfortunately, there is often no rhyme or reason as to why children go through picky phases. I often say
            that a hungry child is a less fussy child. So, the best tip I would say is to try to avoid giving too many
            snacks close to mealtimes and if your child refuses the meals that you give them, it&apos;s sometimes not
            such a bad thing to say "fine you are obviously not hungry" and let them go and play. Long drawn out
            mealtimes where you are constantly looking for something to tempt your child can be stressful and very
            unenjoyable for everyone. For older children, try and make sure the snacks you give them when they come
            home from school are healthy ones as this is usually when they are at their most hungry.
          </p>

          <div className={styles.imageWrap}>
            <img src={inlineImages[1].src} alt={inlineImages[1].alt} width={1024} height={680} loading="lazy" />
          </div>

          <p className={styles.body}>
            Don&apos;t spend hours doing so, but it is worth taking that extra step to try to make sure that your
            child&apos;s food not only tastes good but looks good too. Make mini portions of fish pie or pasta bake in
            ramekins. Try to get creative and decorate their morning bowl of porridge with fun banana and berry faces.
            Threading colourful bite-sized pieces of fruit or veggies onto a straw is another tempting trick of mine -
            it not only makes it fun for children, it offers them a wide variety of nutritious foods too.
          </p>

          <div className={styles.imageWrap}>
            <img src={inlineImages[2].src} alt={inlineImages[2].alt} width={1024} height={680} loading="lazy" />
          </div>

          <p className={styles.body}>
            With my children, I would often offer them something new in the form of a "grown-up" starter - a little
            teacup or mini saucer of vegetables or small piece of fish that they could try in addition to their main
            meal, which worked wonders. I would always ensure that I was joining in too, giving myself a portion to eat
            with them. Children follow by example and if you can eat with them too it can only be beneficial.
          </p>

          <div className={styles.imageWrap}>
            <img src={inlineImages[3].src} alt={inlineImages[3].alt} width={1024} height={680} loading="lazy" />
          </div>

          <p className={styles.body}>
            Whilst it may seem easier to get them trying new foods at home under the watchful eye of mum or dad, packed
            lunches provide a prime opportunity to get your little one exercising their independence and trying small
            bite-size portions for themselves. You can also use afterschool playdates to your advantage. Children are
            often influenced by others so try offering a tapas-style after school snack table with mini bites such as
            falafels, little veggie or chicken balls or some veggie batons and dips, for example sugar snap peas,
            carrot, pepper or cucumber sticks with hummus or guacamole. If they see their friends tucking in,
            they&apos;ll soon want to be part of the foodie-loving club.
          </p>

          <div className="mt-[54px] flex justify-start">
            <img
              src="/articles/fabulous-finger-food-2/signature.png"
              alt="Annabel signature"
              width={250}
              height={89}
              className="h-auto w-[190px] md:w-[250px]"
              loading="lazy"
            />
          </div>

          <div className="mt-[90px] text-center">
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
