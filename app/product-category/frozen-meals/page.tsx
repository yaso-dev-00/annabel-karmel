import type { Metadata } from "next";

import { FrozenMealsPageContent } from "@/components/frozen-meals-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Frozen Meals for Toddlers & Kids | Annabel Karmel",
  description:
    "Make tonight's dinner a doddle with Annabel's freezer-friendly award-winning meals inspired by kids' all-time favourites.",
};

export default function FrozenMealsPage() {
  return (
    <>
      <SiteHeader />
      <FrozenMealsPageContent />
      <SiteFooter />
    </>
  );
}
