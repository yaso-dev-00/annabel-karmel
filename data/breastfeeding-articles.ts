import type { BreastfeedingArticle } from '@/components/ArticleScreen/BreastfeedingArticlePage';

/**
 * Content for every article under
 * annabelkarmel.com/advice-category/breastfeeding-advice/ (Maria Betsworth / expert advice).
 * Keyed by the local route slug (`/advice/<slug>`).
 */
export const breastfeedingArticles: Record<string, BreastfeedingArticle> = {
  'breastmilk-storage': {
    metaTitle: 'Breastmilk storage | Annabel Karmel',
    metaDescription:
      'Here is the most important information on storing pumped breastmilk correctly. Use sterilised equipment whilst pumping and to store your milk in.',
    blocks: [
      {
        type: 'paragraph',
        bold: true,
        content: [
          'Here is the most important information on storing pumped breastmilk correctly.',
        ],
      },
      {
        type: 'list',
        items: [
          'Use sterilised equipment whilst pumping and to store your milk in. I would recommend milk storage bags as they are space-saving and you can label them and use them right away.',
          'Milk at room temperature lasts 6 hrs.',
          'Milk in a cooler bag (-150 – 40) will last 24hrs.',
          'Milk stored in the refrigerator (40) will last 3-6 days.',
          'Milk stored in the freezer compartment (-150) lasts 2 weeks. Milk stored in the deep freezer (-200) lasts 6 months.',
          'Make sure you label the date and even time to store correctly.',
          'When you want to reheat the milk, thaw frozen milk in a warm water bath first and then reheat in a bottle in a bottle warmer.',
          "When out and about I used to take milk from the fridge and carry it in my diaper bag. By the time I wanted to offer it, it had warmed up a little and was available to offer, I also pumped ahead of my baby's feeds so most of the time I took a bottle I had pumped before she would drink, so she would have warm and fresh milk whilst out and about.",
          'As with all foods, I would recommend getting used to smelling the milk and even trying a little to see if it tastes \u201coff\u201d.',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  pumping: {
    metaTitle:
      'Pumping Breast Milk | Breastfeeding Tips & Advice | Annabel Karmel',
    metaDescription:
      'A lot of mamas start pumping for many reasons. Here are a few facts and tips to ease your mind and help you build a healthy pumping supply.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'A lot of mamas start pumping for many reasons, sometimes even just to see how much they would produce and are in shock when there is not much coming out. Here are a few facts to ease your mind:',
        ],
      },
      {
        type: 'list',
        items: [
          "If you're exclusively breastfeeding and are pumping for the first time, don't expect there to be an ocean of milk flooding your bottle. The mechanism of a pump is slightly different than a suckling baby, therefore it might take a bit of time to build up a pump supply. If you are pumping in the very early days after baby is born, use hand-expression techniques as the thick colostrum will only be wasted in the parts of your pump, catching it on a spoon or in a little sterilised cup is easier.",
          'To build up a good pumping milk supply, the key is to regularly pump every 2-3 hours (even in the night if you can) and pump until your breast feel soft and \u201cempty\u201d (remember they are not empty).',
          "If no milk is flowing, don't be distressed. It might take a little tricking your body to give away the glorious milk. Have baby, a photo or a video of baby, next to you to look at, so hormones help your milk release. Oxytocin is released when baby is suckling and simply looking at your child. Once oxytocin is flowing milk will flow too and cause the letdown effect.",
          'Hand expression before you pump might also help to get things going.',
          'Just like breastfeeding, pumping takes practice. Your body has to adjust to the silicone parts trying to imitate what your baby normally does.',
          'To boost your milk supply, throw in some power pump sessions every now and then: pump for 10 minutes both sides – 10 minutes break – repeat.',
          'Remember breastfeeding is very different from pumping as it involves cluster-feeding, comfort suckling, etc, this builds up a milk supply greatly. Having baby near you for a cuddle whilst pumping will help.',
          'If you are pumping at work, do start before you are returning to work to get the hang of it first, so you are not stressed out at work if your milk might seem less. Additionally, you can start building up a good freezer supply for emergencies.',
          'Get yourself some delicious lactation-inducing products to boost your milk supply further.',
          'Give yourself some credit, pumping takes a lot more than breastfeeding and involves a completely different mind frame.',
          'Take a breath and try and relax. What milk will flow, will flow. You can build up a good supply with a lot of different tricks so just breathe, mama. You can do this!',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'newborn-feeding-patterns': {
    metaTitle: 'Newborn Feeding Patterns | Tips and advice | Annabel Karmel',
    metaDescription:
      'Newborn feeding patterns can feel like madness. Here are a few facts to help you rationalise why you are constantly feeding your newborn.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          "Let's face it, newborn feeding patterns are madness. Records on how long a baby can feed are broken on a daily basis and a day may seem like an eternity of nursing.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          "This stage doesn't last forever, and to help you rationalise why you are constantly feeding, here are a few facts:",
        ],
      },
      {
        type: 'list',
        items: [
          'The size of a newborn stomach starts off being rather tiny, therefore a newborn needs to feed frequently.',
          'Newborns also love to comfort feed. Some barely leave the breast for the first weeks of their life. Whilst that is extremely exhausting, it is recommended to soldier through this phase with as much nipple cream and distractions or simply baby-watching as you can.',
          'These frequent feedings do NOT indicate anything wrong with your milk, your milk supply or baby not getting enough. Newborns love the closeness to their mama and they know how to suckle, and that they do!',
          'If baby is gaining weight at a steady rate, has wet and dirty nappies, your milk supply is perfectly adequate.',
          'Frequent feeding is great to stimulate the breast into transitioning from colostrum to mature milk. It also establishes milk supply and simply helps baby to practice breastfeeding and strengthens the muscles needed to do so.',
          'The hormones flowing between you whilst feeding are essential for bonding and to produce milk.',
          'Get comfortable mamas! Lay back and let baby have as many feeds as needed. Let the world stand still. If you have two or more kids around, ask somebody to take them out for a little play, so you can focus on your newborn.',
          'It will get better from here onwards and feedings may space out more and moreover the coming weeks and months.',
          'Other times in which baby might have had a routine and seems to go back to endless nursing sessions, it can indicate growth spurts or developmental changes, this is also a temporary phase in which your baby might need you more to overcome it.',
          "Breastfeeding on baby's cues is the best you can do! You are not spoiling your child this is normal breastfed baby behaviour.",
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'breastfeeding-friendly-bottle-feeding': {
    metaTitle: 'Breastfeeding friendly bottle feeding | Annabel Karmel',
    metaDescription:
      'There may be occasions where you need to bottle feed your breastfed baby. Here are a few tips to make the experience as stress-free as possible.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'There may be occasions where you need to bottle feed your breastfed baby. So here are a few tips on how to make the experience as stress-free as possible for you and your baby:',
        ],
      },
      {
        type: 'list',
        items: [
          'Buy a bottle that has similar shape to your nipple. Try different ones if baby seems to reject but do try at least for a day with the same one.',
          'Try and avoid orthodontic nipples, even though they claim to help teeth development they are the furthest away from a human nipple and could make breastfeeding difficult as the suckling effect on these is different for baby.',
          'Choose a slow-flowing or newborn bottle. There is no need to get different flows for a growing child – our breasts release the milk always the same, therefore if baby gets older baby does not need a more rapid flow. As muscles in the mouth and jaw develop, baby will drink effectively with a slow-flow bottle and it is much more similar to a breastfeeding experience.',
          'Offer feeds on gentle feeding cues, not extreme hunger.',
          'Give the bottle in a more upright position as it helps to adjust to the flow of the bottle and is easier for baby to digest.',
          'Switch sides like you are breastfeeding to avoid a certain side preference if baby is still breastfeeding and to stimulate equal facial and visual development.',
          'Give baby the chance to indicate when feeding is done – this does not need to be when the bottle is empty but when baby is showing signs of wanting to stop like a change of swallowing motions, pushing the bottle away or moving the head to the side.',
          'Regardless if you are formula feeding, bottle feeding expressed breastmilk or substituting some feeds to a breastfed baby, it helps to create similarities to the breastfeeding experience.',
        ],
      },
      { type: 'milkMakingMamaClosing' },
      {
        type: 'relatedLinks',
        intro:
          'If you found this article helpful, you may be interested in reading:',
        links: [
          {
            label: 'Introduction to breastfeeding',
            href: '/advice/introduction-to-breastfeeding',
          },
          {
            label: 'Breastfeeding Tips & Advice',
            href: '/advice-category/breastfeeding-advice',
          },
        ],
      },
    ],
  },

  'comfort-feeding': {
    metaTitle: 'Comfort Feeding | Breastfeeding Tips & Advice | Annabel Karmel',
    metaDescription:
      'Allowing your baby to comfort suckle is very good and the best thing you can do. Here are the reasons why comfort feeding is nothing to worry about.',
    blocks: [
      {
        type: 'paragraph',
        bold: true,
        italic: true,
        content: [
          "\u201cBaby is only suckling for comfort\u201d, \u201cthat's not good\u201d, \u201ctake baby off so you are not the only one to sooth baby\u201d, \u201cyou are a human pacifier\u201d, \u201cyou will be stuck with this forever\u201d, \u201cit is a terrible habit\u201d: \u201cuse a dummy for that\u201d:\u2026",
        ],
      },
      {
        type: 'paragraph',
        content: [
          "Haven't we all heard things like this about comfort feeding from others?! And it probably made us question whether or not we are doing it right. Actually, allowing your baby to comfort suckle is very good and the best thing you can do! Here are reasons why:",
        ],
      },
      {
        type: 'list',
        items: [
          "Babies go to the breast for many reasons. They're hungry or thirsty, they're tired, they're scared or hurt, they're feeling overwhelmed. All of these are equally valid reasons for a baby to nurse.",
          "If we are putting arbitrary limits on breastfeeding it is made much more difficult. It is already hard for a new mama to learn about breastfeeding, what is normal and what is not. Don't listen to advice like this, your baby needs you for all the reasons above and that is natural.",
          'Comments like this are based on old schedules about feeding and are not valid.',
          'It is important to nurse frequently for all these reasons and mostly to establish good milk supply in the early days.',
          'Overfeeding your baby like this is a myth, breastfed babies are in control of how much milk they take in, so not every time they nurse will be a full feed.',
          "You are not spoiling your baby! By responding to baby's needs quickly, consistently and with love, we teach them that their world is a safe place.",
          'When baby grows up, nursing will become less frequent so enjoy this closeness while it lasts. It has so many benefits for you and baby.',
          "Find your own routine and what works for you and your baby. Don't let yourself be influenced by others. I know this is hard to do. I often question what others have told me but then I do my own personal research and try and find my own routine, I am being rewarded for it when it works out for me.",
          'Families and friends can be so valuable and important when becoming a new mum but this is also your OWN journey, so stand up for yourself and do what is right for you.',
        ],
      },
      { type: 'milkMakingMamaClosing' },
      {
        type: 'relatedLinks',
        intro:
          'If you found this article helpful, you may be interested in reading:',
        links: [
          {
            label: 'Are endless breastfeeding sessions normal',
            href: '/advice/breastfeeding-sessions',
          },
          {
            label: 'Newborn feeding patterns',
            href: '/advice/newborn-feeding-patterns',
          },
        ],
      },
    ],
  },

  'finding-pumping-routine': {
    metaTitle:
      'Finding a pumping routine | Breastfeeding tips & advice | Annabel Karmel',
    metaDescription:
      "You don't have to pump if you are exclusively breastfeeding on demand. Pumping can be a great tool to build a stash and boost supply – here are some tips.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          "First and foremost, you don't have to pump if you are exclusively breastfeeding your baby on demand. Pumping can be a great tool to build a stash and to boost supply. Here are some helpful tips:",
        ],
      },
      {
        type: 'list',
        items: [
          'Basic rule – milk supply works on a demand-and-supply system, the more milk is needed the more milk is made.',
          "If you are adding a pump to your routine you are not \u201cemptying\u201d baby's usual meal but you are telling your body to make more milk.",
          'Your breasts are never empty, whilst you are pumping or breastfeeding you are already making milk, because the more milk is being removed, the more milk is needed.',
          'If you add one pump session a day to your usual feeding routine you will make more milk, the more pumps you add the more milk is made.',
          'It does take a bit of tricking your body to get used to a pump. Many mothers confuse the lack of output during a pumping session as the lack of milk they are producing and they get scared seeing only a small pump amount. If you are just starting to pump whilst breastfeeding you might see small amounts of milk flowing at first. This is completely normal. The pumping output does not represent the overall amount of milk you produce.',
          "If you are starting to pump once a day to build up a stash, I would recommend pumping in the morning before baby's first feed. Many mamas say their milk production is at the highest in the morning. But finding a time that works for your routine is the key.",
          'After you have pumped you can breastfeed straight away, this might also be better because you will see more milk flowing during your pump session and baby will also get all the milk needed.',
          'It can be daunting introducing pumping to your routine, take your time, massage before and during a pumping session and do NOT panic about the amount you are pumping, a pumping supply needs to build up steady.',
          'Baby will, whilst breastfeeding, get all the milk needed and your body will adjust perfectly to what is needed.',
          'You are making enough milk!',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'breastfeeding-cues': {
    metaTitle: "Recognising baby's breastfeeding cues | Annabel Karmel",
    metaDescription:
      'Breastfeeding a baby whenever they are ready for milk makes for great milk supply and a happy baby. Here are the most important feeding cues to look out for.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'Breastfeeding a baby whenever they are ready for some milk makes for great milk supply and a happy baby. Here are the most important feeding cues to look out for:',
        ],
      },
      {
        type: 'list',
        items: [
          'Subtle feeding cues: eye movement, eyelids fluttering (if baby is sleeping), hand coming to face and mouth opening.',
          'The more obvious ones: rooting towards your chest, squeaking and whimpering – now is a great time to offer as baby should take the breast easily and comfortably.',
          'If hunger builds up further, most babies will get tense and start to cry – a crying baby is hard to latch on and needs to be consoled first to establish a good attachment and effective feed.',
          'Breastfeeding becomes easier if you are answering a gentle request. Or any time you like, even without any cues, rather than to a demanding and very hungry baby.',
          'Try not to wait until your breasts feel overfull as this could make it harder for very young babies to latch on and it slows down milk production.',
          "You can offer a feed when you feel like it, even when baby is not signalling any cues. Watch and learn from your baby and don't restrict nursing sessions or implement a routine.",
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'breastfeeding-sessions': {
    metaTitle: 'Are endless breastfeeding sessions normal | Annabel Karmel',
    metaDescription:
      'Endless nursing sessions – as exhausting as they are – are pure milk supply gold. Here are some top tips for coping with long feeding sessions.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          "When my second daughter was born, she crawled to my breast and didn't leave it for approximately three months straight. My husband sometimes only got to see the back of her head. She broke all records on how long a baby can stay on the breast.",
        ],
      },
      {
        type: 'paragraph',
        content: [
          'These endless nursing sessions left me questioning if this is \u201cnormal\u201d.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Rest assured, endless nursing sessions – as time consuming and exhausting as it may be – are pure milk supply gold! During the early days some babies barely ever leave the breast which helps to stimulate your breast and leads to your milk coming in.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'The urge to suckle is very strong in babies. Not only is it the ultimate comfort but it also really gets the right hormones flowing for a great milk supply. There is nothing wrong with letting your baby suckle for comfort. On the contrary, it will build up a great and steady milk supply.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'These endless sessions are time-consuming. I found that distractions and finding practical solutions whilst having a toddler around, the key to not feeling overwhelmed.',
        ],
      },
      { type: 'heading', text: 'Here are some of my top tips:' },
      {
        type: 'list',
        items: [
          'Nursing in a sling: to start this off try and master laid back nursing at first so baby gets used to latching on in such position. Baby will then take to nursing in a sling easier. Walk around in the carrier or sling, it will empower you to still go to places whilst giving baby the opportunity to nurse for as long as needed.',
          'At home I had a nursing station with everything I needed. Snacks, water bottle, phone, TV or a book and other distractions.',
          "For my toddler, I had a little box of toys she could play with whilst I sat down nursing. Try and focus on non-messy toys. We had a doctor's case or a wooden puzzle that we could play with together. And \u201cthe virtual nanny\u201d aka TV was helpful as well when we hit the witching hour where my baby would need a lot more attention.",
          "I know these nursing sessions can leave you questioning why baby doesn't come off the breast at all. You may feel like it is a lack of milk but trust me and repeat after me: \u201cIf you are nursing around the clock on baby's feeding cues with a correct latch, you are making the perfect amount of milk for your baby's needs. Long feeding sessions do NOT indicate anything wrong with your supply but are the way baby likes to feed at this point in time. And it will get better! Hang in there and get comfy.",
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'breast-feeding-myths': {
    metaTitle:
      'Myths about breastfeeding and breast milk busted | Annabel Karmel',
    metaDescription:
      "Let's address the most common breastfeeding myths and set the record straight, from milk supply to nipple confusion and feeding schedules.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          "Let's address the most common breastfeeding myths and set the record straight. After all, there's so much conflicting information and advice out there, and parenting is complicated enough without the added challenges of incorrect advice.",
        ],
      },
      {
        type: 'accordion',
        items: [
          {
            title:
              "\u201cBaby is feeding all the time and I don't feel like I don't have enough milk\u201d",
            paragraphs: [
              'The most important indications that things are flowing well are steady weight gain in combination with regular wet and poopy nappies. If they are meeting their developmental and physical milestones then you have nothing to worry about.',
              'The following are NOT indicators of low milk supply:',
            ],
            listItems: [
              'Baby is constantly on the breast',
              'Baby cluster-feeds all evening and night',
              'Baby seems fussy on the breast',
              'Your breasts feel soft and not full anymore',
              "You don't feel or never have felt a let-down sensation",
              'Baby suckles endlessly',
              'Baby changes sleeping patterns and wakes up more frequently',
            ],
            closingParagraphs: [
              'Babies go to the breast for lots of different reasons and any of the above behaviours are not indications of a lack of milk.',
            ],
          },
          {
            title:
              '\u201cBreastmilk does not keep your baby full enough to sleep through the night\u201d',
            paragraphs: [
              "Wrong! Breastmilk covers babies' nutritional needs perfectly. Sleeping through the night is a developmental milestone that every baby reaches in their own time. Filling baby up does not mean a full night sleep.",
            ],
          },
          {
            title: '\u201cIf Baby keeps waking up offer formula\u201d',
            paragraphs: [
              "A full baby doesn't mean a sleeping baby! Formula fed babies can wake up just as many times as breastfed babies. It is absolutely normal for babies to wake up many times during the night to top up on food or even for comfort during the first year of life and far beyond that",
            ],
          },
          {
            title: '\u201cBreastmilk declines in quality over time\u201d',
            paragraphs: [
              'Breastmilk is an ever changing always adapting nutrients super food that covers all of your babies needs and far beyond that. It will cover age appropriate needs and offers antibodies to protect baby and help build a strong immune system. Breastmilk never loses its nutritional value.',
            ],
          },
          {
            title:
              '\u201cBeing a human pacifier or nursing baby to sleep is bad\u201d',
            paragraphs: [
              'There is absolutely nothing wrong with letting baby comfort feed as it builds up a great milk supply, helps baby lowering the heart beat and create a calm and content sleep environment and sleep association for baby. And never forget a pacifier is to replace YOU the comfort and closeness YOU offer. It is natural and normal to be close.',
            ],
          },
          {
            title: "\u201cNipple confusion doesn't exist\u201d",
            paragraphs: [
              "Actually, some baby's find it difficult to master the skill of a good latch introduced to a bottle too early in their breastfeeding journey. It is recommended to establish breastfeeding first before introducing a bottle as the suckling mechanism of breast and bottle varies greatly and perhaps leads to nipple confusion.",
            ],
          },
          {
            title: '\u201cYou should not be a human pacifier\u201d',
            paragraphs: [
              "Offering the breast on demand also offers baby the chance to suckle for comfort, not only is this practice important to establish a great milk supply it also helps oral development, and provides ultimate comfort for all different moods your baby could be in like being frightened, in pain, feeling lonely, sad, anxious etc. Plus it is a temporary phase that many breastfeeding babies will outgrow so you won't be doing this forever.",
            ],
          },
          {
            title:
              '\u201cStress, tiredness and lack of food or drink cause a bad milk supply\u201d',
            paragraphs: [
              'The main causes for bad milk supply are an insufficient latch, difficulties draining the breast completely and poor positioning. The body will provide the best nutrition to the child regardless of the state the mother is in, whilst she might be suffering from malnutrition or tiredness her baby will still receive all the benefits from breastmilk. Milk supply is mostly inflicted by frequent feeding as good positioning and attachment.',
            ],
          },
          {
            title:
              '\u201cYou should space out feedings to let your breast fill up\u201d',
            paragraphs: [
              "The most important principle is to feed on demand and practice responsive feeding whereby you look out for baby's feeding cues and offer the breast. Letting the breast fill up will lead to slowing down milk production as well as forcing a schedule onto a baby. Which can severely impact your overall milk supply.",
            ],
          },
          {
            title: '\u201cMy boobs are empty\u201d',
            paragraphs: [
              'Boobs of a breastfeeding mother can never be empty. Babies drink on average 70-80% of your breastmilk. And whilst feeding you are already making more. Clever hey!',
              'Your breasts are not passive storage contains of milk but milk factories that continue to produce as milk is being removed. Breasts that feel soft do not indicate a lack of milk in them.',
            ],
          },
          {
            title: '\u201cYou need to feed 10 minutes on each side\u201d',
            paragraphs: [
              "It's is much better to let baby decided to feed for as long and as often as it may want.",
            ],
          },
          {
            title:
              '\u201cYou only have milk when your milk comes in 2-3 days after labour\u201d',
            paragraphs: [
              "From the moment and even before baby is born you produce milk. In the early days it is called colostrum and is a much thicker milk which is perfectly adequate for baby's little tummy. Milk only changes when they call it your milk \u201ccomes in\u201d – but really due to stimulating the breast with babies suckling motion your milk will change and become more milk like which is a transition not a switching or coming in process. It is best to refer to it as milk transitioning to avoid pressures and misconceptions about milk.",
            ],
          },
          {
            title: '\u201cBaby needs to have a feeding schedule\u201d',
            paragraphs: [
              'Babies need to feed on demand. When you pick up feeding cues of baby being hungry you should offer your boobs this helps to get a great milk supply.',
            ],
          },
          {
            title: '\u201cYou must offer both breast each feeding time\u201d',
            paragraphs: [
              'It is perfectly fine to give one breast and next feeding session the other side. If baby is latching of naturally and does not seem interest in the other side you do not need to offer it. It is more important to let baby finish naturally then take baby off.',
            ],
          },
          {
            title:
              "\u201cYou can't tell if your baby is getting enough milk whilst breastfeeding\u201d",
            paragraphs: [
              'Having plenty of wet or dirt nappies in combination with regular weight gain as well as reaching milestones and outgrowing clothing and diapers are definitely indicators that your baby is doing fine breastfeeding',
            ],
          },
          {
            title:
              "\u201cIf you have small breasts you can't make enough milk\u201d",
            paragraphs: [
              "This couldn't be further from the trust, the size of the breasts do not matter at all when it comes to breastfeeding. Milk production is down to picking up on babies feeding cues and regular feedings.",
            ],
          },
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'introduction-to-breastfeeding': {
    metaTitle:
      'Introduction to breastfeeding | Getting started | Annabel Karmel',
    metaDescription:
      "Breastfeeding is often referred to as the 4th trimester. Here's what to expect from the big changes happening to you and your baby in the early months.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          'Breastfeeding is often referred to as the 4th trimester. And rightly so, it should receive at least the same amount of information and detail as any other developmental changes during your first three trimesters.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'During this 4th trimester, big changes are happening. Your boobs are now making milk on an hourly basis, you and your baby are getting to know each other.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'This brings a new postpartum identity of body changes, perhaps a funny soft unstable belly, swollen breasts, and soreness and also the emotional changes of being a mum and the responsibility this brings.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Your baby will also go through massive changes during this 4th trimester. If you are breastfeeding, these next three months will probably mean you are inseparable. Now you can hold your child actively and physically in your arms, and your boobs keep baby nourished endlessly.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'The 4th trimester also brings a lot more physical challenges, from extreme tiredness to sleep deprivation, to physical exhaustion from endless feedings. Usually, after the first three months, things will rapidly change, your baby will space out feedings, routines will be established, and things will slowly return to their place and shape.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Considering breastfeeding during the first three months as part of the fourth pregnancy trimester might help you understand the time and effort involved in providing for your baby.',
        ],
      },
      {
        type: 'milkMakingMamaClosing',
        prefix:
          'I hope my advice articles will empower and support you nourish your baby.',
      },
    ],
  },

  'breastfeeding-getting-started': {
    metaTitle:
      'Getting the perfect latch | Breastfeeding tips & advice | Annabel Karmel',
    metaDescription:
      "Baby's position will make all the difference to a good latch. Follow a few simple tricks and rules to establish a deep and comfortable latch.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          "Baby's position will make all the difference to a good latch. Once you have mastered the skill of breastfeeding, and latching on becomes natural, you may experiment with lots of different positions to nurse in. But in the early days, it is helpful to follow a few simple tricks and rules to establish a good, deep and comfortable latch.",
        ],
      },
      {
        type: 'list',
        items: [
          'Firstly, it would probably be good to get yourself some comfortable nursing pillows in order to get nice and relaxed during the first days of long endless breastfeeding sessions. I would recommend a big one for yourself and a smaller one for baby to lay on.',
          'Sit comfortably, perhaps lay the nursing pillow if you are using one, on your lap and place baby on it.',
          "Baby's mouth is wide open.",
          "The entire nipple and most of the areola (surrounding area of the breast) are in baby's mouth. You should see more dark skin above your baby's top lip than below your baby's bottom lip.",
          "You may see baby's lower lip is curled back – but sometimes baby is so close you will not see the lips at all.",
          "Baby's cheeks are round and full.",
          "Baby's jaw and ears are moving in a swallowing, gulping motion.",
          "Keep baby's body in a straight line with the whole body facing the nipple and breast Support the neck, shoulders, and back so that the baby can tilt his/her head back easily.",
          "Make sure the baby's lower lip and chin are in contact with the breast first. A gentle stroke with your nipple on baby's lip should lead to baby opening mouth wide ready to latch on.",
          'A semi-reclined position might be particularly comfortable to nurse in as you can rest and lay down a little and gravity helps you.',
          'Practice makes perfect. If you feel any tension in your arms, neck or shoulders do get somebody to get you an additional pillow or readjust your position. Nursing through feeling uncomfortable leads to increased pain, it is fine to unlatch baby readjust the position and try again. It also helps baby to practice latching on. And a relaxed mama will have a better milk flow.',
          'When and if you encounter problems it is normal to tense up which ultimately makes it much worse, being stressed about positioning and tensing up is counterproductive in establishing breastfeeding.',
          'Once established try a variety of positions you or baby like to nurse in, it will give you confidence and it frees up your mind about tensely holding your child whilst feeding.',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'managing-breast-engorgement': {
    metaTitle: 'Managing breast engorgement | Experts | Annabel Karmel',
    metaDescription:
      'Engorgement is caused by an oversupply of milk and fluid. Here are my tips for dealing with engorgement and helping baby latch on more comfortably.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'Engorgement is caused by an oversupply of milk and fluid, making your breast very large, full and swollen. This leads to baby having a difficult time latching on.',
        ],
      },
      {
        type: 'paragraph',
        content: ['Here are my tips for dealing with engorgement:'],
      },
      {
        type: 'list',
        items: [
          'Nurse as often as possible and keep baby close so you can offer feeds more often.',
          'Try reverse pressure softening, in which you press gently with your fingers around the nipple and compress, to then immediately offer for baby to latch on.',
          'Try warm compresses or a warm shower before a feed. You can also hand express a little milk out first, so baby might find it easier to latch on.',
          'A mini pumping session on a low-suction setting before each feed to relieve pressure could be helpful. You could save this milk or store it in the freezer for further use.',
          'Moving and massaging your breast to move excessive lymph fluid around – whilst lying flat lets gravity help you.',
          "Especially in the early days of establishing breastfeeding – with milk coming in and excessive fluids after birth – engorgement is common. If you feel swollen lymph nodes in your armpits during that time, that's milk-making tissue that you never knew you had! Rest up and nurse well.",
          'If you are suffering from any severe symptoms like fever, or else, check with your GP.',
          'Engorgement will pass with frequent nursing and breast massage, take your time to work on your breasts and rest up mama.',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'have-i-got-enough-breast-milk': {
    metaTitle:
      "You've got enough milk | Breastfeeding Tips & Advice | Annabel Karmel",
    metaDescription:
      "If your baby is gaining weight and has plenty of wet nappies you DO have a great milk supply. Here's what does NOT indicate a low milk supply.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          'If your baby is gaining weight and has plenty of wet nappies you ',
          { text: 'DO', bold: true },
          ' have a great milk supply.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'The following do ',
          { text: 'NOT', bold: true },
          ' indicate a low milk supply:',
        ],
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Baby nurses frequently.',
          'Baby is suddenly feeding more frequently, sometimes during evening times. Baby is fussy after evening nursing.',
          'Baby wakes up frequently in the night to feed. Baby does not nurse as long as before.',
          'Your breast feels softer.',
          'Your breast leak less or not anymore.',
          "You don't feel a great let down or have not felt one before. All these reasons do NOT stem from low milk supply.",
          'It is perfectly normal for an exclusively breastfed baby to feed often, have periods of the day to do so, or times during growth spurts to increase feeds. But that has nothing to do with a low milk supply.',
          'The only indicator of a low milk supply is baby NOT gaining enough weight or not enough wet or poopy nappies. So keep calm and latch on!',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'breastfeeding-multiples': {
    metaTitle: 'Breastfeeding multiples | Annabel Karmel',
    metaDescription:
      "It is possible to breastfeed multiples. Here's how tandem feeding and feeding your babies one by one can work for you and your little ones.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          'As a multiple mum you probably had a hospital birth and that is the best place to learn how to feed your babies. It is possible to breastfeed multiples and staff will show you some positions that might work for you.',
        ],
      },
      { type: 'heading', text: 'Tandem feeding' },
      {
        type: 'paragraph',
        content: [
          'This takes practice but once you all get the hang of it is the most time and cost-efficient way to feed and involves latching both babies on simultaneously. Hold one baby under each arm and guide their mouths to your nipples. If one baby is smaller you might like to swap breasts at each feed to ensure that both build up an adequate supply.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Feeding your multiples one by one will take longer than staggered feeds but may be easier to master and give you precious one to one time with each baby.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Some mums like to feed on demand but with more than one mouth to feed you run the risk of constantly having at least one hungry baby to tend to, and you need to care for yourself too. If your babies were premature, they may choose sleeping over feeding in the early days in which case you will need to wake them regularly to ensure they grow bigger and stronger.',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'breast-milk': {
    metaTitle:
      'Day one of breast milk | Breastfeeding tips & advice | Annabel Karmel',
    metaDescription:
      "Today marks the beginning of an exciting journey. Here's a little reminder of what is normal for baby during the very first 48 hours.",
    blocks: [
      {
        type: 'paragraph',
        content: [
          'Today marks the beginning of an exciting journey. Breastfeeding is an amazing choice, not only for your child but for yourself. It is a task to master but right now just enjoy this little bundle of joy that you have been longing for, for nine long months. Recover from giving birth and soak up all the skin-to-skin with your newborn. During the first 24 hours, closeness and skin-to-skin contact is the key to a successful start into your breastfeeding journey.',
        ],
      },
      {
        type: 'paragraph',
        bold: true,
        content: [
          'Here is a little reminder of what is normal for baby during the very first 48hrs on this planet.',
        ],
      },
      {
        type: 'list',
        items: [
          'Not all babies are born hungry, some babies prefer to have a little feed only and then fall asleep. Babies do however love to have skin-to-skin, keeping baby close with skin-to-skin contact is the best way for baby to latch on whenever needed. Direct skin contact also helps baby stay nice and warm – so snuggle up!',
          'During the very first night, baby might also sleep a lot and feed occasionally. Every baby is different so offering the breast on babies feeding cues and demand is the key.',
          'It is completely normal to feed around the clock, babies have tiny tummies and need to top up frequently.',
          'The second night might be full of cluster-feeding. Starting in the evening, many newborns like to camp out at the breast for hours and hours. Get comfortable and try out nursing positions that offer some rest for you like laid-back nursing.',
          'Working on a good latch and attachment is crucial to get off to the right start and to get your breasts used to the frequency of feeds to come. Making sure that if you feel pain, unlatch and try again for a deeper latch.',
          'Get help early from trained staff in the hospital if you have any breastfeeding concerns or reach out if you have questions.',
          'Congratulations on your new arrival, mama! For now, just relax, soak up every inch of your baby and welcome to motherhood. You have done so well!',
        ],
      },
      { type: 'milkMakingMamaClosing' },
    ],
  },

  'reflux-expert-advice': {
    metaTitle:
      'Reflux: Expert Advice | Breastfeeding Tips & Advice | Annabel Karmel',
    metaDescription:
      'Reflux is when a weak valve at the top of the stomach allows feed and gastric acid back up. Expert advice on symptoms of GORD and how to cope with baby reflux.',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'Reflux is when a weak, immature valve at the top of the stomach allows the feed along with gastric acid to come back up causing symptoms that include heartburn and vomiting. Constant reflux leads to inflammation of the food pipe (or oesophagitis) and symptoms of Gastroesophageal Reflux Disease (GORD).',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'All babies are born with this weak valve. Up to 70% of healthy babies between 3 and 7 months will regurgitate once or more a day but some regurgitate excessive amounts because of reflux. The good news is that most babies will grow out of this by 12 months when the valve matures, and gravity helps when the baby starts standing up.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'Parents of a baby suffering from reflux are sometimes told to wean early, but standard first foods such as apples and carrots may be too acidic and exacerbate a sensitive gut. Trial and error is the best way to find foods that baby can stomach. Take things slowly, introducing solids to a baby that has an uncomfortable association with feeding demands patience.',
        ],
      },
      {
        type: 'accordion',
        items: [
          {
            title: 'GORD Symptoms',
            listItems: [
              'Regurgitating excessive amounts of milk / food',
              'Hiccups',
              'Poor sleep',
              'Arching of the back during or just after feeds',
              'Excessive crying after feeds',
              'Only managing small amounts of feed at a time',
              'Persistent cough or wheezing',
              'Bloody vomit',
              "Weight loss or poor weight gain on the baby's growth chart in the red book",
            ],
          },
          {
            title:
              'Tips on coping with baby reflux to prevent development of GORD',
            listItems: [
              'Hold your baby in an upright position during and for about 30 minutes after each feed',
              'Try giving smaller more frequent feeds',
              'Avoid exposure to smoke as this causes irritability',
              'If you are bottle feeding, burp your baby every three minutes or so and make sure the hole in the teat is not too large, otherwise the milk can come out too fast',
              'Avoid the use of car seats immediately after feeding',
              'Avoid clothing or nappies that are tight around the tummy',
              'Where possible, try not to lay your baby flatter than a 30° angle above horizontal, including whilst changing nappies.',
              "Raise the head of your baby's cot a few centimetres off the ground by placing blocks or thick books under the cot legs (gravity helps keep the feed down). Never use a pillow.",
            ],
          },
          {
            title: 'What can the GP offer if your baby has GORD',
            listItems: [
              'Thickening the milk if bottle fed, by using carobel',
              'Considering hypo-allergenic formula e.g. Neocate',
              'Medications such as antacids (gaviscon) or acid suppressants e.g. ranitidine (zantac) or losec MUPS (omeprazole)',
              'Refer your baby to a Consultant Paediatrician or Paediatric Gastroenterologist',
            ],
          },
        ],
      },
    ],
  },
};
