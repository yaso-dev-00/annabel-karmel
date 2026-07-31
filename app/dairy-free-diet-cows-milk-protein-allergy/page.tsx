import { DairyFreeFaqAccordion } from '@/components/ArticleScreen/DairyFreeFaqAccordion';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import Link from 'next/link';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/dairy-free-diet-cows-milk-protein-allergy',
);
const articlePath = '/articles/dairy-free-diet-cows-milk-protein-allergy';

const faqItems = [
  {
    question: 'How strict do I need to be?',
    paragraphs: [
      "If your baby has an IgE immediate onset milk allergy, you need to be very strict as even a tiny amount could cause symptoms. Cross contamination from one food to another can be a problem and so having a separate chopping board, set of knives and even a dedicated worktop space in the kitchen may be necessary. This all depends on how severe your baby's allergy is and so your dietitian will advise if this is needed.",
    ],
  },
  {
    question: 'What is dairy called on a food label?',
    paragraphs: [
      'By law, food manufacturers have to highlight allergens on food labels which makes shopping for a dairy-free diet a lot easier. If a food contains milk it will be highlighted in bold in the ingredients list. Be aware that some less obvious foods sometimes contain dairy, such as bread, baby puree pouches, sauces, dressings, desserts, soups and even some medications.',
      {
        segments: [
          'In addition, food manufacturers may change the ingredients in a food product but the packaging from the front looks the same, so do always check the ingredients list every time you shop. You can sign up for alerts from the ',
          { label: 'Food Standards Agency', href: 'https://www.food.gov.uk/' },
          ' so that you are notified if a food needs to be recalled or has incorrect labelling and could be mistakenly eaten.',
        ],
      },
      'Alternative names for milk are casein, curds, whey, caseinate, galactose, ghee, hydrolysate, buttermilk, lactalbumin, lactate, and lactoglobulin and if these are used the name MILK has to be listed next to the ingredient and is highlighted in bold.',
    ],
  },
  {
    question: 'Can you recommend any useful APPS?',
    paragraphs: [
      {
        segments: [
          'I would recommend ',
          { label: 'Food Maestro', href: 'https://www.foodmaestro.me/' },
          ' and ',
          { label: 'Spoon Guru', href: 'https://www.spoonguru.com/' },
          ' to help you when shopping for a dairy-free diet. Both include a barcode scanner so you can quickly check to see if the food you are thinking of buying is milk-free.',
        ],
      },
    ],
  },
  {
    question: 'Is my baby likely to have other food allergies?',
    paragraphs: [
      'Babies who have a delayed onset milk allergy are often allergic to soya too. This is because their immune system thinks that the protein in soya looks similar to the protein in milk and as a result can trigger the same symptoms. Therefore, you may be advised to avoid soya too if your baby doesn’t improve on a dairy-free diet.',
    ],
  },
  {
    question: "I'm breastfeeding, do I need to cut milk out of my diet too?",
    paragraphs: [
      "Cow's milk protein allergy is rare in breastfed babies by comparison to those on formula and we're not yet sure why. It's likely to do with the immune benefits that breast milk contains as well as the microbiome or healthy gut bacteria that breastfed babies have.",
      "Breastfeeding provides the best source of nutrition for your baby. If your baby is diagnosed with a milk allergy, that doesn't necessarily mean you need to stop breastfeeding.",
      "Cow's milk does pass through breast milk but at 100,000 times lower than that which is in cow's milk which means that most allergic babies are fine with their mother's milk. It also means that the vast majority of mums don't need to follow a milk-free diet either.",
      "If your baby does react to your breastmilk, then a six-week trial of a dairy-free diet for mum would be advised to see if the symptoms improve. It's essential however to see a dietitian to ensure that the quality of the breastmilk doesn't suffer and nor does the quality of your diet, particularly your calcium intake. Breastfeeding mums need around a litre of calcium enriched plant-based milk each day as well as a 10mcg vitamin D supplement to meet the requirements. If the symptoms don't improve then your dietitian will be able to advise on what you need to do next.",
    ],
  },
  {
    question: 'Are there certain infant formulas I can use?',
    paragraphs: [
      "If you're not breastfeeding or your baby does not empty the breast fully at each feed, there are a couple of formula options. Under 6 months of age, you will be prescribed a hypoallergenic formula for your baby also known as an extensively hydrolysed formula or amino acid formula.",
      {
        heading: 'Extensively Hydrolysed Formula',
        text: "These include Althera, Nutramigen 1&2, Pregestamil, Aptamil Pepti 1&2, Pepti Junior and Simlac Alimentum. They are still based on cow's milk but the protein has been partially broken down so that it is able to pass by the immune system without causing symptoms.",
      },
      {
        heading: 'Amino Acid Formula',
        text: "Called Alfamino, Puramino or Neocate, these are formulae that are not cow's milk based and are only prescribed in the most severe cases of food allergy. The proteins are completely broken down to amino acids and so are unrecognisable to your baby's immune system.",
      },
      "Both extensively hydrolysed formula and amino acid formula have a peculiar taste and smell. Young babies tend to simply accept this but those over 4 months or so may struggle to take it. Your dietitian will work with you in making the transition easier. These formulae also result in changes to your baby's poo - it will appear dark green in colour and they may poo less often.",
      {
        heading: 'Soya infant formula',
        text: "After 6 months of age and providing your baby is ok with soya, you can choose to give a soya-based infant formula instead. It's important not to give soya formula to babies under 6 months as the levels of oestrogens are too high for developing babies. You should also be aware that soya infant formula contains a type of sugar which isn't good for your babies teeth.",
      },
    ],
  },
  {
    question: 'What about plant-based milks?',
    paragraphs: [
      "Shop bought plant-based milks such as almond milk, oat milk and hemp milk can be used in cooking but are a poor source of nutrition and so shouldn't replace breastmilk or formula.",
      'Rice milk is not suitable for children under 5 due to naturally high levels of inorganic arsenic.',
    ],
  },
  {
    question: 'How do I know which infant formula my baby needs?',
    paragraphs: [
      'Your dietitian will make the decision about which type of formula is best or indeed whether you need to cut out dairy while breastfeeding. The decision is based on a lot of factors and requires a personal consultation as all babies are different.',
      "Your baby will likely stay on their infant formula until around 2 years of age unless they eat a good varied diet and are not fussy. If this is the case, your dietitian may then suggest they come off their formula at around 18 months and it's likely at this stage that a calcium and vitamin D supplement will be needed.",
    ],
  },
  {
    question: 'Will my baby get enough nutrition?',
    paragraphs: [
      'This is where working together with your dietitian is so important as the nutrients your baby receives in the first two years of life affects their growth and development including their brain development and intellect.',
      "When you avoid dairy foods your baby won't get as much protein, fat, energy, calcium, iodine, vitamin A and certain B vitamins. Your dietitian will work with you, looking at your typical routine and family meals to help you plan a diet that still meets your baby's nutritional needs for optimum growth and development.",
    ],
  },
  {
    question: 'Which other foods contain calcium?',
    bullets: [
      "Fish with soft edible bones e.g. tinned sardines, tinned salmon and anchovies - it's the bones that contain calcium so blend / mash them up well rather than pick them out",
      'Oranges',
      'Dried apricots, currants and figs',
      'Nut butters such as peanut butter and almond butter',
      'Tahini and houmous',
      'Fortified non-dairy breakfast cereals such as Ready-Brek',
      'Soya milks and yoghurts that have calcium added',
      "Green veg such as kale and broccoli - however, it's not so well absorbed by the body",
    ],
  },
  {
    question: 'Which other foods contain iodine?',
    bullets: ['Fish', 'Eggs'],
  },
  {
    question: 'Which other foods contain protein?',
    bullets: [
      'Meat - particularly red meat such as beef or lamb for its iron content',
      'Poultry - the darker meat is more nutritious',
      'Fish',
      'Eggs',
      'Lentils',
      'Beans and other pulses',
      'Tofu and soya',
    ],
  },
  {
    question: 'Do I need to avoid eggs too?',
    paragraphs: [
      'Contrary to popular belief, eggs are not dairy foods and so can be eaten by your baby if she has a milk allergy. I’ve never seen a cow lay an egg!',
    ],
  },
  {
    question: 'Should my baby be re-tested?',
    paragraphs: [
      {
        segments: [
          'If your baby has been symptom-free for 6 months and is older than 9 months of age they can undergo a milk challenge to see if they are still allergic. The ',
          {
            label: 'Milk Ladder',
            href: 'https://www.annabelkarmel.com/milk-ladder/',
          },
          ' is a stepwise approach that can be carried out under the supervision of a dietitian if your baby has a non-IgE delayed onset type of allergy. For those who have an IgE or immediate onset milk allergy, the milk ladder would be carried out in hospital under close medical supervision.',
        ],
      },
      'The milk ladder is a six-step approach to re-introducing milk, initially in a baked form as this is less allergenic and moving stepwise in increasing amounts, and less baking time as it progresses. There are specific recipes to accompany some of the steps in the milk ladder.',
      "If your child doesn't tolerate a certain step, they remain on the step before and include these foods in their diet until a date is arranged to try again.",
    ],
  },
  {
    question: 'How long does milk allergy last?',
    paragraphs: [
      'Most babies will have outgrown their allergy by the age of three, however it can last throughout childhood and even into adulthood in some rare cases. But, because of the restrictiveness of the diet and associated nutritional risks, challenging your little one at regular intervals is encouraged.',
    ],
  },
  {
    question: 'How do I access a dietitian?',
    paragraphs: [
      'Your health visitor or GP can refer you to an NHS dietitian or you can find a private practice one. Make sure your dietitian is a paediatric dietitian with experience in food allergies.',
    ],
  },
];

