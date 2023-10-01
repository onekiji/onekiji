import { defineCollection, z } from "astro:content";

const tags = [
  "afghanistan",
  "armenia",
  "azerbaijan",
  "belarus",
  "bulgaria",
  "canada",
  "china",
  "cuba",
  "ecuador",
  "ethiopia",
  "france",
  "gabon",
  "greece",
  "hong kong",
  "hungary",
  "india",
  "iran",
  "israel",
  "japan",
  "kosovo",
  "libya",
  "mali",
  "mexico",
  "morocco",
  "netherlands",
  "niger",
  "north korea",
  "pakistan",
  "palestine",
  "philippines",
  "poland",
  "romania",
  "russia",
  "saudi arabia",
  "serbia",
  "slovakia",
  "south korea",
  "spain",
  "tonga",
  "turkey",
  "ukraine",
  "united kingdom",
  "usa",
  "vietnam",
  "zimbabwe",
  "africa",
  "eu",
  "g7",
  "g20",
  "nato",
  "un",
  "conflicts",
  "cyber conflicts",
  "environment",
  "human rights",
  "meta",
  "politics",
  "religion",
  "space",
  "strikes",
  "tech"
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
