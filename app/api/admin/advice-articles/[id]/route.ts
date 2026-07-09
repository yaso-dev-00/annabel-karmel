import { NextResponse } from "next/server";
import {
  deleteAdviceArticle,
  getAdviceArticleById,
  updateAdviceArticle,
} from "@/lib/admin/advice-articles-store";
import { revalidateAdviceArticlePages } from "@/lib/admin/revalidate-advice-pages";
import type { AdviceArticle } from "@/lib/content-blocks/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const article = await getAdviceArticleById(id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(article);
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as Partial<Omit<AdviceArticle, "id" | "created_at">>;
  const article = await updateAdviceArticle(id, body);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidateAdviceArticlePages();
  return NextResponse.json(article);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const deleted = await deleteAdviceArticle(id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidateAdviceArticlePages();
  return NextResponse.json({ ok: true });
}
