import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import styles from "./page.module.css";

const relatedArticles = [
  {
    href: "/best-foods-to-help-your-baby-sleep",
    image: "/articles/6-tips-for-getting-out-and-about-with-baby/related-best-foods.png",
    title: "The Best Foods to Help Your Baby Sleep",
  },
  {
    href: "/haunted-toast-toppers",
    image: "/articles/6-tips-for-getting-out-and-about-with-baby/related-haunted-toast.png",
    title: "Haunted Toast Toppers",
  },
  {
    href: "/get-your-free-top-50-first-foods-list",
    image: "/articles/6-tips-for-getting-out-and-about-with-baby/related-first-foods.jpg",
    title: "Get your FREE top 50 First Foods Checklist",
  },
  {
    href: "/tips-on-how-to-keep-baby-hydrated",
    image: "/articles/tips-on-how-to-keep-baby-hydrated/hero.jpg",
    title: "Tips on how to keep baby hydrated!",
  },
  {
    href: "/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food",
    image: "/articles/starting-solids-top-tips-on-how-to-transition-from-milk-to-solid-food/hero.jpg",
    title: "Starting solids: Top tips on how to transition from milk to solid food",
  },
  {
    href: "/pedal-power",
    image: "/articles/pedal-power/hero.jpg",
    title: "Pedal Power!",
  },
];

