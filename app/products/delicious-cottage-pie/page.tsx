import type { Metadata } from "next";

import { ChilledProductPageContent } from "@/components/chilled-product-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { deliciousCottagePiePageData } from "@/data/delicious-cottage-pie-page";

export const metadata: Metadata = {
  title: "Delicious Cottage Pie | Annabel Karmel",
  description:
    "A cosy cottage pie with cheesy mash and hidden veg gravy – the perfect fuel for little tummies.",
};

export default function DeliciousCottagePiePage() {
  return (
    <>
      <SiteHeader />
      <ChilledProductPageContent data={deliciousCottagePiePageData} />
      <SiteFooter />
    </>
  );
}
