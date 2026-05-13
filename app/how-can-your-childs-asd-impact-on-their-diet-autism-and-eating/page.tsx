import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const articlePath = "/articles/how-can-your-childs-asd-impact-on-their-diet-autism-and-eating";
const relatedArticles = getRelatedArticles("/how-can-your-childs-asd-impact-on-their-diet-autism-and-eating");

const foodActivities = [
  {
    title: "Discover New Foods",
    body:
      "It can take up to thirty attempts to like a new food. Try to expose your child to a new food each day. Ask them to help with baking and get messy! Or perhaps cut up some fruit, such as a banana, and let them feed it to you!",
    image: `${articlePath}/discover-new-foods.jpg`,
    alt: "Child trying salad with a fork",
    imageFirst: false,
  },
  {
    title: "Explore a Rainbow of Food Colours",
    body: "Ask your child to pick their favourite colour and visit a supermarket.",
    image: `${articlePath}/rainbow-food-colours.jpg`,
    body1:
      "Encourage them to choose a new food to try in that colour. It can be sweet or savoury. But remember, there's no pressure for them to eat that new food on day one. Initially, it's more about getting them used to the smell, texture, and appearance.",
    alt: "Colourful vegetables on a kitchen counter",
    imageFirst: true,
  },
  {
    title: "Imaginative Messy Play",
    body:
      "Messy Play is fantastic for introducing food in a non-pressured environment. Your child could play with cars in dry pasta and rice, make mountains with flour, or set up a teddy bear's picnic and add fruit to the teddies' plates.",
    image: `${articlePath}/messy-play.jpg`,
    alt: "Child playing with food and craft materials",
    imageFirst: false,
  },
  {
    title: "Divider Plates and Funky Cutters",
    body:
      "It's worth getting some fun divider plates, as children tend to like the idea of keeping new foods separate from their tried and tested favourites! There are also some great sandwich and vegetable cutters available online. These make food more fun and interesting for kids.",
    image: `${articlePath}/divider-plate.jpg`,
    alt: "Green divider plate on yellow background",
    imageFirst: true,
  },
  {
    title: "Edible Adventures",
    body:
      "Make the process of buying and cooking food an adventure. Plan a trip to a farmers' market. Let kids weigh and price fruit and vegetables. Once home, maybe try a blindfolded food challenge and a taste test. Also consider the process of eating, eat with chopsticks just for fun or choose a theme night and try a new cuisine.",
    image: `${articlePath}/edible-adventures.jpg`,
    alt: "Family eating together at a dining table",
    imageFirst: false,
  },
];

function TipText({ title, body, body1 }: { title: string; body: string; body1?: string }) {
  return (
    <div className="self-start mt-[20px]!">
      <h2 className={styles.tipTitle}>{title}</h2>
      <p className={`${styles.tipText} mt-[20px] first:mt-0`}>{body}</p>
      {body1 ? <p className={`${styles.tipText} mt-[20px]! first:mt-0`}>{body1}</p> : null}
    </div>
  );
}

