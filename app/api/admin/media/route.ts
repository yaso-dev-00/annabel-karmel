import { NextResponse } from "next/server";
import { listCmsUploads } from "@/lib/admin/cms-upload-io";

export async function GET() {
  try {
    const items = await listCmsUploads();
    return NextResponse.json({ items });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list media";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
