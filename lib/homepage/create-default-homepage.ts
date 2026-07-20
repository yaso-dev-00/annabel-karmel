import {
  appSectionContent,
  awardLogos,
  bestsellingCookbooks,
  collabCards,
  expertRangeCards,
  heroSlides,
  instagramPostCards,
  latestRecipes,
  partnerLogos,
} from "@/data/site-content";
import type { HomepageDocument, HomepageSection } from "@/lib/homepage/types";

function id(prefix: string, index: number): string {
  return `${prefix}-${index + 1}`;
}

export function createDefaultHomepageSections(): HomepageSection[] {
  return [
    {
      id: "section-hero",
      type: "hero",
      data: {
        slides: heroSlides.map((slide, index) => ({
          id: id("hero-slide", index),
          title: slide.title,
          subtitle: slide.subtitle,
          cta: slide.cta,
          href: slide.href,
          image: slide.image,
        })),
      },
    },
    {
      id: "section-recipe-finder",
      type: "recipe_finder",
      data: {},
    },
    {
      id: "section-latest-recipes",
      type: "latest_recipes",
      data: {
        heading: "Latest recipes",
        subtitle: "Recipes for every age, stage and occasion",
        ctaLabel: "See all recipes",
        ctaHref: "/recipes",
        recipes: latestRecipes.map((recipe, index) => ({
          id: id("latest-recipe", index),
          title: recipe.title,
          duration: recipe.duration,
          href: recipe.href,
          image: recipe.image,
        })),
      },
    },
    {
      id: "section-recipe-app",
      type: "recipe_app",
      data: {
        heading: appSectionContent.heading,
        bullets: appSectionContent.bullets.map((bullet, index) => ({
          id: id("app-bullet", index),
          lead: bullet.lead,
          text: bullet.text,
        })),
        ctaLabel: appSectionContent.ctaLabel,
        ctaHref: appSectionContent.ctaHref,
        appStoreHref: appSectionContent.appStoreHref,
        playStoreHref: appSectionContent.playStoreHref,
        awards: appSectionContent.awards.map((award, index) => ({
          id: id("app-award", index),
          src: award.src,
          alt: award.alt,
        })),
        phonesImage: appSectionContent.phonesImage,
      },
    },
    {
      id: "section-expert-ranges",
      type: "expert_ranges",
      data: {
        heading: "Annabel's expert ranges",
        body: "My famous cookbook recipes are enjoyed by toddlers and children all over the world. And now they can refuel on my trusted favourites in a flash with my chilled and frozen meal ranges.",
        awardLogos: awardLogos.map((src, index) => ({
          id: id("award-logo", index),
          src,
          alt: "",
        })),
        cards: expertRangeCards.map((card, index) => ({
          id: id("expert-card", index),
          title: card.title,
          image: card.image,
          href: card.href,
        })),
      },
    },
    {
      id: "section-cookbooks",
      type: "cookbooks",
      data: {
        heading: "Bestselling cookbooks",
        body: "From weaning to kids cooking and quick and easy family meals, Annabel's delicious, nutritious and simple recipe books are a household staple.",
        ctaLabel: "Discover all cookbooks",
        ctaHref: "/app-book-category/our-books",
        books: bestsellingCookbooks.map((book, index) => ({
          id: id("cookbook", index),
          title: book.title,
          image: book.image,
          href: book.href,
        })),
      },
    },
    {
      id: "section-collabs",
      type: "collabs",
      data: {
        heading: "Annabel's collabs",
        cards: collabCards.map((card, index) => ({
          id: id("collab", index),
          title: card.title,
          subtitle: card.subtitle,
          href: card.href,
          logoImage: card.logoImage ?? "",
          cardImage: card.cardImage,
        })),
      },
    },
    {
      id: "section-partners",
      type: "partners",
      data: {
        heading: "Partner with us",
        body: "Partner with Annabel Karmel to connect your brand with young families through trusted, impactful collaborations.",
        ctaLabel: "Get in touch",
        ctaHref: "/contact",
        logos: partnerLogos.map((logo, index) => ({
          id: id("partner", index),
          name: logo.name,
          image: logo.image,
          href: logo.href,
        })),
      },
    },
    {
      id: "section-instagram",
      type: "instagram",
      data: {
        title: "Share the love",
        titleAccent: "#AnnabelKarmel",
        description:
          "Follow us on Instagram for exclusive recipes, competitions and lots more tasty content!",
        posts: instagramPostCards.map((post, index) => ({
          id: id("instagram", index),
          href: post.href,
          image: post.image,
          kind: post.kind,
        })),
      },
    },
  ];
}

export function createDefaultHomepageDocument(): HomepageDocument {
  const now = new Date().toISOString();
  return {
    id: "homepage",
    title: "Homepage",
    status: "published",
    scheduled_at: null,
    published_at: now,
    created_at: now,
    updated_at: now,
    sections: createDefaultHomepageSections(),
  };
}
