import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { fileURLToPath } from 'node:url';
import { generateSitemapRoutes } from './scripts/generate-sitemap-routes.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.81'],
  // Explicitně povolit servírování statických souborů
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: false,
  
};

export default function config(phase) {
  if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_DEVELOPMENT_SERVER) {
    generateSitemapRoutes(fileURLToPath(new URL('.', import.meta.url)));
  }
  return nextConfig;
}
