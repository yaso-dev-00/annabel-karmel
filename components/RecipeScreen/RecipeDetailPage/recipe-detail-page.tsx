import Link from "next/link";

import {
  RecipeIconAges,
  RecipeIconCook,
  RecipeIconDietary,
  RecipeIconFreezing,
  RecipeIconPortions,
  RecipeIconPrep,
} from "@/components/RecipeScreen/RecipeDetailIcons";
import type { RecipeDetail, RecipeTaxonomyLink } from "@/data/recipe-detail";
import styles from "./recipe-detail-page.module.css";

type RecipeDetailPageProps = {
  recipe: RecipeDetail;
  shareUrl: string;
};

const shareButtonClass =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e98c9a] text-white transition-colors duration-[180ms] ease-in-out hover:bg-[#d97a88] [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-white";

const metaIconClass = "h-7 w-7 shrink-0 object-contain";

function buildShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };
}

function TaxonomyLinks({ items }: { items: RecipeTaxonomyLink[] }) {
  if (items.length === 0) return <span className="text-[#969494]">—</span>;
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={styles.metaLink}>
          {item.label}
        </Link>
      ))}
    </span>
  );
}

export function RecipeDetailPage({ recipe, shareUrl }: RecipeDetailPageProps) {
  const share = buildShareLinks(shareUrl, recipe.title);
  const breadcrumb = recipe.breadcrumb?.[0];

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-[1200px] px-3.5 pt-7 md:px-3.5">
        <nav
          className="mb-6 font-[family-name:var(--font-montserrat)] text-sm text-[#636262]"
          aria-label="Breadcrumb"
        >
          <Link href="/recipe-category/first-foods/" className={styles.breadcrumbLink}>
            Recipes
          </Link>
          {breadcrumb ? (
            <>
              {" > "}
              <Link href={breadcrumb.href} className={styles.breadcrumbLink}>
                {breadcrumb.label}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="mb-14 grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
          <div className="min-w-0">
            <div className="relative aspect-square overflow-hidden bg-[#f6f6f6] max-md:mx-auto max-md:max-w-[520px]">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="block h-full w-full object-cover"
                  fetchPriority="high"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#969494]">
                  No image
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-3.5 justify-center items-center md:flex-row md:gap-4">
              <p className="m-0 font-[family-name:var(--font-montserrat)] text-lg font-bold text-[#3a3a3a]">
                Share
              </p>
              <div className="flex flex-wrap gap-3 md:flex-nowrap">
                <a
                  href={share.facebook}
                  className={shareButtonClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                >
                  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v8h4v-8h3.4l.6-4H13v-2c0-.6.4-1 1-1z" />
                  </svg>
                </a>
                <a
                  href={share.twitter}
                  className={shareButtonClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                >
                  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M18.9 4H22l-6.8 7.8L22.7 20h-6.2l-4.8-6.2L5.8 20H2.7l7.3-8.4L2 4h6.3l4.3 5.6L18.9 4zm-1.1 14h1.7L7.1 5.9H5.3L17.8 18z" />
                  </svg>
                </a>
                <a
                  href={share.pinterest}
                  className={shareButtonClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Pinterest"
                >
                  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M12 2a10 10 0 0 0-3.5 19.4c-.1-.9-.2-2.2.1-3.2.2-.8 1.4-5.4 1.4-5.4s-.4-.8-.4-2c0-1.9 1.1-3.3 2.5-3.3 1.2 0 1.7.9 1.7 2s-.8 3-1.2 4.7c-.3 1.4.7 2.6 2.1 2.6 2.5 0 4.4-2.6 4.4-6.4 0-3.3-2.4-5.6-5.8-5.6-4 0-6.3 3-6.3 6.1 0 1.2.5 2.5 1.1 3.2.1.1.1.2.1.3l-.4 1.6c-.1.5-.3.6-.7.4-2-.9-3.2-3.8-3.2-6.1 0-5 3.6-9.6 10.4-9.6 5.5 0 9.7 3.9 9.7 9.2 0 5.4-3.4 9.8-8.2 9.8-1.6 0-3.1-.8-3.6-1.8l-1 3.7c-.4 1.4-1.4 3.2-2.1 4.3A10 10 0 1 0 12 2z" />
                  </svg>
                </a>
                <a
                  href={share.whatsapp}
                  className={shareButtonClass}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="#fff" aria-hidden>
                    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.2 1.1-1.7 1.1-.4 0-1 .2-3.4-.8-2.9-1.2-4.8-4.3-4.9-4.5-.1-.2-1.2-1.5-1.2-3 0-1.5.8-2.2 1.1-2.5.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.7.5.2.6.9 2.2.9 2.4 0 .1 0 .3-.1.4-.1.1-.2.3-.3.4l-.4.4c-.1.1-.2.2-.1.4.2.4.9 1.5 2 2.4 1.4 1.1 2.5 1.4 2.9 1.6.4.1.6.1.8-.1.2-.2.9-1 1.1-1.4.1-.4.3-.3.7-.2.4.1 2.5 1.2 2.9 1.4.4.2.7.3.8.5.1.2.1 1-.1 1.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] text-[#3a3a3a]">
              {recipe.title}
            </h1>
            {recipe.description ? (
              <p className="mb-7 font-[family-name:var(--font-montserrat)] text-lg leading-[1.55] text-[#636262]">
                {recipe.description}
              </p>
            ) : null}

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {recipe.allergens.length > 0 ? (
                <li className="flex items-start gap-3 font-[family-name:var(--font-montserrat)] text-base leading-[1.45] text-[#3a3a3a]">
                  <RecipeIconDietary className={metaIconClass} />
                  <TaxonomyLinks items={recipe.allergens} />
                </li>
              ) : null}
              {recipe.suitableForFreezing ? (
                <li className="flex items-start gap-3 font-[family-name:var(--font-montserrat)] text-base leading-[1.45] text-[#3a3a3a]">
                  <RecipeIconFreezing className={metaIconClass} />
                  <span>Suitable For Freezing</span>
                </li>
              ) : null}
              {recipe.prepTime ? (
                <li className="flex items-start gap-3 font-[family-name:var(--font-montserrat)] text-base leading-[1.45] text-[#3a3a3a]">
                  <RecipeIconPrep className={metaIconClass} />
                  <span>{recipe.prepTime}</span>
                </li>
              ) : null}
              {recipe.cookTime ? (
                <li className="flex items-start gap-3 font-[family-name:var(--font-montserrat)] text-base leading-[1.45] text-[#3a3a3a]">
                  <RecipeIconCook className={metaIconClass} />
                  <span>{recipe.cookTime}</span>
                </li>
              ) : null}
              {recipe.portions ? (
                <li className="flex items-start gap-3 font-[family-name:var(--font-montserrat)] text-base leading-[1.45] text-[#3a3a3a]">
                  <RecipeIconPortions className={metaIconClass} />
                  <span>{recipe.portions}</span>
                </li>
              ) : null}
              {recipe.ages.length > 0 ? (
                <li className="flex items-start gap-3 font-[family-name:var(--font-montserrat)] text-base leading-[1.45] text-[#3a3a3a]">
                  <RecipeIconAges className={metaIconClass} />
                  <TaxonomyLinks items={recipe.ages} />
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pb-12 md:grid-cols-2 md:gap-x-14 md:gap-y-10">
          <section aria-labelledby="recipe-ingredients-heading">
            <h2
              id="recipe-ingredients-heading"
              className="mb-6 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.12] text-[#3a3a3a] max-md:text-[1.875rem]"
            >
              Ingredients
            </h2>
            <ul className="m-0 list-none space-y-2 p-0 font-[family-name:var(--font-montserrat)] text-lg leading-[1.65] text-[#636262]">
              {recipe.ingredients.length === 0 ? (
                <li className="text-[#969494]">No ingredients yet</li>
              ) : (
                recipe.ingredients.map((line) => <li key={line}>{line}</li>)
              )}
            </ul>
          </section>

          <section aria-labelledby="recipe-method-heading">
            <h2
              id="recipe-method-heading"
              className="mb-6 font-[family-name:var(--font-playfair)] text-4xl font-medium leading-[1.12] text-[#3a3a3a] max-md:text-[1.875rem]"
            >
              Method
            </h2>
            <ol
              className={`${styles.methodList} font-[family-name:var(--font-montserrat)] text-lg leading-[1.65] text-[#636262]`}
            >
              {recipe.method.length === 0 ? (
                <li className="text-[#969494]">No steps yet</li>
              ) : (
                recipe.method.map((step) => <li key={step}>{step}</li>)
              )}
            </ol>
          </section>
        </div>
      </div>

    </main>
  );
}
