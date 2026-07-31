import type { Metadata } from 'next';

import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { LegalPageContent } from '@/components/LegalScreen/LegalPageContent';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { cookiePolicyPage } from '@/data/footer-pages/cookie-policy';

export const metadata: Metadata = {
  title: 'Cookie Policy | Annabel Karmel',
  description: 'Read how Annabel Karmel uses cookies on this website.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPageContent
        title={cookiePolicyPage.title}
        html={cookiePolicyPage.html}
      />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