export default function DairyFreeDietCowsMilkProteinAllergyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.body}>
            A dairy free diet for cow&apos;s milk protein allergy involves
            avoiding all forms of dairy foods such as milk, butter, cheese,
            cream, yoghurt, fromage frais, margarine, custards, ice cream and
            other foods made from milk. This also includes goat&apos;s milk,
            sheep&apos;s milk and even buffalo milk (think buffalo mozzarella)
            and any other milk products from animals.
          </p>

          {/* <img src="/articles/development-milestones-toddlers-expect/instagram-icon.jpg" alt="Sarah signature" className="mt-[16px] h-[18px] w-[18px]" /> */}

          <h2 className={styles.sectionTitle}>
            Why might your baby need a dairy free diet?
          </h2>
          <img
            src={`${articlePath}/why-dairy-free.jpg`}
            alt="Baby with bottle"
            className="mt-[20px] w-full"
          />
          <p className={styles.body}>
            Your healthcare professional may have suggested that your baby needs
            a dairy free diet if they have symptoms of a cow&apos;s milk protein
            allergy or intolerance.
          </p>
          <p className={styles.body}>
            A cow&apos;s milk protein allergy is when the body&apos;s own immune
            system decides it doesn&apos;t recognise the protein in milk and
            thinks it is a threat. It produces an allergic response that makes
            your little one unwell.
          </p>
          <p className={styles.body}>
            Symptoms can include eczema, red skin, hives, swelling of the lips,
            tongue or mouth or body, difficulty breathing, an itchy runny nose,
            tummy troubles such as vomiting, constipation or diarrhoea, reflux,
            tummy pain, poor growth, asthma and in extreme cases, anaphylaxis.
          </p>
          <p className={styles.body}>
            Symptoms of an allergic reaction can be immediate or delayed.
            Immediate means that they come on within two hours after eating and
            this is sometimes called an IgE allergy. Delayed allergy symptoms
            can occur anything from two hours to several days later! This is
            sometimes referred to as non-IgE allergy.
          </p>
          <p className={styles.body}>
            A cow&apos;s milk protein intolerance doesn&apos;t actually exist.
            It&apos;s a term that healthcare professionals used to use to
            describe the delayed onset or non-IgE allergy but is often still
            used today.
          </p>
          <p className={styles.body}>
            It&apos;s worth noting that lactose intolerance is not an allergy to
            dairy foods and is a completely different condition to those babies
            who have a cow&apos;s milk protein allergy. With lactose
            intolerance, your baby doesn&apos;t need to avoid all dairy
            products. See my{' '}
            <Link
              href="/managing-your-babys-lactose-intolerance"
              className={styles.link}
            >
              &lsquo;Managing Your Baby&apos;s Lactose Intolerance&rsquo;
            </Link>{' '}
            post for further information.
          </p>

          <h2 className={styles.sectionTitle}>How are they diagnosed?</h2>
          <img
            src={`${articlePath}/how-diagnosed.jpg`}
            alt="Doctor with baby"
            className="mt-[20px] w-full"
          />
          <p className={styles.body}>
            Immediate onset allergies can be diagnosed by skin prick tests where
            a small amount of the suspected allergen food is put on your
            baby&apos;s skin. The surface of the skin is then scratched and the
            size of the wheel it creates is measured. Alternatively, a blood
            sample can be taken and sent off for further analysis.
          </p>
          <p className={styles.body}>
            Delayed onset allergies however, can only be diagnosed by following
            an elimination diet. Essentially this means excluding the suspected
            allergen food and then reintroducing it to confirm or reject the
            diagnosis. This must be done under the supervision of a dietitian
            and if your baby’s symptoms are severe then the reintroduction will
            be carried out in a hospital.
          </p>
          <p className={styles.body}>
            Alternative tests such as IgG, Vega testing, iridology, hair
            analysis, kinesiology or cytotoxic testing are widely available at a
            cost, but none of these methods have any scientific evidence for
            their use and can’t diagnose an allergy or intolerance.{' '}
          </p>

          <h2 className={styles.sectionTitle}>
            Should I try giving my baby a dairy free diet without a confirmed
            diagnosis?
          </h2>
          <img
            src={`${articlePath}/no-confirmed-diagnosis.jpg`}
            alt="Toddler eating broccoli"
            className="mt-[20px] w-full"
          />
          <p className={styles.body}>
            Dairy foods are one of the five food groups and contribute to a
            significant amount of your baby’s nutrition. Formula fed babies for
            example get 100% of their nutrition from dairy foods as most infant
            formula is based on cow’s milk. Once weaning starts, this gradually
            reduces as food intake goes up, but dairy still plays a significant
            role in nourishing your little one right through their childhood.
          </p>
          <p className={styles.body}>
            You have to be careful as if you cut out this food group and don’t
            replace the nutrients dairy provides, your baby could be deficient
            in energy (calories), protein and fat which will affect their growth
            and development. They will also be low in calcium, affecting their
            bone health, iodine, vitamin A and a B vitamin called riboflavin.
          </p>
          <p className={styles.body}>
            Always seek the advice of a healthcare professional before you try a
            diet that avoids a whole food group as babies can become deficient
            in nutrients quite quickly which can affect their health and growth.
            It’s likely that if an allergy is suspected, your doctor or health
            visitor will refer you to an NHS dietitian for guidance as
            dietitians are the only nutrition professionals regulated by law
            that can advise you on how to manage a free-from diet without risks
            to your baby’s health. You can also self-refer to a dietitian in a{' '}
            <a
              href="https://freelancedietitians.org/"
              target="_blank"
              rel="noopener"
              className={styles.link}
            >
              private practice
            </a>
            – look for one who is experienced in paediatrics and allergies.
          </p>

          <h2 className={styles.sectionTitle}>Weaning and milk allergy</h2>
          <img
            src={`${articlePath}/weaning-milk-allergy.jpg`}
            alt="Baby weaning with fruit"
            className="mt-[20px] w-full"
          />
          <p className={styles.body}>
            At the start of weaning, you don’t need to do anything differently.
            The usual vegetables and fruits are perfect for weaning a baby with
            a milk allergy. As time goes on (and provided your baby is over 6
            months), progress to adding in starchy carbohydrate foods such as
            bread, rice, pasta, cereals and grains and proteins such as eggs,
            meat, fish, beans, lentils and other pulses, so that your baby has a
            varied diet consisting of three meals a day by 6½ to 7 months of
            age.
          </p>
          <p className={styles.body}>
            You will need to avoid milk, butter, cheese, yoghurt, fromage frais,
            cream and foods that contain milk such as custard or ice cream. If
            you know your baby has a food allergy before you start solids, avoid
            that food or food group and introduce the foods listed below, one at
            a time alongside the fruits, vegetables and other foods your baby
            already eats. It’s sensible to start with a small amount and
            increase gradually over the next few days. If there is no reaction,
            include this food as part of your baby’s diet and move on to the
            next food.
          </p>

          <h3 className={styles.allergenTitle}>
            Top allergenic foods include:
          </h3>
          <div className={styles.allergenTableWrap}>
            <table className={styles.allergenTable}>
              <thead>
                <tr>
                  <th scope="col">MILK</th>
                  <th scope="col">EGG</th>
                  <th scope="col">WHEAT</th>
                  <th scope="col">GLUTEN</th>
                  <th scope="col">SOYA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FISH</td>
                  <td>SHELLFISH</td>
                  <td>PEANUTS</td>
                  <td>TREE NUTS</td>
                  <td>SEEDS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.body}>
            It&apos;s very important not to delay the introduction of these
            foods. Research tells us that there is a critical window for
            desensitising your baby to high-risk foods and that these foods must
            be given between 6 and 12 months to reduce future risk. In fact,
            there are{' '}
            <a
              href="https://www.bsaci.org/about/early-feeding-guidance"
              target="_blank"
              rel="noopener"
              className={styles.link}
            >
              guidelines
            </a>{' '}
            to suggest this should be as early as four months in babies with
            severe eczema, but the decision to do this needs to be made by an
            allergy doctor.
          </p>
          <p className={styles.body}>
            As weaning progresses and your baby starts to drop milk feeds, you
            need to be in close contact with your dietitian as babies who follow
            a dairy-free diet need to take more breastmilk or formula than
            others in order to meet their nutritional requirements.
          </p>

          <div className="mt-[40px]!">
            <DairyFreeFaqAccordion items={faqItems} />
          </div>

          <p className={styles.contactText}>
            For more information, consultations and advice you can contact Sarah
            via her website at{' '}
            <a
              href="https://childrensnutrition.co.uk/"
              target="_blank"
              rel="noopener"
              className={styles.link}
            >
              childrensnutrition.co.uk
            </a>
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
