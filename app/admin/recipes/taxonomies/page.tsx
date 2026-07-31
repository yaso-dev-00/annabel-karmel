import { redirect } from 'next/navigation';

export default function AdminRecipeTaxonomiesRedirectPage() {
  redirect('/admin/recipes/categories');
}
