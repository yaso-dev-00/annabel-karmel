import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/discover-special-offers-at-sani-resort-greece',
);

const experiences = [
  {
    title: 'Rafa Nadal Tennis Center',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/rafa-nadal.jpg',
  },
  {
    title: 'Chelsea FC Foundation',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/chelsea-fc.jpg',
  },
  {
    title: 'Bear Grylls Survival Academy',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/bear-grylls.jpg',
  },
  {
    title: 'Sani Treetop Adventure',
    image:
      '/articles/discover-special-offers-at-sani-resort-greece/treetop.jpg',
  },
];

export default function DiscoverSpecialOffersAtSaniResortPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[40px] md:px-[14px] md:pt-[40px]">
          <div className="text-center">
            <a href="https://sani-resort.com/" target="_blank" rel="noreferrer">
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/sani-logo-top.jpg"
                alt="Sani Resort"
                className="mx-auto h-auto w-[200px] md:w-[249px]"
              />
            </a>
          </div>

          <h1
            style={{ fontFamily: 'var(--font-display)' }}
            className="mt-[40px] text-center text-[40px] leading-[50px]! font-medium text-[#3a3a3a]"
          >
            Discover the Sani Sanctuary:
            <br />
            Book Your Dream Family Holiday Today
          </h1>

          <p className={`${styles.intro} mt-[70px]! text-center`}>
            <a
              href="https://sani-resort.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e98c9a]! "
            >
              Sani Resort
            </a>{' '}
            is where luxury meets family adventure. A sanctuary for those
            seeking relaxation and connection, it offers a haven where stories
            come to life, and memories are made in a stunning, nature-filled
            setting.
          </p>
          <p className={`${styles.intro} text-center`}>
            Set on the breathtaking Kassandra Peninsula in Halkidiki, Greece,{' '}
            <a
              href="https://sani-resort.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#e98c9a]! "
            >
              Sani Resort
            </a>{' '}
            combines world-class luxury with nature&apos;s beauty. With five
            award-winning hotels, 7km of beach, exceptional dining, and new 2025
            family experiences, it&apos;s the ultimate destination for
            relaxation and adventure.
          </p>

          <div
            className="mt-[40px]! space-y-[60px]"
            style={{ background: '#FDFAF4' }}
          >
            <section className="mt-[40px] ">
              <div
                style={{ padding: '50px 21px' }}
                className="mt-[30px]! px-[16px] pb-[21px]!  text-center"
              >
                <h2 className={styles.cardTitle}>New for 2025</h2>
                <h3 className={`${styles.excerpt} mt-0! font-[500]!`}>
                  {' '}
                  <span className="hover:text-[#D79CAC]">Sani Asterias:</span> A
                  New Level of Luxury
                </h3>
                <img
                  src="/articles/discover-special-offers-at-sani-resort-greece/sani-asterias.jpg"
                  alt="Sani Asterias"
                  className="w-full mt-[20px]!"
                />
                <p className={`${styles.cardExcerpt} mt-[20px]!`}>
                  The 2025 transformation at Sani Asterias introduces new
                  residences with private pools, designed for ultimate luxury.
                  Overlooking the serene marina and lush gardens, these
                  expansive accommodations offer a seamless blend of
                  indoor-outdoor living, ideal for families seeking
                  unforgettable relaxation.
                </p>
              </div>
            </section>

            <section style={{ background: '#FDFAF4' }} className="mt-[40px]">
              <div
                style={{ padding: '16px 21px' }}
                className="mt-[20px]! px-[16px] pb-[21px]! pt-[10px] text-center"
              >
                <h2
                  className={`${styles.cardTitle} text-[40px]! leading-[1.2]!`}
                >
                  <span className="hover:text-[#D79CAC]">Sani Club:</span> Your
                  Secluded Haven of Peace
                </h2>
                <img
                  src="/articles/discover-special-offers-at-sani-resort-greece/sani-club.jpg"
                  alt="Sani Club"
                  className="w-full mt-[20px]!"
                />
                <p className={`${styles.cardExcerpt} mt-[20px]!`}>
                  In 2025, Sani Club&apos;s transformation will bring even more
                  elegance and privacy to its serene accommodations. Set amidst
                  fragrant Mediterranean gardens and overlooking the sparkling
                  Aegean Sea, the redesigned spaces provide the ideal retreat
                  for families to relax, recharge, and experience true peace in
                  a stunning natural environment.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-[64px] gap-[22px] grid grid-cols-1">
            <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-[10px]">
              <div className="px-[10px] text-center lg:text-right">
                <h3
                  className={`${styles.cardTitle}  leading-[1.1]! font-medium!`}
                >
                  Special Offers
                </h3>
                <p
                  className={`${styles.cardExcerpt} mt-[18px]! text-[22px]! leading-tight!`}
                >
                  Book your holiday now and save up to 20%. Enjoy complimentary
                  airport transfers, free full board upgrade, and children get
                  to stay for free*.
                </p>
                <div className="mt-[18px]">
                  <a
                    href="https://sani-resort.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex hover:text-white! bg-[#b9a578] rounded-[5px] px-[14px] py-[14px] text-[18px] leading-none text-[#1f1f1f]"
                  >
                    DISCOVER &gt;
                  </a>
                </div>
                <p className="mt-[18px] text-[22px] text-[#4e434b]">
                  *T&amp;Cs apply.
                </p>
              </div>
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/special-offer-1.jpg"
                alt="Sani special offers"
                className="w-full mt-[30px] lg:mt-0!"
              />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-[10px]">
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/special-offer-2.jpg"
                alt="Sani spa gift"
                className="w-full"
              />
              <div className="px-[10px] mt-[30px] lg:mt-0! text-center lg:text-left">
                <h3
                  className={`${styles.cardTitle} text-[40px]! leading-[1.1]! font-medium!`}
                >
                  75€ Spa Gift
                </h3>
                <p
                  className={`${styles.cardExcerpt} mt-[18px]! text-[22px]! leading-tight!`}
                >
                  Use exclusive code AK75 when booking and get an additional 75€
                  spa credit valid for all bookings made until 31.10.25.
                </p>
                <div className="mt-[18px]">
                  <a
                    href="https://sani-resort.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex hover:text-white! bg-[#b9a578] rounded-[5px] px-[14px] py-[14px] text-[18px] leading-none text-[#1f1f1f]"
                  >
                    DISCOVER &gt;
                  </a>
                </div>
                <p className="mt-[18px] text-[22px] text-[#4e434b]">
                  *T&amp;Cs apply.
                </p>
              </div>
            </section>
          </div>

          {/* <div className="mt-[50px] space-y-[46px]">
            <section>
              <h3 className={`${styles.cardTitle} text-[40px]! leading-[1.1]! font-medium!`}>Special Offers</h3>
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/special-offer-1.jpg"
                alt="Sani special offers"
                className="mt-[10px] w-full"
              />
              <p className={`${styles.cardExcerpt} mt-[14px]! text-[21px]!`}>
                Book your holiday now and save up to 20%. Enjoy complimentary airport transfers, free full board
                upgrade, and children get to stay for free*.
              </p>
              <div className="mt-[16px]">
                <a
                  href="https://sani-resort.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex bg-[#b9a578] px-[14px] py-[8px] text-[17px] leading-none text-[#1f1f1f]"
                >
                  DISCOVER &gt;
                </a>
              </div>
              <p className="mt-[10px] text-[15px] text-[#4e434b]">*T&amp;Cs apply.</p>
            </section>

            <section>
              <h3 className={`${styles.cardTitle} text-[40px]! leading-[1.1]! font-medium!`}>75€ Spa Gift</h3>
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/special-offer-2.jpg"
                alt="Sani spa gift"
                className="mt-[10px] w-full"
              />
              <p className={`${styles.cardExcerpt} mt-[14px]! text-[21px]!`}>
                Use exclusive code AK75 when booking and get an additional 75€ spa credit valid for all bookings made
                until 31.10.25.
              </p>
              <div className="mt-[16px]">
                <a
                  href="https://sani-resort.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex bg-[#b9a578] px-[14px] py-[8px] text-[17px] leading-none text-[#1f1f1f]"
                >
                  DISCOVER &gt;
                </a>
              </div>
              <p className="mt-[10px] text-[15px] text-[#4e434b]">*T&amp;Cs apply.</p>
            </section>
          </div> */}

          <section className="mt-[70px] bg-[#FDFAF4] px-[10px] md:px-[20px] py-[40px]">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-[20px] md:gap-[40px]">
              <div className="text-left">
                <h2
                  className={`${styles.relatedTitle} mt-[50px]! text-left hover:text-[#D79CAC]!`}
                >
                  Annabel&apos;s 2025 Taste Adventure
                </h2>
                <p className={`${styles.cardExcerpt} mt-[30px]! text-left`}>
                  Join Annabel on a delicious journey designed just for Little
                  Guests! From energy-boosting starters to flavour-packed mains
                  and refreshing desserts, make every mealtime and adventure!
                </p>
              </div>
              <a
                className="flex self-center lg:self-start"
                href="https://sani-resort.com/families/annabel-karmel-childrens-menus"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/articles/discover-special-offers-at-sani-resort-greece/little-guests-logo.png"
                  alt="Little guests"
                  className="ml-auto h-auto w-[250px] lg:w-[350px]"
                />
              </a>
            </div>

            <img
              src="/articles/discover-special-offers-at-sani-resort-greece/little-guests-banner.jpg"
              alt="Annabel's 2025 Taste Adventure"
              className="mt-[60px] w-full h-[300px] md:h-auto object-cover"
            />
          </section>

          <section className="mt-[44px] grid items-center justify-center gap-[18px] lg:grid-cols-2">
            <div>
              <h3 className={`${styles.relatedTitle} text-left`}>
                Little Guests
              </h3>
              <p className={`${styles.cardExcerpt} mt-[20px]!`}>
                There&apos;s so much for children to discover at Sani...
                award-winning academies, water fun, treetop adventures and
                endless exploration. It&apos;s paradise for Little Guests!
              </p>
              <div className="mt-[30px] lg:mt-[60px] text-center lg:text-left">
                <a
                  href="https://sani-resort.com/families"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex hover:text-white! bg-[#b9a578] rounded-[5px] px-[14px] py-[14px] text-[18px] leading-none text-[#1f1f1f]"
                >
                  DISCOVER &gt;
                </a>
              </div>
            </div>
            <img
              src="/articles/discover-special-offers-at-sani-resort-greece/little-guests-card.jpg"
              alt="Little guests activities"
              className="w-full mt-[30px] lg:mt-0!"
            />
          </section>

          <section className="mt-[68px] bg-[#FDFAF4] pt-[40px] md:pt-[60px]  pb-[30px] px-[20px]">
            <h2 className={`${styles.relatedTitle} text-center`}>
              Unforgettable Experiences
            </h2>
            <div className="mt-[20px] grid gap-[14px] md:grid-cols-2">
              {experiences.map((item) => (
                <div key={item.title} className="bg-white/0">
                  <img src={item.image} alt={item.title} className="w-full" />
                  <p
                    className={`text-[22px]! leading-[1.2]! font-normal px-[18px] py-[25px] text-center`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-[40px] md:max-w-[1050px] mx-auto text-center">
            <img
              src="/articles/discover-special-offers-at-sani-resort-greece/sani-footer-strip.jpg"
              alt="Sani Resort"
              className="w-full h-[300px] md:h-auto object-cover"
            />
            <div className="mt-[50px] text-center">
              <a
                href="https://sani-resort.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-[5px] hover:text-black! bg-[#aa9473] px-[14px] py-[14px] text-[18px] leading-none text-white!"
              >
                BOOK NOW &gt;
              </a>
            </div>
            <div className="mt-[50px] flex items-center justify-center gap-[16px]">
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/taste-adventures-badge.jpg"
                alt="Taste adventure badge"
                className="h-auto w-[100px] md:w-[141px]"
              />
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/sani-instagram.jpg"
                alt="Sani Instagram"
                className="h-auto w-[110px] md:w-[162px]"
              />
              <img
                src="/articles/discover-special-offers-at-sani-resort-greece/sani-logo-small.jpg"
                alt="Sani logo"
                className="h-auto w-[110px] md:w-[162px]"
              />
            </div>
            <p className="mt-[50px] text-center text-[22px] text-[#4e434b]">
              *World&apos;s Leading Family &amp; Beach Resort at the World
              Travel Awards 2019, 2020, 2021, 2022, 2023, 2024.
            </p>
          </section>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>
              Some more articles you might enjoy...
            </p>
          </div>
        </article>
        <div className="mb-[80px]! px-[8px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
