import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { expertDetails, expertsIntro } from "@/data/site-content";

export default function MeetOurExpertsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1120px] px-4 pb-10 pt-10 text-center sm:px-6 md:pt-14 lg:px-8">
          <h1 className="[font-family:var(--font-playfair)] text-[40px] font-semibold leading-[1.08] text-[#161418] md:text-[52px]">
            Meet Our Experts
          </h1>
          <p className="mx-auto mt-7 max-w-[900px] [font-family:var(--font-montserrat)] text-[19px] leading-[1.55] text-[#514a52] md:text-[21px]">
            {expertsIntro}
          </p>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertDetails.map((expert) => (
              <article key={expert.name} className="overflow-hidden border border-[#ece5e7] bg-white">
                <a href={`/meet-our-experts/${expert.slug}`}>
                  <img src={expert.image} alt={expert.name} className="h-[280px] w-full object-cover md:h-[300px]" />
                </a>
                <div className="px-5 pb-6 pt-4 text-center">
                  <h2 className="[font-family:var(--font-playfair)] text-[30px] leading-[1.12] text-[#2f2d35]">{expert.name}</h2>
                  <p className="mt-2 [font-family:var(--font-montserrat)] text-[14px] font-medium uppercase tracking-[0.06em] text-[#8a4d68]">
                    {expert.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
