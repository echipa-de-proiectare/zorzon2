"use strict";

/**
 * jewel router
 */

const routeConfig = {
  auth: false,
  policies: [],
  middlewares: [],
};

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/jewels/sitemap.xml",
      handler: "jewel.sitemap",
      config: routeConfig,
    },
    {
      method: "GET",
      path: "/jewels",
      handler: "jewel.findJewelsPreview",
      config: routeConfig,
    },
    {
      method: "GET",
      path: "/jewels/:id",
      handler: "jewel.findJewelById",
      config: routeConfig,
    },
  ],
};
