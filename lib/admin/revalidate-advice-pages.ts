import { revalidatePath } from "next/cache";

export function revalidateAdviceArticlePages(): void {
  revalidatePath("/admin");
  revalidatePath("/admin/advice");
}
