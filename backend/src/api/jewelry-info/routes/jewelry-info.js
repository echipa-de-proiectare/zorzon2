"use strict";

/**
 * jewelry-info router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/jewelry-info",
      handler: "jewelry-info.findJewelryInfo",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
