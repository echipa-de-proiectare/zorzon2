"use strict";

/**
 * user-project router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/user-projects/my-projects",
      handler: "user-project.findUserProjects",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/project-phases",
      handler: "user-project.findProjectPhase",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
