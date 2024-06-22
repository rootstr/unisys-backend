import { FastifyReply, FastifyRequest } from "fastify";

export const checkController = async (
  _request: FastifyRequest,
  reply: FastifyReply) => {
  return reply.send({ message: "hello world", date: new Date() });
};