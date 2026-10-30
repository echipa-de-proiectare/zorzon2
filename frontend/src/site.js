// The same build serves zorzon.com.ro (interior design) and
// jewellery.zorzon.com.ro; the hostname decides which site is shown.
const { protocol, hostname, port } = window.location;
const JEWELLERY_PREFIX = "jewellery.";

export const isJewellerySite = hostname.startsWith(JEWELLERY_PREFIX);

const designHost = isJewellerySite
  ? hostname.slice(JEWELLERY_PREFIX.length)
  : hostname;
const portSuffix = port ? `:${port}` : "";

// Locally these are localhost and jewellery.localhost, which browsers
// resolve to this machine without any setup
export const DESIGN_URL = `${protocol}//${designHost}${portSuffix}`;
export const JEWELLERY_URL = `${protocol}//${JEWELLERY_PREFIX}${designHost}${portSuffix}`;

// Canonical addresses for SEO, always the production ones
export const SITE_URL = isJewellerySite
  ? "https://jewellery.zorzon.com.ro"
  : "https://zorzon.com.ro";
export const SITE_NAME = isJewellerySite ? "ZORZON Jewellery" : "ZORZON";
