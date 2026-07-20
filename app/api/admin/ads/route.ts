import { NextResponse } from "next/server";
import { createAd, getAllAds } from "@/lib/admin/ads-store";
import type { SiteAd } from "@/lib/ads/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const ads = await getAllAds();
  return NextResponse.json({ ads }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<SiteAd, "id" | "created_at" | "updated_at">;
    const ad = await createAd(body);
    return NextResponse.json(ad, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create advertisement";
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}
