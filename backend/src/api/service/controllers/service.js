"use strict";

/**
 * service controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::service.service", ({ strapi }) => ({
  async findServices(ctx) {
    try {
      const service = await strapi.entityService.findOne(
        "api::service.service",
        1, // Assuming single type, so ID is 1
        {
          populate: {
            ServiceItem: {
              populate: {
                examples: {
                  populate: {
                    imageItem: {
                      fields: ["url", "alternativeText", "formats"],
                    },
                  },
                },
              },
            },
          },
        }
      );

      if (!service) {
        return ctx.notFound("Service not found");
      }

      // Transform the response to include only the necessary fields
      const serviceExamples = {
        id: service.id,
        Title: service.Title,
        Description: service.Description,
        ServiceItem: service.ServiceItem.map((item) => ({
          id: item.id,
          Title: item.Title,
          Description: item.Description,
          Price: item.Price,
          Time: item.Time,
          Content: item.Content,
          examples: item.examples
            ? item.examples.map((example) => ({
                id: example.id,
                title: example.title,
                imageItem: example.imageItem
                  ? {
                      url: example.imageItem.url,
                      alternativeText: example.imageItem.alternativeText,
                      formats: example.imageItem.formats,
                    }
                  : null,
              }))
            : [],
        })),
      };

      return this.transformResponse(serviceExamples);
    } catch (error) {
      strapi.log.error("Error fetching service examples:", error);
      return ctx.internalServerError("Internal server error");
    }
  },
}));
