import { createBlock } from "@/lib/content-blocks/defaults";
import type { PartnerPage } from "@/lib/content-blocks/types";

export function createDefaultPartnerStarterBlocks() {
  const heading = createBlock("heading", 0);
  heading.data = { level: "h2", text: "Partner page title" };

  const tag = createBlock("partnership_tag", 1);
  tag.data = {
    label: "In partnership with",
    logo_src: "",
    logo_alt: "Partner logo",
  };

  const intro = createBlock("rich_text", 2);
  intro.data = {
    variant: "body",
    html: "<p>Introduce the partnership and what families will find on this page.</p>",
  };

  return [heading, tag, intro];
}

export function createDefaultPartnerPage(): PartnerPage {
  const now = new Date().toISOString();
  return {
    id: "",
    slug: "",
    title: "Untitled partner page",
    listing_image: "",
    listing_image_alt: "",
    seo_title: "",
    seo_description: "",
    content_blocks: createDefaultPartnerStarterBlocks(),
    show_instagram_share: true,
    content_max_width: "default",
    status: "draft",
    scheduled_at: null,
    published_at: null,
    created_at: now,
    updated_at: now,
  };
}
