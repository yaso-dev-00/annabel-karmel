import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { RelatedArticlesCarousel } from "@/components/SharedCarousels/RelatedArticlesCarousel";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const relatedArticles = getRelatedArticles("/pedal-power");

export default function PedalPowerPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto w-full max-w-[1200px] px-[8px] pb-[14px] pt-[22px] md:px-[14px] md:pt-[30px]">
          <h1 className={`${styles.title} text-center`}>Pedal Power!</h1>
          <p className={`${styles.kicker} mt-[30px]! text-center`}>8 amazing benefits of kids riding bikes</p>
          <p className={`${styles.partner}  text-center`}>
            In partnership with{" "}
            <a href="https://www.frogbikes.com/en_GB/" className="underline" style={{textDecoration:"underline"}}>
              Frog Bikes
            </a>
          </p>

          <p className={`${styles.bodyText} mt-[60px]!  text-center`}>
            Just like a healthy, balanced diet, riding a bike can play a vital role in a child&apos;s development.
            Exploring the world on two wheels is a game-changer for kids, and we hitched a ride with{" "}
            <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/">Frog Bikes</a> to find out why!
          </p>
          <p className={`${styles.bodyText} text-center mb-[50px]!`}>
            From boosting physical health to building social skills, riding a bike helps children grow in ways that go
            far beyond the handlebars.
          </p>

          <a href="https://www.frogbikes.com/en_GB/">
            <img src="/articles/pedal-power/hero.jpg" alt="Kids balance bikes" className="w-full" />
          </a>

          <h2 className={`${styles.sectionTitle} mt-[50px]!`}>1. Growing stronger and healthier</h2>
          <p className={styles.bodyText}>
            Riding a bike is an excellent form of cardiovascular exercise. It helps improve endurance, strengthen
            muscles, and promote overall fitness. Regular cycling can improve heart health and help your little
            adventurer maintain a healthy weight by burning calories and increasing metabolism.
          </p>

          <h2 className={`${styles.sectionTitle} `}>2. Helps balance and coordination</h2>
          <p className={styles.bodyText}>
            Cycling requires kids to balance on two wheels while steering and pedalling. These actions promote better
            coordination and body awareness. From toddler{" "}
            <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/balance-bikes.html">balance bikes</a> to adventures with{" "}
            <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/first-pedal-bikes.html">pedals</a>, taking to two wheels
            helps improve their ability to perform other physical activities.
          </p>

          <h2 className={`${styles.sectionTitle}`}>3. Boosts mental health</h2>
          <p className={styles.bodyText}>
            Like most exercise, cycling releases endorphins, which are natural mood boosters. For kids, riding a bike
            can be an effective way to release pent-up energy and emotions, leaving them feeling more relaxed and
            happier. Helmets at the ready!
          </p>

          <h2 className={`${styles.sectionTitle}`}>4. Sparks independence</h2>
          <p className={styles.bodyText}>
            When children learn to ride bikes, they gain a sense of independence and accomplishment. From mastering a{" "}
            <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/balance-bikes.html">balance bike</a>, to showing those{" "}
            <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/first-pedal-bikes.html">pedals</a> {" "}  who&apos;s boss, exploring
            their world on wheels helps boost self-esteem and confidence.
          </p>

          <a href="https://www.frogbikes.com/en_GB/">
            <img
              src="/articles/pedal-power/benefit-family-ride.jpg"
              alt="Family cycling together"
              className="mt-[50px] w-full"
            />
          </a>

          <h2 className={`${styles.sectionTitle}`}>5. Bonding over bikes</h2>
          <p className={styles.bodyText}>
            Just like eating together, riding bikes with friends and family helps kids learn how to communicate and
            share experiences. It&apos;s also a great way to make memories and build bonds with friends.
          </p>

          <h2 className={`${styles.sectionTitle}`}>6. Increases focus and concentration</h2>
          <p className={styles.bodyText}>
            Watching the road, avoiding obstacles, planning routes...these all require concentration and focus. By
            consistently riding, children can transfer these skills to other activities, including learning, and
            following other directions.
          </p>

          <a href="https://www.frogbikes.com/en_GB/">
            <img
              src="/articles/pedal-power/benefit-focus-ride.jpg"
              alt="Child riding bike on trail"
              className="mt-[50px] w-full"
            />
          </a>

          <h2 className={`${styles.sectionTitle}`}>7. Builds environmental awareness</h2>
          <p className={styles.bodyText}>
            By riding a bike, children can develop a greater appreciation for the environment. Zooming to pre-school
            on a <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/balance-bikes.html">balance bike</a> and playdates
            powered by <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/first-pedal-bikes.html">pedals</a> also bring
            kids closer to nature. <a href="https://www.frogbikes.com/en_GB/">Frog Bikes</a> are also designed for
            life, meaning they can be handed down again and again to reduce waste.
          </p>

          <h2 className={`${styles.sectionTitle}`}>8. Boosts brain power!</h2>
          <p className={styles.bodyText}>
            It is widely acknowledged that cycling can enhance brain development by engaging motor skills, spatial
            awareness, and memory. Kids who cycle regularly may experience improved cognitive abilities, such as
            problem-solving and creative thinking.
          </p>

          <section className="mt-[40px]  px-[8px] py-[20px]" style={{background:"rgb(219, 238, 242)"}}>
            <div className="flex justify-center">
              <img src="/articles/pedal-power/annabel-loves.png" alt="Annabel Loves" className="h-auto w-[180px]" />
            </div>
            <p className={`${styles.bodyText} mt-[16px]! text-center`}>
              Here are Annabel&apos;s top picks from{" "}
              <a href="https://www.frogbikes.com/en_GB/" className="underline" style={{textDecoration:"underline"}}>
                Frog Bikes
              </a>
              .
            </p>

            <div className="mt-[60px] grid grid-cols-2 gap-[10px] max-[900px]:grid-cols-1">
              <a href="https://www.frogbikes.com/en_GB/tadpole-mini.html">
                <img src="/articles/pedal-power/tadpole-mini.jpg" alt="Tadpole Mini bike" className="w-full" />
              </a>
              <div className="flex flex-col items-center max-[900px]:mt-[40px]! justify-center px-[10px] text-center">
                <h3 className={styles.pickTitle}>Tadpole Mini</h3>
                <p className={`${styles.bodyText} mt-[12px]! text-center`}>
                  The smallest of the <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/balance-bikes.html">Tadpole trio</a>,
                  this brilliant <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/tadpole-mini.html">balance bike</a> is ideal
                  from 18 months to 2 years. Attention to detail is second to none on this bike; easy step through,
                  adjustable seat, lightweight for ease of control, and designed to limit sharp turns. Mini explorers
                  will have a blast and build lifelong skills along the way.
                </p>
              </div>
            </div>

            <div className="mt-[20px] grid grid-cols-2 max-[900px]:mt-[50px]!  gap-[10px] max-[900px]:grid-cols-1">
            <div className="flex flex-col items-center max-[900px]:mt-[40px]! order-1 max-[900px]:order-2 justify-center px-[10px] text-center">
            <h3 className={styles.pickTitle}>First Pedal Bikes</h3>
                <p className={`${styles.bodyText} mt-[12px]! text-center`}>
                  Frog&apos;s{" "}
                  <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/first-pedal-bikes.html">first starter bikes</a> are
                  ideal from 3 years and perfect for transitioning from a balance bike to pedals. Lightweight, and
                  specially designed with adjustable components, they make for the comfiest ride as little explorers
                  build their confidence on two wheels.
                </p>
              </div>
              <a className="order-2 max-[900px]:order-1 max-[900px]:mt-[40px]!" href="https://www.frogbikes.com/en_GB/bikes/first-pedal-bikes.html">
                <img src="/articles/pedal-power/first-pedal-bikes.jpg" alt="First pedal bikes lifestyle" className="w-full" />
              </a>
            </div>

            {/* <div className="mt-[12px] grid grid-cols-2 gap-[10px] max-[900px]:grid-cols-1">
              <div className="px-[6px] text-center">
               
              </div>
              <div />
            </div> */}

            <div className="mt-[20px] grid grid-cols-2 items-center gap-[10px] max-[900px]:mt-[50px]! max-[900px]:grid-cols-1">
              <a href="https://www.frogbikes.com/en_GB/bikes/city-bikes.html">
                <img src="/articles/pedal-power/city-bike.jpg" alt="City bike" className="w-full" />
              </a>
              <div className="px-[10px] max-[900px]:mt-[40px]! text-center">
                <h3 className={styles.pickTitle}>City Bike</h3>
                <p className={`${styles.bodyText} mt-[12px]! text-center`}>
                  Rollin&apos; to the school gates doesn&apos;t get cooler than this. The{" "}
                  <a style={{textDecoration:"underline"}} href="https://www.frogbikes.com/en_GB/bikes/city-bikes.html">City</a>, in a range of bright
                  signature Frog colours, is stylish and practical. Super lightweight, easy to control and geared-up
                  for comfort, this bike is designed for everyday explorers - and built to last.
                </p>
              </div>
            </div>
          </section>

          <p className={`${styles.cta} mt-[50px]! text-center`}>
            Discover the best{" "}
            <a href="https://www.frogbikes.com/en_GB/" className="underline hover:text-[#e98c9a]! " style={{textDecoration:"underline"}}>
              Frog Bike
            </a>{" "}
            for your little explorer.
          </p>

          <div className="mt-[70px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
          </div>
        </article>
        <div className="mb-[80px]! px-[10px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
