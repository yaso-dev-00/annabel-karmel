import { Suspense } from "react";
import { AdminLoginForm } from "@/components/Admin/AdminAuth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
