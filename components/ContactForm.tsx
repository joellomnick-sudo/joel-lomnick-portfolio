"use client";

import { useRef, useState } from "react";
import Script from "next/script";
import { contactInquiryTypes } from "@/data/site";

type Status = { kind: "idle" | "sending" | "success" | "error"; message: string };

export function ContactForm() {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending", message: "Sending your message..." });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    payload.startedAt = String(startedAt.current);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "Your message could not be sent.");
      form.reset();
      startedAt.current = Date.now();
      setStatus({ kind: "success", message: "Thank you. Your message made it through. I will review it and respond as soon as I can." });
    } catch (error) {
      setStatus({ kind: "error", message: error instanceof Error ? error.message : "Your message could not be sent." });
    }
  }

  const inputClass = "mt-2 min-h-12 w-full rounded-md border border-deepBrown/30 bg-white px-4 py-3 text-base text-ink focus-ring";
  return (
    <form className="max-w-3xl" onSubmit={submit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-semibold">Name<span aria-hidden="true"> *</span><input className={inputClass} name="name" autoComplete="name" required minLength={2} /></label>
        <label className="font-semibold">Email<span aria-hidden="true"> *</span><input className={inputClass} type="email" name="email" autoComplete="email" required /></label>
      </div>
      <label className="mt-6 block font-semibold">Organization or community group <span className="font-normal text-mutedBrown">(optional)</span><input className={inputClass} name="organization" autoComplete="organization" maxLength={150} /></label>
      <label className="mt-6 block font-semibold">What would you like to discuss?<span aria-hidden="true"> *</span><select className={inputClass} name="inquiryType" required defaultValue=""><option value="" disabled>Select an inquiry type</option>{contactInquiryTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label className="mt-6 block font-semibold">Message<span aria-hidden="true"> *</span><textarea className={`${inputClass} min-h-44 resize-y`} name="message" required minLength={20} maxLength={4000} /></label>
      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /><div className="cf-turnstile mt-6" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} data-theme="light" /></> : null}
      <p className="mt-4 text-sm leading-6 text-mutedBrown">Please do not include confidential client, medical, financial, or project information.</p>
      <button type="submit" disabled={status.kind === "sending"} className="mt-6 min-h-12 rounded-md border border-buttonGold bg-buttonGold px-6 py-3 text-base font-bold text-richBlack transition hover:bg-softGold disabled:cursor-wait disabled:opacity-70 focus-ring">{status.kind === "sending" ? "Sending..." : "Send message"}</button>
      <div className={`mt-5 min-h-8 font-semibold ${status.kind === "error" ? "text-burgundy" : "text-emerald"}`} role="status" aria-live="polite">{status.message}</div>
    </form>
  );
}
