import { FastifyApp } from "@/app/serverApp";
import { ERRS } from "@/errors/constants/errors.constant";

describe("check the functionality of the global error handlers", () => {
  let app: FastifyApp;

  beforeAll(async () => {
    app = FastifyApp.getInstance();
    await app.initializeConfig();
    app.fastify.get("/throw-error-db-connection", async (_request, _reply) => {
      throw new ERRS.FST_ERR_SERVICE_CONNECTION_FAILURE("Time-out connection");
    });
    await app.run();
  });

  afterAll(async () => {
    await app.close();
  });

  test("should respond with 404 for unknown routes", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/api/v1/unknown-route",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    const jsonResponse = response.json();
    const expectedError = new ERRS.FST_ERR_RESOURCE_NOT_FOUND("api-details-here");

    expect(response.statusCode).toBe(404);
    expect(jsonResponse).toHaveProperty("title", expectedError.code);
    expect(jsonResponse).toHaveProperty("status", 404);
  });

  test("should respond with 405 for method not allowed", async () => {
    const response = await app.fastify.inject({
      method: "PUT",
      url: "/api/v1/health/check",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    const jsonResponse = response.json();
    const expectedError = new ERRS.FST_ERR_METHOD_NOT_ALLOWED("api-details-here");

    expect(response.statusCode).toBe(405);
    expect(jsonResponse).toHaveProperty("title", expectedError.code);
    expect(jsonResponse).toHaveProperty("status", 405);
  });

  test("should respond with 504 for service connection failure", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/throw-error-db-connection",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    const jsonResponse = response.json();
    const expectedError = new ERRS.FST_ERR_SERVICE_CONNECTION_FAILURE("Time-out connection");

    expect(response.statusCode).toBe(504);
    expect(jsonResponse).toHaveProperty("title", expectedError.code);
    expect(jsonResponse).toHaveProperty("status", 504);
    expect(jsonResponse).toHaveProperty("detail", expectedError.message);
  });
});