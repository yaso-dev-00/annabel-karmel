import { NextResponse } from "next/server";
import {
  createCompetition,
  getAllCompetitions,
} from "@/lib/admin/competitions-store";
import { revalidateCompetitionPages } from "@/lib/admin/revalidate-competition-pages";
import type { Competition } from "@/lib/content-blocks/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const competitions = await getAllCompetitions();
  return NextResponse.json({ competitions }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<Competition, "id" | "created_at" | "updated_at">;
    const competition = await createCompetition(body);
    revalidateCompetitionPages(competition);
    return NextResponse.json(competition, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create competition";
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}
