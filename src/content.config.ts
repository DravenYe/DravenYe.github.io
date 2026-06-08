import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = ({ image }: { image: () => any }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		tags: z.array(z.string()).default([]),
	});

const projectSchema = ({ image }: { image: () => any }) =>
	z.object({
		title: z.string(),
		tagline: z.string(),
		description: z.string(),
		// Free-form status badge, e.g. "Active · v2".
		status: z.string(),
		// Lower = shown first. Featured projects also surface on the home page.
		order: z.number().default(99),
		featured: z.boolean().default(false),
		stack: z.array(z.string()).default([]),
		repo: z.string().optional(),
		demo: z.string().optional(),
		heroImage: z.optional(image()),
	});

// English (default locale) — served from the site root.
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});
const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: projectSchema,
});

// Chinese — served under /zh/. Same schemas, separate content.
const blogZh = defineCollection({
	loader: glob({ base: './src/content/zh/blog', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});
const projectsZh = defineCollection({
	loader: glob({ base: './src/content/zh/projects', pattern: '**/*.{md,mdx}' }),
	schema: projectSchema,
});

export const collections = { blog, projects, blogZh, projectsZh };
