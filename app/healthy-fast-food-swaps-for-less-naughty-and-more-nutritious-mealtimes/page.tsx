import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title:
    "Healthy 'fast' food swaps for less 'naughty' and more nutritious mealtimes | Annabel Karmel",
  description:
    'Healthy family-friendly swaps for popular fast foods, from chicken nuggets and chips to pizzas, burgers, crisps, desserts and fizzy drinks.',
};

const relatedArticles = getRelatedArticles(
  '/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes',
);

const REAL_FOOD_KIDS_WILL_LOVE_BOOK_URL =
  'https://www.amazon.co.uk/Real-Food-Kids-Will-Love/dp/150988842X';

export default function HealthyFastFoodSwapsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.kicker}>
            Did you know that half of all the food bought by families in the UK
            is now &apos;ultra-processed&apos; which means – made in a factory
            with endless lists of additives and preservatives, bearing little
            resemblance to the fruits, vegetables, meat, chicken and fish you
            would cook at home. Good eating habits are formed from an early age
            so our role in helping children to make healthy food choices whilst
            at home, at school, or eating out is incredibly important.
          </p>

          <p className={styles.body}>
            As parents we want our little ones to be fuelled on the right foods,
            however sometimes it&apos;s one of those &apos;easier said than
            done&apos; occasions, particularly when they insist on only liking a
            small handful of failsafe favourites – which are often less than
            healthy. Sometimes, all kids want is pizza, chips or chicken nuggets
            and I&apos;m sure we&apos;ve all been guilty of giving into these
            demands every now and then so as to avoid an ill-timed temper
            tantrum!
          </p>

          <p className={styles.body}>
            I don&apos;t think it&apos;s about completely changing your routine
            or suddenly disallowing your family&apos;s foodie favourites, but
            instead it&apos;s more about making healthier versions of these
            favourites. I personally like the age-old saying of &apos;everything
            in moderation&apos;. Coming up with fun and healthy ways in which
            you can prepare your children&apos;s food is a real winner rather
            than focusing on so-called &apos;bad&apos; foods and denying these.
          </p>

          <p className={styles.body}>
            Here are some of my top swaps for less &apos;naughty&apos; and more
            nutritious mealtimes:
          </p>

          <section>
            <h2 className={styles.swapTitle}>Krispie Chicken Nuggets</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes/hero.jpg"
                alt="Popcorn-style chicken nuggets with sweet potato fries and ketchup"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              Instead of using batter to coat chicken strips, I like to use Rice
              Krispies for a light crispy (and yummy) coating – I promise,
              they&apos;ll soon be requesting my Krispie Chicken Nuggets with
              the secret &apos;snap crackle and pop!&apos;
            </p>
            <p className={styles.body}>
              Children often like to have a side of tomato ketchup with their
              chicken nuggets and chips. Instead, why not use the BBQ season to
              your advantage and serve some griddled strips of protein-packed
              chicken alongside a simple tomato salsa for them to dunk and dip.
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Sweet Potato Wedges</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/best-foods-to-help-your-baby-sleep/sweet-potato.png"
                alt="Sweet potato prepared as a nutritious side"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              It&apos;s no secret that children love chips so why not trade this
              failsafe favourite for something more vibrant? Sweet potatoes are
              an excellent source of Vitamin A, packed full of goodness and are
              really versatile. Roast wedges in the oven with a sprinkling of
              Parmesan cheese and sage as a healthy alternative to chips. They
              are naturally sweet and baking them in the oven caramelises the
              natural flavour – they are sure to be a hit.
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Cauliflower Pizzas</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/10-quick-easy-puff-pastry-recipes/mini-pizza-people.jpg"
                alt="Mini pizzas with colourful toppings"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              Who would imagine that grated cauliflower could make a tasty base
              for a pizza? Make a quick homemade tomato sauce and then simply
              add your little one&apos;s favourite pizza toppings to keep the
              takeaway at bay. You can find this tasty recipe in my new{' '}
              <a
                href={REAL_FOOD_KIDS_WILL_LOVE_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookBodyHighlight}
              >
                <em>Real Food Kids Will Love</em>
              </a>{' '}
              book. Enjoy!
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Hidden Veggie Burgers</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/annabels-top-10-burger-recipes/hidden-veg-burgers-sweet-potato-fries.jpg"
                alt="Hidden-veg burgers with sweet potato fries"
                width={768}
                height={768}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              Beef burgers can be a fantastic source of iron but it&apos;s
              always best to make your own so you know exactly what is going
              into them. Be sure to use good quality lean beef mince and perhaps
              add some grated apple and carrot – the natural sweetness of the
              apple will add extra appeal for youngsters and the carrot will
              help to sneak in some extra veggies.
            </p>
            <p className={styles.body}>
              Use children&apos;s love for this fast food favourite to your
              advantage and make an Omega-3 filled fish burger. My Salmon &amp;
              Cod Burgers will ensure that they&apos;re getting a tasty
              all-important dose of the good stuff.
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Tasty Takeaway with a Twist</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/perfect-pasta-dishes-for-baby-toddler-family/vroom-vroom-veggie-packed-bolognese.jpg"
                alt="Veggie-packed bolognese with pasta, a fun homemade takeaway-style meal"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              There is absolutely no harm in ordering in a takeaway for the
              family as a treat every now and then but it is also fun to get
              inspired and cook-up your own healthy versions of your take-out
              favourites. It provides the perfect opportunity to introduce
              younger family members to exciting new flavour combinations.
            </p>
            <p className={styles.body}>
              A sweet &apos;n&apos; sour sauce for example, is a hands down
              favourite and kids will love scooping and slurping through a bowl
              of my Thai Corn &amp; Chicken Laksa. You can very easily create
              some simple but delicious marinades and sauces that are full of
              flavour – whisk together a combination of soy, maple syrup and
              garlic and stir into veggies and rice to bring a flavour-packed
              taste of the orient to teatimes.
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Kale Crisps</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/boost-your-childs-immune-system/brilliant-broccoli.jpg"
                alt="Fresh broccoli, ideal for oven-baked veggie crisps"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              Kale is a culinary superhero, packed full of essential nutrients
              and vitamins including iron and vitamin K. Get creative with
              cooking methods and bake these nutritious leafy greens in the oven
              with a little olive oil and a sprinkling of seasoning for a
              healthy alternative to a packet of crisps. Divine!
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Not so Devilish Desserts</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/summer-recipes/toasted-cinnamon-breadcrumb-ice-cream.png"
                alt="Homemade-style frozen dessert with fruit"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              Desserts don&apos;t always need to be considered public enemy no.
              1! For example, it&apos;s easy to make a batch of fresh fruit ice
              lollies from fruit juice and pureed fruits. Alternatively, why not
              try my Banana Ice Cream recipe – it is quite possibly the easiest
              pudding to make as all you need is four bananas (and a little
              patience waiting for it to freeze!).
            </p>
            <p className={styles.body}>
              My No-sugar Chocolate Orange Energy Balls from my new book{' '}
              <a
                href={REAL_FOOD_KIDS_WILL_LOVE_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bookBodyHighlight}
              >
                <em>Real Food Kids Will Love</em>
              </a>{' '}
              are the perfect sweet treat or on-the-go healthy snack. They are
              absolutely delicious and no one would know they are made with
              dates, cacao and cashew nuts rather than butter, sugar and
              chocolate!
            </p>
          </section>

          <section>
            <h2 className={styles.swapTitle}>Fizzy &apos;pop&apos;</h2>
            <div className={styles.swapImageWrap}>
              <img
                src="/articles/boost-your-childs-immune-system/hydration-is-key.jpg"
                alt="Pitchers of fruit- and herb-infused water as a fizzy drink swap"
                width={768}
                height={512}
                className={styles.swapImage}
              />
            </div>
            <p className={styles.body}>
              Avoid sugary fizzy drinks and instead make your own sparkling
              fruit juice. Simply put a handful of berries or pomegranate seeds
              into a glass and top with sparkling water and some mint for a
              (naturally) sweet, fresh and zingy kid&apos;s cocktail. Frozen
              berries work well here as they can double up as ice. Don&apos;t
              forget to add an umbrella come happy hour!
            </p>
          </section>

          <section className={styles.bookWrap}>
            <div className="w-full">
              <a
                href={REAL_FOOD_KIDS_WILL_LOVE_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <img
                  src="/articles/healthy-fast-food-swaps-for-less-naughty-and-more-nutritious-mealtimes/book.jpg"
                  alt="Real Food Kids Will Love book cover"
                  width={768}
                  height={1078}
                  className={styles.bookImage}
                />
              </a>
            </div>
            <div>
              <p className={`${styles.bookBody}`}>
                Annabel&apos;s{' '}
                <a
                  href={REAL_FOOD_KIDS_WILL_LOVE_BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.bookBodyHighlight}
                >
                  Real Food Kids Will Love
                </a>{' '}
                cookbook is packed full of advice, top tips and over 100 simple
                and delicious recipes which the whole family can enjoy together
                – from 15 minute meals to healthy fast food favourites, cooking
                with the kids, lunchbox snacks and more.
              </p>
              <p className={`${styles.bookBody} mt-[40px]!`}>
                Many recipes include handy swap-outs to cater for those with
                food allergies, intolerances or particularly fussy eaters! There
                is also a range of meat-free and vegan meal options too, meaning
                mealtimes can be made healthy and fun for the whole family
                whatever your family&apos;s foodie preferences.
              </p>
            </div>
          </section>

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
