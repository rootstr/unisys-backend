import { HTTPMethods } from "fastify/types/utils";
import { HTTP_METHODS_AVAILABLES } from "@/constants/api.constant";

export const isValidHTTPMethod = (method: string): method is HTTPMethods => {
  return (HTTP_METHODS_AVAILABLES as ReadonlyArray<string>).includes(method);
}