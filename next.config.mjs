/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitně povolit servírování statických souborů
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: false,
  
};

export default nextConfig;