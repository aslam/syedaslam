import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const BlogSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	heroImage: z.string().optional(),
	badge: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: BlogSchema,
});

export const collections = { blog };
