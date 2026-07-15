import { NextResponse } from "next/server";
import { createArticle, getAllArticles } from "@/lib/admin/articles-store";
import { revalidateArticlePages } from "@/lib/admin/revalidate-article-pages";
import type { Article } from "@/lib/content-blocks/types";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const articles = await getAllArticles();
  return NextResponse.json({ articles }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<Article, "id" | "created_at" | "updated_at">;
    const article = await createArticle(body);
    revalidateArticlePages(article);
    return NextResponse.json(article, { status: 201, headers: NO_STORE_HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create article";
    return NextResponse.json({ error: message }, { status: 500, headers: NO_STORE_HEADERS });
  }
}
