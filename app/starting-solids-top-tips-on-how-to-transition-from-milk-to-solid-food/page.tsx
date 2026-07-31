import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food',
);

export default function StartingSolidsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[15px] pb-[14px] pt-[22px] md:pt-[30px]">
          <h1 className={`${styles.title} text-center`}>
            Starting solids: Top tips on how to transition from milk to solid
            food
          </h1>
          <p className={`${styles.partner} mt-[20px] text-center`}>
            In partnership with Pampers
          </p>
          <p className={`${styles.bodyText} mt-[60px]!`}>
            Making the move from milk to solid foods is an exciting milestone in
            your baby's development, but it can also feel like a daunting step
            for parents.
          </p>
          <p className={`${styles.bodyText} mb-[60px]! mt-[40px]!`}>
            I've spent decades helping families navigate this transition. And as
            part of my #BabyNutrition series with Pampers, this article gets to
            the bottom of introducing solid food alongside milk feeds - while
            Pampers keeps your little one comfy and dry through every messy
            moment!
          </p>

          <img
            src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/hero.jpg"
            alt="Starting solids meal ideas"
            className="w-full"
          />

          <h2 className={`${styles.sectionTitle} mt-[40px]`}>
            Milk feeds are still central to their nutrient intake
          </h2>
          <p className={`${styles.bodyText} mt-[30px]!`}>
            Starting solids doesn't mean that their usual milk will take a back
            seat. Weaning, also referred to as complementary feeding is exactly
            this, introducing solid food to complement their usual milk intake.
            Your baby will still need around 500-700ml of breast milk or formula
            each day up until their first birthday.
          </p>
          <p className={styles.bodyText}>
            Naturally your baby is likely to drink less milk as they eat more
            solid foods, and their milk feeds will become less frequent and
            shorter too. What is important to note here is that, from around 6
            months, your baby's regular milk will no longer provide them with
            enough of the nutrients they need.
          </p>
          <p className={styles.bodyText}>
            Their stores of critical nutrients such as iron and essential fatty
            acids start to deplete at around the 6-month mark, so they need
            nutrients from specific foods to meet the increased demand for these
            nutrients. And as your baby is rapidly growing at this point, they
            will also need additional protein and energy in the form of calories
            from food to provide the building blocks for growth and keep their
            energy levels up.
          </p>

          <h2 className={`${styles.sectionTitle} mt-[40px]`}>
            How do I combine milk feeds at the start of weaning?
          </h2>
          <p className={`${styles.bodyText} mt-[30px]!`}>
            You won't be substituting a milk feed with food to start with. Your
            baby will need to get used to the feeling of food in their mouth and
            learn how to move it around and swallow it. They will only eat very
            small amounts at first (roughly 2 - 3 spoonfuls of puree or soft
            finger foods batons).
          </p>
          <p className={`${styles.bodyText} mt-[30px]!`}>
            When starting out, try and keep to your usual milk feeding routine.
            This stage is very much about introducing a variety of new tastes
            and textures rather than volume. You'll gradually build up to more
            complete nutrient dense meals over the coming weeks and months.
          </p>

          <section className="mt-[50px] bg-[#f6f1eb] px-[8px] py-[20px] md:px-[12px]">
            <h2 className={`${styles.sectionTitle} mt-0`}>
              Combining milk feeds
            </h2>
            <p className={`${styles.bodyText} mt-[30px]!`}>
              I've created a visual planner which will help with how to
              incorporate milk fees with weaning in the first few weeks. Of
              course, this is aimed as a rough guide and remember, always follow
              your baby's lead.
            </p>
            <div className="mt-[60px] grid grid-cols-3 gap-[16px] max-[900px]:grid-cols-1">
              <img
                src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/milk-weaning-week1.png"
                alt="Week 1 milk and weaning plan"
                className="w-full"
              />
              <img
                src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/milk-weaning-weeks2-3.png"
                alt="Weeks 2 to 3 milk and weaning plan"
                className="w-full"
              />
              <img
                src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/milk-weaning-week4.png"
                alt="Week 4 milk and weaning plan"
                className="w-full"
              />
            </div>
            <p className={`${styles.bodyText} mt-[20px]!`}>
              The idea is that in the first week, you might get to a point where
              you're offering solid foods once a day, likely around lunchtime
              when they are not too hungry or tired. And then in weeks two and
              three it's likely you'll have increased their solids intake to
              twice a day. Then by week four, your baby may be having three
              small meals in the form of breakfast, lunch and tea.
            </p>
            <p className={styles.bodyText}>
              Some babies will progress quicker, and some more slowly. Both
              scenarios are completely fine, and whatever stage you are at your
              baby will still be having around four milk feeds a day alongside
              their meals. This might look a little something like this - one at
              waking then one mid-morning, mid-afternoon and then bedtime.
            </p>
          </section>

          <h2 className={`${styles.sectionTitle} mt-[40px]`}>
            Should you feed baby solids before or after milk feeds?
          </h2>
          <p className={styles.bodyText}>
            I would recommend offering your baby a breastfeed or a little
            formula before you give them food. By making sure your baby is
            relaxed, content, and not too hungry, they are more likely to be
            accepting of exploring new foods.
          </p>
          <p className={styles.bodyText}>
            Their usual milk is still so key at this time as it is far more
            nutrient-dense than the amount they'll be taking in through food.
          </p>
          <img
            src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/broccoli-pea-orzo.jpg"
            alt="Broccoli pea and orzo pasta bowl"
            className="mt-[50px] w-full"
          />

          <h2 className={`${styles.sectionTitle} mt-[40px]`}>
            When and how to drop milk feeds?
          </h2>
          <h3 className={`${styles.subTitle} mt-[20px]!`}>6 1/2 - 7 months</h3>
          <p className={styles.bodyText}>
            Both breastfed and formula fed babies will gradually start taking
            less milk as they take on more food. Aim for around 3 small meals a
            day. You baby is likely to drink less milk as they eat more solid
            foods, and their milk feeds will naturally become more infrequent
            and shorter.
          </p>
          <p className={styles.bodyText}>
            Babies need to learn to recognise when they are hungry and full-up,
            so ensure you are helping to gently reduce their feeds.
          </p>
          <h3 className={styles.subTitle}>7 months</h3>
          <p className={styles.bodyText}>
            At around 7 months, as a general guideline, your baby is likely to
            be having 3 - 4 milk feeds per day with their total milk still being
            at around 600ml. Offer water with meals to quench their thirst.
          </p>
          <p className={styles.bodyText}>
            Your baby is still likely to wake at night for a milk feed, and this
            is absolutely natural. Try gradually cutting down the amount you
            give at night and boost the last feed of the evening.
          </p>
          <h3 className={styles.subTitle}>10 months</h3>
          <p className={styles.bodyText}>
            By 10 months, your baby will only need around 500ml of their usual
            milk a day. They'll be taking in an abundance of nutrients, so carry
            on reducing their milk feeds down to 2-3 feeds a day.
          </p>
          <p className={styles.bodyText}>
            At around the 10-month mark, you might start introducing a small
            healthy snack either mid-morning or mid-afternoon. A regular snack
            may start to replace those mid-morning and mid-afternoon milk feeds.
            You'll want them to be hungry enough for their main meal so be
            mindful that when I say two small snacks, this is a guide, and some
            babies will need smaller or fewer snacks than others.
          </p>
          <div className="mt-[60px] grid grid-cols-2 gap-[16px] max-[900px]:grid-cols-1">
            <img
              src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/energy-balls.jpg"
              alt="Energy balls snack"
              className="w-full"
            />
            <img
              src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/veggie-muffins.jpg"
              alt="Veggie muffin snack"
              className="w-full"
            />
          </div>

          <h2 className={`${styles.sectionTitle} mt-[40px]`}>
            Milk feeds at 12 months
          </h2>
          <p className={`${styles.bodyText} mt-[30px]!`}>
            Once your baby has reached their first birthday, you can start to
            introduce full fat cow's milk which will provide a good source of
            bone-boosting calcium, and other essential vitamins and minerals.
          </p>
          <p className={styles.bodyText}>
            If you're breastfeeding, then it is perfectly fine to continue doing
            so and the World Health Organisation advise continuing until your
            baby is two years old in addition to complementary food.
          </p>
          <p className={styles.bodyText}>
            As a guide, your baby should be having no more than 500ml of cow's
            milk a day from 12 months, alongside a diet of nutrient dense foods.
          </p>

          <section className="mt-[50px] bg-[#f2e5ef] px-[20px] py-[20px] md:px-[30px]">
            <h2 className={`${styles.sectionTitle} mt-[30px]! text-center`}>
              Protecting baby's skin during weaning
            </h2>
            <p className={`${styles.bodyText} text-center mt-[20px]!`}>
              As babies transition to solids, their digestion changes, often
              leading to more frequent and varied bowel movements. Pampers
              Premium Protection Nappies and Harmonie Aqua Baby Wipes help
              protect healthy skin as little tummies adjusts to new foods.
            </p>
            <div className="mt-[70px] grid grid-cols-2 gap-[14px] max-[900px]:grid-cols-1">
              <img
                src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/pampers-protecting-skin.png"
                alt="Pampers Premium Protection nappies"
              />
              <img
                src="/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/pampers-aqua.png"
                alt="Pampers Harmonie Aqua wipes"
              />
            </div>
            <p className={`${styles.note} text-center`}>
              *Remember to bin your wipes and not to flush them.
            </p>
          </section>

          <div className="mt-[55px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>
        <div className="px-[15px] md:px-[14px] mb-[80px]!">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
