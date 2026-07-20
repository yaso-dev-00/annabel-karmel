import type { Product } from "@/lib/products/types";

const BASE = "/api/admin/products";

async function readApiError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    return data.error ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(BASE, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to fetch products"));
  const data = (await res.json()) as { products: Product[] };
  return data.products;
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await readApiError(res, "Product not found"));
  return (await res.json()) as Product;
}

export async function createProductApi(
  input: Omit<Product, "id" | "created_at" | "updated_at">,
): Promise<Product> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to create product"));
  return (await res.json()) as Product;
}

export async function updateProductApi(
  id: string,
  input: Partial<Omit<Product, "id" | "created_at">>,
): Promise<Product> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to update product"));
  return (await res.json()) as Product;
}

export async function deleteProductApi(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(await readApiError(res, "Failed to delete product"));
}
