import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  FastifyPluginAsyncZod
} from "fastify-type-provider-zod";
import { SWAGGER_DOC_ROUTE } from "@/config/swagger/constants/doc.constant";
import { version } from "@/../package.json";
import { API_PREFIX } from "@/constants/api.constant";

const swaggerPlugin: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  const baseDevelopmentServer = new URL(API_PREFIX, fastify.config.BASE_URL);

  fastify
    .register(fastifySwagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "Unisys API",
          description: "Official Unisys Documentation",
          version
        },
        servers: [{
          url: baseDevelopmentServer.href
        }],
        tags: [{
          name: "Health",
          description: "These endpoints help to create tests for the api, they can also be used to check if the server is working."
        }],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "Bearer",
              bearerFormat: "JWT"
            }
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ],
        externalDocs: {
          url: "https://swagger.io/",
          description: "More information on swagger documentation",
        },
      },
      transform: jsonSchemaTransform,
    })
    .register(fastifySwaggerUi, {
      routePrefix: SWAGGER_DOC_ROUTE,
    });
};

export default swaggerPlugin;