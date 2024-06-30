import { FastifyRequest, FastifyReply } from "fastify"

export const loginController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.send({hello: "world"});
};

export const logOutController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

};

export const refreshController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

};