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
    CERT_PRIVNAME: { type: "string" },
    CERT_PUBNAME: { type: "string" },
    ENV_MODE: {
      type: "string",
      enum: ["dev", "production", "test"]
    },
    LOG_LEVEL: {
      type: "string",
      enum: ["trace", "debug", "info", "warn", "error", "fatal", "silent"]
    },
    LOG_FULLPATH: { type: "string" },
    HOSTNAME: { type: ["string", "null"] }
  },
  required: [
    "DEFAULT_PORT",
    "BASE_URL",
    "ORIGINS",
    "CERT_DIRPATH",
    "CERT_PRIVNAME",
    "CERT_PUBNAME",
    "ENV_MODE",
    "LOG_LEVEL",
    "LOG_FULLPATH"
  ]
};

export const ENV_DATA = {
  ...process.env,
  ORIGINS:
    process.env?.ORIGINS ?
      parseCorsOrigins(process.env.ORIGINS) : []
};