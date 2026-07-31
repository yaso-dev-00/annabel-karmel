import { SleepAdviceArticlePage } from '@/components/ArticleScreen/SleepAdviceArticlePage';
import {
  articlePath,
  bustingCommonBabySleepMythsRelatedArticles,
  bustingCommonBabySleepMythsSections,
} from '@/data/busting-common-baby-sleep-myths-page';
import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Busting Common Baby Sleep Myths | Annabel Karmel',
  description:
    'Paediatric sleep consultant Kerry Secker separates fact from fiction with 8 common baby sleep myths every parent should know.',
};

export default function BustingCommonBabySleepMythsPage() {
  return (
    <SleepAdviceArticlePage
      sections={bustingCommonBabySleepMythsSections}
      relatedArticles={bustingCommonBabySleepMythsRelatedArticles}
      attributionImage={`${articlePath}/kerry-secker.jpg`}
      styles={styles}
    />
  );
}
