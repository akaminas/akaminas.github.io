# akaminas.github.io

Professional website of **Alexandros Kaminas** — quantitative models of ecology, evolution and sustainability. Live at <https://akaminas.github.io>.

Static site built with [Astro](https://astro.build), semantic HTML and hand-written CSS, set in [Vellum](https://akaminas.github.io/vellum/), the author's figure system (see `DESIGN_SYSTEM.md`). The home page carries a live island-biogeography model drawn as a voxel archipelago; every project carries a generative texture in its discipline's hue.

- `npm run dev` / `npm run build` / `npm run check`
- `python scripts/render-assets.py` re-renders the icons and the social image with a headless Edge or Chrome.
- Content lives in `src/content/` (projects, publications, talks, teaching); site-wide facts in `src/data/site.ts`.
