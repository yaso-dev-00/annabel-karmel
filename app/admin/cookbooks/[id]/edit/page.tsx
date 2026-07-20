import { AdminShell } from "@/components/Admin/AdminShell";
import { CookbookEditor } from "@/components/Admin/CookbookEditor/cookbook-editor";
import { getCookbookById } from "@/lib/admin/cookbooks-store";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminCookbooksEditPage({ params }: PageProps) {
  const { id } = await params;
  const cookbook = await getCookbookById(id);
  if (!cookbook) notFound();

  return (
    <AdminShell breadcrumb="Edit cookbook">
      <CookbookEditor initialCookbook={cookbook} />
    </AdminShell>
  );
}
