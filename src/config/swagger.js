const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ledger Transaction System API",
      version: "1.0.0",
      description: "API documentation for Ledger-Based Transaction System",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // location of route files
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;