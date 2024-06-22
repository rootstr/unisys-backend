import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import { ENV_CONF_JSONSCHEMA, ENV_DATA } from "@/config/env/constants/envfile.constant";
import {
  FastifyPluginAsyncZod
} from "fastify-type-provider-zod";

const envPlugin: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify.register(fastifyEnv, {
    confKey: "config",
    schema: ENV_CONF_JSONSCHEMA,
    dotenv: true,
    data: ENV_DATA
  });
};

export default fp(envPlugin);