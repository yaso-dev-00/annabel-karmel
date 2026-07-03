import { babySleepAdviceRelatedArticles } from "@/data/baby-sleep-advice-listing";
import type { SleepAdviceSection } from "@/components/ArticleScreen/SleepAdviceArticlePage";

export const articleSlug = "supporting-baby-wake-night";
export const articlePath = `/articles/${articleSlug}`;

export const supportingBabyWakeNightSections: SleepAdviceSection[] = [
  {
    title: "How to Support Your Baby When They Wake at Night",
    paragraphs: [
      "Meeting your baby's needs at night is never the wrong thing to do. There are so many reasons why a baby may need your support, and responding to their cues isn't about spoiling them, or pandering to them unnecessarily. If they are crying, it's about meeting their needs – even if you can't fathom out why!",
      "Babies, newborns in particular, need to get to know that the world around them is safe and trustworthy, and they learn a sense of security and comfort when you respond to them. My approach always meets them at their point of need. And yes, you can still get a settled night's sleep. Here's how.",
      "When your baby is asking for support at night, usually by crying out for you, meet their needs straight away, but I recommend a technique called \"rolling-up your response\".",
      "There are various levels of response you can give your baby if they wake, and adopting the following process enables you to support them at a level they need to be able to drift of. That could be as simple as a short and sweet calming voice (then off you scamper back to bed), or it could escalate to a full feed if your baby isn't settling.",
      "The point of following this is that you are only in their sleep space only as long as they need you to be. They may be awake and asking for support but it doesn't necessarily mean they want to be picked-up or fed.",
      "If your baby wakes at night, here are my steps to rolling-up your response:",
    ],
    image: `${articlePath}/night-waking.jpg`,
    imageAlt: "Baby waking at night",
    ordered: true,
    listItems: [
      "Go to them straight away but very calmly. Try not to fling open the door or stomp on in. This is likely to further awaken them, and before you know it, they're ready for playtime (or mega meltdown!).",
      "Make eye contact with them if you can. When parents' and babies' eyes meet, an emotional connection is established. And that connection is extra important when your baby is feeling lonely and in need of some simple reassurance. I don't believe in no eye contact; if you've made moves to enter their sleep space, then show them that you are there to support them.",
      "Offer your baby some calming and soothing verbal reassurance. It's believed that stone age mothers would talk to their baby as they gathered food to stop them crying and alert predators. The soothing tone of a parent's voice is quite magical in terms of the comfort it can bring.",
      "If they do not settle by this point, offer a light touch. Gently stroking their head or patting their bum can help induce sleep if that is what they are used to.",
      "If this isn't working, pick them up and settle them back to sleep in your arms.",
      "If all the above aren't working then offer them a feed.",
    ],
    afterListParagraphs: [
      "Don't always assume that your baby will need the same level of response every time, so start with a low-level response and escalate as needed.",
      "A few simple soothing words may be enough to help them drift off back into la-la land – and that means a quick drop-in job for you. Imagine if you had swooped in, picked them up and fed them for 20 minutes, when really all they needed to send them back off was a light touch for reassurance. That's a good chunk of time you and your baby could have been sending up the zeds.",
      "Of course, you are your baby's expert, and you know them best. Your instinct is incredibly powerful, so please only use my night time response tool as a guide. You need to tend to your baby as you feel appropriate, and if that involves picking-up and feeding, then trust in what you want to do.",
    ],
  },
];

export const supportingBabyWakeNightRelatedArticles = babySleepAdviceRelatedArticles(articleSlug);
