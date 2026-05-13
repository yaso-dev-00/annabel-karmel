import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/toddler-snack-time3");
const articlePath = "/articles/toddler-snack-time3";

export default function ToddlerSnackTimePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
      
        
          <p className={styles.body}>
            Your toddler-nado is a whirl of high energy at this stage in their development, so it&apos;s a good idea
            to give your little one three meals a day. Toddler snacks are a good idea if they are at regular times and
            aren&apos;t given too often or just before meals.
          </p>
          <p className={styles.body}>
            Stick to healthy foods and don&apos;t let your child graze throughout the day. We are a nation of fussy
            eaters, and continuously giving children snacks and not allowing them to get hungry is part of the problem.
          </p>
          <p className={styles.body}>
            Good snacks include fruit or vegetable slices, baby rice cakes, dried fruit, bread sticks and cheese.
            It&apos;s a good idea to have some of these ready in the fridge, so you have something to hand when
            you&apos;re faced with a hungry toddler. If you cut up a few carrots and put them in cold water in an
            airtight container, they will last for several days.
          </p>
          <p className={styles.body}>
            Good snacks include fruit or vegetable slices, baby rice cakes, dried fruit, bread sticks and cheese. Have
            a snack stash prepped in the fridge so you have something to hand when hunger strikes.
          </p>
          <p className={styles.body}>
            Enjoying regular healthy snacks is a good habit to get your child into and can instil a love of healthy
            food early on. That isn&apos;t to say that chocolate and biscuits should be banned; forbidding something
            can make it more tempting. But if your child isn&apos;t used to having regular sugary snacks, she
            isn&apos;t likely to miss them if they aren&apos;t there. Plus, if you don&apos;t have these things in the
            house as standard, they become much more of a treat - it also stops you from eating them! Children pick up
            habits from their parents, so if they see you feasting on chocolate, they will want some too.
          </p>

      
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
