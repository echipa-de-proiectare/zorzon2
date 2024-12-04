"use strict";

/**
 * contact-message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const yup = require("yup");
const sanitizeHtml = require("sanitize-html");

const messageSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  city: yup.string().trim().required("City is required"),
  phone: yup
    .string()
    .nullable()
    .matches(/^[0-9]+$/, "Phone must be numeric"),
  message: yup.string().trim().required("Message is required"),
});

module.exports = createCoreController(
  "api::contact-message.contact-message",
  ({ strapi }) => ({
    async create(ctx) {
      // Validate request body with yup
      const validatedData = await messageSchema.validate(
        ctx.request.body.data,
        { abortEarly: false }
      );

      // Sanitize message to prevent XSS attacks
      validatedData.message = sanitizeHtml(validatedData.message);

      // Attach sanitized and validated data back to ctx.request.body
      ctx.request.body.data = validatedData;

      // Call the default Strapi create controller
      const response = await super.create(ctx);

      // Send email after entry is created
      try {
        await strapi.plugins["email"].services.email.send({
          to: process.env.EMAIL_TO,
          from: process.env.EMAIL_FROM,
          subject: "Mesaj nou ZorZon",
          html: `Nume: ${response.data.name}; Oras: ${response.data.city}; Telefon: ${response.data.phone}; Message: ${response.data.message}`,
        });
      } catch (err) {
        strapi.log.error("Failed to send email:", err);
      }

      return response;
    },
  })
);
