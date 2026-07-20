import { AdminShell } from "@/components/Admin/AdminShell";
import { AdEditor } from "@/components/Admin/AdEditor/ad-editor";
import { getAdById } from "@/lib/admin/ads-store";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminAdEditPage({ params }: PageProps) {
  const { id } = await params;
  const ad = await getAdById(id);
  if (!ad) notFound();

  return (
    <AdminShell breadcrumb="Edit advertisement">
      <AdEditor initialAd={ad} />
    </AdminShell>
  );
}
