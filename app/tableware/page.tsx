import type { Metadata } from "next";

import { TablewarePageContent } from "@/components/ProductScreen/tableware/TablewarePage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

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
