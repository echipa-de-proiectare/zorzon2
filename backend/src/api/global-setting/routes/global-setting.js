"use strict";

/**
 * about router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/global-settings",
      handler: "global-setting.findGlobalSettings",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
