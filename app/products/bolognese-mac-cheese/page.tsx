import type { Metadata } from "next";

import { AustraliaFrozenProductPageContent } from "@/components/australia-frozen-product-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAustraliaFrozenProductData } from "@/data/australia-frozen-products";

const data = getAustraliaFrozenProductData("bolognese-mac-cheese")!;

export const metadata: Metadata = {
  title: `${data.title} | Annabel Karmel`,
  description: data.metaDescription,
};

export default function BologneseMacCheesePage() {
  return (
    <>
      <SiteHeader />
      <AustraliaFrozenProductPageContent data={data} />
      <SiteFooter />
    </>
  );
}
