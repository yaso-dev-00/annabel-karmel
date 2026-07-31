import Image from 'next/image';
import Link from 'next/link';

export function AdminSidebarLogo() {
  return (
    <Link href="/" className="sidebarBrand" aria-label="Annabel Karmel home">
      <Image
        src="/brand/annabel-karmel-logo.png"
        alt="Annabel Karmel"
        width={88}
        height={43}
        className="sidebarLogoImage"
        style={{ height: 'auto' }}
        priority
      />
    </Link>
  );
}
