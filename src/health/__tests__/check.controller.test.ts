import { FastifyApp } from "@/app/serverApp";

describe("check that the server is running", () => {
  let app: FastifyApp;

  beforeAll(async () => {
    app = FastifyApp.getInstance();
    await app.initializeConfig();
    await app.run();
  });

  afterAll(async () => {
    await app.close();
  });

  test("responds with success", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/api/v1/health/check",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    expect(response.statusCode).toBe(200);
    const jsonResponse = response.json();
    expect(jsonResponse).toHaveProperty("message");
    expect(jsonResponse).toHaveProperty("date");
  });
});