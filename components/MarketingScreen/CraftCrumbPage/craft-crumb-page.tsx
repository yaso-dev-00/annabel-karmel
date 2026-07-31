import Link from 'next/link';

import { InstagramShareSection } from '@/components/SiteLayout/InstagramShareSection';
import {
  craftCrumbAssets,
  craftCrumbCta,
  craftCrumbIntro,
  craftCrumbLinks,
  craftCrumbProducts,
  type CraftCrumbProduct,
} from '@/data/craft-crumb-page';
import styles from './craft-crumb-page.module.css';

function FullBleedImageLink({
  href,
  src,
  alt,
  priority = false,
}: {
  href: string;
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${styles.fullBleed} block`}
    >
      <img
        src={src}
        alt={alt}
        className={styles.fullBleedImage}
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    </a>
  );
}

function CraftCrumbProductRow({
  product,
  index,
}: {
  product: CraftCrumbProduct;
  index: number;
}) {
  const textPaddingTop =
    index === 0
      ? 'md:pt-[100px]'
      : index === 1
        ? 'md:pt-[85px]'
        : 'md:pt-[30px]';

  return (
    <section
      className="border-t border-transparent py-10 first:border-t-0 first:pt-6 md:py-14"
      aria-labelledby={`craft-crumb-product-${product.slug}`}
    >
      <div
        className={`${styles.inner} grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 ${
          product.reverse
            ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
            : ''
        }`}
      >
        <div className="flex justify-center">
          <a
            href={product.href}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <img
              src={product.image}
              alt={product.imageAlt}
              className={styles.productImage}
              width={486}
              height={489}
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>

        <div className={`text-center md:text-left ${textPaddingTop}`}>
          <h2
            id={`craft-crumb-product-${product.slug}`}
            className={styles.productHeading}
          >
            <a
              href={product.href}
              target="_blank"
              rel="noreferrer"
              className="text-inherit no-underline hover:text-[#ef9cba]"
            >
              {product.title}
            </a>
          </h2>
          <p className={styles.productBody}>{product.body}</p>
        </div>
      </div>
    </section>
  );
}

export function CraftCrumbPageContent() {
  return (
    <main className="bg-white text-[#3d3d3d]">
      <section
        className={styles.fullBleed}
        aria-label="Craft & Crumb bake and craft kits"
      >
        <div className="max-w-[1100px] mx-auto mb-5">
          <FullBleedImageLink
            href={craftCrumbLinks.tescoSearch}
            src={craftCrumbAssets.titleBanner}
            alt="Say hello to our new bake and craft kits"
            priority
          />
        </div>
        <FullBleedImageLink
          href={craftCrumbLinks.tescoSearch}
          src={craftCrumbAssets.lifestyleHero}
          alt="Craft and Crumb baking kits with muffins, biscuits and cookies on a marble counter"
        />
        <a
          href={craftCrumbLinks.tescoSearch}
          target="_blank"
          rel="noreferrer"
          className={`${styles.fullBleed} relative block mt-5`}
        >
          <img
            src={craftCrumbAssets.introSection}
            alt=""
            className={styles.fullBleedImage}
            width={2228}
            height={2560}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.srOnlyIntro}>
            <p>{craftCrumbIntro.collaboration}</p>
            <p>
              <strong>{craftCrumbIntro.tesco}</strong>
            </p>
            <p>{craftCrumbIntro.body}</p>
            <p>{craftCrumbIntro.closing}</p>
          </div>
        </a>
      </section>

      <div className="bg-white pb-4 md:pb-8">
        {craftCrumbProducts.map((product, index) => (
          <CraftCrumbProductRow
            key={product.slug}
            product={product}
            index={index}
          />
        ))}
      </div>

      <section className="flex flex-col items-center gap-8 bg-white ">
        <Link
          href={craftCrumbCta.href}
          target="_blank"
          rel="noreferrer"
          className={styles.discoverButton}
        >
          {craftCrumbCta.label}
        </Link>

        <a
          href={craftCrumbLinks.craftAndCrumb}
          target="_blank"
          rel="noreferrer"
          className={`${styles.fullBleed} block w-full`}
        >
          <img
            src={craftCrumbAssets.footerBanner}
            alt="Craft and Crumb collaboration with Annabel Karmel"
            className={styles.fullBleedImage}
            width={1920}
            height={1363}
            loading="lazy"
            decoding="async"
          />
        </a>
      </section>

      <InstagramShareSection />
    </main>
  );
}
