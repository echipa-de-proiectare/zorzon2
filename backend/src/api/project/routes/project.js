"use strict";

/**
 * project router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/sitemap.xml",
      handler: "project.sitemap",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/projects/projects-spotlight",
      handler: "project.findProjectsSpotlight",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/projects/projects-preview",
      handler: "project.findProjectsPrev",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/projects/:id",
      handler: "project.findProjectById",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
