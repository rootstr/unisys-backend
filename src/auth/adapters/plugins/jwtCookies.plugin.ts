import fs from "node:fs";
import path from "path";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookies from "@fastify/cookie";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import {
  ACCESS_TOKEN_NAMESPACE,
  COOKIE_NAME,
  DEFAULT_ISS,
  JWT_DEFAULT_EXPIRES_IN,
  REFRESH_TOKEN_NAMESPACE
} from "@/auth/constants/jwt.constant";

const jwtCookiesPlugin: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  let certsPath = path.normalize(fastify.config.CERT_DIRPATH);

  fastify
    .register(jwt, {
      namespace: ACCESS_TOKEN_NAMESPACE,
      secret: {
        private: fs.readFileSync(
          path.join(
            certsPath,
            fastify.config.CERT_ACCESS_PRIVNAME),
          "utf-8"),
        public: fs.readFileSync(
          path.join(
            certsPath,
            fastify.config.CERT_ACCESS_PUBNAME),
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
      },
    }).register(jwt, {
      namespace: REFRESH_TOKEN_NAMESPACE,
      secret: {
        private: fs.readFileSync(
          path.join(
            certsPath,
            fastify.config.CERT_REFRESH_PRIVNAME),
          "utf-8"),
        public: fs.readFileSync(
          path.join(
            certsPath,
            fastify.config.CERT_REFRESH_PUBNAME),
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
      },
    })
    .register(cookies);
}

export default fp(jwtCookiesPlugin);