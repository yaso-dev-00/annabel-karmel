import type { Metadata } from "next";
import { Geist_Mono, Montserrat, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Same "pequena-pequena" font the live annabelkarmel.com site self-hosts
const pequena = localFont({
  src: [
    { path: "./fonts/pequena-pequena.woff2" },
    { path: "./fonts/pequena-pequena.woff" },
  ],
  variable: "--font-pequena",
  display: "swap",
});

const cutesy = localFont({
  src: [
    { path: "./fonts/cutesy.woff2" },
    { path: "./fonts/cutesy.woff" },
  ],
  variable: "--font-cutesy",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Annabel Karmel",
  description: "Nutritious recipes, expert advice, and family meal inspiration.",
  icons: {
    icon: [
      { url: "/brand/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/apple-icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/brand/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${montserrat.variable} ${playfair.variable} ${pequena.variable} ${cutesy.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
