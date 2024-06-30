import { DEFAULT_PORT } from "@/constants/api.constant";
import { parseCorsOrigins } from "@/lib/utils/adapters/parseCorsOrigins.util";
import "dotenv/config";

export const ENV_CONF_JSONSCHEMA = {
  type: "object",
  properties: {
    DEFAULT_PORT: { type: "string", default: DEFAULT_PORT },
    BASE_URL: { type: "string" },
    ORIGINS: {
      type: "array",
      items: { type: "string" }
    },
    CERT_DIRPATH: { type: "string" },
    CERT_ACCESS_PRIVNAME: { type: "string" },
    CERT_ACCESS_PUBNAME: { type: "string" },
    CERT_REFRESH_PRIVNAME: { type: "string" },
    CERT_REFRESH_PUBNAME: { type: "string" },
    ENV_MODE: {
      type: "string",
      enum: ["dev", "production", "test"]
    },
    LOG_LEVEL: {
      type: "string",
      enum: ["trace", "debug", "info", "warn", "error", "fatal", "silent"]
    },
    LOG_FULLPATH: { type: "string" },
    HOSTNAME: { type: ["string", "null"] },
    MARIADB_CONNECTION: { type: "string" },
    MARIADB_PASSWD: { type: "string" }
  },
  required: [
    "DEFAULT_PORT",
    "BASE_URL",
    "ORIGINS",
    "CERT_DIRPATH",
    "CERT_ACCESS_PRIVNAME",
    "CERT_ACCESS_PUBNAME",
    "CERT_REFRESH_PUBNAME",
    "CERT_REFRESH_PRIVNAME",
    "ENV_MODE",
    "LOG_LEVEL",
    "LOG_FULLPATH",
    "MARIADB_CONNECTION",
    "MARIADB_PASSWD"
  ]
};

export const ENV_DATA = {
  ...process.env,
  ORIGINS:
    process.env?.ORIGINS ?
      parseCorsOrigins(process.env.ORIGINS) : []
};