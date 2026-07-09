import { NextResponse } from "next/server";
import {
  createAdviceArticle,
  getAllAdviceArticles,
} from "@/lib/admin/advice-articles-store";
import { revalidateAdviceArticlePages } from "@/lib/admin/revalidate-advice-pages";
import type { AdviceArticle } from "@/lib/content-blocks/types";

export async function GET() {
  const articles = await getAllAdviceArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<AdviceArticle, "id" | "created_at" | "updated_at">;
  const article = await createAdviceArticle(body);
  revalidateAdviceArticlePages();
  return NextResponse.json(article, { status: 201 });
}
