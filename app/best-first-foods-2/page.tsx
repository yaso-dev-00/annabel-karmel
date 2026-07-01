import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/best-first-foods-2");

export default function BestFirstFoodsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto mt-[40px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.lead}>
            Introducing your baby to their first ever taste of solid food can feel like a momentous occasion, although
            perhaps a little daunting too!
          </p>

          <p className={styles.body}>
            The important thing is not to put too much pressure on yourself. And before you get blending, batch-cooking
            and experimenting with lots of delicious flavour combinations, remember that weaning is a gradual process.
            Babies have tiny tummies and will only be having a very small amount at first.
          </p>

          <p className={styles.sectionTitle}>First tastes: vegetables</p>

          <p className={styles.body}>
            Start with a single vegetable. The reason for this is so that your baby can identify the foods they&apos;re
            eating. Just like an adult palate, babies are born with mature taste buds for sweet, bitter, sour and savoury
            tastes. But after six months of being fed breast milk or formula which is naturally sweet because of the
            lactose, it&apos;s understandable that your baby will be more inclined to take to sweet foods such as root
            veggies like sweet potato, carrot, parsnip and butternut squash.
          </p>

          <p className={styles.body}>
            In contrast, their taste buds wouldn&apos;t have yet been exposed to more bitter and sour tastes, so
            they&apos;ll need to learn about this through food.
          </p>

          <p className={styles.body}>
            Now obviously all of those nutrient dense veggies such as broccoli and spinach are a world apart from what
            they are familiar with, so it&apos;s likely to take a little perseverance to get them accepting these
            flavours.
          </p>

          <p className={styles.body}>
            And that&apos;s why research suggests that we should be introducing these more bitter and sour green veggies
            at the beginning alongside those sweeter root veggies. If introduced early in your baby&apos;s weaning
            journey (by that, I mean the first few weeks of weaning and beyond), and with repeated exposure, it&apos;s
            likely they&apos;ll be more receptive to these foods which will set them up for the future.
          </p>

          <p className={styles.body}>
            So your main take-away here is to offer your baby a wide variety of single first foods - the sweet root
            veggies and the more bitter green ones. Once they have accepted these single flavours, you can then go on to
            experiment with flavour combinations.
          </p>

          <p className={styles.body}>
            If you are pureeing, simply steam and blend (or use a sieve and fork) so that your puree is smooth and
            lump-free. The consistency of runny yoghurt is a good guide to follow and remember that these first few days
            are all about introducing new tastes and they will only eat small amounts at first so it&apos;s likely
            you&apos;ll only need a few teaspoons&apos; worth.
          </p>

          <p className={styles.body}>
            And if you&apos;re going down the baby-led route with baby taking the lead, then you&apos;ll need to steam
            or bake the vegetables so that they are nice and soft, but not so soft that they can be easily mushed - that
            baby grip is stronger than you think!
          </p>

          <p className={styles.sectionTitle}>First tastes: fruit</p>

          <p className={styles.body}>
            With fruit,it&apos;s important to choose those that are ripe and have a good flavour so try tasting them
            yourself before giving them to your baby. Ripeness is really important and it&apos;s so your baby can easily
            digest the food.
            <br />
            No-cook fruits such as banana, avocado, mango and papaya are great as they provide a quick, nutritious and
            fuss-free meal for your baby in seconds! These can be served as wedges or batons, pureed to a smooth
            consistency or mashed.
          </p>

          <p className={styles.body}>
            Other good first tastes fruit include apple, apricots and pear which can be steamed, baked or cooked in a
            saucepan. Cooking breaks the structure of food down which helps your baby to digest these. A slightly older
            baby will be better able to handle the fibres and sugars of raw fruits than baby who is younger and just
            starting on solids.
          </p>

          <p className={styles.body}>
            Once you have introduced single ingredient purees you can make combinations like apple and pear, avocado and
            banana or peach and banana for example. Combining fruit with savoury was Annabel&apos;s secret weapon when
            she was weaning her son Nicholas. He liked eating apples but wouldn&apos;t eat chicken so she made
            combinations like chicken, sweet potato and apple which he loved.
          </p>

          <p className={styles.body}>
            If you are starting at 6 months, it&apos;s important to introduce foods containing critical nutrients, like
            protein, iron and omega 3 essential fatty acids fairly quickly. Offer fruit and veg for the first couple of
            weeks and then start introducing protein-rich foods like red meat, eggs and lentils and oily fish such as
            salmon.
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
