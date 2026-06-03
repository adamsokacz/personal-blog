import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./posts" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    featureImage: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    pdf: z.string().optional(),
    type: z.enum(["markdown", "pdf"]).default("markdown"),
  }),
});

const careerPlan = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./career-plan" }),
  schema: z.object({
    title: z.string().default("Career Plan"),
    description: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog, careerPlan };
