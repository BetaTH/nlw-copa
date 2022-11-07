import { FastifyRequest, FastifyReply } from "fastify";

export interface ServerResquest extends FastifyRequest {}
export interface ServerResponse extends FastifyReply {}
