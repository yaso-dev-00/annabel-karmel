import { babySleepAdviceRelatedArticles } from '@/data/baby-sleep-advice-listing';
import type { SleepAdviceSection } from '@/components/ArticleScreen/SleepAdviceArticlePage';

export const articleSlug = 'baby-sleep-routine';
export const articlePath = `/articles/${articleSlug}`;

export const babySleepRoutineSections: SleepAdviceSection[] = [
  {
    title: "Your Baby's Bedtime Routine: Preparing for Sleep Separation",
    paragraphs: [
      "Whilst it's a little unrealistic to expect the bath, book and bed routine to magically get you a free pass to a settled night's sleep, it can certainly help set it up.",
      "Although it may seem fairly trivial to us as adults, going to sleep for your baby is a period of separation from you and they need preparation for this. I often call the bedtime routine your preparation for sleep separation; it's about helping to cue and calm your small child to settle them smoothly to sleep.",
      "Your bedtime routine doesn't have to be super rigid; all a routine means is that you do the same few things in the same order every night.",
      'The more you repeat something the more familiar it will become and in turn, this will help your baby to anticipate the next step. Which means they know exactly what to expect and when.',
      'You can start a simple bedtime routine off when your baby is a newborn, but the most important thing is to do it when you feel ready.',
    ],
  },
  {
    title: 'My three key sleep suggestions to blasting-off bedtime:',
    image: `${articlePath}/bedtime-routine.jpg`,
    imageAlt: 'Parent reading a bedtime story to baby',
    ordered: true,
    listItems: [
      'Aim for it to be between 30 to 40 minutes long. This gives your small child or baby enough time to connect with you and settle, but not so long that they get overtired. We want to avoid overtiredness.',
      'Where you can, aim to do the same 3 or 4 things in the same order every night helping them come to know what to expect next.',
      'Focus on spending quality time together, having a bit of fun (bathtime) and bonding before bedtime.',
    ],
  },
  {
    title: "Here's my suggested bedtime routine:",
    image: `${articlePath}/bath-time.jpg`,
    imageAlt: 'Baby bath time',
    ordered: true,
    listItems: [
      "Bath for 5 to 10 minutes. Let them splash, sing songs and have some fun. But aim to keep this to a set time as this will prevent your baby from becoming over-stimulated or tired. Also please don't feel you need to bath EVERY single night. It won't impact on the night.",
      "A short massage if they'll let you. This can really help a small child with reflux, wind or colic.",
      'Nappy/pyjamas/sleep sack or swaddle if using one.',
      "Straight into their sleep space (where they're going to be falling asleep such as their nursery). The aim is for this sleep space to feel familiar, helping them stitch their sleep cycles together at night.",
      "Story or sing a sleepy song. If they're already exhausted and bed begging, feel free to do this quickly or leave it out altogether.",
      "Bedtime feed if they don't feed to sleep.",
      "Say goodnight to 3 or 4 things in the same order. I call this my blast off to bed! Your small child will come to enjoy saying goodnight to their nearest and dearest soft toys and it's also a great cue to let them know sleep time is coming.",
      'Big kiss and cuddle. This releases oxytocin (the feel-good hormone) and can help your small child separate and settle to sleep smoothly.',
      'Settle your small child to sleep. Feeding, rocking or cuddling to sleep are not bad bed habits. If they work for you, all is well.',
    ],
    afterListParagraphs: [
      "Like most things parenting-related, there's no right or wrong way to do your bedtime routine. This is a gentle guide that I hope is useful for you but the most important thing is to do what works for you and your small.",
    ],
  },
];

export const babySleepRoutineRelatedArticles =
  babySleepAdviceRelatedArticles(articleSlug);
