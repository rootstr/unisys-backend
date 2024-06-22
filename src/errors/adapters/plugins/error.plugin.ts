import fp from "fastify-plugin";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { notFoundController } from "../controllers/notFound.controller";
import { globalErrorController } from "../controllers/globalError.controller";

const errorPlugin: FastifyPluginAsyncZod = async (
  fastify
) => {
  fastify
    .setErrorHandler(globalErrorController)
    .setNotFoundHandler(notFoundController);
}

export default fp(errorPlugin);