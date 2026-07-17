import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contactInquiryTypes } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(150).optional().default(""),
  inquiryType: z.enum(contactInquiryTypes),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0).optional().default(""),
  startedAt: z.coerce.number().int().positive(),
  turnstileToken: z.string().optional(),
  "cf-turnstile-response": z.string().optional(),
});

const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) return NextResponse.json({ message: "Too many messages were submitted. Please wait and try again." }, { status: 429 });
  attempts.set(ip, [...recent, now]);

  let payload: unknown;
  try { payload = await request.json(); } catch { return NextResponse.json({ message: "The form submission was not valid." }, { status: 400 }); }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ message: "Please check every required field and try again." }, { status: 400 });
  if (now - parsed.data.startedAt < 2500) return NextResponse.json({ message: "Please take a moment to complete the form before sending." }, { status: 400 });
  if (!(await verifyTurnstile(parsed.data.turnstileToken || parsed.data["cf-turnstile-response"], ip))) return NextResponse.json({ message: "Verification failed. Please refresh and try again." }, { status: 400 });

  const destination = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (!destination || !apiKey) {
    console.error("contact_configuration_missing", {
      hasResendKey: Boolean(apiKey),
      hasDestination: Boolean(destination),
      hasSender: Boolean(process.env.CONTACT_FROM_EMAIL),
    });
    return NextResponse.json({ message: "Messaging is temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const { name, email, organization, inquiryType, message } = parsed.data;
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "LomnickPro Website <onboarding@resend.dev>",
        to: [destination],
        reply_to: email,
        subject: `LomnickPro inquiry: ${inquiryType}`,
        text: `Name: ${name}\nEmail: ${email}\nOrganization: ${organization || "Not provided"}\nInquiry: ${inquiryType}\n\n${message}`,
        html: `<h2>New LomnickPro inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Organization:</strong> ${escapeHtml(organization || "Not provided")}</p><p><strong>Inquiry:</strong> ${escapeHtml(inquiryType)}</p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
      }),
    });
  } catch {
    console.error("contact_provider_rejected", { category: "network_failure" });
    return NextResponse.json({ message: "Your message could not be delivered. Please try again later." }, { status: 502 });
  }
  if (!response.ok) {
    console.error("contact_provider_rejected", { category: "provider_response", status: response.status });
    return NextResponse.json({ message: "Your message could not be delivered. Please try again later." }, { status: 502 });
  }
  console.info("contact_provider_accepted", { category: "accepted", status: response.status });
  return NextResponse.json({ message: "Message sent." });
}
