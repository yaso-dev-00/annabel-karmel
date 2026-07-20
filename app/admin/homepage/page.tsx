import { AdminShell } from "@/components/Admin/AdminShell";
import { HomepageEditor } from "@/components/Admin/HomepageEditor/homepage-editor";
import { getHomepageDocument } from "@/lib/admin/homepage-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminHomepagePage() {
  const document = await getHomepageDocument();

  return (
    <AdminShell title="Homepage Editor" breadcrumb="Homepage Editor">
      <HomepageEditor initialDocument={document} />
    </AdminShell>
  );
}
