import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 * Drop emitted assets nothing references.
 *
 * Vite writes a file for every imported asset at load time, before
 * tree-shaking decides whether the import survives. That means the
 * screenshots `PUBLIC_SAFE` withholds would still land in `dist/`,
 * fetchable by anyone who guessed the hashed name. This checks each
 * image against every chunk, stylesheet and HTML file in the bundle and
 * removes the ones no output mentions.
 */
function pruneOrphanAssets(): Plugin {
  const IMAGE = /\.(jpe?g|png|gif|webp|avif|svg)$/i
  return {
    name: 'prune-orphan-assets',
    generateBundle(_options, bundle) {
      const text = Object.values(bundle)
        .map((item) => (item.type === 'chunk' ? item.code : String(item.source)))
        .join('\n')
      for (const [fileName, item] of Object.entries(bundle)) {
        if (item.type !== 'asset' || !IMAGE.test(fileName)) continue
        const base = fileName.split('/').pop() ?? fileName
        if (!text.includes(base)) delete bundle[fileName]
      }
    },
  }
}

/**
 * Two builds from one source.
 *
 *   npm run build          → dist/         a normal static site
 *   npm run build:single   → dist-single/  one self-contained index.html
 *
 * The single-file build is what gets published as a Claude Artifact,
 * where the page can rewrite and republish itself to persist work
 * samples. See src/lib/sampleStore.ts.
 */
export default defineConfig(({ mode }) => {
  const singleFile = mode === 'single'

  return {
    plugins: [react(), pruneOrphanAssets(), ...(singleFile ? [viteSingleFile()] : [])],
    // Relative base so the build works from a subpath (GitHub Pages
    // project sites) without further configuration.
    base: './',
    build: {
      outDir: singleFile ? 'dist-single' : 'dist',
      sourcemap: !singleFile,
      emptyOutDir: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
    },
  }
})
