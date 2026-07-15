import { CompetitionShell } from "@/components/ContentBlocks/competition-shell";
import { getPublishedCompetitionBySlug, getAllCompetitions } from "@/lib/admin/competitions-store";
import { isCompetitionPublic } from "@/lib/admin/competition-status";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const competitions = await getAllCompetitions();
  return competitions
    .filter((competition) => isCompetitionPublic(competition))
    .map((competition) => ({ slug: competition.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const competition = await getPublishedCompetitionBySlug(slug);
  if (!competition) return { title: "Competitions | Annabel Karmel" };
  return {
    title: competition.seo_title || competition.title,
    description: competition.seo_description,
  };
}

export default async function CompetitionPage({ params }: PageProps) {
  const { slug } = await params;
  const competition = await getPublishedCompetitionBySlug(slug);
  if (!competition) notFound();
  return <CompetitionShell competition={competition} />;
}
