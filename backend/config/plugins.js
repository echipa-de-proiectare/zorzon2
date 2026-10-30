module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.example.com"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("EMAIL_FROM"),
        defaultReplyTo: env("EMAIL_TO"),
      },
    },
  },
  upload: {
    config: {
      providerOptions: {
        localServer: {
          // Uploaded files get a hash in their name, so they can be cached long
          maxage: 365 * 24 * 60 * 60 * 1000,
        },
      },
      // Strapi defaults plus xlarge, so retina screens don't need the original
      breakpoints: {
        xlarge: 1600,
        large: 1000,
        medium: 750,
        small: 500,
      },
    },
  },
  // ...
});
