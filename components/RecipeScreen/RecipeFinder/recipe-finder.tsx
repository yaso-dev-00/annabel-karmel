'use client';

import { RecipeFinderSelect } from '@/components/RecipeScreen/RecipeFinderSelect';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  recipeFinderAgeOptions,
  recipeFinderAgePlaceholder,
  recipeFinderFreeFromOptions,
  recipeFinderFreeFromPlaceholder,
  recipeFinderMealTimeOptions,
  recipeFinderMealTimePlaceholder,
} from '@/data/recipe-finder-options';
import type { RecipeTaxonomy } from '@/data/recipe-taxonomies';
import { buildRecipeListingUrl } from '@/lib/recipe-search-url';
import type { RecipeSearchFilters } from '@/lib/recipe-search';
import { recipesArchiveHero } from '@/data/recipes-archive-page';

const FINDER_BG = recipesArchiveHero.finderBackground;

const findButtonClass =
  'w-full cursor-pointer border-0 bg-[#e98c9a] px-10 py-3 font-[family-name:var(--font-body)] text-lg font-bold tracking-wide text-white uppercase hover:bg-[#e07a8a]';

const resetButtonClass =
  'w-full cursor-pointer border-0 bg-[#f3c8cf] px-10 py-3 font-[family-name:var(--font-body)] text-lg font-bold tracking-wide text-white uppercase hover:bg-[#eab4bd]';

type RecipeFinderProps = {
  taxonomy?: RecipeTaxonomy;
  initialFilters: RecipeSearchFilters;
  variant?: 'archive' | 'category';
};

