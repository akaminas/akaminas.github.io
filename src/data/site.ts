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
    /** Full name of the group, without its acronym. Write "unit (unitShort)" once where it is spelled out. */
    unit: 'Theoretical Research in Evolutionary Life Sciences',
    unitShort: 'TRÊS',
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

/** The header: four links. Everything else is reached from the island, the footer or the pages themselves. */
export const nav = [
  { href: '/work/', label: 'Work' },
  { href: '/publications/', label: 'Publications' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;

/** Pages that are not in the header; the footer lists them. */
export const navMore = [
  { href: '/methods/', label: 'Methods' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/cv/', label: 'CV' },
] as const;
