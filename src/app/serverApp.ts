import "dotenv/config";
import path from "path";
import Fastify, { FastifyInstance } from "fastify";
import autoload from "@fastify/autoload";
import {
  validatorCompiler as zodValidatorCompiler,
  serializerCompiler as zodSerializerCompiler,
} from "fastify-type-provider-zod";
import { API_PREFIX } from "../constants/api.constant";

export class FastifyApp {
  private static instance: FastifyApp;
  public fastify: FastifyInstance;
  private loggerConfig: Record<string, {}> = {
    dev: {
      level: process.env?.LOG_LEVEL,
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname"
        }
      }
    },
    production: {
      level: process.env?.LOG_LEVEL,
      file: process.env?.LOG_FULLPATH
    },
    test: false
  }

  private constructor() {
    this.fastify = Fastify({
      logger: this.loggerConfig[process.env?.ENV_MODE!]
    });

    // Set validator and serializer compilers
    this.fastify.setValidatorCompiler(zodValidatorCompiler);
    this.fastify.setSerializerCompiler(zodSerializerCompiler);
  }

  public static getInstance(): FastifyApp {
    if (!FastifyApp.instance) {
      FastifyApp.instance = new FastifyApp();
    }
    return FastifyApp.instance;
  }

  public async initializeConfig() {
    // Register autoload for plugins and routes
    await this.registerPlugins();
    await this.registerRoutes();
  }

  public async run(port?: number) {
    this.fastify.listen({ port: Number(this.fastify.config.DEFAULT_PORT ?? port) });
  }

  private async registerPlugins() {
    // Register autoload for various directories

    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../errors/adapters/plugins"),
    })

    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../config/env/adapters/plugins"),
    })

    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../auth/adapters/plugins"),
    })

    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../config/cors/adapters/plugins"),
      encapsulate: false
    })

    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../config/database/adapters/plugins"),
    })

    if (this.fastify.config.ENV_MODE === "dev") {
      await this.fastify.register(autoload, {
        dir: path.join(__dirname, "../config/swagger/adapters/plugins"),
        encapsulate: false
      });
    }
  }

  private async registerRoutes() {
    // Register autoload for routes
    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../health/adapters/routes"),
      options: { prefix: `${API_PREFIX}/health` },
    });

    await this.fastify.register(autoload, {
      dir: path.join(__dirname, "../auth/adapters/routes"),
      options: { prefix: `${API_PREFIX}/auth` }
    });
  }

  public async close() {
    await this.fastify.close();
  }
}