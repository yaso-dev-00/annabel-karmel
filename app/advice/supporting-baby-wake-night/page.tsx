import { SleepAdviceArticlePage } from '@/components/ArticleScreen/SleepAdviceArticlePage';
import {
  articlePath,
  supportingBabyWakeNightRelatedArticles,
  supportingBabyWakeNightSections,
} from '@/data/supporting-baby-wake-night-page';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Supporting Your Baby If They Wake at Night | Annabel Karmel',
  description:
    "Kerry Secker's rolling-up response technique for supporting your baby when they wake at night without creating unnecessary sleep habits.",
};

export default function SupportingBabyWakeNightPage() {
  return (
    <SleepAdviceArticlePage
      sections={supportingBabyWakeNightSections}
      relatedArticles={supportingBabyWakeNightRelatedArticles}
      attributionImage={`${articlePath}/kerry-secker.jpg`}
      styles={styles}
    />
  );
}
