import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import YAML from "yamljs";
import path from "path";

const options = {
  swaggerOptions: {
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};

const swaggerDocument = YAML.load(path.join(__dirname, "../src/docs/swagger.yaml"));

export const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
};
