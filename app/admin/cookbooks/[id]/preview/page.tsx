import { CookbookPreviewPageClient } from "@/components/Admin/CookbookEditor/preview-page-client";
import { DisabledArticlePreview } from "@/components/Admin/AdviceArticleEditor/disabled-article-preview";
import { getCookbookById } from "@/lib/admin/cookbooks-store";
import { isCookbookDisabled } from "@/lib/admin/cookbook-status";
import { notFound } from "next/navigation";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminCookbooksPreviewPage({ params }: PageProps) {
  const { id } = await params;
  const cookbook = await getCookbookById(id);
  if (!cookbook) notFound();
  if (isCookbookDisabled(cookbook)) {
    return <DisabledArticlePreview title={cookbook.title} />;
  }
  return <CookbookPreviewPageClient cookbook={cookbook} />;
}
