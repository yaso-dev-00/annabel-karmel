import { babySleepAdviceRelatedArticles } from '@/data/baby-sleep-advice-listing';
import type { SleepAdviceSection } from '@/components/ArticleScreen/SleepAdviceArticlePage';

export const articleSlug = 'baby-nap-times';
export const articlePath = `/articles/${articleSlug}`;

export const babyNapTimesSections: SleepAdviceSection[] = [
  {
    title: 'Resettling Your Baby at Nap Times',
    paragraphs: [
      'Naps. Babies need them, and they are just as priceless to parents.',
      "That stretch (however long…or short) is like gold dust, whether you need to re-set with a (strong) coffee, or dart around the home Usain Bolt style to power through the chores. And let's face it, even the simplest of jobs can be near-on impossible to nail with a baby in tow.",
      "I hate to break this to you, but some babies will only sleep for 20-30 minutes in one stretch, no matter what you do. Reality check; that's ok!",
      "Lots of babies are just fine on shorter sleeps, so don't waste time worrying about it. I take a baby-led approach that if your baby sleeps in 30-minute spells, wakes-up cheerful and doesn't show signs of tiredness until their next sleep is due, then fix up, move on and enjoy your day together.",
      "Trying to get them back to sleep can be frustrating and laborious for both you of you, so in the words of our favourite snow queen…let it go! Forget that mum at your local baby group who proudly professes her baby visits the land of nod for a good couple of hours each day. That's her unique sleep story, not yours.",
      "No matter how short your baby's nap has been, the positive is that they've had a nap, even if it's a short sleep snack. This will have taken the edge off their tiredness. In fact, give yourself a pat on the back as you've managed to get them off minus the magic of melatonin (that powerful sleep hormone) which simply isn't present in the daytime.",
      "And if you're hanging onto the hope of having more than 20 minutes sans wide awake baby, don't worry. Babies sleep and nap patterns are forever evolving and changing, and likelihood is, their sleep will increase as time goes on. They have a habit of doing things in their own good time.",
    ],
  },
  {
    title: 'Opportunity to resettle',
    paragraphs: [
      "If your baby wakes-up tired, grizzly or crying after a short nap it is likely that they are not quite ready to get back on the play train. That's where you may need to resettle.",
      "Now, whilst I suggest you don't get into a 'nap-off', I wanted to share my suggestions to maximize naps if you think your baby needs a little longer.",
    ],
    highlightedItems: [
      {
        title: '1. Give them their sleep space',
        paragraphs: [
          "If they have woken but you don't hear crying, give them the opportunity to resettle. They need to practice going to sleep without you. A little grizzle or moan is quite common when a baby stirs, it's just what they do in between sleep cycles.",
        ],
      },
      {
        title: '2. Give them the support they need',
        paragraphs: [
          'How long you give your baby to resettle is completely up to you. However, if they are crying and you instinctively feel they are asking for your support, I recommend resettling them for 5-10 minutes.',
          'Do whatever you do to get them to sleep; holding, rocking, patting, a lullaby, re-inserting the dummy, or a push in the buggy (none of which are bad habits if not an issue for you).',
          "If they're going to resettle, they'll usually do it quickly. Just don't let yourself get into a sleep stand-off. Move on with your day.",
        ],
      },
      {
        title: '3. Set the scene at the start of sleep',
        paragraphs: [
          "Using white noise can be an effective way to help babies to sleep and re-settle. Used as part of a routine, it provides a strong cue that it's sleep time, helping them to zone out and wind down.",
          "Bright light can be stimulating to a baby and may affect them resettling after one sleep cycle. If they are sleeping in a room, then you can't go too wrong with investing I a blackout blind (black sacks also do the trick!). This will become even more important as babies become more aware of their surroundings and notice all those wonderful toys becoming them to come play! If they regularly nap in their buggy or pram, something like a snooze shade is a good idea to block out light.",
        ],
      },
    ],
  },
  {
    title: "My baby still won't resettle!",
    paragraphs: [
      "Give my tips and chance – even if they haven't worked after the first or second attempt. As with anything in parent land, it takes patience and persistence! However, if your baby just isn't nodding back-off, count the catnap as a victory (they've slept, right?) and move on.",
      "Don't get me wrong, it's hard not to get fixated on how much sleep your baby is getting. Yes, sleep is important, but babies are clever little things, and your best bet is to be guided by them and try and relax.",
    ],
  },
];

export const babyNapTimesRelatedArticles =
  babySleepAdviceRelatedArticles(articleSlug);
