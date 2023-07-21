import { defineCollection, z } from "astro:content";

const tags = [
  "china",
  "france",
  "israel",
  "palestine",
  "russia",
  "ukraine",
  "usa",
  "mali",
  "japan",
  "spain",
  "hong kong",
  "north korea",
  "india",
  "greece",
  "united kingdom",
  "eu",
  "g7",
  "nato",
  "conflicts",
  "environment",
  "politics",
  "tech",
  "meta",
  "cyber conflicts",
  "strikes",
  "space"
];

const kiji = defineCollection({
  schema: z.object({
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    sources: z.array(z.string().url()).optional(),
    tags: z
      .array(
        z
          .string()
          .toLowerCase()
          .refine((tag) => tags.includes(tag), {
            message: `Invalid tag. Valid tags are: ${tags.join(", ")}`,
          })
      )
      .optional(),
  }),
});

const privacy = defineCollection({});

const about = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { kiji, privacy, about };
