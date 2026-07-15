import { NextResponse } from "next/server";
import { createPartnerPage, getAllPartners } from "@/lib/admin/partners-store";
import { revalidatePartnerPages } from "@/lib/admin/revalidate-partner-pages";
import type { PartnerPage } from "@/lib/content-blocks/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const partners = await getAllPartners();
  return NextResponse.json({ partners }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<PartnerPage, "id" | "created_at" | "updated_at">;
    const partner = await createPartnerPage(body);
    revalidatePartnerPages(partner);
    return NextResponse.json(partner, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create partner page";
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}
