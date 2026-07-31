'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { RecipeListingItem } from '@/data/recipe-taxonomies';

const iconButtonClass =
  'grid h-11 w-11 place-items-center rounded-full border-0 bg-white p-0 shadow-[0_2px_8px_rgba(58,58,58,0.12)] transition-[transform,box-shadow] duration-150 ease-in-out hover:scale-[1.04] hover:shadow-[0_3px_10px_rgba(58,58,58,0.18)]';

const heartIconClass = 'h-6 w-6 text-[#e58a9b]';

function RecipeLockIcon() {
  return (
    <span
      className="block h-8 w-8 bg-[url(/icons/app-exclusive-lock.png)] bg-contain bg-center bg-no-repeat"
      aria-hidden
    />
  );
}

function RecipeHeartIcon({ saved }: { saved: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`${heartIconClass} ${saved ? 'fill-[#e58a9b]' : 'fill-none'}`}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

type RecipeListingGridProps = {
  items: RecipeListingItem[];
};

export function RecipeListingGrid({ items }: RecipeListingGridProps) {
  const [savedTitles, setSavedTitles] = useState<Set<string>>(() => new Set());

  const toggleSaved = useCallback((title: string) => {
    setSavedTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  }, []);

  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-10 p-0 min-[768px]:grid-cols-2 min-[901px]:gap-x-7 min-[901px]:gap-y-[50px] min-[1101px]:grid-cols-3">
      {items.map((recipe) => (
        <li key={recipe.slug} className="m-0">
          <div className="relative isolate overflow-hidden bg-[#f4eef0]">
            <Link
              href={recipe.href}
              className="block"
              aria-label={recipe.title}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="block aspect-square h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <div className="pointer-events-auto absolute right-2.5 top-2.5 z-20 flex items-center gap-2.5">
              {recipe.appExclusive ? (
                <span
                  className={iconButtonClass}
                  aria-label="App exclusive recipe"
                  title="App exclusive"
                >
                  <RecipeLockIcon />
                </span>
              ) : null}
              {/* <button
                type="button"
                className={`${iconButtonClass} cursor-pointer`}
                aria-label={savedTitles.has(recipe.title) ? "Recipe saved" : "Click to save recipe"}
                title={savedTitles.has(recipe.title) ? "Recipe saved" : "Click to save"}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  toggleSaved(recipe.title);
                }}
              >
                <RecipeHeartIcon saved={savedTitles.has(recipe.title)} />
              </button> */}
            </div>
          </div>
          <h2 className="mt-[30px] text-center font-[family-name:var(--font-body)]! tracking-[1.54px] text-xl font-semibold leading-[1.32] text-[#3a3a3a]">
            <Link
              href={recipe.href}
              className="text-inherit no-underline hover:text-[var(--hover-color)]"
            >
              {recipe.title}
            </Link>
          </h2>
        </li>
      ))}
    </ul>
  );
}
