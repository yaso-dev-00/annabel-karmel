import { SleepAdviceArticlePage } from '@/components/ArticleScreen/SleepAdviceArticlePage';
import {
  articlePath,
  babyBedtimeRelatedArticles,
  babyBedtimeSections,
} from '@/data/baby-bedtime-page';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Baby Sleep: The Biology Behind Bedtime | Annabel Karmel',
  description:
    "Understand melatonin, cortisol, sleep stages, and overtiredness cues to help balance your baby's hormones for better sleep.",
};

export default function BabyBedtimePage() {
  return (
    <SleepAdviceArticlePage
      sections={babyBedtimeSections}
      relatedArticles={babyBedtimeRelatedArticles}
      attributionImage={`${articlePath}/kerry-secker.jpg`}
      styles={styles}
    />
  );
}
