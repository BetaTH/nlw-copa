import { prisma } from "../../utils/prisma";

export default class UserService {
  getUserCount() {
    const count = prisma.user.count();
    return count;
  }
}
