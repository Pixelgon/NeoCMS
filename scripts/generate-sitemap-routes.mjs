import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

// Private or internal routes that should not be included in the sitemap.
const excludedPaths = ['/pxlgn', '/gdpr', '/api'];

export function collectStaticRoutes(appDir) {
  const routes = new Set();

  function visit(directory, segments) {
    const entries = readdirSync(directory, { withFileTypes: true });
    const route = `/${segments.join('/')}`;
    if (excludedPaths.some((excluded) => route === excluded || route.startsWith(`${excluded}/`))) return;

    if (entries.some((entry) => entry.isFile() && /^page\.(tsx|ts|jsx|js)$/.test(entry.name))) {
      routes.add(route);
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const name = entry.name;
      // Dynamické, paralelní, privátní a interceptované routy nejsou statické URL.
      if (name.startsWith('[') || name.startsWith('@') || name.startsWith('_') || name.startsWith('.') || /^\(\./.test(name)) continue;
      const isGroup = name.startsWith('(') && name.endsWith(')');
      visit(path.join(directory, name), isGroup ? segments : [...segments, name]);
    }
  }

  visit(appDir, []);
  return [...routes].sort();
}

export function generateSitemapRoutes(rootDir) {
  const routes = collectStaticRoutes(path.join(rootDir, 'src/app'));
  const outputDir = path.join(rootDir, 'src/generated');
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(path.join(outputDir, 'sitemap-routes.json'), `${JSON.stringify(routes, null, 2)}\n`);
}
