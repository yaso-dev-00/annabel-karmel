import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/tips-on-how-to-keep-baby-hydrated',
);

export default function HydrationPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white mt-4">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[14px] md:px-[14px]">
          <h1 className={styles.title}>Tips on how to keep baby hydrated!</h1>
          <p className={styles.partner}>In partnership with Pampers</p>
          <p className={styles.lead}>
            Does my baby need to drink water? How much should they be having?
            Does it need to be boiled? These are questions I get asked a lot, so
            I wanted to provide my top tips on giving babies water as part of my
            #BabyNutrition series with Pampers.
          </p>

          <div className="my-[20px]">
            <img
              src="/articles/tips-on-how-to-keep-baby-hydrated/hero.jpg"
              alt="Baby drinking from a cup"
            />
          </div>

          <h2 className={styles.sectionTitle}>
            When can I give my baby water to drink?
          </h2>
          <p className={styles.bodyText}>
            From 6 months, offer your baby a cup of water with every meal - not
            before as it could fill up that tiny tummy.
          </p>
          <p className={styles.bodyText}>
            Don't worry if your baby doesn't drink too much at first as they
            will still be getting most of their hydration from breast milk or
            formula until at least 12 months. Remember that getting used to the
            new taste and art of drinking from a cup is another skill they must
            master on their weaning journey and most enjoy giving it a go!
          </p>
          <p className={styles.bodyText}>
            There are no specific guidelines for how much water to give your
            baby. So long as you have a cup on hand and offer water regularly,
            your baby should let you know when they want to drink.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[100px]!`}>
            Can I give tap water to my baby?
          </h2>
          <p className={styles.bodyText}>
            From 6 months onwards, tap water is fine. There is no need to filter
            the water and avoid bottled water as this can contain too much
            sodium. The only time you need to boil tap water is when you're
            using with formula to kill any bacteria which might be present.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[100px]!`}>
            Signs my baby or child isn't drinking enough water
          </h2>
          <p className={styles.bodyText}>
            Dehydration can happen more easily when babies have diarrhea,
            vomiting or a fever, or during hot weather. Here are some signs that
            your baby may need more fluids.
          </p>
          <p className={styles.listItem}>
            <strong>1. Dry lips or mouth</strong>
          </p>
          <p className={styles.listItem}>
            <strong>2. Increased fussiness or irritability</strong>
          </p>
          <p className={styles.listItem}>
            <strong>3. Fewer wet nappies or darker coloured urine:</strong>{' '}
            those wet nappies are sure fire way of checking to see if your
            little one is nice and hydrated! Their urine will show their
            hydration level; if it is dark yellow or smelly, they are not
            drinking enough water.
          </p>
          <p className={styles.listItem}>
            <strong>4. Sunken soft spot:</strong> In more severe cases,
            dehydration can cause the fontanel (soft spot on a baby's head) to
            appear sunken.
          </p>
          <p className={styles.bodyText}>
            If you notice any of these signs, especially if accompanied by a
            decrease in appetite, it's important to consult with your GP to rule
            out any other issues.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[100px]!`}>
            How much water should my child be drinking?
          </h2>
          <p className={styles.bodyText}>
            The amount of water every child needs will be individual and will
            depend on their age, their gender, how physically active they are,
            and the weather! Here are some general guidelines.
          </p>
          <p className={styles.listItem}>
            <strong>0-6 months:</strong> Milk will be your baby mainstay of
            hydration - offer extra feeds if you think your baby needs more
            fluid.
          </p>
          <p className={styles.listItem}>
            <strong>6-12 months:</strong> Offer sips of water in a cup as you
            introduce solids.
          </p>
          <p className={styles.listItem}>
            <strong>1-2 years:</strong> 3-4 cups a day (around 1.1 litres)
          </p>
          <p className={styles.listItem}>
            <strong>2-3 years:</strong> 4 - 5 cups (around 1.3 litres)
          </p>

          <h2 className={`${styles.sectionTitle} mt-[100px]!`}>
            How can I get my child to drink more water?
          </h2>
          <p className={styles.listItem}>
            <strong>1.</strong> Let them choose a fun water bottle and cup, and
            always keep it at their level.
          </p>
          <p className={styles.listItem}>
            <strong>2.</strong> Freeze fun shaped ice cubes to add to their
            drink.
          </p>
          <p className={styles.listItem}>
            <strong>3.</strong> Make fluids fun and flavour with orange,
            strawberries or cucumber and mint.
          </p>
          <p className={styles.listItem}>
            <strong>4.</strong> Practice what you preach and make sure that they
            see you drinking water up all day long!
          </p>

          <div
            className="mt-[60px] px-[10px]  py-[10px]"
            style={{ backgroundColor: '#F8F3ED' }}
          >
            <div className="grid grid-cols-2  gap-[10px] max-[900px]:grid-cols-1">
              <h2 className={`${styles.sectionTitle} block! md:hidden!`}>
                Try these hydrating foods!
              </h2>
              <div className="order-1 max-[900px]:order-2">
                <h2 className={`${styles.sectionTitle} hidden! md:block!`}>
                  Try these hydrating foods!
                </h2>
                <p className={styles.bodyText}>
                  If you struggle to get your little one drinking enough water,
                  try offering foods with high water content. Here are my
                  favourite go-to hydrating foods for babies and toddlers. They
                  all contain over 80% water!
                </p>
                <p className={styles.bodyText}>
                  And don't forget that foods such as yoghurt, dips, sauces,
                  cereal with milk, purees and ice lollies will all help to up
                  their hydration levels too.
                </p>
              </div>
              <div className="order-2 max-[900px]:order-1">
                <img
                  src="/articles/tips-on-how-to-keep-baby-hydrated/hydrating-foods-chart.jpg"
                  alt="Hydrating food percentages"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-[20px]">
            <img
              src="/articles/tips-on-how-to-keep-baby-hydrated/hydrating-foods-plate.jpg"
              alt="Hydrating fruit and vegetable platter"
            />
          </div>
          <section
            className="mt-[50px] px-[10px] py-[10px]! pt-6 mb-[60px]!"
            style={{ backgroundColor: '#F7E4F4' }}
          >
            <h2
              className={`${styles.sectionTitle}  text-center mt-[30px]! max-[900px]:px-[10px]!`}
            >
              Protecting baby's skin during weaning
            </h2>
            <p className={`${styles.bodyText} text-center`}>
              With baby's hydration in check, a good nappy and wipes regime
              could help keep your baby's skin dry and protected.
            </p>
            <p className={`${styles.bodyText} text-center`}>
              Pampers Premium Protection Nappies have a DermaComfort layer with
              1000+ absorbent pores to instantly pull wetness and mess away from
              the skin. Plus, the STOP &amp; PROTECT pocket helps prevent leaks
              from escaping at the back. And Harmonie Aqua Baby Wipes are soft
              and gentle on delicate skin. Cheers to that!
            </p>
            <div className="mt-[60px] grid grid-cols-2 gap-[14px] max-[900px]:grid-cols-1">
              <img
                src="/articles/tips-on-how-to-keep-baby-hydrated/pampers-protecting-skin.png"
                alt="Pampers Premium Protection nappies"
              />
              <img
                src="/articles/tips-on-how-to-keep-baby-hydrated/pampers-aqua.png"
                alt="Pampers Aqua wipes"
              />
            </div>
            <p className={`${styles.note}  mb-[50px]!`}>
              *Remember to bin your wipes and not to flush them.
            </p>
          </section>

          <div className="mt-[34px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>
        <div className="px-[10px] md:px-[14px] mb-[70px]!">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
