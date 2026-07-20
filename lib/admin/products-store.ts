import seedStore from "@/data/cms/products.seed.json";
import { isProductPublic } from "@/lib/admin/product-status";
import {
  readProductsCmsStoreRaw,
  writeProductsCmsStoreRaw,
} from "@/lib/admin/products-cms-store-io";
import { sanitizeProduct, sanitizeProductsStore } from "@/lib/products/sanitize-product";
import type { Product, ProductsStore } from "@/lib/products/types";

async function readStore(): Promise<ProductsStore> {
  let raw: string;
  try {
    raw = await readProductsCmsStoreRaw();
  } catch {
    raw = JSON.stringify(seedStore);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = seedStore;
  }

  return sanitizeProductsStore(parsed);
}

async function writeStore(store: ProductsStore): Promise<void> {
  await writeProductsCmsStoreRaw(JSON.stringify(store, null, 2));
}

export async function getAllProducts(): Promise<Product[]> {
  const store = await readStore();
  return store.products.slice().sort((a, b) => a.title.localeCompare(b.title));
}

export async function getProductById(id: string): Promise<Product | null> {
  const store = await readStore();
  return store.products.find((product) => product.id === id) ?? null;
}

export async function getPublishedProductBySlug(slug: string): Promise<Product | null> {
  const store = await readStore();
  const product = store.products.find((item) => item.slug === slug);
  if (!product || !isProductPublic(product)) return null;
  return product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const store = await readStore();
  return store.products.find((item) => item.slug === slug) ?? null;
}

function assertUniqueSlug(store: ProductsStore, slug: string, excludeId?: string): void {
  const conflict = store.products.find(
    (product) => product.slug === slug && product.id !== excludeId,
  );
  if (conflict) {
    throw new Error(`A product with slug "${slug}" already exists.`);
  }
}

export async function createProduct(
  input: Omit<Product, "id" | "created_at" | "updated_at">,
): Promise<Product> {
  const store = await readStore();
  assertUniqueSlug(store, input.slug.trim());

  const now = new Date().toISOString();
  const product = sanitizeProduct({
    ...input,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  });

  store.products.push(product);
  await writeStore(store);
  return product;
}

export async function updateProduct(
  id: string,
  input: Partial<Omit<Product, "id" | "created_at">>,
): Promise<Product | null> {
  const store = await readStore();
  const index = store.products.findIndex((product) => product.id === id);
  if (index === -1) return null;

  const nextSlug = input.slug?.trim() ?? store.products[index].slug;
  assertUniqueSlug(store, nextSlug, id);

  const updated = sanitizeProduct({
    ...store.products[index],
    ...input,
    id,
    updated_at: new Date().toISOString(),
  });
  store.products[index] = updated;
  await writeStore(store);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.products.filter((product) => product.id !== id);
  if (next.length === store.products.length) return false;
  await writeStore({ products: next });
  return true;
}
