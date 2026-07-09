import Image from "next/image";

export function AdminSidebarLogo() {
  return (
    <div className="sidebarBrand">
      <Image
        src="/brand/annabel-karmel-logo.png"
        alt="Annabel Karmel"
        width={112}
        height={54}
        className="sidebarLogoImage"
        priority
      />
    </div>
  );
}
