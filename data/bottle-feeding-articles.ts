import type { BreastfeedingArticle } from '@/components/ArticleScreen/BreastfeedingArticlePage';

/**
 * Content for every article under
 * annabelkarmel.com/advice-category/bottle-feeding-tips/
 * Keyed by the local route slug (`/advice/<slug>`).
 */
export const bottleFeedingArticles: Record<string, BreastfeedingArticle> = {
  'paced-bottle-feeding': {
    metaTitle:
      'Paced Bottle Feeding | Formula | Breast | Milk | Annabel Karmel',
    metaDescription:
      'Whether you are fully bottle feeding formula milk or breastmilk, it is always important to know how to do it in a baby-friendly manner.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'What is Paced Bottle Feeding? Whether you are fully bottle feeding formula milk or breastmilk, it is always important to know how to do it in a baby-friendly manner so your baby can learn how to gain control over the feed as well as avoiding overfeeding.',
        ],
      },
      {
        type: 'paragraph',
        bold: true,
        content: ['Here are my useful tips:'],
      },
      {
        type: 'list',
        items: [
          'Paced bottle feeding is an important method to practice when offering the bottle. Not only does it avoid overfeeding it also helps the baby digest the milk and signals when the baby is full. Much like on the breast, it makes it a bit harder for babies to drink. So you are really pacing the amount baby will get which makes this very breastfeeding friendly.',
          "The mechanisms on the baby's mouth are different when bottle feeding and breastfeeding, so making sure to take it steady to feed the bottle in a more upright position. It will help the baby not to get lazy on the breast after.",
          'Start off by nursing baby in an upright position, offering a bottle that has a slow flow teat \u2013 you do not need to buy different flowing teats for growing babies. This is more a marketing campaign than anything. The flow of your milk from the breast is always the same so the rest should also stay as a slow flow option.',
          'If you pick up certain signs, for example, nose crinkles, hands splay or get tense, eyes widen or the swallowing motions change, offer a little pause during the feed.',
          'Just simply lean baby forwards a little with the bottle in the mouth and allow a little time for the milk to go down and for baby to relax again. Restart the feed slowly again.',
          'You could also remove the bottle gently and let the baby indicate if more is needed.',
          "Taking a little break gives time for signals in the stomach to tell the brain if it is truly full, just like when you eat a meal. Taking breaks is natural for the baby much like feeding on the breast. And like this, you are really feeding to baby's appetite and won't be overfeeding.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          '. Visit ',
          {
            text: '@milkmakingmama',
            href: 'https://www.instagram.com/milkmakingmama/',
          },
          ' for more advice and support.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Also read this interesting article on ',
          {
            text: 'Responsive Bottle Feeding',
            href: '/advice/responsive-bottle-feeding',
          },
          '.',
        ],
      },
    ],
  },

  'responsive-bottle-feeding': {
    metaTitle:
      'Responsive Bottle Feeding | Bottle Feeding Tips | Annabel Karmel',
    metaDescription:
      'Whether the bottle you are giving your baby contains formula milk or breastmilk, bottle feeding is still a big opportunity to bond with your baby.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          "Whether the bottle you are giving your baby contains formula milk or breastmilk, bottle feeding is still a big opportunity to bond with your baby. And that's why responsive feeding is very important.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          "This includes giving baby the chance to take breaks, to see if baby might be finished with a feed. It's about reading subtle cues like spraying of the fingers and hands, sucking becoming less rhythmical, slowing down in the suck frequency, more movement and baby generally getting wrigglier.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Reading such cues will help pace a feed (see my info on ',
          {
            text: 'paced bottle feeding',
            href: '/advice/paced-bottle-feeding',
          },
          ' and how it is done). Paced feeding is crucial when it comes to the amounts that baby is taking in. It is most certainly possible to overfeed a bottle-fed baby so making sure you offer the bottle in a paced style (more angled down) to make it harder for baby on the bottle and for baby to naturally indicate breaks is key.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          "Responsive bottle feeding also includes the emotional aspect of feeding a child. Regardless of how a baby is fed, it's a time to bond, to cuddle, to be close. It's a special time, so make it count; sit in that favourite nursing chair or comfy spot on the couch, or sing a lullaby for the time you bottle feed.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          "Really watch baby. Get to know gentle feeding cues and when it's time to have a break and let baby indicate if more is needed. Find your own routine and groove with baby.",
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'how-to-sterilise-bottles': {
    metaTitle:
      'How to sterilise bottles | Bottle Feeding Tips | Annabel Karmel',
    metaDescription:
      "There are several ways in which you can sterilise your baby's feeding equipment, such as using a cold-water sterilising solution, steam sterilising, or sterilising by boiling.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          "There are several ways in which you can sterilise your baby's feeding equipment, such as:",
        ],
      },
      {
        type: 'list',
        items: [
          'Using a cold-water sterilising solution.',
          'Steam sterilising.',
          'Sterilising by boiling.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'The following instructions apply to all feeding equipment you use for your baby \u2013 whether you are using expressed breast milk or infant formula. Remember to first wash your hands well with soap and water and clean the work surfaces with hot soapy water.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Before sterilising, always clean and rinse. Clean the feeding bottle and teat in hot, soapy water as soon as possible after a feed, using a clean bottle brush. Then rinse all your equipment in clean, cold running water before sterilising.',
        ],
      },
      {
        type: 'paragraph',
        bold: true,
        content: ['Remember\u2026'],
      },
      {
        type: 'paragraph',
        content: [
          'All feeding items must be thoroughly washed and rinsed before they are sterilised. Dishwashers will clean bottle feeding equipment but will not sterilise it. This is because temperatures reached in a dishwasher are not high enough for sterilisation, so you need to both clean and sterilise the bottles.',
        ],
      },
      {
        type: 'image',
        src: '/articles/how-to-sterilise-bottles/sterilising-bottles.jpg',
        alt: 'Baby bottles and teats being sterilised',
      },
      { type: 'heading', text: 'Cold-water sterilising solution' },
      {
        type: 'list',
        items: [
          "Follow the manufacturer's instructions.",
          'Change the sterilising solution every 24 hours.',
          'Leave feeding equipment in the sterilising solution for at least 30 minutes.',
          'Make sure that there is no air trapped in the bottles or teats when putting them in the sterilising solution.',
          'Keep all the equipment under the solution with a floating cover.',
        ],
      },
      {
        type: 'heading',
        text: 'Steam sterilising (electric steriliser or microwave)',
      },
      {
        type: 'list',
        items: [
          "As there are different types of steriliser it is important to follow the manufacturer's instructions.",
          'Make sure the openings of the bottles and teats are facing down in the steriliser.',
          'Manufacturers will give a guide as to how long you can leave equipment that you are not using straight after sterilising before it needs to be re-sterilised.',
        ],
      },
      { type: 'heading', text: 'Sterilising by boiling' },
      {
        type: 'list',
        items: [
          'When you use this method, you must take care to ensure safety and prevent scalds or burns. Never leave hot pans and liquids unattended, especially if children are present.',
          'Make sure that whatever you sterilise in this way is safe to boil.',
          'Boil the feeding equipment in water for at least 10 minutes, making sure that all items stay under the surface of the water.',
          'Remember that teats tend to get damaged faster with this method.',
          'Wash hands thoroughly. Clean and disinfect the surface where you will put together the bottle and teat.',
          'It is best to remove the bottles just before they are used.',
          'If you are not using the bottles immediately, put them together fully with the teat and lid in place to prevent the inside of the sterilised bottle and the inside and outside of the teat from being contaminated.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Visit ',
          {
            text: '@littlepeachlondon',
            href: 'https://www.instagram.com/littlepeachlondon/',
          },
          ' for more advice and support.',
        ],
      },
    ],
  },

  'different-infant-formula-milks': {
    metaTitle:
      'The different infant formula milks | Bottle Feeding Tips | Annabel Karmel',
    metaDescription:
      'We know that breastfeeding exclusively for the first six months of life is the best way you can feed your baby, however not all mothers can breastfeed, and some choose not to.',
    blocks: [
      {
        type: 'paragraph',
        bold: true,
        content: [
          'We know that breastfeeding exclusively for the first six months of life is the best way you can feed your baby, however not all mothers can breastfeed, and some choose not to. When this is the case infant formulas are available, but it can be a minefield trying to understand which one is best for your baby.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'This article aims to help you make an informed decision on choosing the right formula for your baby by interpreting the science behind infant formula. Despite over 100 years of research scientists have still not been able to identify all the components found in breast milk, therefore, infant formula companies cannot replicate breast milk exactly. There is not one infant formula that is closest to breast milk than any of the others, as well as breast milk being uniquely nutritionally matched to the baby it contains beneficial immune system defences called antibodies that are harmonised between the mother and her child.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'All infant formula milk is made up of a balance of proteins, fats, carbohydrates, vitamins and minerals. There are strict regulations in place that must be followed by all formula manufacturers to ensure that the nutritional profile of infant milks are similar and meet certain standards. Almost all infant formula milks are based on cows milk protein, goats milk and soya protein are also occasionally used too.',
        ],
      },
      { type: 'heading', text: 'First Stage & Second Stage Infant Formula' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/first-stage.jpg',
        alt: 'First stage and second stage infant formula',
      },
      {
        type: 'paragraph',
        content: [
          "First stage infant formula and second stage infant formula are nutritionally the same. The difference between them is the type of protein that is used. First stage infant milk\u2018s are predominately whey protein and second stage infant milks \u2013 marketed for hungrier babies, contain more casein protein. Casein takes longer to digest because it forms a thicker curd in the stomach making babies feel fuller for longer. It won't give a hungrier baby any more nutrition at all, and in fact, a baby who appears hungrier, demanding feeds more often or cluster feeds often needs more nutrients for her developmental stage. Whey based, first stage infant formula is the preferred alternative to breastmilk during the whole of your baby's first year.",
        ],
      },
      { type: 'heading', text: 'Goats Milk-Based Infant Formula' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/goats-milk.jpg',
        alt: 'Goats milk-based infant formula',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'Goats milk based infant formula', bold: true },
          ' is increasing in popularity, however nutritionally it is no more superior to standard first stage infant milks based on cows milk. Some parents think that using a goats milk formula will reduce the incidence of milk allergy. However this is not the case, both cows milk and goats milk have the same allergenicity. Goats milk protein is not easier to digest either.',
        ],
      },
      { type: 'heading', text: 'Anti-reflux or Anti-Regurgitation Formulas' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/anti-reflux.jpg',
        alt: 'Anti-reflux or anti-regurgitation formulas',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'Anti-reflux or anti-regurgitation formula', bold: true },
          "s are also available. Parents often try these if their baby frequently posits after a feed or they suspect reflux. However, it is important to note that bringing up a small amount of milk after each feed is quite normal as it can take a few months for the ring of muscles at the bottom of your baby's food pipe (called the lower oesophageal sphincter) to fully form. Sometimes just reducing the volume of feed and feeding little more often it's all it takes to reduce positing.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          'These types of infant formula should be used with caution. Did you know that you make these milks up with cooler water rather than the hot water required for standard formula? This means that any harmful bacteria residing in the formula is not eradicated as it would be when making up standard infant formula. Babies are at greater risk of food poisoning bacteria. In addition, anti-reflux formula contain cereal-based thickeners yet cereals should be avoided until your baby is over six months of age. Seek advice from your health visitor or GP or ask for a referral to a Registered Dietitian if you are thinking about trying one of these.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          "If your baby is very uncomfortable after feeds, is crying and arching her back and generally experiencing discomfort, it's important to go and see your GP. More often than not this isn't reflux and other conditions should be explored. In my experience the anti-reflux or anti-regurgitation milks do not work in the majority of babies, true reflux needs medication in order to manage it.",
        ],
      },
      { type: 'heading', text: 'Comfort Milk for Colicky Babies' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/comfort-milk.jpg',
        alt: 'Comfort milk for colicky babies',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'Comfort milk', bold: true },
          " is also available and is promoted for helping babies who are unsettled and colicky. Some manufacturers also say that comfort milks help with wind, colic or constipation. However, there is no research evidence to show that these milks reduce symptoms. Moreover, it is very common for babies to have colic during the first few weeks of life. Babies cry a lot (especially before 3 months of age) and need a lot of attention, cuddling and soothing, and quite often more so in the evenings! What does help is smaller, more frequent feeds with more frequent winding and burping during and after feeds to bring up trapped wind. Colic very often improves as your baby gets older, it's best for your baby to continue on first stage infant formulas even if they do have these symptoms.",
        ],
      },
      { type: 'heading', text: 'Soya Based Instant Formulas' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/soya.jpg',
        alt: 'Soya based infant formulas',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'Soya based infant formulas', bold: true },
          ' are also available however these are not suitable for babies under six months of age unless your baby has a rare inherited metabolic disorder called galactosaemia. This is because Soya is rich in Phyto-oestrogens which mimic sex hormones in the body. There is a theory that this may impact on the development of the sexual organs in boys, and until further research is available the recommendation is for soya to be avoided in very young babies. The carbohydrate in soya infant formula is glucose which is also damaging to emerging teeth.',
        ],
      },
      { type: 'heading', text: 'Allergen Free Formula Milks' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/allergen-free.jpg',
        alt: 'Allergen free formula milks',
      },
      {
        type: 'paragraph',
        content: [
          'Another type of infant formula available are ',
          { text: "lactose-free milk's.", bold: true },
          ' These should never be used unless under medical supervision. It is very rare for a baby to have true lactose intolerance, and still rare but slightly more common is cows milk protein allergy which is a very serious condition and a lactose-free formula will not successfully treat it. If your baby has symptoms of diarrhoea, vomiting, or signs of an allergic reaction such as eczema, a rash, red bumpy skin, facial swelling or breathing difficulties seek medical help for a proper diagnosis.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          "Diarrhoea can also be a sign of a tummy bug or infection. Sometimes babies develop transient lactose intolerance after a tummy bug. However, this is usually short-term and your GP or dietitian would advise you on when to re-introduce lactose. Lactose-free infant formula contains a different type of carbohydrate which is more damaging to your babies emerging teeth, therefore it's really important that these formulas are used under supervision.",
        ],
      },
      { type: 'heading', text: 'Cows Milk Allergy' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/cows-milk-allergy.jpg',
        alt: "Cow's milk allergy",
      },
      {
        type: 'paragraph',
        content: [
          'Formula to treat ',
          { text: 'cows milk protein allergy', bold: true },
          " are also available however these are only available on prescription from your GP. If you suspect your baby has a cows milk protein allergy, see your doctor for a formal diagnosis. your doctor will refer you immediately to a Registered Dietitian in order to commence a 'hydrolysed' formula and advise you on a cows milk protein-free weaning diet. It is essential you do this with the support of a Dietitian as cutting out dairy can have a detrimental effect on your babies growth and development.",
        ],
      },
      {
        type: 'heading',
        text: 'Protecting Your Baby from Eczema and Allergies',
      },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/eczema-allergies.jpg',
        alt: 'Protecting your baby from eczema and allergies',
      },
      {
        type: 'paragraph',
        content: [
          'There are also formula milks on the market that suggest they may protect your baby from developing ',
          { text: 'eczema and allergies', bold: true },
          ' should you have a family history. However, none of these has enough research evidence behind them to back up their claims. There is a lot of evidence that breastfeeding is the best way to protect your baby from developing an allergy.',
        ],
      },
      { type: 'heading', text: 'Vegetarian or Vegan Formula' },
      {
        type: 'image',
        src: '/articles/different-infant-formula-milks/vegetarian-vegan.jpg',
        alt: 'Vegetarian or vegan formula',
      },
      {
        type: 'paragraph',
        content: [
          'If you are ',
          { text: 'vegetarian or vegan', bold: true },
          " there is a very limited choice in terms of infant formula. Many have essential fatty acid derived from fish oils and animal rennet added to their infant formula. Vitamin D is added to all formula but is sourced from sheep's wool so there are no vegan infant formulas available at present.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          "The recommendation for those who want to bring up their baby vegan is for mothers to breastfeed for at least the first year of life then alternative plant-based milks can be introduced into the diet under the supervision of a Dietitian. Plant-based milks are extremely low in nutritional value so shouldn't be used unless under dietetic supervision.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          'For more information click here to visit ',
          {
            text: "Sarah Almond Bushell's website",
            href: 'https://www.thechildrensnutritionist.co.uk/',
          },
        ],
      },
    ],
  },

  'formula-milk': {
    metaTitle: 'Choosing & preparing formula milk | Annabel Karmel',
    metaDescription:
      'There are circumstances where it is not possible to breastfeed and although not as subtle or bespoke in composition formula milk provides an alternative that can keep mum and baby happy.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'There are circumstances where it is not possible to breastfeed and although not as subtle or bespoke in composition formula milk provides an alternative that can keep mum and baby happy.',
        ],
      },
      { type: 'heading', text: 'Choosing a formula' },
      {
        type: 'image',
        src: '/articles/formula-milk/choosing-a-formula.jpg',
        alt: 'Choosing a formula milk',
      },
      {
        type: 'paragraph',
        content: [
          'Most formulas are based on modified cows milk. Special varieties are available for premature babies as their digestive systems would be too immature to break down standard formula milk.',
        ],
      },
      { type: 'divider', src: '/articles/formula-milk/divider-blue.png' },
      { type: 'subheading', text: 'Cow\u2019s milk' },
      {
        type: 'paragraph',
        content: [
          'Little Miss Muffet taught us that milk is made of two proteins; curds (the lumpy bit) and whey (the watery bit). The curds to whey ratio varies according to the type of formula but most first milks are predominantly whey while \u2018hungry baby\u2019 milks favour curds.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Your baby will get all the nutrients they need from the standard \u2018first milk\u2019. \u2018Hungry baby milk\u2019 is intended to keep tummies fuller for longer, which means longer between feeds, however it is harder to digest and not always suitable for small babies and there is no need to change from one to the other if you don\u2019t want to.',
        ],
      },
      { type: 'divider', src: '/articles/formula-milk/divider-blue.png' },
      { type: 'subheading', text: 'Goat\u2019s milk' },
      {
        type: 'paragraph',
        content: [
          'While this provides an alternative to cow\u2019s milk based formulas it is not suitable for babies who are allergic to the protein in cow\u2019s milk, because they are so similar that the reaction, potentially anaphylaxis, could be the same for both.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'If your baby gets on well with goats milk formula, they can progress on to goat\u2019s milk when they are a year. However, it is lower in nutrients than cow\u2019s milk and not recommended as the primary drink. It is fine to use in recipes from six months when your baby has started solids.',
        ],
      },
      { type: 'divider', src: '/articles/formula-milk/divider-blue.png' },
      { type: 'subheading', text: 'Hydrolysed-protein' },
      {
        type: 'paragraph',
        content: [
          'This is only available on prescription for babies who have an allergy or intolerance to cow\u2019s milk. Allergy and intolerance are not the same; an allergy relates to the protein in the milk while intolerance relates to the lactose or sugar.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'This milk has the same nutritional value as normal formula milk but are usually lactose free and the protein has been hydrolysed (broken down) so that it can be digested by babies with allergies. Talk to your doctor if you are concerned that your baby has an allergy.',
        ],
      },
      { type: 'divider', src: '/articles/formula-milk/divider-blue.png' },
      { type: 'subheading', text: 'Soya-based' },
      {
        type: 'paragraph',
        content: [
          'As the name suggests, a soya bean based formula that has been supplemented with nutrients, vitamins and minerals. Speak to a medical professional if you would like to try this formula. They are not recommended for babies under six months, and if you do choose them for your growing baby, keep a close eye on their teeth because they are often sweetened.',
        ],
      },
      { type: 'heading', text: 'Preparing formula' },
      {
        type: 'image',
        src: '/articles/formula-milk/preparing-formula.jpg',
        alt: 'Preparing formula milk',
      },
      {
        type: 'paragraph',
        content: [
          'Preparation areas need to be clean and you will need to follow the guidelines on your chosen formula to ensure that you make it up in the correct ratio. If you use a knife to level the formula in a scoop the knife must be sterilized. You will also need to sterilize bottles and teats after each feed.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'It is best to make formula as you need it using boiled water that has cooled to around 70c. This ensures that the water is still hot enough to kill off any potential bacteria that may be in the powder. Ready-made formula is more expensive but convenient and useful when you are on the go. However, the composition of ready-made formulas are slightly different to their powdered counterparts, so keep a watch on your baby to ensure that they are happy with it.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'To feed your baby, hug them close into your body so that they are fairly upright and their head is well supported. Hold the bottle at a fairly horizontal position, ensuring that there is no air in the teat whilst your baby is feeding. Give your baby regular pauses for a few moments around every 30 seconds by lowering the bottle down (and therefore stopping the flow) or taking it out of their mouth. This will help them to pace their feed and have time to register when they are full. We all know how it feels to gobble down a huge meal too quickly!',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'As formula milk is harder for babies to digest than breast milk it stays in their stomachs longer so they do tend to go a little longer between feeds, but your baby still needs to be fed little and often. Your newborn is likely to drink about 50ml (1 to 2 fl oz) every couple of hours. By two or three weeks they may have settled in to a three-hour feeding pattern consuming closer to 100ml (3 \u00bd fl oz).',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'It is advisable to make up 30ml (1 fl oz) more than baby usually drinks, once they start to finish the bottle increase the amount of milk by a further 30ml (1 fl oz). Eventually your baby will take a full 8 fl oz bottle.',
        ],
      },
    ],
  },
};
