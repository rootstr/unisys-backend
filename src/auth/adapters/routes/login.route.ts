import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { logOutController, loginController, refreshController } from "../controllers/login.controller";

const loginRoutes: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify
    .get("/login", loginController)
    .get("/logout", logOutController)
    .get("/refresh", refreshController)
}

export default loginRoutes;