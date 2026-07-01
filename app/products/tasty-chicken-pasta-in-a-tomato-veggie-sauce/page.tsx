import type { Metadata } from "next";

import { ChilledProductPageContent } from "@/components/ProductScreen/detail/ChilledProductPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
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
