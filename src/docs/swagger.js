const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vyra Grosir API",
      version: "1.0.0",
      description: "Fashion Store Backend API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  apis: ["src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
