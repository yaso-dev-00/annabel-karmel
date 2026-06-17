import type { Metadata } from "next";

import { OurBooksPageContent } from "@/components/our-books-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Our Books | Annabel Karmel",
  description:
    "Discover Annabel Karmel’s bestselling cookbooks — from weaning and finger foods to cooking with kids and quick family meals.",
};

export default function CookbooksPage() {
  return (
    <>
      <SiteHeader />
      <OurBooksPageContent />
      <SiteFooter />
    </>
  );
}
