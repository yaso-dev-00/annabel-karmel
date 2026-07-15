import { PreviewPageClient } from "@/components/Admin/CompetitionEditor/preview-page-client";
import { DisabledCompetitionPreview } from "@/components/Admin/CompetitionEditor/disabled-competition-preview";
import { getCompetitionById } from "@/lib/admin/competitions-store";
import { isCompetitionDisabled } from "@/lib/admin/competition-status";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminCompetitionPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const competition = await getCompetitionById(id);
  if (!competition) notFound();
  if (isCompetitionDisabled(competition)) {
    return <DisabledCompetitionPreview title={competition.title} />;
  }
  return <PreviewPageClient competition={competition} />;
}
