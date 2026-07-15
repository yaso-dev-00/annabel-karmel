import { PartnerPublicPage, generatePartnerPageMetadata } from "@/lib/admin/partner-public-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SLUG = "craft-crumb";

export async function generateMetadata(): Promise<Metadata> {
  return generatePartnerPageMetadata(SLUG);
}

export default function CraftCrumbPage() {
  return <PartnerPublicPage slug={SLUG} />;
}
