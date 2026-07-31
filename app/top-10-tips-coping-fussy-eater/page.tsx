import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { RelatedArticlesCarousel } from '@/components/SharedCarousels/RelatedArticlesCarousel';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { fussyEaterTips } from '@/data/top-10-tips-coping-fussy-eater-page';
import { getRelatedArticles } from '@/data/related-articles';
import Link from 'next/link';
import styles from './page.module.css';

const relatedArticles = getRelatedArticles('/top-10-tips-coping-fussy-eater');

export default function Top10TipsCopingFussyEaterPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-hidden bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[10px] pt-[30px] md:px-[14px]">
          <p className={styles.introLead}>
            When you&apos;ve got a fussy eater to contend with, it&apos;s easy
            to get locked in a battle of wills, and it&apos;s so easy to feel
            frustrated and powerless when your toddler simply refuses to eat
            certain foods. Annabel Karmel is here to help with her top 10 tips
            for coping with a fussy eater!
          </p>

          <p className={styles.intro}>
            Most children go through a phase of fussy eating, I know my son did,
            whether it&apos;s picking at their food before pushing their plate
            away, eating a few favourite foods, or flatly refusing to eat at
            meal times you&apos;re not alone. Around ninety percent of children
            go through at least one lengthy stage of fussy eating. Whilst
            mealtimes are a great opportunity to spend uninterrupted quality
            time with your favourite little ones, feeding time doesn&apos;t
            always turn out as planned; one day it&apos;s clean plates and angel
            faces, the next it&apos;s teatime tantrums and hungry tums.
          </p>

          <p className={styles.intro}>
            While it can be frustrating when a child rejects the food we give
            them, it&apos;s actually the way that we deal with the situation
            that impacts on their eating habits.
          </p>

          <p className={styles.intro}>
            Remember, you are not alone! Keep trying out new ideas and
            eventually you will see positive results. Don&apos;t be afraid to
            quiz other mums on how they tackle fussy eating. I used to share my
            recipes at my son&apos;s nursery and it felt so good to be able to
            help other mums in my position.
          </p>

          {fussyEaterTips.map((tip) => (
            <section key={tip.title}>
              <h2 className={styles.sectionTitle}>{tip.title}</h2>
              <div className={styles.imageWrap}>
                <img
                  src={tip.image}
                  alt={tip.imageAlt}
                  width={1024}
                  height={737}
                  loading="lazy"
                />
              </div>
              {tip.title.startsWith('10.') ? (
                <p className={styles.body}>
                  If you&apos;re worried that your fussy eater isn&apos;t
                  getting enough nutrients then you can always sneak them in to
                  their food! If your little one loves tomato sauce then you
                  have to try this version with 5 hidden veggies. It&apos;s
                  great on pasta, as a dipping sauce, or served over meat. My{' '}
                  <Link
                    href="https://www.annabelkarmel.com/recipes/hidden-veg-chicken-bolognese/"
                    className={styles.inlineLink}
                  >
                    Hidden Veg Bolognese
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="https://www.annabelkarmel.com/recipes/hidden-veg-smoothie/"
                    className={styles.inlineLink}
                  >
                    Hidden Veg Smoothie
                  </Link>{' '}
                  are delicious too!
                </p>
              ) : (
                <p className={styles.body}>{tip.body}</p>
              )}
            </section>
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
