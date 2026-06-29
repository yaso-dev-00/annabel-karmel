import Image from "next/image";
import Link from "next/link";

import shared from "./product-category-shared.module.css";

export type ProductCategoryProductCardProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function ProductCategoryDiscoverButton({
  href,
  color = "#005d20",
  hoverColor = "#e93a88",
}: {
  href: string;
  color?: string;
  hoverColor?: string;
}) {
  return (
    <Link
      href={href}
      className={`${shared.discoverButton} ${shared.pequena} inline-flex min-w-[180px] items-center justify-center px-15 py-3 text-[30px] leading-[1.2] lowercase text-white! transition-colors duration-200`}
      style={
        {
          "--discover-bg": color,
          "--discover-hover": hoverColor,
        } as React.CSSProperties
      }
    >
      discover
    </Link>
  );
}

export function ProductCategoryProductCard({
  title,
  description,
  image,
  href,
  buttonColor = "#005d20",
  buttonHoverColor = "#00A19D",
  imageWidth = 825,
  imageHeight = 1007,
}: ProductCategoryProductCardProps) {
  const isSvg = image.endsWith(".svg");

  return (
    <div className={shared.productCard}>
      <Link href={href} className="block">
        <Image
          src={image}
          alt={title.replace(/\n/g, " ")}
          width={imageWidth}
          height={imageHeight}
          unoptimized={isSvg}
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 550px, (min-width: 640px) 620px, 100vw"
        />
      </Link>
      <div className={shared.productCardOverlay}>
        <h3 className={shared.productCardTitle}>{title}</h3>
        <p className={shared.productCardDescription}>{description}</p>
      </div>
      <div className={shared.productCardButton}>
        <ProductCategoryDiscoverButton
          href={href}
          color={buttonColor}
          hoverColor={buttonHoverColor}
        />
      </div>
    </div>
  );
}
