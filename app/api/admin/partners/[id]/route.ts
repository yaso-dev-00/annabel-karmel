import { NextResponse } from "next/server";
import {
  deletePartnerPage,
  getPartnerPageById,
  updatePartnerPage,
} from "@/lib/admin/partners-store";
import { revalidatePartnerPages } from "@/lib/admin/revalidate-partner-pages";
import type { PartnerPage } from "@/lib/content-blocks/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const partner = await getPartnerPageById(id);
  if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE_HEADERS });
  return NextResponse.json(partner, { headers: NO_STORE_HEADERS });
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<Omit<PartnerPage, "id" | "created_at">>;
    const partner = await updatePartnerPage(id, body);
    if (!partner) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE_HEADERS });
    revalidatePartnerPages(partner);
    return NextResponse.json(partner, { headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update partner page";
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const partner = await getPartnerPageById(id);
  const deleted = await deletePartnerPage(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_STORE_HEADERS });
  revalidatePartnerPages(partner ?? { id });
  return NextResponse.json({ ok: true }, { headers: NO_STORE_HEADERS });
}
