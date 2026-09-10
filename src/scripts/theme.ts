/**
 * Colour-scheme toggle.
 *
 * Behaviour:
 * - Without a stored choice the site follows `prefers-color-scheme` (pure CSS).
 * - Clicking the toggle switches between light and dark and sets
 *   `data-theme` on <html>, which the stylesheet honours over the system preference.
 * - The choice is written to localStorage ONLY when it differs from the current
 *   system preference; choosing the theme the system already prefers removes the
 *   entry, so nothing is stored unless it has to be. The entry holds the theme
 *   name and the time it was set, and is ignored (and removed) after TTL_DAYS.
 * - The same key is read by a small inline script in the document head (see
 *   src/layouts/Base.astro) before first paint, to avoid a flash of the wrong
 *   scheme. Keep KEY and TTL_DAYS in sync with that script.
 *
 * Everything else on the page recolours from the custom properties in
 * src/styles/global.css, so no other script needs to be told about the change.
 */

export const KEY = 'theme';
export const TTL_DAYS = 180;

type Theme = 'light' | 'dark';

const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const currentTheme = (): Theme => {
  const t = document.documentElement.dataset.theme;
  return t === 'light' || t === 'dark' ? t : systemTheme();
};

const store = (theme: Theme): void => {
  try {
    if (theme === systemTheme()) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify({ v: theme, t: Date.now() }));
  } catch {
    // Storage unavailable (private mode, disabled): the choice lasts for this page only.
  }
};

const applyMeta = (theme: Theme): void => {
  // Keep the browser chrome colour in step with an explicit choice.
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = theme === 'dark' ? '#2e2650' : '#cbbfe6';
    m.removeAttribute('media');
  });
};

export function mountThemeToggle(button: HTMLButtonElement): void {
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const render = () => {
    const theme = currentTheme();
    button.dataset.state = theme;
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const apply = (theme: Theme) => {
    if (theme === systemTheme()) delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    store(theme);
    applyMeta(theme);
    render();
  };

  button.hidden = false;
  render();
  button.addEventListener('click', () => apply(currentTheme() === 'dark' ? 'light' : 'dark'));
  media.addEventListener('change', () => {
    // If the system preference moves to match a stored choice, the entry is redundant.
    const theme = currentTheme();
    if (document.documentElement.dataset.theme === systemTheme()) {
      delete document.documentElement.dataset.theme;
      store(theme);
    }
    render();
  });
}
