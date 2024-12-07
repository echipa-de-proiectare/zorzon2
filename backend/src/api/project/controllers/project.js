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
            fields: ["formats", "url"],
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
            fields: ["formats", "url"],
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

    const project = await strapi.entityService.findOne(
      "api::project.project",
      id,
      {
        fields: ["name", "location"], // Include only the necessary fields
        populate: {
          images: {
            fields: ["formats", "url"], // Include only the URL field in the cover relation
          },
        },
      }
    );

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
}));