export default function AutismAndEatingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className="mx-auto mt-[40px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[20px] md:px-[14px] md:pt-[28px]">
          <p className={styles.lead}>
            As a parent of a child with autism there are many challenges you may face. Supporting them socially, ensuring
            school are meeting their needs and educating others on how your child sees the world around them. One of the
            more unnerving challenges is around eating. As a parent/caregiver it is a basic need of ours to want to
            ensure our children are well fed and watered - its instinctive.
          </p>

          <p className={styles.body}>
            But what can we do when dinner time becomes a battleground? Many children with ASD struggle with eating and
            many will choose a restrictive diet, one that isn't always meeting their body's needs. How are parents do we
            navigate this? Helping our children grow, whilst considering their thoughts and feelings on food.
          </p>

          <div className="mt-[58px] flex justify-center">
            <img
              src={`${articlePath}/eating-salad.jpg`}
              alt="Child at a table with vegetables and salad"
              className={`${styles.media} max-w-[1060px]`}
            />
          </div>

          <p className={styles.body}>
            Firstly, we need to consider how their ASD changes the experience of eating for them. A prime cause of
            issues with food for children with ASD is the sensory experience eating presents. Try to think of a meal as a
            series of textures, sensations, smells and visuals. Then try to consider how it must feel if, due to sensory
            issues, certain textures are uncomfortable, smells unbearable and sensations painful. Therefore, we often see
            children selecting a bland diet, seemingly tasteless beige food - because the level of sensory output from
            the foods is small.
          </p>

          <p className={styles.body}>
            Second, the environment in which we eat can be an off-putting scenario for a child with autism. Consider the
            loud, unruly school canteen or a bustling restaurant. These places can be overwhelming for children with ASD
            and push them further away from wanting to eat. Also, consider the social element of eating. For someone with
            social communication issues, sitting down for a meal can be a worrisome event.
          </p>

          <p className={styles.body}>
            The visual experience of food can also be a challenge for children with ASD. We have all had experiences
            when a meal does not look appealing. Imagine how this must feel with someone with autism. Even down to finer
            details, changes in packaging design for example can be off putting.
          </p>

          <p className={styles.body}>
            Another issue for children with a restrictive diet can be the pain and discomfort it causes. Eating only one
            or two types of food and not getting a balanced diet can result in constipation, weight loss, or gain or
            sickness. This pain then reinforces a child's dislike of eating.
          </p>

          <p className={styles.body}>
            So, what can we do to support children with autism in eating a balanced diet? The SEN Expert has been working
            with Emma, a Children's Dietitian designing content to support parents in making supportive, healthy choices
            for their children. Here are some of her recommendations for activities that help your child form a more
            positive relationship with food.
          </p>

          <div className="md:mt-[76px] mt-[40px] grid grid-cols-1 gap-y-[44px]">
            {foodActivities.map((activity) =>
              activity.imageFirst ? (
                <section key={activity.title} className="grid grid-cols-1 items-center gap-x-[22px] gap-y-[24px] min-[900px]:grid-cols-2">
                  <img src={activity.image} alt={activity.alt} className={styles.media} />
                  <TipText title={activity.title} body={activity.body} body1={activity.body1} />
                </section>
              ) : (
                <section key={activity.title} className="grid grid-cols-1 items-center gap-x-[22px] gap-y-[24px] min-[900px]:grid-cols-2">
                  <TipText title={activity.title} body={activity.body} body1={activity.body1} />
                  <img src={activity.image} alt={activity.alt} className={styles.media} />
                </section>
              ),
            )}
          </div>

          <p className={styles.body}>
            So, what can parents do to get support for their child? Firstly, seek out the support of a dietician. They
            can look at whether your child's diet is providing all the nutrients they need. Give advice on supplements
            and give you practical advice on reducing your child's anxiety. If you would like to see a dietician, you
            have several options. You can request a referral from your GP or work with a private dietician. Emma from
            Dietitian with a Difference offers support to many families, her website{" "}
            <a href="http://www.dietitianwithadifference.co.uk/" target="_blank" rel="noopener" className={styles.link}>
              www.dietitianwithadifference.co.uk
            </a>{" "}
            is a great place to start.
          </p>

          <section className="mt-[66px] grid grid-cols-1 items-start gap-x-[22px] gap-y-[28px] min-[900px]:grid-cols-[390px_1fr]">
            <img src={`${articlePath}/sen-expert.jpg`} alt="The SEN Expert portrait" className={styles.media} />
            <div className="pt-[6px]">
              <p className={styles.expertText}>
                The SEN Expert is a Special Educational Needs consultancy service with a difference. We offer support
                for families, children, and schools to navigate the complex world of SEN.
              </p>
              <p className={`${styles.expertText} mt-[34px]!`}>
                Check out our full list of services at our website{" "}
                <a href="http://www.thesenexpert.co.uk" target="_blank" rel="noopener" className={styles.link}>
                  www.thesenexpert.co.uk
                </a>{" "}
                or follow us on Instagram @senexpert for daily advice on special educational needs.
              </p>
            </div>
          </section>

         

          <div className="mt-[90px] text-center">
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <p className={styles.relatedText}>Some more articles you might enjoy...</p>
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
