import { ExpertPreviewPageClient } from "@/components/Admin/ExpertEditor/preview-page-client";
import { DisabledArticlePreview } from "@/components/Admin/AdviceArticleEditor/disabled-article-preview";
import { getExpertById } from "@/lib/admin/experts-store";
import { isExpertDisabled } from "@/lib/admin/expert-status";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminExpertsPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const expert = await getExpertById(id);
  if (!expert) notFound();
  if (isExpertDisabled(expert)) {
    return <DisabledArticlePreview title={expert.name} />;
  }
  return <ExpertPreviewPageClient expert={expert} />;
}
