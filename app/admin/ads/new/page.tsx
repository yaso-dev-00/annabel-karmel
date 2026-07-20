import { AdminShell } from "@/components/Admin/AdminShell";
import { AdEditor } from "@/components/Admin/AdEditor/ad-editor";
import { createDefaultAd } from "@/components/Admin/AdEditor/create-default-ad";

export default function AdminAdNewPage() {
  const ad = createDefaultAd();

  return (
    <AdminShell breadcrumb="New advertisement">
      <AdEditor initialAd={ad} isNew />
    </AdminShell>
  );
}
