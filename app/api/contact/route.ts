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

const attempts =