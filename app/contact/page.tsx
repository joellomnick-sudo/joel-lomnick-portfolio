import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a private conversation with Joel M. Lomnick about engineering, LomnickPro, speaking, mentorship, community service, or Lionheart.",
};

export default function ContactPage() {
  return (
    <>
      <section className="dark-hero editorial-section-compact">
        <div className="site-container">
          <p className="eyebrow">Contact</p>
          <h1 className="display-title mt-5">Bring the rough version.</h1>
          <p className="prose-copy prose-copy-dark mt-6">You do not need a perfect brief before reaching out. Tell me what you are trying to build, organize, explain, or improve. We can start with the part that is still messy.</p>
        </div>
      </section>
      <section className="editorial-section-compact paper-grid">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[.78fr_1.22fr]">
          <div>
            <p className="eyebrow">A private conversation</p>
            <h2 className="section-title mt-4">Let&apos;s begin with context.</h2>
            <p className="prose-copy mt-5">Messages are delivered privately. No personal email address or phone number is published on this site.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
