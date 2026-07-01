import type { Metadata } from "next";

import { MightyBologneseMacAndCheesePageContent } from "@/components/ProductScreen/detail/wrappers/MightyBologneseMacAndCheesePage";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";

export const metadata: Metadata = {
  title: "Bolognese Mac & Cheese | Frozen Kids' Meal | Annabel Karmel",
  description:
    "Creamy mac meets yummy Bolognese in this hearty, veggie-filled dish. It's the tastiest teatime mash-up!",
};

export default function MightyBologneseMacAndCheesePage() {
  return (
    <>
      <SiteHeader />
      <MightyBologneseMacAndCheesePageContent />
      <SiteFooter />
    </>
  );
}
