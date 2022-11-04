import { FastifyReply, FastifyRequest } from "fastify";
import UserServie from "./users.service";

export default class UserContronler {
  constructor(public service: UserServie) {}

  async handleUserCount(request: FastifyRequest, reply: FastifyReply) {
    const count = this.service.getUserCount();
    return { count };
  }
}
