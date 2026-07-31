import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { getRelatedArticles } from '@/data/related-articles';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles(
  '/what-spices-can-you-give-to-your-baby',
);

export default function WhatSpicesCanYouGiveToYourBabyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.body}>
            Ban bland baby food! Little ones should be savouring tasty and
            varied meals packed with flavour, and the best way to get them
            experimenting is through introducing spices to, literally, spice up
            their meals.
          </p>
          <p className={`${styles.body} mt-[24px]`}>
            When it comes to weaning, I always encourage families (spoon-fed or
            baby led) to trial and error with herbs and mild spices. Not only
            will it expand little palettes, but it will inspire adventurous
            eating and a lifelong passion for food.
          </p>
          <p className={`${styles.body} mt-[24px]`}>
            Since we should avoid adding salt and sugar before the age of one,
            spices offer the perfect antidote to help pack in the flavour to
            your baby&apos;s diet. It also allows babies to get used to a range
            of flavours at a time when they are open to experimenting with new
            tastes. And it&apos;s a great transition into family food. Plus, if
            they&apos;ve been exposed to a variety of flavours from the start,
            they are more likely to accept more in the future!
          </p>
          <p className={`${styles.leadStrong} mt-[24px]`}>
            Keep reading to find out when, how and why to introduce spices...
          </p>

          <div className="flex items-center w-full justify-center">
            <img
              src="/articles/what-spices-can-you-give-to-your-baby/when-to-introduce-spices.jpg"
              alt="Baby holding a strawberry in a high chair"
              className="mt-[50px] w-full md:max-w-[1000px]!"
            />
          </div>

          <h2 className={`${styles.subheading} mt-[26px]`}>
            When to introduce your baby to spices?
          </h2>
          <p className={`${styles.body} mt-[18px]`}>
            Whether opting for spoon-fed or baby-led weaning, I always encourage
            parents to introduce herbs and spices from the get-go of their
            weaning journey. Before starting solids, often breastfed babies have
            already been introduced to a variety of spices and flavours through
            their mother&apos;s diet. So, if mum enjoys spicy and flavoursome
            foods, then baby will too via her milk!
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            Flavour and spice and all things nice will spruce up baby&apos;s
            diet without adding salt or sugar (which should be avoided before
            one), so the sooner you start the better!
          </p>
          <div className="flex justify-center w-full">
            <img
              src="/articles/what-spices-can-you-give-to-your-baby/how-to-introduce-spices.jpg"
              alt="Apple and pear puree with cinnamon sticks"
              className="mt-[44px] w-full md:max-w-[1000px]!"
            />
          </div>

          <h2 className={`${styles.subheading} mt-[26px]`}>
            How to introduce your baby to spices?
          </h2>
          <p className={`${styles.body} mt-[18px]`}>
            I always encourage parents to start things slowly by beginning with
            aromatic spices such as mint, paprika, cinnamon, cloves, nutmeg,
            coriander cardamom and cumin. Try to steer clear of anything too
            spicy such as cayenne pepper or chilli as it may upset little tums -
            there&apos;s a big difference between flavour and hotness!
          </p>
          <p className={`${styles.body} mt-[18px]`}>
            It&apos;s best to introduce a small amount, like a pinch for
            example, before building up quantity as resilience grows. Often a
            little goes a long way, so by avoiding adding too much you&apos;ll
            ensure that the flavour and aroma doesn&apos;t overpower your little
            one&apos;s meal. Also, it&apos;s important to ensure that any whole
            spices used during cooking are removed before being served to baby.
            As with most parts of the weaning journey, it&apos;s all about trial
            and error... and persistence! It often takes multiple attempts
            before baby accepts and even likes a new flavour, so don&apos;t be
            deterred by them initially rejecting new tastes!
          </p>
          <div className="flex items-center justify-center w-full">
            <img
              src="/articles/what-spices-can-you-give-to-your-baby/why-introduce-spices.jpg"
              alt="Baby eating vegetables while parent prepares food"
              className="mt-[44px] w-full md:max-w-[750px] "
            />
          </div>

          <h2 className={`${styles.subheading} mt-[26px]`}>
            Why should you introduce your baby to spices?
          </h2>
          <ol className={styles.orderedList}>
            <li>
              They add flavour and aroma to food without adding salt or sugar
            </li>
            <li>
              Exposing little ones to variety will help them appreciate
              different tastes and hopefully become adventurous eaters in the
              long run!
            </li>
            <li>Spices can help boost immunity and fight the common cold</li>
            <li>
              The same meal can be enjoyed by the entire family without having
              to cook up different recipes
            </li>
            <li>
              Spices quite literally spice up mealtimes and help enhance flavour
              and overall experience!
            </li>
          </ol>

          <div className="mt-[90px] text-center">
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
