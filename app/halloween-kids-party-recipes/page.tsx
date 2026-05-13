import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/halloween-kids-party-recipes");

const LOVE_BASE = "https://lovebakerstreet.com";

function FacebookIcon() {
  return (
    <svg aria-hidden viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        d="M58.52 182.19c.67-3.79 1.16-7.61 2-11.35 6.52-27.86 31-49.37 59.49-52.33 2.32-.24 4.66-.37 7-.42 4.4-.09 6.94 2.4 7 6.85 0 10 0 20 0 29.95 0 .62 0 1.24 0 1.86-.09 4.33-2.44 6.7-6.8 6.88a23.67 23.67 0 1023.36 29.85 30.91 30.91 0 00.86-7.55q.07-66.61 0-133.24c0-5.52 2.19-7.69 7.78-7.69h30.57c4.77 0 7 2.23 7.21 7a40.27 40.27 0 0039 39.38c5.47.24 7.55 2.39 7.55 7.82q0 15.19 0 30.37c0 5.16-2.45 7.58-7.65 7.46a85.43 85.43 0 01-36.77-8.95l-2.11-1v2.65c0 19.9.16 39.8-.09 59.7-.4 31-23.71 59-54.1 65.4-3.28.69-6.62 1.12-9.93 1.68H122.56l-4.63-.74a69.2 69.2 0 01-57.45-52.41l-2-10.9zm105.34-124.73v2.83q0 63.31 0 126.65A36.12 36.12 0 01122.67 223c-15.94-2.25-29-15.79-30.73-31.28a36.35 36.35 0 0123.88-38.48c1.9-.67 4.65-.78 5.5-2.11 1-1.53.28-4.13.29-6.26 0-4.6 0-9.2 0-14.09l-3.63.5c-30 5.15-50.94 33.82-46.55 63.82a56.9 56.9 0 0062.19 48.7c28.14-2.68 50.58-26.71 50.91-55 .27-23.89.08-47.79.07-71.69 0-2.81.68-5.23 3.3-6.63s5.12-.67 7.5 1a70.62 70.62 0 0025.89 11.39l9.86 1.65v-19.85c0-1.35-.88-1.27-1.77-1.44Q196.8 97.12 186.66 65.5l-1.83-8z"
      />
    </svg>
  );
}

export default function HalloweenKidsPartyRecipesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px]">
          {/* Intro — cream */}
          <section className={`${styles.cream} mt-[40px]! px-[14px] pb-14 pt-6 md:pb-16 md:pt-10`}>
            <img
              src="/articles/halloween-kids-party-recipes/baker-street-logo.png"
              alt="Baker Street"
              className={styles.logoLockup}
              width={205}
              height={130}
            />
            <p className={`${styles.introBody} mt-8`}>
              With the spooky season upon us, it can only mean one thing – it&apos;s time to start planning our Halloween
              celebrations! To get in the festive spirit, I&apos;ve teamed up with Baker Street to create a delicious
              spread of spine-chilling Halloween meal ideas using their cleverly-packed, and not to mention oh-so-tasty
              bakery products.
            </p>
            <p className={`${styles.introBody}`}>
              From spooky sweet and savoury sarnies to Monster Burgers that your little monsters can make, there&apos;s a
              whole host of delicious and frighteningly good creations to be made and enjoyed – they&apos;re so tasty
              it&apos;s almost scary!
            </p>
            <p className={styles.introBody}>Make this year&apos;s Halloween festivities the tastiest one yet!</p>
            <img
              src="/articles/halloween-kids-party-recipes/annabel-signature.png"
              alt="Annabel Karmel signature"
              className={styles.signature}
              width={330}
              height={137}
            />
          </section>

          {/* Cleverly packed — white two-column */}
          <section className="bg-white px-[14px] py-12 md:py-14">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 md:gap-10">
              <div>
                <p className={styles.kicker}>Cleverly packed to last longer</p>
                <p className={styles.twoColText}>
                  Baker Street&apos;s delicious range of bread and bakery products – including our Original Burger Buns,
                  Classic Hot Dog Rolls and Sliced Loaves – are lovingly baked and cleverly packed to last longer.
                </p>
                <p className={`${styles.twoColText}`}>
                  Our mission is to create great tasting bread and help families reduce their food waste at home. And we
                  believe that with Baker Street, everyone can enjoy every last Baker Street bun, roll and slice of
                  bread – it really is the best thing since sliced bread!
                </p>
              </div>
              <div>
                <img
                  src="/articles/halloween-kids-party-recipes/baker-street-family.jpg"
                  alt="Annabel Karmel with children and Halloween food"
                  className={styles.media}
                  width={819}
                  height={1024}
                />
              </div>
            </div>
            <p className={`${styles.transitionCenter} mx-auto mt-10 `}>
              Whether it&apos;s for your favourite fakeaway or watching the big game, for Bonfire Night bangers or scary
              sharers this Halloween, Baker Street has you covered for every occasion!
            </p>
          </section>

          {/* Party ideas + recipes — cream */}
          <section className={`${styles.cream} px-[14px] pb-6 pt-5`}>
            <h2 className={styles.blockTitle}>
              Get in the spooky spirit with Annabel&apos;s so-tasty-they&apos;re-scary Halloween party food ideas
            </h2>

            {/* Monster burgers */}
            <div className="mx-auto mt-12 max-w-5xl">
              <h3 className={styles.recipeTitle}>Monster burgers</h3>
              <p className={styles.recipeStarring}>
                <a className="hover:text-[var(--hover-color)]!"  href={`${LOVE_BASE}/products/burger-buns/original/`} target="_blank" rel="noopener noreferrer">
                  Starring Baker Street&apos;s Original Burger Buns
                </a>
              </p>
              <div className="mt-15 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <a href="https://www.annabelkarmel.com/recipes/monster-burgers-2/" className="block">
                  <img
                    src="/articles/halloween-kids-party-recipes/monster-burgers-food.jpg"
                    alt="Monster burgers with Baker Street buns"
                    className={styles.media}
                    width={819}
                    height={1024}
                  />
                </a>
                <a
                  href={`${LOVE_BASE}/products/burger-buns/original/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src="/articles/halloween-kids-party-recipes/monster-burgers-boy.jpg"
                    alt="Child with a monster burger"
                    className={styles.media}
                    width={819}
                    height={1024}
                  />
                </a>
              </div>
              <div className="mt-8 flex justify-center">
                <a className={styles.cta} href="https://www.annabelkarmel.com/recipes/monster-burgers-2/">
                  Get the recipe
                </a>
              </div>
            </div>

            {/* Spooky sandwiches */}
            <div className="mx-auto mt-16 max-w-5xl md:mt-20">
              <h3 className={styles.recipeTitle}>Spooky Halloween sandwiches</h3>
              <p className={styles.recipeStarring}>
                <a className="hover:text-[var(--hover-color)]!" href={`${LOVE_BASE}/products/sliced-loaves/white/`} target="_blank" rel="noopener noreferrer">
                  Starring Baker Street&apos;s Sliced White Loaf
                </a>
              </p>
              <div className="mt-15 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <img
                  src="/articles/halloween-kids-party-recipes/spooky-sandwiches-food.jpg"
                  alt="Spooky Halloween open sandwiches"
                  className={styles.media}
                  width={819}
                  height={1024}
                />
                <img
                  src="/articles/halloween-kids-party-recipes/spooky-sandwiches-girl.jpg"
                  alt="Child with a spooky sandwich"
                  className={styles.media}
                  width={819}
                  height={1024}
                />
              </div>
              <div className="mt-8 flex justify-center">
                <a className={styles.cta} href="https://www.annabelkarmel.com/recipes/spooky-halloween-sandwiches/">
                  Get the recipe
                </a>
              </div>
            </div>

            {/* Pumpkin cheesecake */}
            <div className="mx-auto mt-16 max-w-5xl pb-4 md:mt-20">
              <h3 className={styles.recipeTitle}>Pumpkin cheesecake</h3>
              <p className={styles.recipeStarring}>
                <a className="hover:text-[var(--hover-color)]!" href={`${LOVE_BASE}/products/sponges-flans/large-sponge-flan-case`} target="_blank" rel="noopener noreferrer">
                  Starring Baker Street&apos;s Large Flan Case
                </a>
              </p>
              <div className="mt-15 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <img
                  src="/articles/halloween-kids-party-recipes/pumpkin-cheesecake-pie.jpg"
                  alt="Pumpkin cheesecake"
                  className={styles.media}
                  width={819}
                  height={1024}
                />
                <img
                  src="/articles/halloween-kids-party-recipes/pumpkin-cheesecake-kids.jpg"
                  alt="Children with Halloween treats"
                  className={styles.media}
                  width={819}
                  height={1024}
                />
              </div>
              <div className="mt-8 flex justify-center">
                <a className={styles.cta} href="https://www.annabelkarmel.com/recipes/pumpkin-cheesecake/">
                  Get the recipe
                </a>
              </div>
            </div>
          </section>

          {/* Baker Street banner + visit + social */}
          <section className="bg-white px-[14px] pb-14 pt-6">
            <img
              src="/articles/halloween-kids-party-recipes/baker-street-banner.jpg"
              alt="Baker Street Big Night In"
              className={`${styles.media} mx-auto max-w-5xl`}
              width={1024}
              height={287}
            />
            <p className={`${styles.visitText} mx-auto mt-8!`}>
              <strong>Visit </strong>
              <a href={LOVE_BASE} target="_blank" rel="noopener noreferrer">
                www.lovebakerstreet.com
              </a>
              <strong> for more recipes &amp; info.</strong>
            </p>
            <p className={`${styles.followText} mx-auto`}>
              Follow Baker Street on social for spooky creations for your Halloween Big Night In
            </p>
            <div className={`${styles.socialRow} mt-12`}>
              <a
                className={styles.socialLink}
                href="https://www.facebook.com/LoveBakerStreet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Baker Street on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                className={styles.socialLink}
                href="https://www.instagram.com/lovebakerstreet/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Baker Street on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                className={styles.socialLink}
                href="https://www.tiktok.com/@lovebakerstreet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Baker Street on TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </section>

          <div className="mt-[50px] px-[14px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
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
