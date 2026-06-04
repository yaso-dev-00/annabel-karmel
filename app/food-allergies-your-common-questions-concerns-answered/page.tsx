import { FallbackImage } from "@/components/fallback-image";
import { FoodAllergiesFaqAccordion, type FoodAllergiesFaqItem } from "@/components/food-allergies-faq-accordion";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { RelatedArticlesCarousel } from "@/components/related-articles-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getRelatedArticles } from "@/data/related-articles";
import styles from "./page.module.css";

const articlePath = "/articles/food-allergies-your-common-questions-concerns-answered";
const relatedArticles = getRelatedArticles("/food-allergies-your-common-questions-concerns-answered");

const relatedFallbacks = {
  allergyOverview: "/articles/introducing-allergenic-foods/hero.jpg",
  dairy: "/articles/dairy-free-diet-cows-milk-protein-allergy/why-dairy-free.jpg",
  expert: "/articles/allergies-with-professor-adam-fox/hero.jpg",
  toddler: "/articles/toddler-snack-time3/hero.jpg",
} as const;

const qaItems: FoodAllergiesFaqItem[] = [
  {
    question: "Why are there so many allergies now?",
    image: `${articlePath}/q1.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "The Hygienic hypothesis tries to explain this increased susceptibility. The quantity and variety of bacteria in our gut, also called microbiome, has decreased significantly. This means our immune systems is less stimulated, often leading to less tolerance and potential easier development of allergies. This is partly because pregnant and breastfeeding mothers have been encouraged to avoid certain foods, combined with a more recent inclination for disinfecting and over-cleanliness. Germs are good for our immune systems as they challenge and fortify them. There are many studies that show that children living in the countryside have less serious allergies than those in the city because of their exposure to germs and dirt.",
      "There has been a rise in milk allergies in the past ten years, but the good news is that there are lots of alternatives too.",
    ],
  },
  {
    question: "Are allergies genetic?",
    image: `${articlePath}/q2.jpg`,
    fallbackImage: relatedFallbacks.expert,
    paragraphs: [
      "Though we think there might be a genetic background, no gene has been found so far to show that specific allergies are inherited. However there is a good chance that your child may inherit an allergic tendency which means he could develop eczema or asthma or an allergy to something else. A tendency to get allergies and allergic problems such as hay fever, asthma and eczema is known as atopy. It is more common to be atopic if both parents have this tendency.",
    ],
  },
  {
    question:
      "What are the most common symptoms of food allergy, and how can I tell if it's a true allergy involving the immune system or simply an intolerance or skin irritation?",
    image: `${articlePath}/q3.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "If you understand that an allergic reaction starts at the point of contact, i.e. the lips, mouth and tongue, then you should look for symptoms arising there. They can either be one or a combination of signs like hives, swelling, vomiting and, in worst cases, breathing problems.",
      "What is called an intolerance is mainly related to abdominal problems, with bloating, tummy pain or diarrhoea.",
    ],
  },
  {
    question:
      "When should you introduce your child to potentially allergic foods? What is the best way to introduce nuts and egg for the first time to your baby?",
    image: `${articlePath}/q4.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "Though current recommendations point to 6 months of age, it is safe to introduce allergens from 4 months of age, as shown on the LEAP and EAT studies.",
      "The introduction of eggs is often done by offering a small piece of a well-cooked scrambled egg.",
      "The 'EAT study', which is often used as a guideline for introducing allergens, focused on 6 allergens: milk, peanut, sesame, fish, egg and wheat.",
      "Along with the \"LEAP study\", they found that 4-months is the optimum age to start introducing allergens and decrease the risk of developing an allergy later on – so the younger, the better.",
      "This applies even if your child has eczema.",
      "Regarding nuts, it should start with the tip of a teaspoon and increase steadily to 2 teaspoons.",
      "The ideal amount to introduce is 2 teaspoons of peanuts or tree nuts a week.",
      "I would advise against excluding foods that may contain traces as it will increase the likelihood of developing allergies/ intolerances through lack of exposure.",
      "You can then mix peanut butter with other foods like mashed banana or sweet potato puree.",
    ],
  },
  {
    question:
      "My Little one's allergies are getting worse as she's getting older, is this a sign she won't grow out of her allergy? And is there an increased risk of sibling having an allergy?",
    image: `${articlePath}/q5.jpg`,
    fallbackImage: relatedFallbacks.expert,
    paragraphs: [
      "If your little one's allergy is getting worse as she gets older, it is likely she won't outgrow it.",
      "If, however it looks like your child is outgrowing allergic reactions, it would be a good idea to introduce the allergen in question in a phased way via the 'egg ladder', i.e. introducing baked eggs as opposed to scrambled.",
      "An egg allergy increases the risk of a peanut allergy and vice versa, so take caution if you are noticing reactions.",
      "Likewise, if your child has asthma or eczema, it is more likely that they will have an allergy.",
      "Allergies are not genetic. If an older sibling has an allergy, there is no increased risk a younger will have it, as discussed in one of the BSACI guidelines. The only increased risk is if there is a family history of atopy, with a significant focus on eczema. However, some families are more prone to allergies, but as it stands, there is no gene found to prove that.",
    ],
  },
  {
    question:
      "What is the best way to test for allergies? Is the blood test better than a skin prick test to find out if there's a peanut allergy?",
    image: `${articlePath}/q6.jpg`,
    fallbackImage: relatedFallbacks.expert,
    paragraphs: [
      "I'm not in favour of blood tests except in particular situations.",
      "Studies show that blood tests on kids under 2 years of age bear a lot of false positives, leading to a pre-emptive exclusion of food groups that aren't necessary (and can counter-intuitively lead to developing allergies.)",
      "When analysing blood tests, I look for certain proteins in foods that a child is allergic to in order to have an understanding of the severity of the allergy and whether it can be outgrown.",
      "Therefore, the test we mostly use, which is fast and with a high degree of true positives, is skin prick tests.",
    ],
  },
  {
    question:
      "My child had a rash when eating scrambled eggs. Can I try eggs in baked goods? And is a soft-boiled better than a hard-boiled egg?",
    image: `${articlePath}/q7.jpg`,
    fallbackImage: relatedFallbacks.toddler,
    paragraphs: [
      "It depends on the rash. If it isn't hives, then try adding a small amount of egg into a baked good. This is much better than opting for a boiled egg or a more concentrated option.",
      "Annabel's Allergy feature on Baby & Toddler Recipe app is great for these moments as you can document the rash by uploading a picture and making an entry into the food diary, which you can then take to your consultant for a more informed and accurate diagnosis.",
      "If your child's reaction isn't so aggressive, then it's a good idea to try a small amount of egg cooked into a meatball, for example, or as a coating to a homemade chicken nugget to help increase tolerance. This follows the principle of the wheat matrix, as it decreases the allergy to the eggs when consumed in a wheat frame.",
      "The less cooked an egg, the less degraded the protein, which means it is more likely to provoke an allergic reaction. Therefore, the more cooked, the better, so a hard-boiled egg is less risky than a soft-boiled egg.",
    ],
  },
  {
    question: "My child has a dairy allergy which causes sleepless nights - how do you deal with it?",
    image: `${articlePath}/q8.jpg`,
    fallbackImage: relatedFallbacks.dairy,
    paragraphs: [
      "I understand the concern that introducing the milk ladder might cause problems and sleepless nights, but if you delay introducing potential allergens, it could cause even more problems in the long run.",
      "Although there is now a new 6-step ladder, I still prefer the original 12-step milk ladder as it offers a more gentle approach.",
      "Essentially you introduce dairy products slowly, so you start with a malted milk biscuit, then go to yoghurt and cheese and eventually graduate to cow's milk. It usually takes around 6 months to a year to get to the top of the ladder.",
      "Even though the 12-ladder seems like it will take longer, I find that it actually yields quicker results.",
      "I would also advise that you don't give your child a full portion when you start, but instead start slow and opt for an eighth or sixteenth of a portion.",
      "If your child has a mild reaction during the process, I would say that you can push through with minor symptoms with the guidance of a good doctor, but this is, of course, very dependent on how severe the reaction is.",
    ],
  },
  {
    question:
      "If a label says it may contain nuts - what risk does it hold as opposed to nuts being highlighted as an allergen contained in the product",
    image: `${articlePath}/q9.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "When it comes to food labelling, people seem to assume that different wording means different reactions, but that's not the case. Different wording and warnings mean exactly the same thing. I believe that a law should be enforced making \"may contain\" the universally used label, so consumers understand that there is the same risk level for all products with that label.",
    ],
  },
  {
    question:
      "There is a new method of introducing small amounts of peanut protein under medical supervision to those with a severe life-threatening allergy - what do you think of this?",
    image: `${articlePath}/q10.jpg`,
    fallbackImage: relatedFallbacks.expert,
    paragraphs: [
      "I think for high-risk children, it's a good method as cross-contamination poses a real danger. However, not every child is eligible for this approach, and there are many variables to take into account. Even those children that are able to follow this method have a 15% chance of anaphylaxis while escalating peanut introduction.",
      "Also, it is worth noting that this is a lifelong treatment, so once started must be continued every day, or the effects will be reversed.",
      "This method is well suited for someone with a monosensitised allergy, i.e. someone just allergic to peanuts as a risk of cross-contamination still exists with other nuts.",
    ],
  },
  {
    question: "If you have an allergy to both milk and eggs, do you do ladders at the same time?",
    image: `${articlePath}/q11.jpg`,
    fallbackImage: relatedFallbacks.dairy,
    paragraphs: [
      "It really depends on the risks involved. So, I wouldn't say that there should be a strict priority of one over the other. They carry similar risks as both ingredients exist in so many products. I would personally say to start with egg as it's the shortest ladder of the two. We also need to bear in mind that some foods in the milk ladder might need eggs, so it would make more sense to deal with the egg ladder first.",
    ],
  },
  {
    question: "If a child is allergic to cow's milk, what would you recommend post 12 months?",
    image: `${articlePath}/q12.jpg`,
    fallbackImage: relatedFallbacks.dairy,
    paragraphs: [
      "Soya milk is the best vegetable milk around. Oat milk would be my second choice, with my third being pea milk.",
    ],
  },
  {
    question: "How can you tell the difference between reflux and allergies?",
    image: `${articlePath}/q13.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "If reflux is associated with an allergy, then we're talking about non-IgE allergies, like a cow's milk protein allergy.",
      "If your child just has reflux, then it's not likely to be an allergy. However, if there are multiple existing symptoms, i.e. reflux, eczema, constipation and diarrhoea, then it's likely to be an allergy.",
      "If your baby passes blood in stool, then it's likely to be an allergy, not reflux.",
      "Allergy is at the point of contact, so if you eat or drink something and there's no immediate reaction, but there is a reaction in the gut later, then it could still be a delayed non-IgE type of reaction.",
      "If it's after 2-3 hours, it is unlikely to be an allergy, or if it is, it is a non-IgE allergy, which we cannot test for (as we can only test for IgE allergies.)",
      "If your child has a non-IgE allergy, an exclusion diet is the best way to discover what is the source of the reaction. If it is IgE, then a skin prick test is the best way to make a diagnosis.",
      "For non-IgE delayed reactions, the improvement of symptoms is so slow that often we only discover the source of the allergy when we try to reintroduce the food and the symptoms return.",
    ],
  },
  {
    question:
      "What is the longest length of time after eating a food and your baby has a delayed reaction, e.g., a facial rash, puffy eyes… and you can still relate this to a possible allergic reaction to that food? Could it be something that they ate 12 hours beforehand, or would the reaction only occur within a few hours?",
    image: `${articlePath}/q14.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "We aim for a maximum of 2 hours post-ingestion.",
      "But if there are swellings, vomits, hives and/or breathing problems after the 2 hours period, we would need to investigate.",
    ],
  },
  {
    question: "If a child is allergic to peanuts, should I avoid tree nuts like cashew nuts, pecans or walnuts?",
    image: `${articlePath}/q15.jpg`,
    fallbackImage: relatedFallbacks.allergyOverview,
    paragraphs: [
      "Not at all.",
      "Peanut is a legume, often called \"groundnut\", for that reason.",
      "All others are tree nuts, and their protein bears little to no similarity to peanut protein.",
    ],
  },
];

export default function FoodAllergiesCommonQuestionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <article className={`mx-auto mt-[20px] w-full max-w-[1200px] px-[8px] pb-[10px] pt-[16px] sm:px-[12px] md:mt-[40px] md:px-[14px] md:pt-[20px] ${styles.articleShell}`}>
          <p className={styles.intro}>
            Childhood food allergies are on the increase, so it&apos;s natural that you might be nervous about introducing potentially
            allergenic foods, such as eggs, peanuts, gluten, to your baby early on. Finding support for your child or for yourself can
            be quite challenging &amp; expensive, so we&apos;ve teamed up with Dr Jose Maia Costa, Paediatric allergy consultant, who has
            answered some of the most commonly asked question around food allergies in the article below.
          </p>

          <FallbackImage
            src={`${articlePath}/hero.jpg`}
            fallbackSrc={relatedFallbacks.allergyOverview}
            alt="Food allergy hero"
            className="mt-[40px] w-full"
          />

          <FoodAllergiesFaqAccordion items={qaItems} />

          <section className={`${styles.trackerSection} text-center`}>
            <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2 md:items-center">
              <div>
                <h2 className={styles.sectionTitle}>Track your child&apos;s Allergies with Annabel&apos;s Allergy Tracker</h2>
                <hr  className="text-[#cccccc] mt-[20px] "/>
                <p className={styles.body}>
                  Understandably, lots of families have concerns over allergies, particularly when first weaning. Annabel&apos;s helpful
                  Allergy Tracker tool on her best-selling recipe App will help you track and record any symptoms arising from eating
                  certain foods. Having this information in one place will be invaluable when sharing any concerns with your GP or doctor.
                </p>
                <p className={styles.body}>
                  To help further support families with allergies, Annabel&apos;s new and refreshed app includes even more free-from recipes
                  which are clearly signposted.
                </p>
               
              </div>
              <div>
                <FallbackImage
                  src={`${articlePath}/tracker.gif`}
                  fallbackSrc={relatedFallbacks.expert}
                  alt="Annabel allergy tracker app"
                  className="mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px]"
                />
              </div>
            </div>
            <a
                  href="https://apps.apple.com/gb/app/annabel-karmel/id409157308"
                  target="_blank"
                  rel="noopener"
                  className={`${styles.linkButton} mt-[20px] mx-auto`}
                >
                  Download Annabel&apos;s App Here
                </a>
          </section>

          <section className={styles.doctorSection}>
            <FallbackImage
              src={`${articlePath}/dr-jose.jpg`}
              fallbackSrc={relatedFallbacks.expert}
              alt="Dr Jose Costa"
              className={styles.doctorImage}
            />
            <h3 className={styles.doctorHeading}>Article contributed by Dr Jose Costa, paediatric allergy consultant</h3>
            <p className={styles.doctorBody}>
              <strong>Dr Jose Costa</strong> runs several allergy clinics focusing on the diagnosis and management of Food Allergy, Hayfever, Allergic Rhinitis, Chronic Spontaneous Urticaria and Angioedema, Eczema, Asthma and MCAS. He’s a member of the Royal College Of Paediatrics and Child Health and the British Society of Allergy and Clinical Immunology. His primary focus of interest in Allergy is in immunotherapy and desensitization.
            </p>
            <p className={styles.doctorBody}>
            José is the co-author of a study titled “Increase in Multiple Nut Reactivity with Increasing Age is Not an Artefact of Incomplete Allergy Testing”, which explored the introduction of nuts into an infant/child’s diet. This research found that not introducing nuts that children are not allergic to will increase their risk of developing allergy to those nuts later in life.
            </p>
            <p className={styles.doctorBody}>
              If you think your child might be suffering from an allergy, please don’t hesitate to get Dr Jose to book an initial allergy consultation so he can start to identify their symptoms and diagnose the issue.
            </p>
            <p className={styles.doctorBody}>
              For more information visit{" "}
              <a href="https://www.thechildrensallergy.co.uk/" target="_blank" rel="noopener" className={styles.link}>
                www.thechildrensallergy.co.uk
              </a>
            </p>
          </section>

     
     <div className="mt-[56px] text-center md:mt-[90px]">
     <h2 className={styles.relatedTitle}>Related Articles</h2>
     <p className={styles.relatedText}>Some more articles you might enjoy...</p>
   </div>
        </article>

        <div className="mb-[56px] px-[8px] sm:px-[12px] md:mb-[90px] md:px-[14px]">
          <RelatedArticlesCarousel items={relatedArticles} />
        </div>
        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
