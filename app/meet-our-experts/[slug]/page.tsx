import { InstagramShareSection } from "@/components/SiteLayout/InstagramShareSection";
import { SiteFooter } from "@/components/SiteLayout/SiteFooter";
import { SiteHeader } from "@/components/SiteLayout/SiteHeader";
import { expertDetails } from "@/data/site-content";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type ExpertDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/");
}

function ExpertTopicLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

export function generateStaticParams() {
  return expertDetails.map((expert) => ({ slug: expert.slug }));
}

export default async function ExpertDetailPage({ params }: ExpertDetailPageProps) {
  const { slug } = await params;
  const expert = expertDetails.find((entry) => entry.slug === slug);

  if (!expert) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <section className="mx-auto w-full max-w-[1040px] px-4 pb-3 pt-10 sm:px-6 md:pt-14 lg:px-8">
          <article className="text-center">
            <h1 className="[font-family:var(--font-playfair)] text-[40px] font-[450] leading-[1.08] text-[#1d1820] md:text-[42px]">
              {expert.name} - {expert.role}
            </h1>
            <img
              src={expert.image}
              alt={expert.name}
              className="mx-auto mt-7 h-[250px] w-[250px] rounded-full object-cover object-center"
            />
            <div className="mx-auto mt-7 max-w-[980px] space-y-4 text-center  [font-family:var(--font-montserrat)] text-[19px] md:text-[18px] leading-[1.6] text-[#4f4750]">
              {expert.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {expert.bioParagraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {expert.socialLink ? (
              <a
                href={expert.socialLink.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-[4px] border border-[#d3ced1] bg-white px-4 py-2 [font-family:var(--font-montserrat)] text-[14px] font-semibold text-[#3f3841] transition-colors hover:bg-[#f8f5f6]"
              >
                {expert.socialLink.label}
              </a>
            ) : null}
          </article>
        </section>

        <section className="mx-auto w-full max-w-[1120px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 md:gap-19">
            {expert.articleTopics.map((topic) => {
              const topicHref = topic.href ?? expert.sourceUrl;

              return (
                <article
                  key={topic.title}
                  className="grid grid-cols-1 items-center justify-items-center gap-6 text-center md:grid-cols-[300px_1fr] md:justify-items-stretch md:gap-18 md:text-left"
                >
                  <ExpertTopicLink href={topicHref} className="mx-auto block w-full max-w-[300px] md:mx-0">
                    <img
                      src={topic.image ?? expert.image}
                      alt={topic.title}
                      className="h-[220px] w-full object-cover md:h-[210px]"
                    />
                  </ExpertTopicLink>
                  <div>
                    <h3 className="[font-family:var(--font-playfair)] text-[20px] leading-[1.2] font-[400] text-[#2f2d35] md:text-[26px]">
                      <ExpertTopicLink href={topicHref} className="hover:text-[#8f2f58]">
                        {topic.title}
                      </ExpertTopicLink>
                    </h3>
                    <ExpertTopicLink
                      href={topicHref}
                      className="mt-6 inline-flex items-center rounded-[4px] bg-[#6f7987] px-5 py-2 [font-family:var(--font-montserrat)] text-[14px] font-medium text-white transition-colors hover:bg-[#626c79]"
                    >
                      <span className="text-[14px] text-white md:text-[16px]">Read More</span>
                    </ExpertTopicLink>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <InstagramShareSection />
      </main>
      <SiteFooter />
    </>
  );
}
