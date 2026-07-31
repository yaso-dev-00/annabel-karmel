import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/enjoy-summer-2021-sani-resort-greece',
);

const sectionCards = [
  {
    title: 'SPECIAL OFFERS',
    body: 'When you book directly with Sani Resort, take advantage of a range of amazing offers; from FREE stays for children and complimentary private airport transfers, to FREE full board upgrades and Summer discounts.',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/special-offer-1.jpg',
    buttonImage: '/articles/enjoy-summer-2021-sani-resort-greece/book-now.png',
    buttonHref: 'https://www.sani-resort.com/en_GB/special-offers',
    reverse: false,
    note: '*Subject to terms & conditions',
  },
  {
    title: 'THE GREAT OUTDOORS',
    body: 'Discover an incredible 1,000 acre eco-reserve with endless outdoor experiences, 7km of soft sandy beaches, 110 hectares of protected Sani Wetlands, and over 20km of forest trails to explore. There are lots of private dining options too.',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/little-guests-card.jpg',
    buttonImage:
      '/articles/enjoy-summer-2021-sani-resort-greece/discover-more.png',
    buttonHref: 'https://www.sani-resort.com/en_GB/the-resort',
    reverse: true,
  },
  {
    title: 'WORLD CLASS ACTIVITES',
    body: 'Rackets at the ready for the Rafa Nadal Tennis Centre, or brush up on those skills at the Chelsea Academy. Learn expert survivor skills at the Bear Grylls Academy and zipline at the Sani Adventure Park.',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/rafa-nadal.jpg',
    buttonImage:
      '/articles/enjoy-summer-2021-sani-resort-greece/discover-more.png',
    buttonHref: 'https://www.sani-resort.com/en_GB/your-stay/activities',
    reverse: false,
  },
  {
    title: 'LITTLE GUESTS',
    body: 'With spacious family rooms, brand new kids clubs, trusted childcare, and exclusive Annabel Karmel menus, Sani Resort is a paradise for Little Guests... and parents!',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/little-guests-card.jpg',
    buttonImage:
      '/articles/enjoy-summer-2021-sani-resort-greece/discover-more.png',
    buttonHref:
      'https://www.sani-resort.com/en_GB/news/sani-home/upgraded-childcare-for-little-guests',
    reverse: true,
  },
];

export default function EnjoySummer2021SaniResortGreecePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[28px] md:px-[14px] md:pt-[40px]">
          <section className="grid grid-cols-1 items-start min-[900px]:items-center min-[1400px]:items-start  gap-[36px] min-[900px]:grid-cols-[320px_1fr] md:gap-[46px]">
            <img
              src="/articles/discover-special-offers-at-sani-resort-greece/special-offer-2.jpg"
              alt="Sani Resort family holiday"
              className="w-full lg:max-w-[320px]"
            />
            <div className="space-y-[30px]">
              <p className={`${styles.intro} mt-0!`}>
                Thinking about that much needed family holiday this summer?
                I&apos;m super proud to be partnering once again with Sani
                Resort in Greece to cook-up even more exciting, nutritious
                dishes for Little Guests.
              </p>
              <p className={`${styles.intro} mt-0!`}>
                Providing a Safe Sanctuary for families in an all-tested
                environment, why not find your find your private spot on a 7km
                sandy beach or stroll your way to freedom in a 1,000-acre nature
                reserve?
              </p>
              {/* <img
                src="/articles/discover-special-offers-at-sani-resort-greece/little-guests-logo.png"
                alt="Annabel signature"
                className="mx-auto w-[215px]"
              /> */}
            </div>
          </section>

          <img
            src="/articles/discover-special-offers-at-sani-resort-greece/little-guests-banner.jpg"
            alt="Sani resort coastal view"
            className="mt-[52px] w-full max-[900px]:h-[200px] max-[900px]:object-cover max-[900px]:object-center max-[1400px]:h-auto"
          />

          <div className="mt-[62px] space-y-[78px]">
            {sectionCards.map((section) => (
              <section
                key={section.title}
                className={`grid grid-cols-1 items-center gap-[40px] lg:grid-cols-2 ${section.reverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''}`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full"
                />
                <div className="space-y-[20px] text-center lg:text-left">
                  <h2 className={`${styles.cardTitle} italic uppercase`}>
                    {section.title}
                  </h2>
                  <p className={styles.cardExcerpt}>{section.body}</p>
                  <a
                    href={section.buttonHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex mt-[30px]!"
                  >
                    <img
                      src={section.buttonImage}
                      alt={`${section.title} link`}
                      className="w-[250px] max-w-full"
                    />
                  </a>
                  {section.note ? (
                    <p className={styles.note}>{section.note}</p>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-[72px] space-y-[44px]">
            <div>
              <h2 className={`${styles.cardTitle} italic uppercase`}>
                REFUEL ON ANNABEL&apos;S EXCLUSIVE MENU
              </h2>
              <p className={`${styles.cardExcerpt} mt-[24px]`}>
                Annabel invites babies and children of all ages to refuel on her
                rainbow of fresh and colourful dishes across the Resort. Filled
                with flavour and packed with goodness, Annabel&apos;s delicious
                recipes will bring the whole family together.
              </p>
            </div>
            <a
              href="https://www.sani-resort.com/en_GB/annabel-karmel"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/little-guests-banner.jpg"
                alt="Annabel exclusive menu at Sani Resort"
                className="w-full"
              />
            </a>
          </section>

          <section className="mt-[50px] space-y-[44px]">
            <a
              href="https://www.sani-resort.com/en_GB/your-stay"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/sani-footer-strip.jpg"
                alt="Sani Resort"
                className="w-full"
              />
            </a>
            <div className="flex justify-center mt-[30px]!">
              <a
                href="https://www.sani-resort.com/en_GB/your-stay"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <img
                  src="/articles/enjoy-summer-2021-sani-resort-greece/book-now.png"
                  alt="Book now"
                  className="w-[250px] max-w-full"
                />
              </a>
            </div>
            <div className="flex justify-center mt-[50px]!">
              <a
                href="https://www.instagram.com/sani_resort_official/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/articles/enjoy-summer-2021-sani-resort-greece/sani-badges.png"
                  alt="Follow Sani Resort on Instagram"
                  className="w-[393px] max-w-full"
                />
              </a>
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
