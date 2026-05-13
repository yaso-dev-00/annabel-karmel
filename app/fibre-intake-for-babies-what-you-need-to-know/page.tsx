import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/fibre-intake-for-babies-what-you-need-to-know");

export default function FibreIntakePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <h1 className={`${styles.title} text-center`}>Fibre intake for babies - what you need to know!</h1>
          <p className={`${styles.partner} text-center`}>
              In partnership with <a className="hover:text-[#e98c9a]!" href="https://www.pampers.co.uk/">Pampers</a>
          </p>

          <p className={`${styles.bodyText} mt-[60px]!`}>
            We hear a lot about the importance of fibre and for good reason! It&apos;s a hot topic when it comes to
            discussions around what to munch on to promote a healthy diet.
          </p>
          <p className={`${styles.bodyText} mt-[12px]! mb-[50px]!`}>
            Fibre comes with a batch of benefits that will keep your little one healthy and happy and as part of my
            new #BabyNutrition advice series with <a className="hover:text-[#e98c9a]!" href="https://www.pampers.co.uk/">Pampers</a>, I&apos;ll explain
            how.
          </p>

          <img
            src="/articles/fibre-intake-for-babies-what-you-need-to-know/hero.jpg"
            alt="Purple porridge with blueberries"
            className="w-full"
          />

          <h2 className={`${styles.sectionTitle} mt-[60px]`}>Why is fibre in our diet so important?</h2>
          <p className={`${styles.bodyText} mt-[20px]!`}>
            <strong className={styles.strong}>1. Promotes healthy digestion</strong>
          </p>
          <p className={`${styles.bodyText}`}>
            A balanced intake of fibre promotes healthy digestion by adding bulk to the stool, which helps keep things
            moving smoothly and prevents constipation, a common hurdle when starting solid foods.
          </p>
          <p className={`${styles.bodyText}`}>
            <strong className={styles.strong}>2. Supports gut health</strong>
          </p>
          <p className={`${styles.bodyText}`}>
            Sources of dietary fibre act as a prebiotic, feeding the good bacteria in your baby&apos;s gut to ensure
            digestive systems stay healthy.
          </p>
          <p className={`${styles.bodyText}`}>
            <strong className={styles.strong}>3. Keeps them fuller for longer</strong>
          </p>
          <p className={`${styles.bodyText}`}>
            Fibre also keeps tummies fuller for longer - perfect to keep those &apos;hangry&apos; moments at bay! High
            fibre foods such as fruits, vegetables and wholegrains are also packed with essential nutrients like
            vitamins and minerals that are vital for your baby&apos;s growth.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[42px]`}>How much fibre does my baby need?</h2>
          <p className={`${styles.bodyText} mt-[30px]!`}>
            There is often confusion around how much fibre babies and toddlers should have. Whilst a high fibre diet
            is good for adults, too many high fibre foods can fill up a baby&apos;s small tummy without getting the
            nutrients they need to grow and develop.
          </p>
          <p className={`${styles.bodyText}`}>
            There is no official recommendation for children under the age of 2 but including a variety of fibre
            containing foods in their diet will pack in essential nutrients.
          </p>

          <section className="mt-[60px]" style={{ backgroundColor: "rgb(248, 243, 237)" }}>
            <div className="grid grid-cols-2 items-center gap-[8px] py-[40px]! px-[30px]! max-[900px]:grid-cols-1">
              <div className="px-[8px] py-[8px]">
                <h2 className={`${styles.sectionTitle} mt-0`}>Good sources of fibre for baby</h2>
                <p className={`${styles.bodyText} mt-[14px]!`}>
                  If you are offering your baby lots of different foods then they will likely be getting the right
                  balance of fibre as well those other essential nutrients.
                </p>
                <p className={`${styles.bodyText} mt-[14px]!`}>
                  Here are some good sources of fibre to include in your growing baby&apos;s diet.
                </p>
              </div>
              <img
                src="/articles/fibre-intake-for-babies-what-you-need-to-know/good-sources-of-fibre.jpg"
                alt="Good sources of fibre for babies"
                className="w-full px-2 py-2"
              />
            </div>
          </section>

          <h2 className={`${styles.sectionTitle} mt-[40px]!`}>Can fibre help with my baby&apos;s constipation?</h2>
          <p className={`${styles.bodyText} mt-[20px]!`}>
            Fibre-rich foods can help with signs of constipation which is very common when babies begin weaning and as
            their immature digestive systems get used to digesting solid foods. Foods such as vegetables, pulses and
            wholegrain foods, will help to bulk out their stool and move it along their digestive system.
          </p>
          <p className={`${styles.bodyText} `}>
            However, too much fibre can cause a few hiccups, such as tummy troubles, diarrhea, constipation, and even
            make it harder for their little bodies to absorb important nutrients.
          </p>
          <p className={`${styles.bodyText}`}>
            To strike the perfect balance, introduce fibre gradually, mix it up with a variety of foods and remember
            to keep your little one hydrated. Fibre needs water to work its magic. Always offer a cup of water with
            their meals.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[42px]`}>Which foods are high in fibre?</h2>
          <p className={`${styles.bodyText} mt-[20px]!`}>
            <strong className={styles.strong}>Beans and pulses</strong>
          </p>
          <p className={`${styles.bodyText}`}>
            Beans and pulses are very good sources of protein, iron and fibre, and the type of fibre which is good for
            your baby&apos;s bowels and heart. You can include in your baby&apos;s diet from around 7 months after those
            first tastes have been mastered.
          </p>
          <p className={`${styles.bodyText}`}>
            <strong className={styles.strong}>Fruits and vegetables</strong>
          </p>
          <p className={`${styles.bodyText}`}>
            When starting out, I recommend removing the skin from fruit and vegetables. The skin is a new texture
            which can be difficult for a weaning baby to manage, and the fibre content is also quite high. From around
            9 or 10 months of age, when your baby has got to grips with finger foods and their digestive system has
            matured slightly, start to keep the thin skin on foods such nectarine, ripe pear and peach.
          </p>
          <p className={`${styles.bodyText} `}>
            <strong className={styles.strong}>Wholegrains such as brown bread, pasta and rice</strong>
          </p>
          <p className={`${styles.bodyText}`}>
            With foods like bread, pasta and rice, switch between white and wholegrain. Wholegrain bread is a
            fantastic source of fibre, but too much fibre can be a little bit bulky and too filling for babies. It can
            even inhibit their appetite and reduce the absorption of key nutrients, so it&apos;s best to alternate between
            the two.
          </p>

          <section className="mt-[24px] p-[4px]" style={{background:"rgb(248, 243, 237)"}}>
            <div className="grid grid-cols-2 items-center gap-[8px] max-[900px]:grid-cols-1">
              <div className="px-[8px] py-[10px]">
                <h2 className={`${styles.sectionTitle} mt-0`}>Fibre-rich snacks for baby</h2>
                <p className={`${styles.bodyText} mt-[14px]!`}>
                  Here are some easy meal and snack ideas to include fibre in your baby&apos;s diet.
                </p>
              </div>
              <img
                src="/articles/fibre-intake-for-babies-what-you-need-to-know/fibre-rich-snacks.png"
                alt="Fibre-rich snacks for babies"
                className="w-full px-2 py-2"
              />
            </div>
          </section>

          <section className="px-[8px] mb-[60px]" style={{background:"rgb(247, 228, 244)",paddingBottom:"40px"}} >
            <h2 className={`${styles.sectionTitle} ${styles.protecting} mt-0! pt-[60px]!  text-center`}>Protecting baby&apos;s skin during weaning</h2>
            <p className={`${styles.bodyText} mt-[20px]! text-center`}>
              The frequency and content of baby&apos;s bowel movements can change when eating solid foods, so a good
              nappy and wipes routine is essential.
            </p>
            <p className={`${styles.bodyText}  text-center`}>
              As part of my partnership with <a className="hover:text-[#e98c9a]!" href="https://www.pampers.co.uk/">Pampers</a>, I&apos;ve been learning
              about the benefits of{" "}
              <a className="hover:text-[#e98c9a]!" href="https://www.pampers.co.uk/products/pampers-premium-protection-nappies">
                Pampers Premium Protection Nappies
              </a>
              . They feature a DermaComfort layer with 1000+ absorbent pores that instantly pulls wetness away, so
              babies&apos; delicate skin remains dry and protected. Plus, the STOP &amp; PROTECT pocket helps prevent
              leaks from escaping at the back.
            </p>
            <p className={`${styles.bodyText}  text-center`}>
              And with wipes being a changing bag essential too,{" "}
              <a className="hover:text-[#e98c9a]!" href="https://www.pampers.co.uk/products/pampers-aqua-baby-wipes-plastic-free">
                Pampers Harmonie Aqua Baby Wipes
              </a>{" "}
              are safe and gentle on even the most delicate skin. Perfect for mealtimes and on the move.
            </p>
            <div className="mt-[60px] grid grid-cols-2 gap-[20px] px-[14px] max-[900px]:grid-cols-1 max-[900px]:px-0">
              <a href="https://www.pampers.co.uk/products/pampers-premium-protection-nappies">
                <img
                  src="/articles/fibre-intake-for-babies-what-you-need-to-know/pampers-premium-protection.png"
                  alt="Pampers Premium Protection nappies"
                  className="w-full"
                />
              </a>
              <a href="https://www.pampers.co.uk/products/pampers-aqua-baby-wipes-plastic-free">
                <img
                  src="/articles/fibre-intake-for-babies-what-you-need-to-know/pampers-aqua-wipes.png"
                  alt="Pampers Harmonie Aqua Baby Wipes"
                  className="w-full"
                />
              </a>
            </div>
            <p className={`${styles.note} text-center`}>*Remember to bin your wipes and not to flush them.</p>
          </section>

         
          <div className="mt-[60px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>
        <div className="mb-[80px]! px-[15px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
