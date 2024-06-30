import fp from "fastify-plugin";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import mysqlPlugin from "@fastify/mysql";
import { 
  DEFAULT_IDLE_TIMEOUT_MS, 
  DEFAULT_TIMEOUT_MS, 
  KEEP_ALIVE_INITIAL_DELAY, 
  MAX_CONNECTIONS,
  MAX_QUEUE_CONNECTIONS
} from "../../constants/mariadb.constant";

const mariadbPlugin: FastifyPluginAsyncZod = async (
  fastify,
  _opts
) => {
  fastify.register(mysqlPlugin, {
    uri: fastify.config.MARIADB_CONNECTION,
    password: fastify.config.MARIADB_PASSWD,
    connectTimeout: DEFAULT_TIMEOUT_MS,
    idleTimeout: DEFAULT_IDLE_TIMEOUT_MS,
    connectionLimit: MAX_CONNECTIONS,
    queueLimit: MAX_QUEUE_CONNECTIONS,
    keepAliveInitialDelay: KEEP_ALIVE_INITIAL_DELAY,
    promise: true,
    waitForConnections: true,
    enableKeepAlive: true
  });
};

export default fp(mariadbPlugin);