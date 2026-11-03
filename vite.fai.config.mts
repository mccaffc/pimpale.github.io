// FAI-branded build of the neutrino-submarines article. Reuses the original
// MDX and widgets; swaps the palette and wraps widgets in FAI chart panels.
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSectionize from './plugins/remark-sectionize.mjs';

const src = path.resolve(import.meta.dirname, 'src');
const fai = path.join(src, 'fai');
const WIDGETS = ['NeutrinoSubmarineHero', 'NeutrinoRangePlot', 'CoherenceConeDemo'];

const faiRedirects = (): Plugin => ({
  name: 'fai-redirects',
  enforce: 'pre',
  async resolveId(id, importer) {
    if (!importer) return null;
    if (/styles\/palette(\.ts)?$/.test(id) && !importer.startsWith(fai)) {
      return path.join(fai, 'palette.ts');
    }
    if (importer.endsWith('.mdx')) {
      const w = WIDGETS.find(n => id.endsWith('components/' + n));
      if (w) return `\0fai-widget:${w}`;
    }
    return null;
  },
  load(id) {
    if (id.startsWith('\0fai-widget:')) {
      const w = id.slice('\0fai-widget:'.length);
      return `import { ${w} } from ${JSON.stringify(path.join(fai, 'DarkPanel.tsx'))}; export default ${w};`;
    }
    return null;
  },
});

export default defineConfig({
  root: fai,
  base: './',
  plugins: [
    faiRedirects(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm, remarkMath, remarkSectionize], rehypePlugins: [rehypeKatex] }) },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
  ],
  server: { host: '0.0.0.0', fs: { allow: [import.meta.dirname] } },
  build: {
    assetsInlineLimit: 0,
    outDir: path.resolve(import.meta.dirname, 'dist-fai'),
    emptyOutDir: true,
    rollupOptions: {
      input: [path.join(fai, 'neutrino_submarines.html'), path.join(fai, 'neutrino_submarines_supplement.html')],
    },
  },
});
