import createError from "@fastify/error";

export const ERRS = {
  FST_ERR_UNREALIZED_MODIFICATIONS: createError<[string]>(
    "FST_ERR_UNREALIZED_MODIFICATIONS",
    "No modifications could be made: %s",
    500,
    TypeError
  ),
  FST_ERR_SERVICE_CONNECTION_FAILURE: createError<[string]>(
    "FST_ERR_SERVICE_CONNECTION_FAILURE",
    "Connection not reached: %s",
    504,
    TypeError
  ),
  FST_ERR_TRANSACTION: createError<[string]>(
    "FST_ERR_TRANSACTION",
    "Transaction not completed: %s",
    409,
    TypeError
  ),
  FST_ERR_RESOURCE_NOT_FOUND: createError<[string]>(
    "FST_ERR_RESOURCE_NOT_FOUND",
    "Unlocated resource: %s",
    404,
    TypeError
  ),
  FST_ERR_BAD_REQUEST: createError<[string]>(
    "FST_ERR_BAD_REQUEST",
    "Request could not be processed: %s",
    400,
    TypeError
  ),
  FST_ERR_METHOD_NOT_ALLOWED: createError<[string]>(
    "FST_ERR_METHOD_NOT_ALLOWED",
    "Method not allowed: %s",
    405,
    TypeError
  ),
  FST_ERR_TOO_MANY_REQUESTS: createError<[string]>(
    "FST_ERR_TOO_MANY_REQUESTS",
    "Request limit has been exceeded: %s",
    429,
    TypeError
  ),
  FST_ERR_BLOCKED_BY_CORS: createError<[string]>(
    "FST_ERR_BLOCKED_BY_CORS",
    "Blocked by CORS policy: %s",
    403,
    TypeError
  )
};