import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { locales, type Locale } from "./i18n/config";

const locale = z.enum(locales as [Locale, ...Locale[]]);
const text = z.string().trim().min(1);

const faqs = defineCollection({
  // Entry ids come from the path (e.g. "de/01"); the slug field repeats across locales.
  loader: glob({
    pattern: "*/*.json",
    base: "./src/content/faqs",
    generateId: ({ entry }) => entry.replace(/\.json$/, ""),
  }),
  schema: z.object({
    translationKey: text,
    locale,
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    order: z.number().int().positive(),
    question: text,
    answer: text,
  }),
});

const auditContent = z.object({
  title: text,
  summary: text,
  findings: z.array(z.tuple([text, text, text])),
  steps: z.array(z.tuple([text, text, text])),
  flow: z.array(text),
  cta: text,
  methodextra: text,
  // Optional notes override the default copy; an empty note deliberately removes it.
  methodology: z.string().optional(),
  searchNote: z.string().optional(),
  measurementNote: z.string().optional(),
  evidenceNote: z.string().optional(),
});

// Written by the audit campaign tooling as one array; each report's `id` is its entry id.
const audits = defineCollection({
  loader: file("src/content/audits.json"),
  schema: z.object({
    code: z.string().regex(/^[a-f0-9]{20,24}$/),
    company: text,
    url: z.url(),
    measuredAt: z.iso.date(),
    lighthouseVersion: z.string(),
    scores: z.array(z.number()).length(4).nullable(),
    metrics: z.array(z.number()).length(3).nullable(),
    sources: z.array(z.tuple([text, text, text])),
    content: z.record(locale, auditContent),
  }),
});

export const collections = { faqs, audits };
