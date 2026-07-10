import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  metadataBase: new URL("https://lomnickpro.com"),
  title:
    "Joel Maurice Lomnick, EIT | Engineer, Creative Strategist, Author & Community Builder",
  description:
    "Personal portfolio of Joel Maurice Lomnick, EIT - electrical engineer, creative strategist, author of Lionheart, mentor, fraternity leader, church servant, and founder of Lomnick Professional Services.",
  applicationName: "Joel Maurice Lomnick Portfolio",
  authors: [{ name: "Joel Maurice Lomnick, EIT" }],
  creator: "Joel Maurice Lomnick, EIT",
  publisher: "Lomnick Professional Services",
  keywords: [
    "Joel Lomnick",
    "Joel Maurice Lomnick",
    "LomnickPro",
    "Lomnick Professional Services",
    "Electrical Engineer",
    "EIT",
    "Creative Strategist",
    "Lionheart",
    "Iota Phi Theta",
    "NPHC",
    "Richmond VA",
    "Website Design",
    "Graphic Design",
    "Mentor",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Joel Maurice Lomnick, EIT | Engineer, Creative Strategist, Author & Community Builder",
    description:
      "Built from survival. Designed with purpose. Creating systems, stories, and spaces that help people rise.",
    url: "/",
    siteName: "Joel Maurice Lomnick Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joel Maurice Lomnick, EIT portfolio social preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Joel Maurice Lomnick, EIT | Engineer, Creative Strategist, Author & Community Builder",
    description:
      "Built from survival. Designed with purpose. Creating systems, stories, and spaces that help people rise.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
