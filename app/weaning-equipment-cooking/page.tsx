import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Weaning Equipment & Cooking | Annabel Karmel',
  description:
    'Essential weaning equipment and practical cooking tips for preparing nutritious purees and finger foods for your baby.',
};

const relatedArticles = getRelatedArticles('/weaning-equipment-cooking');

const equipmentItems = [
  {
    label: 'Steamer:',
    text: "Steaming is a tip-top way to preserve nutrients. It's quick and easy, especially for vegetables that don't take long to cook. Layered steamers mean you can cook several foods at once.",
  },
  {
    label: 'Electric hand blender:',
    text: 'Perfect for pureeing and easy to wash up.',
  },
  {
    label: 'Food processor:',
    text: 'These vary in sophistication and complication but are great for making large batches of purees to freeze. They are pretty mean at mincing and chopping too – useful when you want to smuggle small pieces of veggies into picky little people!',
  },
  {
    label: 'Mouli:',
    text: "This is a hand-turned mill that works well on foods that have tough skin, like peas of dried apricots. It produces a smooth puree and separates indigestible husks and skins. It's great for potatoes as it doesn't break down the starch, leaving you with creamy lump-free mash rather than glutinous sticky potato pulp – which can happen with a food processor.",
  },
  {
    label: 'Weaning spoons:',
    text: "Metal spoons are a bit hard for baby's sensitive gums. Plastic weaning spoons are nice and soft with no sharp edges.",
  },
  {
    label: 'Weaning bowls:',
    text: 'It makes sense not to use the family china at this stage, small plastic heatproof weaning bowls will get you started.',
  },
  {
    label: 'Bibs & bouncers:',
    text: "There are assorted bib styles from neckerchiefs to jackets with sleeves, it depends how clear up confident you feel! Bouncy chairs support baby's back and are a great way to get weaning started comfortably.",
  },
];

const cookingParagraphs = [
  'No Michelin methods necessary, straightforward steaming or microwaving are the best ways to preserve the taste and nutrition in fruit and veg. Baking root vegetables caramelises the natural sugars which makes them super sweet. Boiling for too long destroys the vitamin C and B vitamins.',
  'Ingredients need to be chopped and cooked until tender. When you drain boiled foods, retain enough of the cooking liquid to make a smooth puree and remember that vegetables grown underground should go in a pan of cold water and brought to the boil, those grown above ground should be dropped into boiling water.',
  'If you are microwaving foods, be sure to stir thoroughly to remove hot spots and always test food before feeding your baby.',
  'When you reheat food, make sure it is piping hot all the way through. Test the temperature to make sure it has sufficiently cooled before feeding your baby.',
  "Don't save half-eaten food as saliva carries bacteria that will have been transferred from the spoon.",
  "Fresh puree will last 48 hours in the fridge and eight weeks in the freezer. The temperature of your fridge should be 4 C (40F) and your freezer -18C (0F). You shouldn't reheat food more than once and never refreeze food. It is however fine to refreeze vegetables such as frozen peas.",
];

export default function WeaningEquipmentCookingPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto mt-[30px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <h2 className={`${styles.sectionTitle} mt-0!`}>Equipment</h2>
          <p className={styles.body}>
            As well as enthusiasm, some basic weaning equipment can help you on
            your weaning way and the following items might make life easier:
          </p>

          {equipmentItems.map((item) => (
            <p key={item.label} className={styles.equipmentItem}>
              <strong className={styles.itemLabel}>{item.label}</strong>{' '}
              {item.text}
            </p>
          ))}

          <p className={styles.equipmentItem}>
            <strong className={styles.itemLabel}>Freezing trays:</strong> Your
            little one is likely to have only one or two teaspoons to start with
            and making such a small quantity each time is fiddly and not
            cost-effective. Batches can be made up and frozen in ice-cube trays
            for convenience. Invest in some with lids or cover with clingfilm to
            prevent contamination. Or check out my specially created{' '}
            <a
              href="/tableware"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.underlineLink}
            >
              NUK Food Cube Trays
            </a>{' '}
            (link to Food Cube Trays in Shop)
          </p>

          <h2 className={styles.sectionTitle}>Cooking</h2>

          {cookingParagraphs.map((paragraph) => (
            <p key={paragraph} className={styles.body}>
              {paragraph}
            </p>
          ))}

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
