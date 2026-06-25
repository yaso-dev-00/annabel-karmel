import type { Metadata } from "next";

import { EmpowerYourEmployeesPageContent } from "@/components/empower-your-employees-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Empower your employees | Annabel Karmel",
  description:
    "Empower your employees with Annabel Karmel's essential recipe app. Request a demo and discover the ultimate wellness benefit for healthy family mealtimes.",
};

export default function EmpowerYourEmployeesPage() {
  return (
    <>
      <SiteHeader />
      <EmpowerYourEmployeesPageContent />
      <SiteFooter />
    </>
  );
}
