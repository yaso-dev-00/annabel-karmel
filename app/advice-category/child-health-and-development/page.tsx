import { AdviceCategoryListing } from "@/components/advice-category-listing";
import { InstagramShareSection } from "@/components/instagram-share-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  childHealthDevelopmentArticles,
  childHealthDevelopmentIntro,
} from "@/data/child-health-development-listing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Development, Health & Learning | Annabel Karmel",
  description: childHealthDevelopmentIntro,
};

export default function ChildHealthDevelopmentCategoryPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1250px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <h1 className="mt-3 [font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.12] text-[#3a3a3a]">
            Child Development, Health and Learning
          </h1>
          <p className="mx-auto mt-[40px] max-w-[900px] [font-family:var(--font-montserrat)] text-[22px] leading-[1.55] text-[#3d3d3d]">
            {childHealthDevelopmentIntro}
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 sm:px-6 lg:px-8">
          <AdviceCategoryListing articles={childHealthDevelopmentArticles} />
        </section>

        <div className="mt-[90px]">
          <InstagramShareSection />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
