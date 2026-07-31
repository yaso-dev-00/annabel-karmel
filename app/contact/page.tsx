import type { Metadata } from 'next';

import { ContactPageContent } from '@/components/FooterPagesScreen/ContactPage';
import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import { SiteFooter } from '@/components/SiteLayout/SiteFooter';
import { SiteHeader } from '@/components/SiteLayout/SiteHeader';

export const metadata: Metadata = {
  title: 'Contact Us | Annabel Karmel',
  description:
    'Get in touch with Annabel Karmel for product enquiries, partnerships, press requests, and customer support.',
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <ContactPageContent />
      <InstagramShareSection />
      <SiteFooter />
    </>
  );
}
