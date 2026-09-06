import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Structured content. Adding a publication, project, talk or supervised
 * student is a matter of adding one file to the matching folder.
 * See README.md → "Updating content".
 */

const link = z.object({ label: z.string(), url: z.string().url() });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One-sentence research question shown under the title. */
    question: z.string(),
    /** Short summary for cards and meta descriptions (≤ 160 chars). */
    summary: z.string().max(200),
    domain: z.enum(['ecology-evolution', 'sustainability-social', 'marine-systems']),
    role: z.string(),
    period: z.string(),
    status: z.enum(['ongoing', 'completed', 'published']),
    /** Methods vocabulary, shown as plain labels (never proficiency bars). */
    methods: z.array(z.string()).default([]),
    /** Languages/software used, only where documented. */
    tools: z.array(z.string()).default([]),
    institutions: z.array(z.string()).default([]),
    collaborators: z.array(z.string()).default([]),
    funding: z.string().optional(),
    /** Publication ids (file names in src/content/publications) related to this project. */
    publications: z.array(z.string()).default([]),
    /** Talk ids (file names in src/content/talks) related to this project. */
    talks: z.array(z.string()).default([]),
    links: z.array(link).default([]),
    /** Which SVG motif illustrates the project (see src/components/Motif.astro). */
    motif: z.enum(['patches', 'bipartite', 'fold', 'hypervolume', 'nested', 'records', 'field']),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/publications' }),
  schema: z.object({
    year: z.number().int(),
    /** Authors in publication order, "Kaminas, A." spelled exactly so it can be highlighted. */
    authors: z.array(z.string()).min(1),
    /** When the author list is very long, give the first few authors and set `etAl` with the total count. */
    etAl: z.number().int().optional(),
    title: z.string(),
    venue: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    status: z.enum(['published', 'accepted', 'preprint', 'manuscript', 'in-progress']),
    kind: z.enum(['article', 'policy-brief', 'report', 'thesis', 'dataset', 'other']).default('article'),
    /** Licence of the version of record, e.g. "CC BY 4.0", when known. */
    licence: z.string().optional(),
    /** Short note, e.g. "Consortium paper; 173 authors". */
    note: z.string().optional(),
    highlight: z.boolean().default(false),
    /** Project ids this publication belongs to. */
    projects: z.array(z.string()).default([]),
  }),
});

const talks = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    location: z.string(),
    /** ISO date (YYYY-MM or YYYY-MM-DD). */
    date: z.string(),
    type: z.enum(['oral', 'poster', 'invited', 'seminar']),
    authors: z.array(z.string()).default([]),
    abstract: z.string().optional(),
    note: z.string().optional(),
    project: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const teaching = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teaching' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    institution: z.string(),
    period: z.string(),
    kind: z.enum(['supervision', 'teaching', 'service', 'outreach']),
    student: z.string().optional(),
    thesis: z.string().optional(),
    project: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { projects, publications, talks, teaching };
