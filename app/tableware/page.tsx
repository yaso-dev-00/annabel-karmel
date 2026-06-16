import type { Metadata } from "next";

import { TablewarePageContent } from "@/components/tableware-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Grow Tableware | Annabel Karmel",
  description:
    "Every mealtime is a chance to nourish, nurture and explore. Annabel's expertly designed GROW tableware range supports your little one at every stage.",
};

export default function TablewarePage() {
  return (
    <>
      <SiteHeader />
      <TablewarePageContent />
      <SiteFooter />
    </>
  );
}
