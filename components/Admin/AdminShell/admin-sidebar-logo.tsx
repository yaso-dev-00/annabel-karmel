import Image from "next/image";

export function AdminSidebarLogo() {
  return (
    <div className="sidebarBrand">
      <Image
        src="/brand/annabel-karmel-logo.png"
        alt="Annabel Karmel"
        width={88}
        height={43}
        className="sidebarLogoImage"
        style={{ height: "auto" }}
        priority
      />
    </div>
  );
}
