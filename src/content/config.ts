import { defineCollection, z } from "astro:content";

const tags = [
  "afghanistan",
  "argentina",
  "armenia",
  "australia",
  "azerbaijan",
  "belarus",
  "bulgaria",
  "canada",
  "china",
  "cuba",
  "denmark",
  "ecuador",
  "egypt",
  "ethiopia",
  "france",
  "gabon",
  "greece",
  "guyana",
  "hong kong",
  "hungary",
  "iceland",
  "india",
  "iran",
  "iraq",
  "ireland",
  "israel",
  "japan",
  "kosovo",
  "libya",
  "mali",
  "mexico",
  "morocco",
  "netherlands",
  "niger",
  "nigeria",
  "north korea",
  "pakistan",
  "palestine",
  "philippines",
  "poland",
  "qatar",
  "romania",
  "russia",
  "saudi arabia",
  "serbia",
  "sierra leone",
  "slovakia",
  "south korea",
  "spain",
  "syria",
  "tonga",
  "turkey",
  "ukraine",
  "united arab emirates",
  "united kingdom",
  "usa",
  "venezuela",
  "vietnam",
  "yemen",
  "zimbabwe",
  "africa",  
  "eu",
  "g7",
  "g20",
  "nato",
  "un",
  "conflicts",
  "covid19",
  "cyber conflicts",
  "economics",
  "environment",
  "human rights",
  "meta",
  "politics",
  "religion",
  "riots",
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
