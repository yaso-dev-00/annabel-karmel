import accordionStyles from '@/app/eggs-questions-answered/page.module.css';
import type { FoodCategoryItem } from '@/components/ArticleScreen/FoodCategoryAccordion';
import type { ArticleRecipeCarouselItem } from '@/components/SharedCarousels/ArticleRecipeCarousel';
import Link from 'next/link';
import { createElement, Fragment, type ReactNode } from 'react';

const SHARED = '/articles/food-allergy-vs-food-intolerance';

const eggAllergyIntro: ReactNode = createElement(
  Fragment,
  null,
  createElement(
    Link,
    { href: '/egg-allergy', className: accordionStyles.accordionInlineLink },
    'Egg allergy',
  ),
  ' is much more common in young children than in adults because most children with egg allergy will outgrow it. However, children with egg allergy are also as high risk of getting peanut and other allergies. These are important reasons why a child with a food allergy should be seen by a doctor experienced in childhood allergies.',
);

export const babyFoodAllergiesAccordion: FoodCategoryItem[] = [
  {
    title: 'Egg allergy',
    paragraphs: [
      eggAllergyIntro,
      'Egg allergy can be to all forms of egg (well-cooked, loosely cooked and raw) but many people with egg allergy can eat baked foods containing well-cooked egg without a problem. In fact, research has demonstrated that 70-80% of children with an egg allergy can eat cakes and biscuits containing egg. However, in those who are allergic even to well-cooked egg, the reactions can be severe. It is therefore essential that any child with an egg allergy is first tested and advised by an experienced doctor before foods (such as cakes and biscuits) containing egg are given to them. This may need to be done under direct medical supervision in the first instance.',
    ],
  },
  {
    title: 'Nut allergy',
    paragraphs: [
      'The advice on giving your child nuts early on has changed over the past few years. It used to be advised that if your child was allergic to peanuts that they should avoid nuts completely. However, there is concern that many children who do this may develop an allergy to nuts they were not allergic to as a result of avoiding them. Tree nuts e.g. cashew, pecan, walnuts, pistachio, almonds etc. are not related to peanuts but can cause reactions. Consult your doctor if your child is allergic to peanuts but he may well advise that you do give other nuts to your child. Remember that whole nuts should be avoided until 5 years of age.',
    ],
  },
  {
    title: 'Wheat allergy',
    paragraphs: [
      'Wheat allergy is an allergy reaction caused by wheat. It is uncommon and usually found in children who have eczema and other food allergies. It is usually outgrown in childhood.',
      'Coeliac disease is different to a wheat allergy as it is an auto immune disease triggered by the gluten in grains (wheat, rye, barley). Coeliac disease has a strong genetic component so often runs in families. Symptoms include chronic diarrhoea, tummy ache, faltering growth and smelly poo.',
      'Coeliac disease can be diagnosed by a blood test and endoscopy but you need to be have wheat in your diet when you have the test done so should always see your doctor before you cut it out entirely. Coeliac disease sufferers must avoid all gluten which can be hidden in food like soups, sauces, fish fingers, chicken nuggets and salad dressings.',
    ],
    subsections: [
      {
        heading:
          "Annabel Karmel's recommendations on what to substitute for wheat if you child is a Coeliac or has a gluten allergy.",
        listItems: [
          'You can substitute wheat free and gluten free flours for plain flour in many of my recipes. My advice however is that it is generally best to substitute where there is a low ratio of flour to other ingredients as then you are less reliant on gluten to hold the mixture together. Always grease and line cake tins well – gluten free baked products tend to be more fragile.',
          'Crushed cornflakes or Rice Krispies make a good coating for homemade fish fingers or chicken nuggets',
          'Rice flour, polenta, buckwheat flour and potato flour are all suitable for coeliacs',
          'Rice noodles make a good substitute to pasta',
          'Quinoa and rice are good to have instead of bread',
        ],
      },
    ],
  },
  {
    title: "Cow's milk allergy",
    paragraphs: [
      "Cow's milk allergy (CMA) is one of the most common childhood food allergies. It is estimated to affect between 2% and 7.5% of babies under one, though most children grow out of it by the age of five.",
      "CMA typically develops when cows' milk is first introduced to your baby's diet either in formula or when you start to wean your baby. More rarely, it can affect babies who are exclusively breastfeeding, because of cows' milk from the mother's diet passing on to the baby through breast milk.",
      "Cow's milk allergy can cause colic-like symptoms, eczema, wheezing, vomiting, diarrhoea, constipation, hives, and/or a stuffy, itchy nose. If your baby is sensitive to dairy in your diet, it will not help to switch to lactose-free dairy products.",
      'Occasionally CMA can cause severe allergic symptoms that come on suddenly, such as swelling in the mouth or throat, wheezing, cough, shortness of breath, and difficulty breathing. A severe allergic reaction or anaphylaxis is a medical emergency – call 999 or go immediately to your local hospital A&E department.',
      "If your baby is diagnosed with CMA, you'll be offered advice by your GP or an allergy specialist on how to manage their allergy. If you are breastfeeding treatment may involve removing all cows' milk from your diet.",
    ],
    subsections: [
      {
        heading: 'Milk substitute formulas',
        paragraphs: [
          "For the first year, ideally breast milk is given to infants but where this isn't possible, formula milk is given as ordinary cow's milk does not provide adequate iron and other nutrients. However infant formula is made from cow's milk so if your baby has a cow's milk allergy this means they will need a special formula.",
        ],
      },
      {
        heading: "Cow's milk substitute formulas for babies are:",
        listItems: [
          'Extensively hydrolysed formulas and amino acid based formulas which need to be prescribed by your GP.',
          "Partially hydrolysed formulas are available not on prescription where proteins are broken down to make them less allergenic but these are not suitable for children with cow's milk allergy.",
          'Soya based infant formula, which is not recommended to babies under 6 months',
          "In the first year, babies will need up to 600ml of hypoallergenic formula a day to meet their nutritional requirements. The Department of Health recommends giving a supplement of vitamin D and A to all children over 6 months who are given breast milk as their main milk source. Early diagnosis is important as these types of formulas don't taste good but the earlier you introduce them the more likely they are to be tolerated.",
        ],
      },
      {
        heading: 'Alternative milks for older children:',
        listItems: [
          'Non formula alternative milks like Oatly made from oats or Alpro milks made from foods like almonds, soya or coconut will not provide adequate nutrients under one year but can be used for older children, although calcium fortification is advised.',
          'Rice milk is not recommended for children under 4 ½ years old.',
          "Sheep or goat's milk is not recommended for cow's milk allergy as the proteins are very similar and are likely to cause the same reaction",
        ],
      },
    ],
  },
  {
    title: 'Honey allergy',
    paragraphs: [
      'It is extremely rare to be allergic to honey but there is advice to avoid honey during infancy, because of a small risk of infantile botulism that is caused from honey that is contaminated with a bacteria called Clostridium. Infant Botulism is an illness that can happen when a baby ingests bacteria that produce a toxin inside the body. The condition can be frightening because it can cause muscle weakness and breathing problems but is very rare.',
      'However a mother who is breastfeeding can eat honey, the spores are far too large to pass through her body and into breast milk.',
    ],
  },
];

export const babyFoodAllergiesBooks: ArticleRecipeCarouselItem[] = [
  {
    title: 'Complete Baby & Toddler Meal Planner',
    href: 'https://www.annabelkarmel.com/apps-books/new-complete-baby-toddler-meal-planner-25th-anniversary-edition/',
    image: `${SHARED}/book-meal-planner.png`,
  },
  {
    title: 'Weaning Made Simple',
    href: 'https://www.annabelkarmel.com/apps-books/weaning-made-simple/',
    image: `${SHARED}/book-weaning-made-simple.png`,
  },
  {
    title: 'Real Food Kids Will Love',
    href: 'https://www.annabelkarmel.com/apps-books/real-foods-kids-will-love/',
    image: `${SHARED}/book-real-food.png`,
  },
];
