import { promises as fs } from 'fs';
import path from 'path';
import seedStore from '@/data/cms/cookbooks.seed.json';

const CMS_DIR = path.join(process.cwd(), 'data', 'cms');
const LOCAL_RUNTIME_FILE = path.join(CMS_DIR, 'cookbooks.json');
const SEED_FILE = path.join(CMS_DIR, 'cookbooks.seed.json');
const BUNDLED_SEED_RAW = JSON.stringify(seedStore);

export const VERCEL_COOKBOOK_WRITE_ERROR =
  'Cookbook saves are disabled on Vercel while Blob storage is full. Edit locally and deploy, or free Blob quota.';

async function readSeedRaw(): Promise<string> {
  try {
    return await fs.readFile(SEED_FILE, 'utf8');
  } catch {
    return BUNDLED_SEED_RAW;
  }
}

export async function readCookbooksCmsStoreRaw(): Promise<string> {
  if (process.env.VERCEL) {
    return readSeedRaw();
  }

  try {
    return await fs.readFile(LOCAL_RUNTIME_FILE, 'utf8');
  } catch {
    return readSeedRaw();
  }
}

export async function writeCookbooksCmsStoreRaw(raw: string): Promise<void> {
  if (process.env.VERCEL) {
    throw new Error(VERCEL_COOKBOOK_WRITE_ERROR);
  }

  await fs.mkdir(CMS_DIR, { recursive: true });
  await fs.writeFile(LOCAL_RUNTIME_FILE, raw, 'utf8');
}
