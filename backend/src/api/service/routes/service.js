"use strict";

/**
 * service router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/services",
      handler: "service.findServices",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
