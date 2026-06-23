import type { Metadata } from "next";

import { MightyBologneseMacAndCheesePageContent } from "@/components/mighty-bolognese-mac-and-cheese-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
