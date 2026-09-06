/**
 * Site-wide facts. Edit here; every page reads from this file.
 */
export const site = {
  name: 'Alexandros Kaminas',
  shortName: 'A. Kaminas',
  url: 'https://akaminas.github.io',
  tagline: 'Modelling complex systems',
  description:
    'Alexandros Kaminas develops mathematical and computational models of complex systems: eco-evolutionary dynamics, community assembly and regime shifts, with applications to sustainability and socioeconomic systems. PhD researcher at the University of Groningen.',
  email: 'kaminas.alex@gmail.com',
  affiliation: {
    name: 'University of Groningen',
    unit: 'Theoretical Research in Evolutionary Life Sciences (TRÊS)',
    url: 'https://www.rug.nl/research/gelifes/tres/',
  },
  position: 'PhD researcher',
  fellowship: 'EVOLVE fellow (EU MSCA COFUND)',
  location: 'Groningen, Netherlands',
  /** Verified public profiles. Plain links only — nothing is embedded. */
  profiles: {
    github: 'https://github.com/akaminas',
    orcid: 'https://orcid.org/0000-0002-7928-651X',
    scholar: 'https://scholar.google.com/citations?user=jyVZ4m4AAAAJ',
    rug: 'https://research.rug.nl/en/persons/alexandros-kaminas/',
    researchgate: 'https://www.researchgate.net/profile/Alexandros-Kaminas',
  },
  orcidId: '0000-0002-7928-651X',
  cvPath: '/documents/cv-alexandros-kaminas.pdf',
  repo: 'https://github.com/akaminas/akaminas.github.io',
  /** Update when the privacy notice changes. */
  privacyRevised: '2026-09-06',
} as const;

export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/methods/', label: 'Methods' },
  { href: '/publications/', label: 'Publications' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/about/', label: 'About' },
  { href: '/cv/', label: 'CV' },
] as const;
