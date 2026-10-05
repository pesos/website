import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://pesos.example.org',
  output: 'static',
  build: { format: 'directory' },
  // code blocks in blog posts: both themes are emitted, global.css picks one
  // based on the site's dark/light toggle
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  // Section landings (the wireframe has no page for these, so they open the
  // section's first child) and pre-restructure URLs, kept so old links work.
  redirects: {
    '/about': '/about/goals/',
    '/showcase': '/showcase/archive/',
    '/pesos-101': '/getting-started/101/',
    '/how-to-join': '/about/how-to-join/',
    '/about/events': '/events/',
    '/perks': '/about/perks/',
    '/resources': '/blogs/resources/',
    '/archive': '/showcase/archive/',
    '/projects': '/showcase/projects/',
    '/projects/[slug]': '/showcase/projects/[slug]',
  },
});
