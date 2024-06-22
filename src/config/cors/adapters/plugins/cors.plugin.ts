import cors from "@fastify/cors";
import { HTTP_METHODS_AVAILABLES } from "@/constants/api.constant";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { ERRS } from "@/errors/constants/errors.constant";

const corsPlugin: FastifyPluginAsyncZod = async (fastify, _opts) => {
  fastify.register(cors, {
    hook: "onRequest", // Hook to handle CORS on request
    delegator: async (request, callback) => {
      const origin = request.headers.origin;
      // Check if the origin is allowed
      const isAllowed = fastify.config.ORIGINS.includes(origin ?? "") || request.hostname === fastify.config.HOSTNAME;

      // Call the callback with appropriate response
      return callback(isAllowed
        ? null : new ERRS.FST_ERR_BLOCKED_BY_CORS("No Access-Control-Allow-Origin header is present"), {
        origin: isAllowed,
        methods: HTTP_METHODS_AVAILABLES, // Allow specific HTTP methods
        maxAge: 600, // Cache preflight response for 600 seconds
        preflight: true, // Enable preflight requests
        credentials: true // Enable credentials for CORS
      });
    }
  });
}

export default corsPlugin;