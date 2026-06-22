import type { Metadata } from "next";

import { ChilledProductPageContent } from "@/components/chilled-product-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { tastyChickenPastaPageData } from "@/data/tasty-chicken-pasta-page";

export const metadata: Metadata = {
  title: "Tasty Chicken Pasta in a Tomato & Veggie Sauce | Annabel Karmel",
  description:
    "Calling little pasta lovers! Tuck into Annabel's chicken pasta in a fresh tomato, veggie and creamy mascarpone sauce.",
};

export default function TastyChickenPastaPage() {
  return (
    <>
      <SiteHeader />
      <ChilledProductPageContent data={tastyChickenPastaPageData} />
      <SiteFooter />
    </>
  );
}
