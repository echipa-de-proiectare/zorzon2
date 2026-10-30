"use strict";

/**
 * jewel controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const IMAGE_FIELDS = ["formats", "url", "width", "alternativeText"];

// documentId stays the same when a piece is edited and republished,
// unlike the numeric id, so it is what the site uses in URLs
const toPreview = (jewel) => ({
  id: jewel.documentId,
  name: jewel.name,
  material: jewel.material,
  price: jewel.price,
  available: jewel.available,
  cover: jewel.cover || null,
});

module.exports = createCoreController("api::jewel.jewel", ({ strapi }) => ({
  async findJewelsPreview(ctx) {
    const jewels = await strapi.documents("api::jewel.jewel").findMany({
      status: "published",
      fields: ["name", "material", "price", "available"],
      sort: { createdAt: "desc" },
      populate: { cover: { fields: IMAGE_FIELDS } },
    });

    return this.transformResponse(jewels.map(toPreview));
  },

  async findJewelById(ctx) {
    const { id } = ctx.params;

    const jewel = await strapi.documents("api::jewel.jewel").findOne({
      documentId: id,
      status: "published",
      fields: ["name", "material", "price", "available", "description"],
      populate: {
        cover: { fields: IMAGE_FIELDS },
        images: { fields: IMAGE_FIELDS },
      },
    });

    if (!jewel) {
      return ctx.notFound("Jewel not found");
    }

    return this.transformResponse({
      ...toPreview(jewel),
      description: jewel.description,
      images: [jewel.cover, ...(jewel.images || [])].filter(Boolean),
    });
  },

  async sitemap(ctx) {
    const siteUrl = "https://jewelry.zorzon.com.ro";

    const jewels = await strapi.documents("api::jewel.jewel").findMany({
      status: "published",
      fields: ["updatedAt"],
      sort: { createdAt: "desc" },
    });

    const pages = [
      { path: "/" },
      ...jewels.map((jewel) => ({
        path: `/piesa/${jewel.documentId}`,
        lastmod: new Date(jewel.updatedAt).toISOString().slice(0, 10),
      })),
    ];

    const urls = pages
      .map(
        (page) =>
          `  <url><loc>${siteUrl}${page.path}</loc>${
            page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""
          }</url>`
      )
      .join("\n");

    ctx.type = "application/xml";
    ctx.body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  },
}));
