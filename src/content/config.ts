import { defineCollection, z } from "astro:content";

const kiji = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    sources: z.array(z.string()).optional(),
  }),
});

const privacy = defineCollection({});

export const collections = { kiji, privacy };
