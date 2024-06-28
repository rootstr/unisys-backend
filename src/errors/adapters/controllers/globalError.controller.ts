import { HttpProblemMessage } from "@/errors/core/models/httpProblemMessage.model";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const globalErrorController = async (
  err: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const problem: HttpProblemMessage = {
    status: err.statusCode || 500,
    title: err.code,
    detail: err.message,
  };

  reply.log.error(`${globalErrorController.name} reply with: ${JSON.stringify(problem, null, 2)}`);
  return reply.code(problem.status).send(problem);
};