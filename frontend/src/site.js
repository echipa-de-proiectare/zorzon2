// The same build serves three hosts; the hostname decides what is shown:
//   zorzon.com.ro            page to choose between the two sites
//   design.zorzon.com.ro     interior design
//   jewellery.zorzon.com.ro  jewellery
// Locally these are localhost, design.localhost and jewellery.localhost,
// which browsers resolve to this machine without any setup.
const { protocol, hostname, port } = window.location;
const SUBDOMAINS = ["design", "jewellery"];

const subdomain = SUBDOMAINS.find((name) => hostname.startsWith(`${name}.`));
const rootHost = subdomain ? hostname.slice(subdomain.length + 1) : hostname;
const portSuffix = port ? `:${port}` : "";

export const isDesignSite = subdomain === "design";
export const isJewellerySite = subdomain === "jewellery";
export const isChoiceSite = !subdomain;

export const ROOT_URL = `${protocol}//${rootHost}${portSuffix}`;
export const DESIGN_URL = `${protocol}//design.${rootHost}${portSuffix}`;
export const JEWELLERY_URL = `${protocol}//jewellery.${rootHost}${portSuffix}`;

// Canonical addresses for SEO, always the production ones
export const SITE_URL = subdomain
  ? `https://${subdomain}.zorzon.com.ro`
  : "https://zorzon.com.ro";

export const SITE_NAME = {
  design: "ZORZON Design",
  jewellery: "ZORZON Jewellery",
}[subdomain] || "ZORZON";
