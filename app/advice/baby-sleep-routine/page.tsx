import { SleepAdviceArticlePage } from "@/components/ArticleScreen/SleepAdviceArticlePage";
import {
  articlePath,
  babySleepRoutineRelatedArticles,
  babySleepRoutineSections,
} from "@/data/baby-sleep-routine-page";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Bedtime Routine and Preparing for Sleep Separation | Annabel Karmel",
  description:
    "Kerry Secker's gentle guide to building a bedtime routine that prepares your baby for sleep separation and a smoother night's sleep.",
};

export default function BabySleepRoutinePage() {
  return (
    <SleepAdviceArticlePage
      sections={babySleepRoutineSections}
      relatedArticles={babySleepRoutineRelatedArticles}
      attributionImage={`${articlePath}/kerry-secker.jpg`}
      styles={styles}
    />
  );
}