export function RecipeFinder({
  taxonomy,
  initialFilters,
  variant = taxonomy ? 'category' : 'archive',
}: RecipeFinderProps) {
  const isArchive = variant === 'archive';
  const router = useRouter();
  const hasAdvancedFilters = Boolean(
    initialFilters.mealTime ||
    initialFilters.freeFrom ||
    (!isArchive &&
      initialFilters.age &&
      taxonomy?.kind === 'recipe-category' &&
      initialFilters.age !== taxonomy.slug),
  );

  const [advancedOpen, setAdvancedOpen] = useState(hasAdvancedFilters);
  const [q, setQ] = useState(initialFilters.q ?? '');
  const [age, setAge] = useState(initialFilters.age ?? '');
  const [mealTime, setMealTime] = useState(initialFilters.mealTime ?? '');
  const [freeFromSlug, setFreeFromSlug] = useState(
    initialFilters.freeFrom ?? '',
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const submitFilters = useCallback(
    (overrides?: Partial<RecipeSearchFilters>) => {
      const next: RecipeSearchFilters = {
        age: overrides?.age !== undefined ? overrides.age : age || undefined,
        mealTime:
          overrides?.mealTime !== undefined
            ? overrides.mealTime
            : mealTime || undefined,
        freeFrom:
          overrides?.freeFrom !== undefined
            ? overrides.freeFrom
            : freeFromSlug || undefined,
        q: overrides?.q !== undefined ? overrides.q : q.trim() || undefined,
        page: 1,
      };

      if (!isArchive && taxonomy) {
        if (taxonomy.kind === 'recipe-category' && !next.age) {
          next.age = taxonomy.slug;
        }
        if (taxonomy.kind === 'meal-time' && !next.mealTime) {
          next.mealTime = taxonomy.slug;
        }
        if (taxonomy.kind === 'allergen' && !next.freeFrom) {
          next.freeFrom = taxonomy.slug;
        }
      }

      router.push(buildRecipeListingUrl(next));
    },
    [age, freeFromSlug, isArchive, mealTime, q, router, taxonomy],
  );

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitFilters();
  };

  const handleReset = () => {
    setQ('');
    setAge(
      isArchive
        ? ''
        : taxonomy?.kind === 'recipe-category'
          ? taxonomy.slug
          : '',
    );
    setMealTime(
      isArchive ? '' : taxonomy?.kind === 'meal-time' ? taxonomy.slug : '',
    );
    setFreeFromSlug(
      isArchive ? '' : taxonomy?.kind === 'allergen' ? taxonomy.slug : '',
    );
    setAdvancedOpen(false);
    router.push(isArchive ? '/recipes' : (taxonomy?.path ?? '/recipes'));
  };

  const toggleAdvanced = (event: React.MouseEvent) => {
    event.preventDefault();
    setAdvancedOpen((open) => !open);
  };

  return (
    <section
      className="relative mx-[calc(50%-50vw)] mb-[50px] flex min-h-[420px] w-screen max-w-screen items-center justify-center bg-[#f5f0eb] bg-cover bg-center bg-no-repeat px-5 py-14 max-[720px]:min-h-[360px] max-[720px]:px-4 max-[720px]:py-9"
      style={{ backgroundImage: `url("${FINDER_BG}")` }}
      aria-label={advancedOpen ? 'Recipe finder' : 'Find a recipe'}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto w-full max-w-[720px] text-center">
        {!advancedOpen ? (
          <div className="w-full">
            <h1 className="mb-7 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.5vw,3rem)] font-medium leading-[1.08] text-[#3a3a3a] max-[720px]:mb-[22px]">
              Find a Recipe
            </h1>
            <form
              className="relative mx-auto max-w-[560px]"
              onSubmit={handleSearchSubmit}
            >
              <label className="block">
                <span className="sr-only">Search recipes</span>
                <input
                  type="search"
                  name="q"
                  value={q}
                  onChange={(event) => setQ(event.target.value)}
                  placeholder="Search..."
                  className="w-full border border-[#ddd8d4] bg-white py-[15px] pr-[52px] pl-[18px] font-[family-name:var(--font-body)] text-base text-[#3a3a3a] placeholder:text-[#9a9399] focus:border-[#c9c0c4] focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="absolute top-1/2 right-3.5 grid -translate-y-1/2 place-items-center border-0 bg-transparent p-0 text-[#7a7278] cursor-pointer"
                aria-label="Search recipes"
              >
                <svg
                  viewBox="0 0 512 512"
                  aria-hidden
                  className="h-[18px] w-[18px]"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  />
                </svg>
              </button>
            </form>
            <button
              type="button"
              className="mt-4 cursor-pointer border-0 bg-transparent p-0 font-[family-name:var(--font-body)] text-xs font-semibold tracking-wider text-black hover:text-[var(--hover-color)]"
              onClick={toggleAdvanced}
            >
              ADVANCED SEARCH &gt;
            </button>
          </div>
        ) : (
          <div className="w-full">
            <h2 className="mb-2.5 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.1] text-[#3a3a3a] max-[720px]:mb-[22px]">
              Recipe Finder
            </h2>
            <p className="mb-[26px] font-[family-name:var(--font-body)] text-[15px] leading-snug text-[#6d646b]">
              Select an age and one other category
            </p>
            <div className="mx-auto grid max-w-[680px] grid-cols-3 gap-3 max-[720px]:max-w-[420px] max-[720px]:grid-cols-1">
              <div className="m-0 block min-w-0">
                <RecipeFinderSelect
                  id="recipe-finder-age"
                  value={age}
                  placeholder={recipeFinderAgePlaceholder}
                  options={recipeFinderAgeOptions}
                  ariaLabel={recipeFinderAgePlaceholder}
                  isOpen={openDropdown === 'age'}
                  onOpen={() => setOpenDropdown('age')}
                  onClose={() => setOpenDropdown(null)}
                  onChange={setAge}
                />
              </div>
              <div className="m-0 block min-w-0">
                <RecipeFinderSelect
                  id="recipe-finder-meal-time"
                  value={mealTime}
                  placeholder={recipeFinderMealTimePlaceholder}
                  options={recipeFinderMealTimeOptions}
                  ariaLabel={recipeFinderMealTimePlaceholder}
                  isOpen={openDropdown === 'mealTime'}
                  onOpen={() => setOpenDropdown('mealTime')}
                  onClose={() => setOpenDropdown(null)}
                  onChange={setMealTime}
                />
              </div>
              <div className="m-0 block min-w-0">
                <RecipeFinderSelect
                  id="recipe-finder-free-from"
                  value={freeFromSlug}
                  placeholder={recipeFinderFreeFromPlaceholder}
                  options={recipeFinderFreeFromOptions}
                  ariaLabel={recipeFinderFreeFromPlaceholder}
                  isOpen={openDropdown === 'freeFrom'}
                  onOpen={() => setOpenDropdown('freeFrom')}
                  onClose={() => setOpenDropdown(null)}
                  onChange={setFreeFromSlug}
                />
              </div>
            </div>
            <div className="mx-auto mt-6 grid max-w-[480px] gap-2.5">
              <button
                type="button"
                className={findButtonClass}
                onClick={() => submitFilters()}
              >
                FIND RECIPES
              </button>
              <button
                type="button"
                className={resetButtonClass}
                onClick={handleReset}
              >
                RESET
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
