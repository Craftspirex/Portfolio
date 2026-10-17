
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rayan Zaib — Founder, Developer & AI Builder",
  description:
    "Portfolio of Rayan Zaib: Founder, Developer, AI Builder, Entrepreneur, and Digital Creator from Karachi, Pakistan. Building meaningful digital products and experiences.",
  keywords: [
    "Rayan Zaib",
    "Web Developer",
    "AI Builder",
    "Founder",
    "Entrepreneur",
    "Digital Creator",
    "Shopify Expert",
    "Karachi",
    "ARVÉN",
  ],
  verification: {
    google: "izQtNE0ND8_OLzOAJ1OTupQ-QkpMh7cWjz4EFDinaig",
  },
  openGraph: {
    title: "Rayan Zaib — Founder, Developer & AI Builder",
    description:
      "Portfolio of Rayan Zaib: Founder, Developer, AI Builder, Entrepreneur, and Digital Creator from Karachi, Pakistan.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
