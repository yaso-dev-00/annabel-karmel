import { BreastfeedingArticlePage } from '@/components/ArticleScreen/BreastfeedingArticlePage';
import { breastfeedingArticles } from '@/data/breastfeeding-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

const article = breastfeedingArticles['breastfeeding-multiples'];

export const metadata: Metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
};

export default function BreastfeedingMultiplesPage() {
  return <BreastfeedingArticlePage blocks={article.blocks} styles={styles} />;
}
