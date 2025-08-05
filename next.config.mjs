/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitně povolit servírování statických souborů
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: false,
  
  // Pokud používáte <Image> komponentu
  images: {
    unoptimized: true, // Pro development/testing
  },
};

export default nextConfig;