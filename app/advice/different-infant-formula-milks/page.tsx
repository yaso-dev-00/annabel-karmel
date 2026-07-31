import { BreastfeedingArticlePage } from '@/components/ArticleScreen/BreastfeedingArticlePage';
import { bottleFeedingArticles } from '@/data/bottle-feeding-articles';
import type { Metadata } from 'next';
import styles from './page.module.css';

const article = bottleFeedingArticles['different-infant-formula-milks'];

export const metadata: Metadata = {
  title: article.metaTitle,
  description: article.metaDescription,
};

export default function DifferentInfantFormulaMilksPage() {
  return <BreastfeedingArticlePage blocks={article.blocks} styles={styles} />;
}
