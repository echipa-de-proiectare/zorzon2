"use strict";

/**
 * jewelry-info controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::jewelry-info.jewelry-info",
  ({ strapi }) => ({
    async findJewelryInfo(ctx) {
      const info = await strapi
        .documents("api::jewelry-info.jewelry-info")
        .findFirst({ fields: ["description", "whatsapp"] });

      // wa.me links expect digits only, in international format,
      // so "0722 123 456" becomes "40722123456"
      let whatsapp = info?.whatsapp ? info.whatsapp.replace(/\D/g, "") : null;
      if (whatsapp?.startsWith("00")) whatsapp = whatsapp.slice(2);
      if (whatsapp?.length === 10 && whatsapp.startsWith("0")) {
        whatsapp = `4${whatsapp}`;
      }

      return this.transformResponse({
        description: info?.description || null,
        whatsapp,
      });
    },
  })
);
