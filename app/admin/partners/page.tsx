import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { PartnerPageList } from "@/components/Admin/PartnerPageList/partner-page-list";
import { getAllPartners } from "@/lib/admin/partners-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPartnersListPage() {
  const partners = await getAllPartners();

  return (
    <AdminShell
      title="Our Partners"
      breadcrumb="Our Partners"
      actions={
        <Link href="/admin/partners/new" className="btn btnPrimary">
          + New partner page
        </Link>
      }
    >
      <PartnerPageList partners={partners} />
    </AdminShell>
  );
}