export default function GettingOutWithBabyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[14px] pb-[10px] pt-[30px]">
          <h1 className={styles.title}>6 tips for getting out and about with baby</h1>
          <p className={styles.partner}>
            In partnership with <a href="https://www.micro-scooters.co.uk/">Micro Scooters</a>
          </p>

          <p className={styles.lead}>
            Let&apos;s be honest - getting out the door with a baby can feel like packing for a three-day expedition.
            Snacks? Check. Wipes? Obviously. Spare everything? Absolutely. Just when you think you&apos;re ready, BOOM!
            Emergency nappy change.
          </p>
          <p className={styles.lead}>
            But here&apos;s the thing: it&apos;s always worth it. And with a little help from our friends at Micro scooters,
            it gets a lot easier.
          </p>

          <div className="my-[22px] mb-[30px] mt-10! md:mt-15!">
            <img src="/articles/6-tips-for-getting-out-and-about-with-baby/hero-main.jpg" alt="Baby in Micro trike" />
          </div>

          <h2 className={styles.sectionHeading}>Why fresh air fixes (almost) everything</h2>
          <p className={styles.bodyText}>
            The great outdoors is nature&apos;s gym for growing brains. From around 6 months, babies are learning in
            overdrive, by seeing, hearing, touching, and moving. Trees rustle, birds sing, leaves crunch and breezes
            tickle. It&apos;s a full sensory workout, and it&apos;s all free.
          </p>

          <h2 className={styles.sectionHeading}>Daylight = better sleep (yes, really)</h2>
          <p className={styles.bodyText}>
            Natural light helps regulate your baby&apos;s internal body clock. So even a quick wander round the block can
            make bedtime less of a battle.
          </p>

          <h2 className={styles.sectionHeading}>Movement matters. Even if they&apos;re not walking yet</h2>
          <p className={styles.bodyText}>
            Whether they&apos;re just starting to kick their little legs or a bit more independent in the toddler phase,
            every bounce, wobble and scoot supports balance, coordination, and confidence.
          </p>

          <h2 className={styles.sectionHeading}>It&apos;s not about the miles</h2>
          <p className={styles.bodyText}>
            There&apos;s no perfect time to go, so just go. Waiting for naps, feeds, weather, or your motivation to
            align? Babies are surprisingly adaptable.
          </p>

          <h2 className={styles.sectionHeading}>Short trips count</h2>
          <p className={styles.bodyText}>
            You don&apos;t need a plan. Or a destination. 10 minutes in the park, a scoot to the shop, or a lap of the
            block does the trick. Fresh air resets everyone.
          </p>

          <div className="my-[22px] mb-[30px]">
            <img
              src="/articles/6-tips-for-getting-out-and-about-with-baby/hero-secondary.jpg"
              alt="Parent and child on scooter outdoors"
            />
          </div>

          <h2 className={styles.sectionHeading}>Make it social</h2>
          <p className={`${styles.bodyText} mb-[30px]! md:mb-[40px]!`}> 
            Say hi to another parent. Walk with a friend. Join a local baby group. You&apos;re not alone and those
            micro-connections? They matter more than you think.
          </p>
          <p className={styles.bodyText}>
            Little ones don&apos;t need epic adventures. They just need <em>movement</em>. And with the right kit, getting
            out the house feels less like a battle and more like a breath of fresh air.
          </p>

          <section className="mt-[18px] bg-[#efe7e7] px-[14px] pb-[18px] pt-[18px]">
            <div className="mb-[20px] flex justify-center  px-[6px]">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/articles/6-tips-for-getting-out-and-about-with-baby/Meet-your-new-parenting-survival-kit-2-1024x94-optimized-for-mobie.webp"
                />
                <img
                  src="/articles/6-tips-for-getting-out-and-about-with-baby/Meet-your-new-parenting-survival-kit-2-1024x94-optimized.webp"
                  alt="Meet your new parenting survival kit"
                  width={1024}
                  height={94}
                  className="h-auto max-w-full"
                />
              </picture>
            </div>

            <div className="grid grid-cols-2 gap-[10px] max-[900px]:grid-cols-1 mt-10! ">
              <div className="flex min-h-[540px] flex-col bg-transparent px-[10px] py-[6px] pt-[60px] max-[900px]:order-2 max-[900px]:min-h-0 max-[900px]:px-[2px]">
                <h3 className={styles.productTitle}>The Micro FlexiTrike 7-in-1</h3>
                <p className={styles.productBody}>
                  The Micro FlexiTrike is part pushchair, part ride-on, part trike and 100% ready for anything!
                </p>
                <p className={`${styles.productBody} ${styles.productBodyNoGap}`}>
                  Suitable from 6 months to 6 years, it switches modes effortlessly (no tools needed), adapts to your
                  child&apos;s age, mood and moment, and folds down when you&apos;re done. Forward-facing for curious explorers, parent-facing for quiet cuddly rides. It even has a seat that reclines for those on-the-go snoozes. And with safety certifications for both trike and pushchair standards, you’ve got peace of mind built in.
                </p>
              </div>
              <div className="min-h-[540px] overflow-hidden max-[900px]:order-1 max-[900px]:min-h-0 ">
                <img
                  src="/articles/6-tips-for-getting-out-and-about-with-baby/flexitrike.jpg"
                  alt="Micro FlexiTrike"
                  className="block h-full w-full object-cover max-[900px]:h-auto"
                />
              </div>

              <div className="min-h-[600px] overflow-hidden max-[900px]:mt-[35px]!  max-[900px]:order-3 max-[900px]:min-h-0">
                <img
                  src="/articles/6-tips-for-getting-out-and-about-with-baby/mini-micro-4in1.jpg"
                  alt="Mini Micro 4-in-1"
                  className="block h-full w-full object-cover max-[900px]:h-auto"
                />
              </div>
              <div className="flex min-h-[600px] flex-col bg-transparent max-[900px]:mt-[35px]!  max-[900px]:order-4 px-[10px] gap-[38px] py-[6px] md:pt-[60px] max-[900px]:min-h-0 max-[900px]:px-[2px]">
                <div className="flex flex-col gap-[15px]">
                 <h3 className={styles.productTitle}>Mini Micro 4-in-1</h3>
                 <p className={`${styles.productBody} ${styles.productBodyLoose}  mb-0!`}>
                  Perfect from first steps to school runs, the Mini Micro 4-in-1 starts as a guided ride-on trike for
                  1-year-olds, transforming into a proper Micro scooter by age 3.
                 </p>
                </div>
                <p className={`${styles.productBody} ${styles.productBodyNoGap}`}>
                Here’s how it breaks down:
                </p>
                <p className={`${styles.productBody} ${styles.productBodyTight}`}>
                  <strong>Stage 1:</strong> Parent-guided ride-on trike (from 12 months)
                </p>
                <p className={`${styles.productBody} ${styles.productBodyTight}`}>
                  <strong>Stage 2:</strong> Independent ride-on (from 18 months)
                </p>
                <p className={`${styles.productBody} ${styles.productBodyTight}`}>
                  <strong>Stage 3:</strong> First toddler scooter (from age 2)
                </p>
                <p className={`${styles.productBody} ${styles.productBodyNoGap}`}>
                  <strong>Stage 4:</strong> Transforms to the grown-up Mini Micro scooter (ages 3-6) that children know and love
                </p>
              </div>

              <div className="flex min-h-[560px] flex-col bg-transparent px-[10px] max-[900px]:mt-[35px]!  py-[6px] md:pt-[60px] gap-[38px] max-[900px]:order-6 max-[900px]:min-h-0 max-[900px]:px-[2px]">
                <h3 className={styles.productTitle}>Mini Micro Foldable LED</h3>
                <p className={`${styles.productBody} ${styles.productBodyLoose}  mb-0!`}>
                  Famous at the school gates. Loved by kids. Trusted by parents. The Mini Micro Foldable LED is the
                  scooter that changed everything and it&apos;s now better than ever.
                </p>
                <p className={`${styles.productBody} ${styles.productBodyTight} text-[20px]!`}>
                  <strong>One-click folding system:</strong> carry it, store it, no stress
                </p>
                <p className={`${styles.productBody} ${styles.productBodyTight} text-[20px]!`}>
                  <strong>Battery-free light-up wheels:</strong> powered by kids, no charging required
                </p>
                <p className={`${styles.productBody} ${styles.productBodyTight} text-[20px]!`}>
                  <strong>Colour-pop anodised stem:</strong> bold, tough, and built to last
                </p>
                <p className={`${styles.productBody} ${styles.productBodyNoGap} text-[20px]!`}>
                  <strong>Extra-grippy silicone mouldings:</strong> stable feet, rain or shine
                </p>
                <p className={`${styles.productBody} ${styles.productBodyNoGap} text-[20px]!`}>
                   <strong>Adjustable handlebar:</strong> grows with them from age 2 – 5
                </p>
                <p className={`${styles.productBody} ${styles.productBodyNoGap} text-[20px]!`}>
                   <strong>Reinforced fibreglass footplate:</strong> flexible, tough, adventure-ready
                </p>
              </div>
              <div className="min-h-[600px] overflow-hidden max-[900px]:order-5 max-[900px]:mt-[35px]! max-[900px]:min-h-0">
                <img
                  src="/articles/6-tips-for-getting-out-and-about-with-baby/mini-micro-led.jpg"
                  alt="Mini Micro Foldable LED"
                  className="block h-full w-full object-cover max-[900px]:h-auto"
                />
              </div>
            </div>

            <p className={`${styles.ctaText} text-[22px]! mt-[60px]! max-[900px]:mb-[25px]!  max-[900px]:mt-[95px]!  `}>
              Discover the full range of toddler scooters at{" "}
              <a href="https://www.micro-scooters.co.uk/">Micro Scooters</a>.
            </p>
          </section>

          <div className="mt-[34px] text-center">
   <h1 className={`${styles.relatedTitle} text-[#3a3a3a]! text-[42px]! font-[430] mt-[70px]!`} >
              Related Articles
            </h1>
            <p className={`${styles.relatedText} mb-[14px] mt-[25px]!  md:mt-[10px]! text-[#3a3a3a]! text-[17px]! md:text-[22px]! text-center!`}>
              Some more articles you might enjoy...
            </p>       </div>
        
        </article>
       <div className="px-5 max-[900px]:px-2 mb-[80px]!">
       <RelatedArticlesCarousel items={relatedArticles} />

       </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
