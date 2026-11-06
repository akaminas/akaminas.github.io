/**
 * The pastel tones used for drawings, thumbnail panels, chips and section
 * rules. The colour values live in src/styles/global.css (--tone-*); this file
 * only says which tone belongs to what, so every page agrees.
 */
export const tones = ['teal', 'sea', 'sand', 'coral', 'lilac', 'sage', 'rose', 'apricot'] as const;
export type Tone = (typeof tones)[number];

/** One tone per project domain (the groups on the Work page). */
export const domainTone = {
  'ecology-evolution': 'teal',
  'sustainability-social': 'coral',
  'marine-systems': 'sea',
  'tools-visualisation': 'lilac',
} as const satisfies Record<string, Tone>;

/** Inline style that sets the tone for an element and everything inside it. */
export const toneStyle = (tone: Tone) => `--tone: var(--tone-${tone})`;
