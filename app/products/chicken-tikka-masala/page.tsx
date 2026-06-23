import type { Metadata } from "next";

import { ChickenTikkaMasalaPageContent } from "@/components/chicken-tikka-masala-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Chicken Tikka Masala | Frozen Ready Meal for Children | Annabel Karmel",
  description:
    "Tender chicken in a creamy coconut sauce with butternut squash, tomato and a hint of mango chutney. Made without dairy.",
};

export default function ChickenTikkaMasalaPage() {
  return (
    <>
      <SiteHeader />
      <ChickenTikkaMasalaPageContent />
      <SiteFooter />
    </>
  );
}
