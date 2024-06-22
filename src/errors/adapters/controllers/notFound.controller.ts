import { FastifyRequest, FastifyReply } from "fastify";
import { ERRS } from "@/errors/constants/errors.constant";
import { HTTP_METHODS_AVAILABLES } from "@/constants/api.constant";
import { isValidHTTPMethod } from "@/lib/utils/adapters/isValidHttpMethod.util";

export const notFoundController = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  // Filter the available HTTP methods for the requested URL, excluding OPTIONS.
  const methodsFound = HTTP_METHODS_AVAILABLES.filter(m =>
    request.server.hasRoute({ url: request.originalUrl, method: m }) && m !== "OPTIONS"
  );

  // Check if any route exists for the requested URL, excluding OPTIONS.
  const routeExists = methodsFound.length > 0;

  if (routeExists) {
    // Verify if the HTTP method of the request is valid.
    if (!isValidHTTPMethod(request.method)) {
      throw new ERRS.FST_ERR_METHOD_NOT_ALLOWED("Invalid HTTP method");
    }

    // Check if the HTTP method of the request is allowed for the route.
    if (!methodsFound.includes(request.method)) {
      throw new ERRS.FST_ERR_METHOD_NOT_ALLOWED("Verify that the route is correct");
    }
  } else {
    // If the route does not exist, throw a resource not found error.
    throw new ERRS.FST_ERR_RESOURCE_NOT_FOUND("The resource does not exist");
  }
};