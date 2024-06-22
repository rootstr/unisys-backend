import {
  FastifyPluginAsyncZod,
} from "fastify-type-provider-zod";
import {
  checkController
} from "@/health/adapters/controllers/check.controller";
import { HealthResponseSchema } from "@/health/core/models/health.model";

const healthRoutes: FastifyPluginAsyncZod = async (
  fastify,
  _options) => {
  fastify.get("/check", {
    schema: {
      description: "Checks if the server is listening for requests",
      tags: ["Health"],
      response: {
        200: HealthResponseSchema
      }
    }
  }, checkController);
}

export default healthRoutes;