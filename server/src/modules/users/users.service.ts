import { prisma } from "../utils/prisma";

export default class UserServie {
  orm = prisma;

  async getUserCount() {
    const count = await this.orm.user.count();
    return count;
  }
}
