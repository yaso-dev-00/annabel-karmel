import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { AdviceCategoryListing } from "@/components/ArticleScreen/AdviceCategoryListing";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { pregnancyTipsArticles, pregnancyTipsIntro } from "@/data/pregnancy-advice-listings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pregnancy Tips & Advice | Annabel Karmel",
  description: pregnancyTipsIntro,
};

export default function PregnancyTipsCategoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1250px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <h1 className="mt-3 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.12] text-[#3a3a3a]">
            Pregnancy and Postnatal Tips and Health Advice
          </h1>
          <p className="mt-[40px] [font-family:var(--font-montserrat)] text-[22px] leading-[1.55] text-[#3d3d3d]">
            {pregnancyTipsIntro}
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 sm:px-6 lg:px-8">
          <AdviceCategoryListing articles={pregnancyTipsArticles} />
        </section>

        <div className="mt-[90px]">
          <InstagramShareSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
