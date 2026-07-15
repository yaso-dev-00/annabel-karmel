import { AdminShell } from "@/components/Admin/AdminShell";
import { PartnerPageEditor } from "@/components/Admin/PartnerPageEditor/partner-page-editor";
import { getPartnerPageById } from "@/lib/admin/partners-store";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminPartnerEditPage({ params }: PageProps) {
  const { id } = await params;
  const partner = await getPartnerPageById(id);
  if (!partner) notFound();

  return (
    <AdminShell breadcrumb="Edit partner page">
      <PartnerPageEditor initialPartner={partner} />
    </AdminShell>
  );
}
