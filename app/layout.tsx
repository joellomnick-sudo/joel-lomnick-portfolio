import type { Metadata } from "next";
import { Montserrat, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { publicAssetPath } from "@/data/publicAssets";

const canonical = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://lomnickpro.com";
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-montserrat", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-open-sans", display: "swap" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-roboto", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title: { default: "Joel M. Lomnick | Engineer, Storyteller, Community Builder", template: "%s | Joel M. Lomnick" },
  description: "The portfolio of Richmond-based electrical engineer, creative strategist, author, mentor, and community builder Joel M. Lomnick.",
  applicationName: "LomnickPro",
  authors: [{ name: "Joel M. Lomnick", url: canonical }],
  creator: "Joel M. Lomnick",
  publisher: "Lomnick Professional Services",
  alternates: { canonical },
  openGraph: { type: "website", locale: "en_US", url: canonical, siteName: "LomnickPro", title: "Joel M. Lomnick", description: "Engineering, storytelling, creative strategy, mentorship, and community service rooted in Richmond, Virginia.", images: [{ url: publicAssetPath("social-og"), width: 1729, height: 910, alt: "Joel M. Lomnick and LomnickPro" }] },
  twitter: { card: "summary_large_image", title: "Joel M. Lomnick", description: "Engineer, storyteller, mentor, and community builder.", images: [publicAssetPath("social-og")] },
};

const person = { "@context": "https://schema.org", "@type": "Person", name: "Joel M. Lomnick", url: canonical, jobTitle: "Electrical Engineer and Creative Strategist", worksFor: { "@type": "Organization", name: "Lomnick Professional Services" }, homeLocation: { "@type": "Place", name: "Richmond, Virginia" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${montserrat.variable} ${openSans.variable} ${roboto.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></body></html>;
}
