/** Resolve a public origin without reading server-only state in client modules. */
export function resolveSiteUrl(siteUrl, vercelUrl) {
  const explicit = siteUrl?.trim();
  const preview = vercelUrl?.trim();
  const raw = explicit || (preview ? `https://${preview.replace(/^https?:\/\//, "")}` : "http://localhost:3000");
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Site URL must be an absolute HTTP(S) origin.");
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash) {
    throw new Error("Site URL must be an HTTP(S) origin without credentials, path, query or fragment.");
  }
  return url.origin;
}

/** Called by Next config before a Production deployment can build or start. */
export function validateProductionSiteUrl(env) {
  if (env.VERCEL_ENV !== "production" && env.DEPLOYMENT_ENV !== "production") return;
  if (!env.NEXT_PUBLIC_SITE_URL?.trim()) {
    throw new Error("Production requires NEXT_PUBLIC_SITE_URL set to the official NeuMann domain.");
  }
  const url = new URL(resolveSiteUrl(env.NEXT_PUBLIC_SITE_URL));
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (url.protocol !== "https:" || url.port || !host.includes('.') ||
      /^[\d.]+$/.test(host) || host.includes(':') ||
      /(^|\.)(localhost|local|internal|example|test|invalid|vercel\.app)$/.test(host) ||
      /(^|\.)example\.(com|org|net)$/.test(host)) {
    throw new Error("Production NEXT_PUBLIC_SITE_URL must use the official HTTPS domain, not a preview, local or example host.");
  }
}
