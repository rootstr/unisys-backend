import { AuthPayload } from "@/auth/core/models/authPayload.model";
import { EnvConf } from "@/config/env/core/models/envconf.model";

declare module "fastify" {
  interface FastifyInstance {
    config: EnvConf
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: AuthPayload
  }
}