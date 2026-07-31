import { AdamFoxAllergiesAccordion } from '@/components/ArticleScreen/AdamFoxAllergiesAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/allergies-with-professor-adam-fox',
);

const accordionItems = [
  {
    title: 'Hista-mine field',
    paragraphs: [
      'Food allergies occur when the immune system becomes confused and harmless food proteins trigger a reaction that releases histamine. It is this histamine that causes the classic allergy symptoms of hives or swelling. If the reaction becomes severe then it is called anaphylaxis, this type of reaction may be life threatening.',
      "Scientists are still puzzled as to why there has been such a rapid increase in allergies but the popular 'Hygiene Hypothesis' suggests that the increasing cleanliness of the modern world is leaving our immune systems under stimulated. With too few bacteria and viruses to fight our body's defences start to direct inappropriate responses against harmless things such as pollen or foods.",
    ],
  },
  {
    title: 'Diet diagnosis',
    paragraphs: [
      'Most serious food allergies start in infancy and early childhood. They are caused by a relatively small number of different foods. Milk and egg allergy are the most common and tend to disappear during childhood.',
      'Diagnosing food allergies relies on a careful analysis of medical history, examination and tests. The best treatment for a food allergy is to completely avoid the problem food. Speak to your doctor before avoiding food groups as you do not want to avoid nutrients un-necessarily. Your doctor will ask about the symptoms of the reaction and whether they happen every time the food is eaten.',
      "With immediate type allergies, testing can be done by a blood test or by a 'skin prick' test, where food extracts are placed on the skin of the arm and gently pricked. The results of either test can be very helpful in confirming if the allergy is present. Unfortunately, with delayed allergies, things are less straightforward as there are not any reliable straightforward tests.",
      "Being diagnosed with a food allergy has a massive impact on the whole family and ensuring that a child has no contact with a particular food impacts on mealtimes, school, holidays and social occasions. Shopping can take longer too, until you become familiar with 'safe' foods and recipes.",
      'Parents and caregivers need to recognise reactions and know exactly how to deal with them when they occur. This usually involves carrying antihistamines everywhere the child goes and adrenaline injections for children at risk of anaphylaxis.',
    ],
  },
  {
    title: 'Nutrient knowledge',
    paragraphs: [
      'Children with food allergies are at risk of missing out of the essential nutrients that they would otherwise get from the food they are avoiding, especially in the case of infants with milk allergy. Fortunately there are now many specially designed milk substitutes and with the help of a dietician a nutritious diet can be achieved even in children with multiple food allergies.',
      'Many food allergies, such as egg and milk, are outgrown during childhood but allergies to peanuts, nuts, fish and shellfish tend not to go away. Children with food allergies also have a high chance of having other allergic problems such as asthma, eczema and hayfever.',
      'It is essential that children with food allergies continue to be seen by their doctors as they grow up. Repeating allergy tests can help predict if the allergy has been outgrown so that the food can be carefully reintroduced into the diet. It is also essential that the child is carefully examined for any signs that they are missing out on any essential nutrients due to their restricted diet, or if they are developing signs of other allergic problems.',
    ],
  },
  {
    title: 'A history of hives',
    paragraphs: [
      'Food allergies are much more common amongst children who come from families where other members suffer from allergy. Babies who suffer from eczema are particularly at risk of having food allergies. The more severe the eczema and the earlier in life that it began, the more likely there is to be a food allergy. A baby with severe eczema before 3 months of age is very likely to suffer from food allergies.',
    ],
  },
  {
    title: 'Spot the symptoms',
    paragraphs: [
      'Some food allergies are quite easy to spot - as soon as the food is eaten (often for the first or second time) an itchy rash develops, usually around the mouth. There may also be swelling of the face, runny nose and itchiness as well as vomiting. In severe reactions, there may be difficulty breathing and if this occurs an ambulance should be called immediately. Fortunately, severe reactions are very rare in young children and tend to be more of a problem amongst teenagers.',
      {
        intro:
          'Symptoms of an immediate food allergy: Mild to moderate symptoms typically affect the skin, the respiratory system, and the gut.',
        bullets: [
          'A flushed face, hives, a red and itchy rash around the mouth, tongue or eyes. This can spread across the entire body.',
          'Mild swelling, particularly of the lips, eyes, and face.',
          'A runny or blocked nose, sneezing, and watering eyes.',
          'Nausea and vomiting, tummy cramps and diarrhoea',
          'A scratchy or itchy mouth and throat.',
        ],
        compact: true,
      },
      {
        emphasis:
          'Severe symptoms (Anaphylaxis): These require urgent medical attention.',
        compact: true,
      },
      {
        intro: '',
        bullets: [
          'A wheezing or chest tightness, similar to a severe asthma attack.',
          'Swelling of the tongue and throat, restricting the airways. This can cause noisy breathing (especially on breathing in), a cough or a change in voice.',
          'A sudden drop in blood pressure (called hypotension) leading to shock.',
          'Dizziness, confusion, collapse, loss of consciousness and sometimes coma.',
        ],
        compact: true,
      },
    ],
  },
  {
    title: 'Subtle suffering',
    paragraphs: [
      "Sometimes, food allergies can be less obvious and more difficult to detect, especially if they are delayed allergies. These allergies tend to be more of a problem in infancy. In the past, these allergies were sometimes called food intolerance, but this isn't the correct term because, strictly speaking, an intolerance doesn't involve the immune system.",
      "Delayed allergic reactions do involve the immune system, but unlike the histamine release characteristic of an immediate reaction, delayed allergies involve parts of the immune system that take much longer to respond. The end result means it's difficult to pinpoint a particular as the problem and sufferers may continue to eat and drink it.",
      'Delayed allergies in infants may cause chronic symptoms such as eczema, reflux, colic, poor growth, diarrhoea or even constipation. The symptoms only get better when the food is removed from the diet, with milk, soy, egg, and wheat being the most common culprits. However, all of these symptoms commonly occur during childhood and an allergy is only one possible explanation, not the only one. Trying to work out if the underlying problem is due to a food allergy can be very difficult and requires the help of an experienced doctor.',
    ],
  },
];

export default function AllergiesWithProfessorAdamFoxPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] mt-[50px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.intro}>
            <strong>
              Consultant Paediatric Allergist{' '}
              <a
                href="https://www.annabelkarmel.com/advice/allergy-specialist/"
                target="_blank"
                rel="noopener"
                className={styles.link}
              >
                Professor Adam Fox
              </a>{' '}
              explains all there is to know about food allergies.
            </strong>
          </p>
          <p className={styles.body}>
            Childhood food allergies seem to be on the increase, so it&apos;s
            natural that you might be nervous about introducing foods that could
            cause problems.
          </p>
          <p className={styles.body}>
            However, it&apos;s worth noting that the actual incidence of food
            allergy in babies is very small - about 6%. Many babies grow out of
            allergies like cow&apos;s milk allergy by the age of two or three.
          </p>
          <p className={`${styles.body} mb-[50px]!`}>
            Food allergies are more common among babies and children from
            families with a history of food allergy. Babies who suffer from
            eczema are also at risk of suffering from food allergies. Babies who
            develop severe eczema before the age of three months are at very
            high risk, so you need to be particularly cautious when introducing
            new foods.
          </p>

          <AdamFoxAllergiesAccordion items={accordionItems} />

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
