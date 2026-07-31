import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking',
);

const sections = [
  {
    title: 'Batch cook',
    image:
      '/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/batch-cook.jpg',
    body: 'You can cook up a big meal at the beginning of the week and freeze the remainder so that it remains fresh for longer. If you can, double up the ingredients in your family meals and freeze one half for another day - this will save you both money and time!',
  },
  {
    title: 'Plan meals & make a list',
    image:
      '/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/plan-meals.jpg',
    body: "Before you even head to the shops, make a list. Note down what you already have in the fridge and cupboards, so you don't double up on ingredients. If you can, try and plan your recipes or meals for the week (starting with recipes that will make the most of those ingredients you've already got to use up) so you know exactly what items to head for. And remember - stick to your list - those impulse buys and little 'extras' soon add up! Meal planning will help you get organised, and you'll start the week feeling more relaxed, plus, getting prepped will pay off as you'll waste less and save money - win, win!",
  },
  {
    title: 'Make the most of meat',
    image:
      '/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/make-the-most-of-meat.jpg',

    body: "When shopping, don't overlook cheaper cuts of meat like chicken thighs, which in fact contain more iron than chicken breasts and are perfect for stir-fries (these are excellent value for money!)",
    body2:
      'Alternatively, I find roasting a chicken at the beginning of the week to be helpful, as you can create lots of nutritious and delicious meals off the back of this. Use the bones to make a hearty chicken soup and the meat to make salads, chicken burgers, sandwich fillings or even to bulk out pasta and risotto dishes.',
  },
  {
    title: 'Maximising leftovers',
    image:
      '/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/maximising-leftovers.jpg',
    body: "Make sure that you don't pre-emptively throw out fresh fruit and vegetables when they are starting to look a bit sorry for itself. A blender is your best friend when it comes to making the most of your fruit and vegetable leftovers, and smoothies and soups will be your go-to. Savoury muffins and frittatas are also a fantastic base for using up any vegetables that you've got left at the end of the week and making it go further!",
  },
  {
    title: "Don't forget the freezer",
    // Source image failed to download; use available related image fallback
    image:
      '/articles/get-your-free-top-50-first-foods-list/related-best-foods.png',
    body: "I often find that frozen food can be seen as inferior to fresh which is just not true! In fact, frozen fruit and veg are often cheaper and more nutritious as they're picked and harvested at their peak with all that goodness locked in. By buying frozen it'll last longer and you're less likely to waste food this way too.",
  },
  {
    title: 'Everyday (and cheaper) superfoods',
    // Source image failed to download; use available related image fallback
    image:
      '/articles/6-tips-for-getting-out-and-about-with-baby/related-haunted-toast.png',
    body: "Some so-claimed 'superfoods' can really hike up the cost of your weekly shop. But everyday foods such as broccoli and spring greens are equally and nutritious and not-to-mention far more affordable. In fact, broccoli is one of the most nutrient-dense foods around! When it comes to grains, quinoa is hailed as the shining star, but bulgur wheat is cheaper and contains many of the same essential proteins, vitamins, fibre, and antioxidants.",
  },
  {
    title: 'Seasonal for the win',
    image:
      '/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/seasonal-for-the-win.jpg',

    body: "Keep an eye on what's in season each month and seek out these ingredients. It encourages us to shop and support local, plus, in-season fruit and veg is often cheaper too. Why not visit a farmer's market and teach younger family members about the different colourful in-season produce you see or have a family day out strawberry picking? If you don't have a farmer's market near you then keep an eye out for wonky or so-called 'imperfect' fruit and vegetables which are often sold at a reduced price, or alternatively make sure to check the discount bins for any low-priced, value items!",
  },
  {
    title: 'Stock up on staples',
    // Source image failed to download; use available related image fallback
    image:
      '/articles/best-foods-to-help-your-baby-sleep/related-getting-out.jpg',
    body: 'A well-stocked store cupboard of cans and tins means you can still cook-up a healthy nutritious dinner for the whole family on the cheap. After all, it takes no time at all to create a quick tinned tomato-based sauce for pasta or use a tin of chickpeas to make a veggie curry, mini falafels, burgers, or a quick hummus. Beans and pulses are fantastic as they are so versatile, affordable and they are packed with nutrients including iron, protein and zinc to name a few and they also count towards your 5-a-day.',
    body2:
      "I completely understand that the prospect of feeding your family balanced, nutritious meals day-in-day-out without costing an arm and a leg may feel like an impossible feat. However, if you follow these tips, you'll soon be able to meal plan for the week on a budget...with your eyes closed!",
    body3:
      "I think that despite the adversity we have collectively faced in the last couple of years, rather than causing disconnect, it has in fact served to unite and bring families closer together with stronger bonds. This was part of my motivation to create my latest book 'Fun, Fast & Easy Children's Cookbook' which I cooked up to get families in the kitchen creating delicious, affordable meals (and not to mention memories) together!",
  },
];

export default function BeatRisingFoodPricesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px]  pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.body}>
            Providing for our families can be challenging at the best of times,
            but throw a global pandemic, inflation, and increased costs of
            living into the mix and it's enough to get you into a stew. But fret
            not, there are many ways to cut costs not quality and feed the
            family on a budget, including batch-cooking hearty, staple meals...
            like stew incidentally!
          </p>

          <div className="mt-[10px] grid grid-cols-1 gap-[30px]">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className={styles.sectionHeading}>{section.title}</h2>
                <img
                  src={section.image}
                  alt={section.title}
                  className="mt-[20px] md:mt-[10px]  w-full"
                />

                <p className={`${styles.body} mt-[14px]`}>{section.body}</p>
                {'body2' in section && section.body2 ? (
                  <p className={`${styles.body} mt-[14px]`}>{section.body2}</p>
                ) : null}
                {'body3' in section && section.body3 ? (
                  <p className={`${styles.body} mt-[14px]`}>{section.body3}</p>
                ) : null}
              </section>
            ))}
          </div>

          <section className="mt-[44px]">
            <h2 className={styles.ctaHeading}>
              Save time & money with Annabel's new cookbook!
            </h2>
            <div className="mt-[25px] grid grid-cols-1 gap-[14px] min-[950px]:grid-cols-2">
              <img
                src="/articles/beat-rising-food-prices-with-annabels-money-saving-tips-for-family-cooking/cookbook-cover.jpg"
                alt="Annabel's Fun, Fast & Easy Children's Cookbook"
                className="w-full"
              />
              <p className={`${styles.body} mt-[5px]!`}>
                Annabel's Fun, Fast & Easy Children's Cookbook is the brand-new
                kitchen companion for young children and the whole family from
                international best-selling author, Annabel Karmel. Filled with
                easy-to-make recipes, fascinating foodie facts, cooking tips and
                kitchen tricks, this is the essential guide to get kids in the
                kitchen. With a focus on fresh, wholesome ingredients and
                complete with simple step-by-step instructions, it's the perfect
                way to teach children essential kitchen skills and develop a
                life-long love of good food.
              </p>
            </div>
            <div className="mt-[30px] text-center">
              <a
                href="https://www.amazon.co.uk/Annabel-Karmels-Fast-Childrens-Cookbook/dp/1787398161/ref=sr_1_1?keywords=fun+fast+and+easy+childrens+cookbook&qid=1643886345&sprefix=FUN+FAST%2Caps%2C127&sr=8-1"
                target="_blank"
                rel="noopener"
                className={styles.buyNow}
              >
                BUY NOW
              </a>
            </div>
          </section>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>

        <div className="mb-[70px] px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
