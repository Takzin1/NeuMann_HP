import { validateProductionSiteUrl } from "./lib/site-url.mjs";

validateProductionSiteUrl(process.env);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
