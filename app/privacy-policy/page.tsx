import type { Metadata } from 'next';

import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { LegalPageContent } from '@/components/LegalScreen/LegalPageContent';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';
import { privacyPolicyPage } from '@/data/footer-pages/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Annabel Karmel',
  description: "Read Annabel Karmel's website and app privacy policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPageContent
        title={privacyPolicyPage.title}
        html={privacyPolicyPage.html}
      />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
