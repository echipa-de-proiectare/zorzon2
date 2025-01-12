"use strict";

const { interceptors } = require("axios");
const { pop, filter } = require("../../../../config/middlewares");
const userProject = require("../routes/user-project");

/**
 * user-project controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::user-project.user-project",
  ({ strapi }) => ({
    async findUserProjects(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in to view projects.");
      }

      const userProjects = await strapi.entityService.findMany(
        "api::user-project.user-project",
        {
          filters: { users_permissions_user: user.id },
          populate: {
            fields: ["name"],
            phase: {
              populate: "*",
            },
          },
        }
      );

      return this.transformResponse(userProjects);
    },

    async findProjectPhase(ctx) {
      const { pid, iid } = ctx.query; // Extract vid and pid from query parameters

      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          "You must be logged in to view project phases."
        );
      }

      // Fetch the user projects that belong to the logged-in user
      const projectPhase = await strapi.entityService.findMany(
        "api::user-project.user-project",
        {
          filters: {
            users_permissions_user: user.id, // Ensure projects belong to logged-in user
          },
          populate: {
            phase: {
              on: {
                "dashboard.project-phase": {
                  filters: { id: pid },
                  populate: {
                    item: {
                      filters: { id: iid }, // Filter item by ID
                      populate: {
                        fields: ["url"],
                        document: {
                          fields: ["url", "ext", "formats"],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }
      );

      return this.transformResponse(projectPhase);
    },

    /*   async findReviewDates(ctx) {
        const user = ctx.state.user;
  
        if (!user) {
          return ctx.unauthorized("You must be logged in to view projects.");
        }
        // Fetch the user projects that belong to the logged-in user
        const userProjects = await strapi.entityService.findMany(
          "api::user-project.user-project",
          {
            filters: {
              users_permissions_user: user.id,
            }, // Ensures we only fetch the user's projects
  
            populate: {
              projectPhase: {
                populate: {
                  phaseItem: {
                    populate: {
                      itemDocument: {
                        populate: {
                          fields: ["reviewDate"],
                        },
                      },
                    },
                  },
                },
              },
            },
          }
        );
  
        // Extract reviewDates from the fetched data
        const reviewDates = userProjects.flatMap((project) =>
          project.projectPhase.flatMap((phase) =>
            phase.phaseItem.flatMap((item) =>
              item.itemDocument.map((doc) => doc.reviewDate)
            )
          )
        );
        // Remove duplicates using `filter()` and `indexOf()` array operations
        let newReviewDates = reviewDates.filter((date, index, self) => {
          return self.indexOf(date) === index;
        });
  
        // Sort the dates in chronological order using `sort()` and `Date.parse()`
        newReviewDates.sort((a, b) => Date.parse(a) - Date.parse(b));
  
        if (!reviewDates.length) {
          return ctx.notFound("No review dates found.");
        }
  
        return ctx.send(newReviewDates);
      },*/
  })
);
