import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { AdList } from "@/components/Admin/AdList/ad-list";
import { getAllAds } from "@/lib/admin/ads-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminAdsListPage() {
  const ads = await getAllAds();

  return (
    <AdminShell
      title="Advertisements"
      breadcrumb="Advertisements"
      actions={
        <Link href="/admin/ads/new" className="btn btnPrimary">
          + New advertisement
        </Link>
      }
    >
      <AdList ads={ads} />
    </AdminShell>
  );
}
