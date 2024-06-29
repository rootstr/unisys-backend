import "./helpers/module-aliases";
import { FastifyApp } from "@/app/serverApp";
import closeWithGrace from "close-with-grace";

const app = FastifyApp.getInstance();

const startServer = async () => {
  await app.initializeConfig();
  await app.run();
}

closeWithGrace(async ({ signal, err }) => {
  if (signal) {
    app.fastify.log.info(`close with ${signal}`);
  } else {
    app.fastify.log.error(`close with ${err}`);
  }
  await app.close();
});

startServer();

export { app };