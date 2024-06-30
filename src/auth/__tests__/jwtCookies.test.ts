import { FastifyApp } from "@/app/serverApp";
import { COOKIE_NAME } from "@/auth/constants/jwt.constant";
import { randomBytes, randomUUID } from "crypto";

describe("verify the jwt token validator plugin", () => {
  let app: FastifyApp;

  beforeAll(async () => {
    app = FastifyApp.getInstance();
    await app.initializeConfig();

    app.fastify.get("/generate-token", async (_request, reply) => {
      const token = await reply.accessJwtSign({ requestId: randomUUID() });
      return reply.setCookie(COOKIE_NAME, token).send({ token });
    });

    app.fastify.get("/generate-expired", async (_request, reply) => {
      const token = await reply.accessJwtSign({ requestId: randomUUID() }, { sign: { expiresIn: "1ms" } });
      return reply.setCookie(COOKIE_NAME, token).send({ token });
    });

    app.fastify.get("/decode-token", async (request, reply) => {
      const token = await request.accessJwtDecode();
      return reply.send({ token });
    });

    app.fastify.get("/protected-route", {
      onRequest: async (request) => {
        await request.accessJwtVerify();

        // Get user from database
        request.user.userId = randomUUID();
        request.user.username = "userMock"
      },
    }, async (request, reply) => {
      return reply.send({ user: request.user });
    });

    await app.run();
  });

  afterAll(async () => {
    await app.close();
  });

  test("should register jwt plugin", () => {
    expect(app.fastify.jwt).toBeDefined();
  });

  test("should generate jwt and set cookie", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/generate-token",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(200);
    expect(jsonResponse).toHaveProperty("token");
    expect(response.headers["set-cookie"]).toMatch(new RegExp(`^${COOKIE_NAME}=`));
  });

  test("should allow access to protected route with valid token", async () => {
    const tokenResponse = await app.fastify.inject({
      method: "GET",
      url: "/generate-token",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    const token = tokenResponse.json().token;

    const response = await app.fastify.inject({
      method: "GET",
      url: "/protected-route",
      headers: {
        origin: app.fastify.config.BASE_URL,
        cookie: `${COOKIE_NAME}=${token}`,
      },
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(200);
    expect(jsonResponse?.user?.username).toEqual("userMock");
    expect(jsonResponse?.user?.userId).toBeDefined();
  });

  test("should allow access to protected route with valid token in (authorization header)", async () => {
    const tokenResponse = await app.fastify.inject({
      method: "GET",
      url: "/generate-token",
      headers: {
        origin: app.fastify.config.BASE_URL
      }
    });

    const token = tokenResponse.json().token;

    const response = await app.fastify.inject({
      method: "GET",
      url: "/protected-route",
      headers: {
        origin: app.fastify.config.BASE_URL,
        authorization: `Bearer ${token}`
      },
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(200);
    expect(jsonResponse?.user?.username).toEqual("userMock");
    expect(jsonResponse?.user?.userId).toBeDefined();
  });

  test("should deny access to protected route with invalid token", async () => {
    const invalidToken = randomBytes(32).toString("base64");

    const response = await app.fastify.inject({
      method: "GET",
      url: "/protected-route",
      headers: {
        origin: app.fastify.config.BASE_URL,
        cookie: `${COOKIE_NAME}=${invalidToken}`,
      },
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(401);
    expect(jsonResponse).toHaveProperty("detail");
    expect(jsonResponse).toHaveProperty("status");
  });

  test("should deny access to protected route without token", async () => {
    const response = await app.fastify.inject({
      method: "GET",
      url: "/protected-route",
      headers: {
        origin: app.fastify.config.BASE_URL,
      },
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(401);
    expect(jsonResponse).toHaveProperty("detail");
    expect(jsonResponse).toHaveProperty("status");
  });

  test("should deny access to protected route with expired token", async () => {
    const responseWithExpiredToken = await app.fastify.inject({
      method: "GET",
      url: "/generate-expired",
      headers: {
        origin: app.fastify.config.BASE_URL,
      },
    });

    // Wait for token expiration
    await new Promise(resolve => setTimeout(resolve, 50));

    const token = responseWithExpiredToken.json().token;

    const response = await app.fastify.inject({
      method: "GET",
      url: "/protected-route",
      headers: {
        origin: app.fastify.config.BASE_URL,
        cookie: `${COOKIE_NAME}=${token}`,
      },
    });

    const jsonResponse = response.json();

    expect(response.statusCode).toBe(401);
    expect(jsonResponse).toHaveProperty("detail");
    expect(jsonResponse).toHaveProperty("status");
  });

  test("should generate token with correct structure", async () => {
    const responseWithToken = await app.fastify.inject({
      method: "GET",
      url: "/generate-token",
      headers: {
        origin: app.fastify.config.BASE_URL,
      }
    });

    const token = responseWithToken.json().token;

    const response = await app.fastify.inject({
      method: "GET",
      url: "/decode-token",
      headers: {
        origin: app.fastify.config.BASE_URL,
        authorization: `Bearer ${token}`
      }
    });

    const decodedToken = response.json().token;

    expect(decodedToken).toHaveProperty("requestId");
    expect(decodedToken).toHaveProperty("iat");
    expect(decodedToken).toHaveProperty("exp");
  });
});