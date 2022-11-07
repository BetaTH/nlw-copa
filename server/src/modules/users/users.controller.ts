import {
  FastifyRequest as serverResquest,
  FastifyReply as serverResponse,
} from "fastify";

import UserService from "./users.service";

export default class UserContronler {
  constructor(public service: UserService) {}

  async handleUserCount(request: serverResquest, reply: serverResponse) {
    const count = await this.service.getUserCount();
    return { count };
  }
}
