import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const canonical = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://lomnickpro.com";

export const metadata: Metadata = {
  metadataBase: new URL(canonical),
  title: { default: "Joel Maurice Lomnick, EIT | Engineer, Storyteller, Community Builder", template: "%s | Joel Maurice Lomnick, EIT" },
  description: "The portfolio of Richmond-based electrical engineer, creative strategist, author, mentor, and community builder Joel Maurice Lomnick, EIT.",
  applicationName: "LomnickPro",
  authors: [{ name: "Joel Maurice Lomnick, EIT", url: canonical }],
  creator: "Joel Maurice Lomnick, EIT",
  publisher: "Lomnick Professional Services",
  alternates: { canonical },
  openGraph: { type: "website", locale: "en_US", url: canonical, siteName: "LomnickPro", title: "Joel Maurice Lomnick, EIT", description: "Engineering, storytelling, creative strategy, mentorship, and community service rooted in Richmond, Virginia.", images: [{ url: "/og.png", width: 1729, height: 910, alt: "Joel Maurice Lomnick, EIT and LomnickPro" }] },
  twitter: { card: "summary_large_image", title: "Joel Maurice Lomnick, EIT", description: "Engineer, storyteller, mentor, and community builder.", images: ["/og.png"] },
};

const person = { "@context": "https://schema.org", "@type": "Person", name: "Joel Maurice Lomnick, EIT", url: canonical, jobTitle: "Electrical Engineer and Creative Strategist", worksFor: { "@type": "Organization", name: "Lomnick Professional Services" }, homeLocation: { "@type": "Place", name: "Richmond, Virginia" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></body></html>;
}
