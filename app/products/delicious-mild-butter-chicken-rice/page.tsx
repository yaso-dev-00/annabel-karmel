import type { Metadata } from "next";

import { AustraliaFrozenProductPageContent } from "@/components/australia-frozen-product-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAustraliaFrozenProductData } from "@/data/australia-frozen-products";

const data = getAustraliaFrozenProductData("delicious-mild-butter-chicken-rice")!;

export const metadata: Metadata = {
  title: `${data.title} | Annabel Karmel`,
  description: data.metaDescription,
};

export default function DeliciousMildButterChickenRicePage() {
  return (
    <>
      <SiteHeader />
      <AustraliaFrozenProductPageContent data={data} />
      <SiteFooter />
    </>
  );
}
