import { defineCollection, z } from 'astro:content';

const languageSchema = z.string().length(2).optional().default("en");

const kiji = defineCollection({
  schema: z.object({
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    sources: z.array(z.string().url()).optional(),
    language: languageSchema,
  }),
});

const privacy = defineCollection({
  schema: z.object({
    language: languageSchema,
  }),
});

const about = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { kiji, privacy, about };
