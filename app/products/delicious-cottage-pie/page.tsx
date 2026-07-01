import type { Metadata } from "next";

import { ChilledProductPageContent } from "@/components/ProductScreen/detail/ChilledProductPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
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
