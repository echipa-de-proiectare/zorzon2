// The same build serves three hosts; the hostname decides what is shown:
//   zorzon.com.ro            page to choose between the two sites
//   design.zorzon.com.ro     interior design
//   jewelry.zorzon.com.ro    jewelry
// Locally these are localhost, design.localhost and jewelry.localhost,
// which browsers resolve to this machine without any setup.
const { protocol, hostname, port } = window.location;
const SUBDOMAINS = ["design", "jewelry"];

const subdomain = SUBDOMAINS.find((name) => hostname.startsWith(`${name}.`));
const rootHost = subdomain ? hostname.slice(subdomain.length + 1) : hostname;
const portSuffix = port ? `:${port}` : "";

export const isDesignSite = subdomain === "design";
export const isJewelrySite = subdomain === "jewelry";
export const isChoiceSite = !subdomain;

export const ROOT_URL = `${protocol}//${rootHost}${portSuffix}`;
export const DESIGN_URL = `${protocol}//design.${rootHost}${portSuffix}`;
// ZORZON Jewelry is the WhatsApp catalog; jewelry.zorzon.com.ro redirects there
export const JEWELRY_URL = "https://wa.me/c/40731893528";

// Canonical addresses for SEO, always the production ones
export const SITE_URL = subdomain
  ? `https://${subdomain}.zorzon.com.ro`
  : "https://zorzon.com.ro";

export const SITE_NAME = {
  design: "ZORZON Design",
  jewelry: "ZORZON Jewelry",
}[subdomain] || "ZORZON";

export const DESIGN_INSTAGRAM = "https://www.instagram.com/zorzon.design/";
export const JEWELRY_INSTAGRAM = "https://www.instagram.com/zorzon.jewelry/";
