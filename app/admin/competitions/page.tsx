import Link from "next/link";
import { AdminShell } from "@/components/Admin/AdminShell";
import { CompetitionList } from "@/components/Admin/CompetitionList/competition-list";
import { getAllCompetitions } from "@/lib/admin/competitions-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCompetitionsListPage() {
  const competitions = await getAllCompetitions();

  return (
    <AdminShell
      title="Competitions"
      breadcrumb="Competitions"
      actions={
        <Link href="/admin/competitions/new" className="btn btnPrimary">
          + New competition
        </Link>
      }
    >
      <CompetitionList competitions={competitions} />
    </AdminShell>
  );
}
