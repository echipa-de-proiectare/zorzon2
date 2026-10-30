"use strict";

/**
 * jewellery-info router
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/jewellery-info",
      handler: "jewellery-info.findJewelleryInfo",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
