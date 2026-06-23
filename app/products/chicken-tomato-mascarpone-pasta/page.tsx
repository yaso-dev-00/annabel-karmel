import type { Metadata } from "next";

import { ChickenTomatoMascarponePastaPageContent } from "@/components/chicken-tomato-mascarpone-pasta-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Chicken Pasta | Frozen Meal for Children | Annabel Karmel",
  description:
    "Chunky pasta, tender chicken & a veggie-packed tomato and mascarpone sauce – always a dinner winner.",
};

export default function ChickenTomatoMascarponePastaPage() {
  return (
    <>
      <SiteHeader />
      <ChickenTomatoMascarponePastaPageContent />
      <SiteFooter />
    </>
  );
}
