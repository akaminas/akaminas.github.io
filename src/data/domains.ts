/**
 * The four domains the work is grouped under, each with its Vellum hue
 * family and the generative texture that illustrates it (src/components/Texture.astro).
 */
export type DomainKey = 'ecology-evolution' | 'sustainability-social' | 'marine-systems' | 'tools-visualisation';
export type Hue = 'teal' | 'terracotta' | 'indigo' | 'ochre' | 'mauve' | 'moss';
export type TextureKind = 'voxels' | 'stipple' | 'contours' | 'grid' | 'network';

export interface Domain {
  label: string;
  short: string;
  hue: Hue;
  texture: TextureKind;
  /** One line for the home page. */
  line: string;
}

export const domains: Record<DomainKey, Domain> = {
  'ecology-evolution': {
    label: 'Ecology and evolution',
    short: 'Ecology & evolution',
    hue: 'teal',
    texture: 'stipple',
    line: 'Communities that assemble, traits that evolve, lineages that arrive and go extinct.',
  },
  'sustainability-social': {
    label: 'Sustainability and social systems',
    short: 'Sustainability',
    hue: 'terracotta',
    texture: 'voxels',
    line: 'Organisations and institutions as systems: pressure, feedback and commitment.',
  },
  'marine-systems': {
    label: 'Marine systems and monitoring',
    short: 'Marine systems',
    hue: 'indigo',
    texture: 'contours',
    line: 'Species records, invasions and community change in the eastern Mediterranean.',
  },
  'tools-visualisation': {
    label: 'Tools and visualisation',
    short: 'Tools',
    hue: 'mauve',
    texture: 'grid',
    line: 'Figure systems and software for showing what models say.',
  },
};

export const domainOrder: DomainKey[] = ['ecology-evolution', 'sustainability-social', 'marine-systems', 'tools-visualisation'];

export const statusLabel = { ongoing: 'Ongoing', completed: 'Completed', published: 'Published' } as const;
