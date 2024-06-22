import fs from "node:fs";
import path from "path";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookies from "@fastify/cookie";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  COOKIE_NAME,
  DEFAULT_ISS,
  JWT_DEFAULT_EXPIRES_IN
} from "@/auth/constants/jwt.constant";

const jwtCookiesPlugin: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  let certsPath = path.normalize(fastify.config.CERT_DIRPATH);

  fastify.register(jwt, {
    secret: {
      private: fs.readFileSync(
        path.join(
          certsPath,
          fastify.config.CERT_PRIVNAME),
        "utf-8"),
      public: fs.readFileSync(
        path.join(
          certsPath,
          fastify.config.CERT_PUBNAME),
        "utf-8"),
    },
    sign: {
      algorithm: "RS256",
      iss: DEFAULT_ISS,
      expiresIn: JWT_DEFAULT_EXPIRES_IN
    },
    verify: {
      allowedIss: DEFAULT_ISS,
    },
    cookie: {
      cookieName: COOKIE_NAME,
      signed: false
    }
  })
  fastify.register(cookies);
}

export default fp(jwtCookiesPlugin);