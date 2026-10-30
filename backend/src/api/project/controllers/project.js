"use strict";

/**
 * project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::project.project", ({ strapi }) => ({
  async findProjectsSpotlight(ctx) {
    const Projects = await strapi.entityService.findMany(
      "api::project.project",
      {
        fields: ["name", "location", "createdAt"], // Include the createdAt field for sorting
        sort: { createdAt: "desc" }, // Sort by createdAt in descending order
        limit: 4, // Limit the results to the first 4
        populate: {
          cover: {
            fields: ["formats", "url", "width", "alternativeText"],
          },
        },
      }
    );

    // Transform the response to include only the necessary fields
    const transformedProjects = Projects.map((project) => ({
      id: project.id,
      name: project.name,
      location: project.location,
      cover: project.cover || null,
    }));

    return this.transformResponse(transformedProjects);
  },

  async findProjectsPrev(ctx) {
    const Projects = await strapi.entityService.findMany(
      "api::project.project",
      {
        fields: ["name", "location", "createdAt"], // Include the createdAt field for sorting
        sort: { createdAt: "desc" }, // Sort by createdAt in descending order
        populate: {
          cover: {
            fields: ["formats", "url", "width", "alternativeText"],
          },
        },
      }
    );

    // Transform the response to include only the necessary fields
    const transformedProjects = Projects.map((project) => ({
      id: project.id,
      name: project.name,
      location: project.location,
      cover: project.cover || null,
    }));

    return this.transformResponse(transformedProjects);
  },

  async findProjectById(ctx) {
    const { id } = ctx.params;

    if (!/^\d+$/.test(id)) {
      return ctx.notFound("Project not found");
    }

    const project = await strapi.entityService.findOne(
      "api::project.project",
      id,
      {
        fields: ["name", "location"], // Include only the necessary fields
        populate: {
          images: {
            fields: ["formats", "url", "width", "alternativeText"],
          },
        },
      }
    );

    if (!project) {
      return ctx.notFound("Project not found");
    }

    // Transform the response to include only the necessary fields
    const transformedProject = {
      id: project.id,
      name: project.name,
      location: project.location,
      images: project.images,
      cover: project.cover || null, // Handle cases where cover might be null
    };

    return this.transformResponse(transformedProject);
  },

  async sitemap(ctx) {
    const siteUrl = "https://zorzon.com.ro";

    const Projects = await strapi.entityService.findMany(
      "api::project.project",
      {
        fields: ["updatedAt"],
        sort: { createdAt: "desc" },
      }
    );

    const pages = [
      { path: "/" },
      { path: "/portofoliu" },
      { path: "/services-and-rates" },
      ...Projects.map((project) => ({
        path: `/portofoliu/${project.id}`,
        lastmod: new Date(project.updatedAt).toISOString().slice(0, 10),
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
