import { AdviceCategoryListing } from "@/components/ArticleScreen/AdviceCategoryListing";
import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { bottleFeedingListingArticles } from "@/data/bottle-feeding-listing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bottle Feeding Tips | Annabel Karmel",
  description:
    "Bottle feeding tips and advice from Annabel Karmel, covering paced and responsive bottle feeding, sterilising bottles, and choosing and preparing formula milk.",
};

export default function BottleFeedingTipsCategoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1250px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <h1 className="mt-3 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.12] text-[#3a3a3a]">
            Bottle Feeding Tips
          </h1>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 sm:px-6 lg:px-8">
          <AdviceCategoryListing articles={bottleFeedingListingArticles} />
        </section>

        <div className="mt-[90px]">
          <InstagramShareSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
