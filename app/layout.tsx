import type { Metadata, Viewport } from "next";
import { Manrope, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Plinth Construction | Building contractor in Nairobi",
    template: "%s · Plinth Construction",
  },
  description: site.description,
  applicationName: site.title,
  keywords: [
    "construction company Nairobi",
    "building contractor Kenya",
    "NCA contractor Nairobi",
    "residential contractor Karen",
    "commercial contractor Westlands",
    "renovation contractor Kilimani",
    "industrial contractor Athi River",
    "construction company Kiambu",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: site.title,
    title: "Plinth Construction | Building contractor in Nairobi",
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.heroAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plinth Construction | Building contractor in Nairobi",
    description: site.description,
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${manrope.variable} js h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <noscript>
          <style>{`html.js .reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
