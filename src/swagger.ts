import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";
import path from "path";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "POC API RESTFULL",
      version: "1.0.0",
      description: "Documentação da poc API RESTFULL",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor de desenvolvimento",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerDocument = YAML.load(path.join(__dirname, "../src/docs/swagger.yaml"));

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
