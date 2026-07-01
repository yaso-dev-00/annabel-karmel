"use client";

import { useState } from "react";
import { NewsletterModal } from "@/components/SiteLayout/NewsletterModal";
import { SiteNewsletterBar } from "@/components/SiteLayout/SiteNewsletterBar";

export function SiteNewsletter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SiteNewsletterBar onOpenModal={() => setIsModalOpen(true)} />
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
