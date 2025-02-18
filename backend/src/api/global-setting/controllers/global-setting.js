"use strict";

const { pop } = require("../../../../config/middlewares");

/**
 * Global Setting Controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::global-setting.global-setting",
  ({ strapi }) => ({
    async findGlobalSettings(ctx) {
      const globalSettings = await strapi.entityService.findMany(
        "api::global-setting.global-setting",
        {
          populate: {
            logo_primary: true,
            logo_secondary: true,
            topNavigation: {
              populate: "*",
            },
            footer: {
              populate: "*",
            },
            userTopNavigation: {
              populate: "*",
            },
          },
        }
      );

      return this.transformResponse(globalSettings);
    },
  })
);
