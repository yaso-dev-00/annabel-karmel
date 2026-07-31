import { SleepAdviceArticlePage } from '@/components/ArticleScreen/SleepAdviceArticlePage';
import {
  articlePath,
  babyNapTimesRelatedArticles,
  babyNapTimesSections,
} from '@/data/baby-nap-times-page';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Resettling at Nap Times | Annabel Karmel',
  description:
    'Practical nap-time advice from Kerry Secker on short naps, resettling, white noise, and when to let it go.',
};

export default function BabyNapTimesPage() {
  return (
    <SleepAdviceArticlePage
      sections={babyNapTimesSections}
      relatedArticles={babyNapTimesRelatedArticles}
      attributionImage={`${articlePath}/kerry-secker.jpg`}
      styles={styles}
    />
  );
}
