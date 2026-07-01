import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact-page";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact Us | Annabel Karmel",
  description:
    "Get in touch with Annabel Karmel for product enquiries, partnerships, press requests, and customer support.",
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
