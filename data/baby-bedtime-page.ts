import { babySleepAdviceRelatedArticles } from "@/data/baby-sleep-advice-listing";
import type { SleepAdviceSection } from "@/components/ArticleScreen/SleepAdviceArticlePage";

export const articleSlug = "baby-bedtime";
export const articlePath = `/articles/${articleSlug}`;

export const babyBedtimeSections: SleepAdviceSection[] = [
  {
    title: "Baby Sleep: The Biology Behind Bedtime",
    paragraphs: [
      "When it comes to a settled night's sleep for your small, there are two important hormones to know about:",
    ],
    listItems: [
      {
        label: "Melatonin",
        text: "This is the sleep hormone controlled by the circadian rhythm or sleep system which is fully developed between the ages of 5 to 6 months.",
      },
      {
        label: "Cortisol",
        text: "AKA baby Red Bull. This is the opposite of melatonin and it's designed to keep your baby in a high state of alert and awake.",
      },
    ],
    ordered: true,
  },
  {
    title: "The Magic of Melatonin",
    paragraphs: [
      "At around six months old, your small's sleep system is up and running meaning they produce melatonin on a 12 hour sleep shift:",
    ],
    listItems: [
      "3pm: melatonin starts to slowly rise and they begin to slow down in preparation for sleep",
      "7pm to 7.30pm: their melatonin is at its peak. When it's at its peak the level stays consistent until midnight.",
      "Midnight: melatonin slowly starts to leave their body",
      "3am: All their melatonin has left the body",
    ],
  },
  {
    title: "Sleep Stages",
    listItems: [
      "Bedtime to midnight: melatonin levels should be fairly high and it's the deepest sleep stage. It's usually a good block of sleep and if your baby wakes they're usually easily settled.",
      "Midnight to 3am: your baby can wake more frequently and you may need to do a bit more work to get them back to sleep. It's not uncommon that some babies may even be awake for long chunks of time.",
      "3am to midnight: By now all the melatonin has left their body and sleep is at its lightest. Your small may appear restless and unsettled. Again, some babies may be awake for long periods or even wake up for the day now.",
    ],
  },
  {
    title: "Cortisol Cues",
    paragraphs: [
      "A likely cause of your baby not going to sleep or waking in the night is over-tiredness. When your baby is over-tired, a stress hormone called cortisol is released by the body. With higher levels of cortisol, your baby switches into high-alert mode to prevent them from danger. This means your baby wakes, even though they are tired.",
      "Fact: Once your little one produces cortisol, they can take six times longer to settle to sleep. That's is a good reason to ensure your small doesn't get over tired.",
      "Here are 14 signs that your baby is overtired:",
    ],
    ordered: true,
    listItems: [
      "They wake up early in the morning",
      "They fight and resist their naps",
      "They take short naps of 30 minutes or less",
      "They are fussy, clingy and tearful especially towards the end of the day",
      "They're totally wrecked at bath time",
      "They're begging for bed after their bath; crying, upset and unsettled",
      "They crash out as soon at their bedtime feed.",
      "They may be too tired to feed properly and/or leave a lot of their milk",
      "They get the sleep sillies; they are manic, over-wired but don't look tired",
      "They resist going to sleep and/or bedtime takes an age to settle them",
      "They wake 30-40 minutes after going to sleep",
      "They wake frequently during the night",
      "They wake up frequently post-midnight",
      "They're awake for long periods post-midnight",
    ],
  },
  {
    title: "Sleep steps for balancing your baby's hormones",
    paragraphs: [
      "Balancing these two hormones is the first step to getting a settle night's sleep. Control the cortisol and take a cue from their melatonin, and you're over halfway to a settled night's sleep.",
    ],
  },
  {
    title: "1. Naps control the cortisol",
    paragraphs: [
      "The best way to prevent over-tiredness at night is by getting on top of daytime naps. Rather than having scheduled nap times, it is best to work around when your baby wakes up. For example, if your little one has woken up earlier than usual, their nap times will need to be earlier than normal too. The timings and number of naps needed are dependent on your baby's age, but here is a guide.",
    ],
    tableRows: [
      { label: "6 months and younger", value: "3-4 hours' sleep over 3 to 4 naps" },
      { label: "6 to 9 months", value: "2-3 hours' sleep over 2-3 naps" },
      { label: "9 to 18 months", value: "2-3 hours' sleep over 1-2 naps" },
      { label: "18 months to 3 years", value: "1-2 hours nap over 1 sleep" },
      { label: "3 to 5 years", value: "Sometimes 1 nap (most lose between 3 & 5)" },
    ],
  },
  {
    title: "2. Choose the right bedtime",
    paragraphs: [
      "Pushing bedtime too late can quickly undo all your good work of controlling the cortisol during the day and ideally your small is settled to sleep when their melatonin is at its peak. Here is my guide to best bedtime by age.",
      "If your baby is battling bedtime try bringing their bedtime earlier; just 10 -15 minutes can make such a positive difference to how they settle to sleep, their night sleep and the time they wake up.",
    ],
    tableRows: [
      { label: "Under 6 months", value: "Keep to their nap gap. So if they go 2 hours between naps during the day, ensure bedtime is no more than 2 hours from their last nap of the day" },
      { label: "6 months to 18 months", value: "Ideally no more than 4 hours from 3pm" },
      { label: "Over 18 months", value: "Bedtime can be pushed to suit your little one but I would generally suggest between 4-5 hours from 3pm" },
    ],
  },
  {
    title: "3. Support at night",
    paragraphs: [
      "Meeting your small's emotional needs at night is never spoiling them or creating bad habits but try to be mindful of what they're communicating to you. If they aren't asking for support try to give them the sleep space they're asking for.",
    ],
  },
  {
    title: "4. Post-midnight movement",
    paragraphs: [
      "After midnight melatonin levels decrease and sleep is gets lighter. It's natural that your little one may look awake, unsettled or restless but this is all perfectly natural and it doesn't always mean they need support from you.",
    ],
  },
];

export const babyBedtimeRelatedArticles = babySleepAdviceRelatedArticles(articleSlug);
