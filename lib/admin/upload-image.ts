export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? 'Upload failed');
  }

  const data = (await res.json()) as { url: string };
  return data.url;
}
