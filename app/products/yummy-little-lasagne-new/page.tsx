import type { Metadata } from "next";

import { ChilledProductPageContent } from "@/components/ProductScreen/detail/ChilledProductPage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { yummyLittleLasagnePageData } from "@/data/yummy-little-lasagne-page";

export const metadata: Metadata = {
  title: "Yummy Little Lasagne | Annabel Karmel",
  description:
    "Mini pasta squares layered with beef, hidden veg ragu and creamy cheese sauce – a quick, clever twist on lasagne just for kids!",
};

export default function YummyLittleLasagnePage() {
  return (
    <>
      <SiteHeader />
      <ChilledProductPageContent data={yummyLittleLasagnePageData} />
      <SiteFooter />
    </>
  );
}
