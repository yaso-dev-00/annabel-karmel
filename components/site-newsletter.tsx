"use client";

import { useState } from "react";
import { NewsletterModal } from "@/components/newsletter-modal";
import { SiteNewsletterBar } from "@/components/site-newsletter-bar";

export function SiteNewsletter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SiteNewsletterBar onOpenModal={() => setIsModalOpen(true)} />
      <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
