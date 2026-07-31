import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/introducing-allergenic-foods');

export default function IntroducingAllergenicFoodsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto mt-[40px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.lead}>
            Allergies are a big concern for parents, which isn&apos;t a surprise
            given that childhood allergies are on the rise. And according to
            Allergy UK, there has been an increase in allergy prevalence of
            children between 0 - 4 years. But it&apos;s also good to note that
            the actual incidence of food allergy in babies is low - about 3 -
            6%.
          </p>

          <p className={styles.body}>
            The most common food allergies in babies and children are cow&apos;s
            milk, eggs, nuts (and that&apos;s tree nuts and peanuts) and sesame.
          </p>

          <p className={styles.body}>
            The concern over allergies particularly applies to parents of
            children with early-onset eczema, who have a 30 - 50% risk of
            developing food allergy if it is severe.
          </p>

          <p className={styles.body}>
            Whilst family allergy history plays a role in how prone to food
            allergy a baby may be, specific food allergies are not inherited.
            Food allergies are more common amongst children from families where
            other members suffer from an allergy, because of the increased risk
            of eczema, which increases the risk of having food allergies.
          </p>

          <p className={styles.body}>
            The Department of Health and Social Care recommends that potentially
            allergenic foods such as eggs or peanuts can be introduced from 6
            months of age. In fact, for those babies who don&apos;t have parents
            or siblings with allergies, or who don&apos;t have early-onset
            eczema, start introducing allergenic foods in the same way you would
            with any other food. This is because delaying the introduction of
            these foods into the diet may increase the risk of allergies
            developing. If there are allergies in the family, or you think that
            your baby may be at risk because they suffer from eczema, then you
            should discuss this with your health visitor or GP.
          </p>

          <p className={styles.body}>
            If you are worried about allergies, it&apos;s a good idea to
            introduce a new food in the morning or earlier on in the day so that
            you can keep a close eye on them which is particularly useful for
            any potential delayed reactions which might take a little time to
            develop. Consider introducing potentially allergenic foods one at a
            time, with a gap of forty-eight hours between each new food. This
            makes it easier to identify any food that causes a reaction.
          </p>

          <p className={styles.body}>
            Then once your baby has had several attempts at eating the
            individual foods, you can start combining them. It may be helpful to
            keep a food and symptom diary to identify any foods that may have
            triggered a reaction.
          </p>

          <p className={styles.sectionTitle}>
            Spotting allergy symptoms in your baby
          </p>

          <p className={styles.sectionTitle}>Immediate onset</p>

          <p className={styles.symptomBlock}>
            Allergy symptoms can be mild, moderate or severe, and there is no
            guarantee that a mild reaction on one occasion won&apos;t lead to a
            more serious reaction on another.
            <br />
            Some food allergies are quite easy to spot - within minutes or up to
            2 hours after the food is eaten (often for the first or second
            time). The symptoms may consist of:
            <br />
            • Vomiting
            <br />
            • Red rash
            <br />
            • Hives
            <br />
            • Eczema
            <br />
            • Swelling of mouth/throat
            <br />• Wheezing/shortness of breath
          </p>

          <p className={styles.body}>
            The most serious type of immediate allergic reaction is anaphylaxis
            - this is an emergency situation where a person&apos;s airways
            become blocked due to swelling and their blood pressure can drop
            suddenly as their body tries to deal with the issue causing the
            reaction. In this instance, call 999 for an ambulance or take your
            baby straight to A&amp;E.
          </p>

          <p className={styles.sectionTitle}>Delayed onset</p>

          <p className={styles.symptomBlock}>
            It is possible to have delayed allergic reactions. These typically
            develop from 2 hours after the food is eaten but can take up to 48
            hours to present themselves. These consist of:
            <br />
            • Constant runny or blocked nose
            <br />
            • Diarrhoea
            <br />
            • Constipation
            <br />
            • Blood in the stools
            <br />
            • Gastroesophageal reflux disease
            <br />
            • Colic type symptoms, in association with other allergic symptoms
            <br />
            • Eczema
            <br />• Poor weight gain, in association with other allergic
            symptoms
          </p>

          <p className={styles.body}>
            Some seemingly mild symptoms can also lead to more severe
            conditions. For example, itchy rashes can escalate to skin
            infections. That&apos;s why it is important to raise any concerns,
            however small they may seem, with your GP or health visitor.
          </p>

          <p className={styles.sectionTitle}>Cow&apos;s milk allergy</p>

          <p className={styles.body}>
            If your child has an allergy to Cow&apos;s milk or is lactose
            intolerant simply type DAIRY FREE into the search box and all the
            Dairy-Free recipes on the App will appear. For recipes that contain
            milk, you can substitute a special infant formula or alternative
            dairy-free milk for babies over one. There are some excellent
            dairy-free cheeses available in supermarkets so you don&apos;t need
            to avoid recipes with cheese.
          </p>

          <p className={styles.sectionTitle}>Egg allergy</p>

          <p className={styles.body}>
            Emerging research has found that giving babies eggs when they are
            being weaned from 6 months may reduce the risk of developing an egg
            allergy and introducing eggs at this early stage is said to provide
            the best chance of creating tolerance - when the immune system
            accepts the egg without reaction.
          </p>

          <p className={styles.body}>
            Research has found that 70 - 80% percent of children with an egg
            allergy can eat baked egg in meatballs, cakes and biscuits for
            example. But it&apos;s worth noting that in those who do react, the
            reactions can be severe. A baby or child with an egg allergy should
            be tested by an experienced doctor before eating any foods
            containing baked egg. This may need to be done under direct medical
            supervision.
          </p>

          <p className={styles.body}>
            As with cow&apos;s milk allergy, your GP is responsible for the
            diagnosis process and for providing ongoing support with a dietitian
            or allergy specialist if required.
          </p>

          <p className={styles.body}>
            Thankfully, recipes can be easily adapted using egg replacers or
            other ingredients. For lots of recipes for egg-allergic babies,
            toddlers as well as family meals type Egg-Free into the search box
            and all the Egg-Free recipes on the App will appear.
          </p>

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
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
