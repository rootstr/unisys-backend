import { HTTPMethods } from "fastify/types/utils";

export const API_PREFIX = "/api/v1";
export const DEFAULT_PORT = "4500";
export const HTTP_METHODS_AVAILABLES: HTTPMethods[] = [
  "DELETE",
  "GET",
  "HEAD",
  "PATCH",
  "POST",
  "PUT",
  "OPTIONS"
] as const;