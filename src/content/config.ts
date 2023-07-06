import { defineCollection, z } from "astro:content";

const kiji = defineCollection({
  schema: z.object({
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    sources: z.array(z.string().url()).optional(),
    language: z.string().length(2).optional(),
  }),
});

const privacy = defineCollection({});

export const collections = { kiji, privacy };
