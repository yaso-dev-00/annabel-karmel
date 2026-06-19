import type { Metadata } from "next";

import { MildChickenTikkaPageContent } from "@/components/mild-chicken-tikka-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Mild Chicken Tikka | Annabel Karmel",
  description:
    "Curry night with a tot-twist! Tender chicken pieces in a mild creamy tomato and coconut sauce with fluffy rice. Made without dairy.",
};

export default function MildChickenTikkaPage() {
  return (
    <>
      <SiteHeader />
      <MildChickenTikkaPageContent />
      <SiteFooter />
    </>
  );
}
