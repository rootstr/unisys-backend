import { LogLevel } from "fastify";

export type EnvMode = "dev" | "production" | "test";

export type EnvConf = {
  DEFAULT_PORT: string;
  ENV_MODE: EnvMode;
  BASE_URL: string;
  HOSTNAME: string | null;
  ORIGINS: string[];
  CERT_DIRPATH: string;
  CERT_PRIVNAME: string;
  CERT_PUBNAME: string;
  LOG_LEVEL: LogLevel;
  LOG_FULLPATH: string;
}