import { FastifyApp } from "@/app/serverApp";
import { ERRS } from "@/errors/constants/errors.constant";

describe("check the functionality of cors", () => {
  let app: FastifyApp;

  beforeAll(async () => {
    app = FastifyApp.getInstance();
    await app.initializeConfig();
    await app.run();
  });

  afterAll(async () => {
    await app.close();
  });

  test("should respond with 403 for Cors-Policy, no origin provided", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/api/v1/health/check"
    });

    const jsonResponse = response.json();
    const expectedError = new ERRS.FST_ERR_BLOCKED_BY_CORS("api-details-here");

    expect(response.statusCode).toBe(403);
    expect(jsonResponse).toHaveProperty("title", expectedError.code);
    expect(jsonResponse).toHaveProperty("status", 403);
  });

  test("should respond with 403 for Cors-Policy, invalid origin provided", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/api/v1/health/check",
      headers: {
        origin: "http://example.com"
      }
    });

    const jsonResponse = response.json();
    const expectedError = new ERRS.FST_ERR_BLOCKED_BY_CORS("api-details-here");

    expect(response.statusCode).toBe(403);
    expect(jsonResponse).toHaveProperty("title", expectedError.code);
    expect(jsonResponse).toHaveProperty("status", 403);
  });

  test("should respond with 200 code, valid origin provided", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/api/v1/health/check",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    expect(response.statusCode).toBe(200);
  });
});